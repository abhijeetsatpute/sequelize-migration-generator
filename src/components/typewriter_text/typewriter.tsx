import React from "react";
import { Box } from "@mui/material";
import { StyledBox } from "./styled";

interface CustomStyles extends React.CSSProperties {
  "--characters": number | string;
}

interface TypewriterProps {
  text: string;
}

function Typewriter({ text }: TypewriterProps) {
  const styles: CustomStyles = {
    "--characters": text.length + 2,
  };

  return (
    <StyledBox className="typewriter-effect">
      <Box style={styles} className="text" id="typewriter-text">
        {text}
      </Box>
    </StyledBox>
  );
}

export default Typewriter;
