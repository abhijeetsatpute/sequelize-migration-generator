import React, { useState, useEffect } from 'react';
import { 
  Button, 
  TextField, 
  Checkbox, 
  FormControlLabel, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Select, 
  MenuItem, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  IconButton,
  Typography,
  Box,
  useTheme,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import { 
  LightMode as LightModeIcon, 
  DarkMode as DarkModeIcon, 
  ContentCopy as ContentCopyIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import { SnackbarProvider, useSnackbar } from 'notistack';

type ColumnType = 'STRING' | 'INTEGER' | 'TEXT' | 'DATE' | 'BOOLEAN';

interface Column {
  name: string;
  type: ColumnType;
  allowNull: boolean;
  defaultValue?: string;
  primaryKey?: boolean;
  autoIncrement?: boolean;
  references?: {
    model: string;
    key: string;
  };
  onDelete?: 'CASCADE' | 'SET NULL' | 'RESTRICT';
}

const defaultColumns: Column[] = [
  { name: 'id', type: 'INTEGER', allowNull: false, primaryKey: true, autoIncrement: true },
  { name: 'createdBy', type: 'INTEGER', allowNull: false, references: { model: 'user', key: 'id' }, onDelete: 'CASCADE' },
  { name: 'updatedBy', type: 'INTEGER', allowNull: true, references: { model: 'user', key: 'id' }, onDelete: 'CASCADE' },
  { name: 'deletedBy', type: 'INTEGER', allowNull: true, references: { model: 'user', key: 'id' }, onDelete: 'CASCADE' },
  { name: 'createdAt', type: 'DATE', allowNull: false },
  { name: 'updatedAt', type: 'DATE', allowNull: false },
  { name: 'deletedAt', type: 'DATE', allowNull: true },
];

const MigrationGenerator: React.FC = () => {
  const [tableName, setTableName] = useState('');
  const [tableNameError, setTableNameError] = useState(false);
  const [columns, setColumns] = useState<Column[]>(defaultColumns);
  const [newColumn, setNewColumn] = useState<Column>({ name: '', type: 'STRING', allowNull: false });
  const [generatedCode, setGeneratedCode] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();
  const darkTheme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  const handleAddColumn = () => {
    if (newColumn.name) {
      const idIndex = columns.findIndex(col => col.name === 'id');
      const newColumns = [...columns];
      newColumns.splice(idIndex + 1, 0, newColumn);
      setColumns(newColumns);
      setNewColumn({ name: '', type: 'STRING', allowNull: false });
    }
  };

  const handleRemoveColumn = (index: number) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  const generateMigration = () => {
    if (!tableName) {
      setTableNameError(true);
      return;
    }
    setTableNameError(false);

    const columnDefinitions = columns.map(column => {
      let definition = `${column.name}: {
        type: Sequelize.${column.type},
        allowNull: ${column.allowNull},`;

      if (column.primaryKey) definition += '\n        primaryKey: true,';
      if (column.autoIncrement) definition += '\n        autoIncrement: true,';
      if (column.defaultValue) definition += `\n        defaultValue: ${JSON.stringify(column.defaultValue)},`;
      if (column.references) {
        definition += `\n        references: { model: '${column.references.model}', key: '${column.references.key}' },`;
      }
      if (column.onDelete) definition += `\n        onDelete: '${column.onDelete}',`;

      definition += '\n      }';
      return definition;
    }).join(',\n      ');

    const migrationCode = `'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('${tableName}', {
      ${columnDefinitions}
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('${tableName}');
  },
};`;

    setGeneratedCode(migrationCode);
    setIsModalOpen(true);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setIsCopied(true);
      enqueueSnackbar('Code copied to clipboard!', { variant: 'success' });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      enqueueSnackbar('Failed to copy code', { variant: 'error' });
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <Typography variant="h4" component="h1">
            Sequelize Migration Generator
          </Typography>
          <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
        
        <TextField
          fullWidth
          label="Table Name (required)"
          value={tableName}
          onChange={(e) => {
            setTableName(e.target.value);
            setTableNameError(false);
          }}
          error={tableNameError}
          helperText={tableNameError ? "Table name is required" : ""}
          margin="normal"
        />

        <Typography variant="h6" component="h2" sx={{ marginTop: 2, marginBottom: 1 }}>
          Columns
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Column Name</TableCell>
                <TableCell>Column Type</TableCell>
                <TableCell>Not Null</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {columns.map((column, index) => (
                <TableRow key={index}>
                  <TableCell>{column.name}</TableCell>
                  <TableCell>{column.type}</TableCell>
                  <TableCell>{!column.allowNull ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    {column.name !== 'id' && (
                      <Button
                        onClick={() => handleRemoveColumn(index)}
                        color="error"
                        size="small"
                      >
                        Remove
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6" component="h3" sx={{ marginBottom: 1 }}>
            Add New Column
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Column Name"
              value={newColumn.name}
              onChange={(e) => setNewColumn({ ...newColumn, name: e.target.value })}
            />
            <Select
              value={newColumn.type}
              onChange={(e) => setNewColumn({ ...newColumn, type: e.target.value as ColumnType })}
            >
              <MenuItem value="STRING">STRING</MenuItem>
              <MenuItem value="INTEGER">INTEGER</MenuItem>
              <MenuItem value="TEXT">TEXT</MenuItem>
              <MenuItem value="DATE">DATE</MenuItem>
              <MenuItem value="BOOLEAN">BOOLEAN</MenuItem>
            </Select>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!newColumn.allowNull}
                  onChange={(e) => setNewColumn({ ...newColumn, allowNull: !e.target.checked })}
                />
              }
              label="Not Null"
            />
            <Button
              onClick={handleAddColumn}
              disabled={!newColumn.name}
              variant="contained"
            >
              Add Column
            </Button>
          </Box>
        </Box>

        <Button
          onClick={generateMigration}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Generate Migration
        </Button>

        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Generated Migration Code</DialogTitle>
          <DialogContent>
            <DialogContentText component="div">
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxHeight: '60vh', overflow: 'auto' }}>
                <code>{generatedCode}</code>
              </pre>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={copyToClipboard} startIcon={isCopied ? <CheckIcon /> : <ContentCopyIcon />}>
              {isCopied ? 'Copied!' : 'Copy to Clipboard'}
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

const MigrationGeneratorApp: React.FC = () => (
  <SnackbarProvider maxSnack={3}>
    <MigrationGenerator />
  </SnackbarProvider>
);

export default MigrationGeneratorApp;