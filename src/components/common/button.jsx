import React from "react";
import { Button } from "@mui/material";

function YellowButton({ children, ...props }) {
    return (
        <Button
            fullWidth={props.fullWidth}
            disableElevation
            variant="contained"
            sx={{
                backgroundColor: "#FBC02D",
                color: "#000",
                fontWeight: "bold",
                borderRadius: "24px",
                px: 3,
                py: 1,
                textTransform: "none",
                "&:hover": { backgroundColor: "#F9A825" },
            }}
            {...props}
        >
            {children}
        </Button>
    );
}

export default YellowButton;
