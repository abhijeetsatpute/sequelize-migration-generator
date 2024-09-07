import { CircularProgress, Grid2 as Grid } from "@mui/material";

export const FullPageCircularProgress = () => (
  <Grid
    container
    justifyContent={"center"}
    alignItems={"center"}
    height={"100vh"}
  >
    <CircularProgress size={100} thickness={2} />
  </Grid>
);
