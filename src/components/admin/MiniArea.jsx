// src/components/admin/MiniArea.jsx
import * as React from "react";
import { Box, Typography } from "@mui/material";

export default function MiniArea() {
    return (
        <Box
            sx={{
                width: 220,
                height: 100,
                borderRadius: 2,
                bgcolor: "#fff9c4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
            }}
        >
            <Typography variant="body2" color="text.secondary">
                Chart Placeholder
            </Typography>
        </Box>
    );
}
