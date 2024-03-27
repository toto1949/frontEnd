import React from "react";
import Fab from "@mui/material/Fab";

const FabButton = ({ label, Icon, onClick }) => {
  return (
    <Fab
      sx={{
        position: "fixed",
        bottom: (theme) => theme.spacing(4),
        right: (theme) => theme.spacing(4),
      }}
      variant="extended"
      color="primary"
      aria-label="add"
      onClick={onClick}
    >
      <Icon />
      {label}
    </Fab>
  );
};

export default FabButton;
