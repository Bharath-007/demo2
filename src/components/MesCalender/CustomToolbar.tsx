import React from "react";
import { ToolbarProps } from "react-big-calendar";
import { IconButton, Typography } from "@mui/material";
import { ArrowBack, ArrowForward, Today } from "@mui/icons-material";

const CustomToolbar: React.FC<ToolbarProps> = ({ label, onNavigate }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <IconButton onClick={() => onNavigate("PREV")} color="primary">
        <ArrowBack />
      </IconButton>

      <Typography variant="h6" style={{ flex: 1, textAlign: "center" }}>
        {label}
      </Typography>

      <IconButton onClick={() => onNavigate("TODAY")} color="secondary">
        <Today />
      </IconButton>

      <IconButton onClick={() => onNavigate("NEXT")} color="primary">
        <ArrowForward />
      </IconButton>
    </div>
  );
};

export default CustomToolbar;
