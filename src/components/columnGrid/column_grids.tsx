import React, { useState } from "react";
import {
  Grid,
  IconButton,
  Typography,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import the close icon

const Columns = ({ initialData }: any) => {
  const [data, setData] = useState(initialData);

  const handleDelete = (index: number) => {
    // Remove the column at the specified index
    setData(data.filter((_: any, i: any) => i !== index));
  };

  return (
    <Grid container spacing={0.3} justifyContent="center" wrap="nowrap">
      {data.map((col: any, index: number) => (
        <Grid item key={index}>
          <Paper
            elevation={6}
            sx={{
              //   display: "flex",
              alignItems: "center",
              padding: 1,
              margin: 0.5,
              position: "relative",
            }}
          >
            <IconButton
              onClick={() => handleDelete(index)}
              sx={{
                // top: 2,
                // right: 2,
                padding: 0.1,
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography fontWeight={600} variant="body1">
              {col.columnName}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

// Example usage
const initialData = [
  { columnName: "id" },

  { columnName: "createdBy" },
  { columnName: "updatedBy" },
  { columnName: "deletedBy" },
  { columnName: "createdAt" },
  { columnName: "updatedAt" },
  { columnName: "deletedAt" },
];

const App = () => (
  <Box p={2}>
    <Columns initialData={initialData} />
  </Box>
);

export default App;
