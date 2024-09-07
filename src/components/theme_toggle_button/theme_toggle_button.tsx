import React from "react";
import { useThemeContext } from "../../theme/ThemeProvider";
import { DarkModeUISwitch } from "./styled";

const ThemeToggleButton: React.FC = () => {
  const { toggleTheme, isDarkMode } = useThemeContext();

  return (
    <DarkModeUISwitch
      onClick={toggleTheme}
      sx={{
        position: "absolute",
        right: 0,
      }}
    />
  );
};

export default ThemeToggleButton;
