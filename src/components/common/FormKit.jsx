import React from "react";
import { Card, CardContent, TextField, InputAdornment, Grid } from "@mui/material";

export function FormCard({ children, ...props }) {
    return (
        <Card variant="outlined" sx={{ borderRadius: 3, borderColor: "#f1f1f1" }} {...props}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>{children}</CardContent>
        </Card>
    );
}

export function LabeledField(props) {
    return (
        <TextField
            size="small"
            fullWidth
            sx={{ "& .MuiOutlinedInput-root": { bgcolor: "#FFF8E1", borderRadius: 2 } }}
            {...props}
        />
    );
}

export const CurrencyAdornment = ({ code = "EGP" }) => (
    <InputAdornment position="start">{code}</InputAdornment>
);

export function TwoCol({ children }) {
    return <Grid container spacing={2}>{children}</Grid>;
}

export function Col({ children, xs = 12, md = 6 }) {
    return <Grid item xs={xs} md={md}>{children}</Grid>;
}
