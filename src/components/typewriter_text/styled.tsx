import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledBox = styled(Box)`
  &.typewriter-effect {
    display: flex;
    justify-content: center;
    font-family: monospace;
  }

  &.typewriter-effect > .text {
    max-width: 0;
    animation: typing 7s steps(var(--characters)) infinite;
    white-space: nowrap;
    overflow: hidden;
  }

  &.typewriter-effect:after {
    content: " |";
    animation: blink 1s infinite;
    animation-timing-function: step-end;
  }

  @keyframes typing {
    75%,
    100% {
      max-width: calc(var(--characters) * 1ch);
    }
  }

  @keyframes blink {
    0%,
    75%,
    100% {
      opacity: 1;
    }
    25% {
      opacity: 0;
    }
  }
`;
