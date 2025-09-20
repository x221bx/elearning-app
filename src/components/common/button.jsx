import React from "react";
import { Button, useMediaQuery } from "@mui/material";

export default function YellowButton({
                                         children,
                                         variant = "contained",
                                         fullWidth = false,
                                         ...props
                                     }) {
    const isXs = useMediaQuery("(max-width:600px)");

    return (
        <Button
            variant={variant}
            fullWidth={fullWidth}
            size={isXs ? "small" : "medium"}
            sx={{
                minHeight: 40,
                px: 2.5,
                borderRadius: 2.5,
                fontWeight: 600,
                textTransform: "none",
                ...(variant === "contained"
                    ? {
                        backgroundColor: "#fbc02d",
                        color: "#000",
                        "&:hover": { backgroundColor: "#f9a825" },
                    }
                    : {
                        border: "1px solid #f3cd46",
                        color: "#000",
                        backgroundColor: "#fffde7",
                        "&:hover": { backgroundColor: "#fff8c5" },
                    }),
            }}
            {...props}
        >
            {children}
        </Button>
    );
}
