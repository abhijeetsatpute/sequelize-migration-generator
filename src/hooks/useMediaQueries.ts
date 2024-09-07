import { useMediaQuery, useTheme } from "@material-ui/core";

export const useMediaQueries = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDesktop: boolean = useMediaQuery(theme.breakpoints.up("md"));

  return {
    isMobile,
    isDesktop,
  };
};
