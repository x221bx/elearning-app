import React from "react";
import { Button, useMediaQuery } from "@mui/material";
import { alpha } from "@mui/material/styles";

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
            sx={(theme) => ({
                minHeight: 40,
                px: 2.5,
                borderRadius: 2.5,
                fontWeight: 600,
                textTransform: "none",
                ...(variant === "contained"
                    ? {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        "&:hover": { backgroundColor: theme.palette.primary.dark },
                    }
                    : {
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.4)}`,
                        color: theme.palette.primary.main,
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                        "&:hover": { backgroundColor: alpha(theme.palette.primary.main, 0.12) },
                    }),
            })}
            {...props}
        >
            {children}
        </Button>
    );
}

