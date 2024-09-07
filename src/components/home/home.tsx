import { useState } from "react";
import ThemeToggleButton from "../theme_toggle_button/theme_toggle_button";
import Typewriter from "../typewriter_text/typewriter";
import { yupValidation } from "./validation";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Columns from "../columnGrid/column_grids";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

import {
  Box,
  Grid2 as Grid,
  TextField,
  Typography,
  Button,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import { useMediaQueries } from "../../hooks/useMediaQueries";

const Home = () => {
  // State
  const [tableData, setTableData] = useState<any | null>([]);
  const [tableName, setTableName] = useState<any | null>("");
  const { isMobile } = useMediaQueries();

  // Form state
  const schema = yupValidation();
  const formMethods = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      tableName: "",
      columnName: "",
      columnType: undefined,
      allowNull: "False",
      foreignKey: "False",
      foreignTableName: "",
      // foreignTablePrimarykey: 0,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch, // Watch for changes to the foreignKey field
  } = formMethods;

  const foreignKey = watch("foreignKey"); // Get the current value of foreignKey

  const [generatedCode, setGeneratedCode] = useState(``); // State to hold the generated code

  const onSubmit = (data: any) => {
    if (!tableName || tableName !== data.tableName) {
      setTableName(data.tableName);
    }
    const arr = [...tableData];
    arr.push(data);
    setTableData(arr);
    formMethods.reset({
      tableName: data.tableName,
    });
  };

  console.log(tableData);
  console.log(tableName);

  return (
    <>
      {/* Switch button */}
      <Box p={2}>
        <ThemeToggleButton />
      </Box>

      {/* Header */}
      <Typography
        mt={2}
        align="center"
        variant={isMobile ? "h4" : "h2"}
        gutterBottom
      >
        Sequelize Migration Generator
      </Typography>

      <Box mt={-2} p={1}>
        <Typewriter text="Convenient UI tool to generate Sequelize migration code to create new tables in your database." />
      </Box>

      <FormProvider {...formMethods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="create-code"
          name="create-code"
        >
          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            mt={6}
            p={2}
          >
            {/* Table Name */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="h6">Table Name</Typography>
              <Controller
                name="tableName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Enter your table name here"
                    error={!!errors.tableName}
                    helperText={errors.tableName?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>

            {/* Column name */}
            <Grid size={{ xs: 12, sm: 6 }} mt={2}>
              <Typography variant="h6">Column Name</Typography>
              <Controller
                name="columnName"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    {...field}
                    placeholder="Enter column name here"
                    error={!!errors.columnName}
                    helperText={errors.columnName?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>

            {/* Column Type */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="h6">Column Type</Typography>
              <Controller
                name="columnType"
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      size="small"
                      value={field.value || ""}
                      onChange={field.onChange}
                      fullWidth
                      displayEmpty
                      renderValue={(value) => {
                        if (!value) {
                          return <em>Select Column Type</em>;
                        }
                        return value;
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select Column Type
                      </MenuItem>
                      <MenuItem value={"INTEGER"}>INTEGER</MenuItem>
                      <MenuItem value={"STRING"}>STRING</MenuItem>
                      <MenuItem value={"TEXT"}>TEXT</MenuItem>
                      <MenuItem value={"DATE"}>DATE</MenuItem>
                    </Select>
                    {errors.columnType && (
                      <FormHelperText sx={{ color: "#d32f2f", ml: 1.5 }}>
                        {errors.columnType ? errors.columnType.message : " "}
                      </FormHelperText>
                    )}
                  </>
                )}
              />
            </Grid>

            {/* Allow Null */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="h6">Allow Null</Typography>
              <Controller
                name="allowNull"
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      size="small"
                      value={field.value || "False"}
                      onChange={field.onChange}
                      fullWidth
                    >
                      <MenuItem value={"True"}>True</MenuItem>
                      <MenuItem value={"False"}>False</MenuItem>
                    </Select>
                  </>
                )}
              />
            </Grid>

            {/* Foreign Key */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="h6">Foreign Key</Typography>
              <Controller
                name="foreignKey"
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      size="small"
                      value={field.value || "False"}
                      onChange={field.onChange}
                      fullWidth
                    >
                      <MenuItem value={"True"}>True</MenuItem>
                      <MenuItem value={"False"}>False</MenuItem>
                    </Select>
                  </>
                )}
              />
            </Grid>

            {/* Conditionally rendered Foreign Table Name and Foreign Table Primary Key */}
            {foreignKey === "True" && (
              <>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="h6">Foreign Table Name</Typography>
                  <Controller
                    name="foreignTableName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        placeholder="Enter Foreign Table Name here"
                        error={!!errors.foreignTableName}
                        helperText={errors.foreignTableName?.message}
                        fullWidth
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="h6">
                    Foreign Table Primary key
                  </Typography>
                  <Controller
                    name="foreignTablePrimarykey"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        {...field}
                        placeholder="Enter Foreign Table Primary key here"
                        error={!!errors.foreignTablePrimarykey}
                        helperText={errors.foreignTablePrimarykey?.message}
                        fullWidth
                      />
                    )}
                  />
                </Grid>
              </>
            )}

            {/* Button: Add column */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                <Typography fontWeight={600}>Add Column</Typography>
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>

      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        mt={5}
        p={2}
        // border={1}
      >
        {/* Table view */}

        <Grid textAlign={"center"} size={{ xs: 12, sm: 12 }}>
          {/* Render table view here */}
          <Columns />
          {/* Example: <TableView columns={columns} rows={rows} /> */}
        </Grid>

        {/* Button: Generate migration code */}
        <Grid textAlign={"center"} size={{ xs: 12, sm: 6 }}>
          <Button
            size="large"
            fullWidth
            variant="contained"
            color="success"
            onClick={() => {
              alert("Generate code logic");
            }}
          >
            <Typography
              fontFamily={"LilitaOne"}
              fontSize={"24px"}
              letterSpacing={"1px"}
              // fontWeight={600}
            >
              Generate Migration Code
            </Typography>
          </Button>
        </Grid>
      </Grid>

      {/* Code: Generated Sequelize Migration Code */}
      <Box p={2} mt={4}>
        <Typography fontFamily={"LilitaOne"} variant="h5">
          Generated Migration Code:
        </Typography>
        <Box
          sx={{
            p: 2,
            border: "1px solid #ddd",
            borderRadius: "4px",
            whiteSpace: "pre-wrap", // To preserve formatting
            backgroundColor: "#f5f5f5",
            minHeight: "200px",
          }}
        >
          {generatedCode}
        </Box>
      </Box>

      <Button
        size="large"
        fullWidth
        variant="text"
        color="inherit"
        onClick={() => {
          alert("Reset form logic");
        }}
      >
        <Typography
          fontFamily={"LilitaOne"}
          fontSize={isMobile ? "18px" : "20px"}
          letterSpacing={"1px"}
          // fontWeight={600}
        >
          Generate Another Migration Code
        </Typography>
        <KeyboardDoubleArrowUpIcon />
      </Button>
    </>
  );
};

export default Home;
