import * as yup from "yup";

const yupValidation = () =>
  yup.object().shape({
    tableName: yup
      .string()
      .required("Table name is required")
      .matches(/^(?!\s+$).*/, "Table name cannot be only spaces"),
    columnName: yup
      .string()
      .required("Column name is required")
      .matches(/^(?!\s+$).*/, "Column name cannot be only spaces"),
    columnType: yup
      .string()
      .required("Column Type is required")
      .oneOf(["INTEGER", "STRING", "TEXT", "DATE"], "Invalid column type")
      .matches(/^(?!\s+$).*/, "Column type cannot be only spaces"),
    allowNull: yup
      .string()
      .required("allow Null is required")
      .oneOf(["True", "False"], "Invalid allow Null value")
      .matches(/^(?!\s+$).*/, "allow Null cannot be only spaces"),
    // primaryKey: yup
    //   .string()
    //   .required("primary Key is required")
    //   .matches(/^(?!\s+$).*/, "primary Key cannot be only spaces"),
    foreignKey: yup
      .string()
      .required("foreign Key is required")
      .oneOf(["True", "False"], "Invalid foreign Key value")
      .matches(/^(?!\s+$).*/, "foreign Key cannot be only spaces"),
    foreignTableName: yup
      .string()
      //   .required("Column name is required")
      .matches(/^(?!\s+$).*/, "Foreign Table Name cannot be only spaces"),
    foreignTablePrimarykey: yup.string(),
    //   .required("Column name is required")
    //   .matches(
    //     /^(?!\s+$).*/,
    //     "Foreign Table Primary key cannot be only spaces"
    //   ),
  });

export { yupValidation };
