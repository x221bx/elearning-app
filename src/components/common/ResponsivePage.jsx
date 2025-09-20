import React from "react";
import { Container } from "@mui/material";

export default function ResponsivePage({ children, maxWidth = "lg", sx }) {
    return (
        <Container
            maxWidth={maxWidth}
            sx={{
                px: { xs: 1.5, sm: 2.5 },
                py: { xs: 2, sm: 3 },
                ...sx,
            }}
        >
            {children}
        </Container>
    );
}
