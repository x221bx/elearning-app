import React from "react";
import { TextField, useMediaQuery } from "@mui/material";
export default function FormField({
                                      autoGrow = false,
                                      minRows = 1,
                                      maxRows = 6,
                                      ...props
                                  }) {
    const isXs = useMediaQuery("(max-width:600px)");
    const isMultiline = !!autoGrow;

    return (
        <TextField
            fullWidth
            size={isXs ? "small" : "medium"}
            multiline={isMultiline}
            minRows={isMultiline ? minRows : undefined}
            maxRows={isMultiline ? maxRows : undefined}
            InputProps={{
                sx: !isMultiline ? { height: isXs ? 40 : 44 } : undefined,
            }}
            sx={{
                "& .MuiOutlinedInput-root": {
                    borderRadius: 2.5,
                    "& fieldset": { borderColor: "#e5e5e5" },
                    "&:hover fieldset": { borderColor: "#d7d7d7" },
                    "&.Mui-focused fieldset": { borderColor: "#FBC02D" },
                },
            }}
            {...props}
        />
    );
}
