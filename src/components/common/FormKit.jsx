import React from "react";
import { Card, CardContent, TextField, InputAdornment, Grid } from "@mui/material";`nimport { alpha } from "@mui/material/styles";

export function FormCard({ children, ...props }) {
    return (
        <Card variant="outlined" sx={(theme) => ({ borderRadius: 3, borderColor: theme.palette.divider })} {...props}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>{children}</CardContent>
        </Card>
    );
}

export function LabeledField(props) {
    return (
        <TextField
            size="small"
            fullWidth
            sx={(theme) => ({ "& .MuiOutlinedInput-root": { backgroundColor: alpha(theme.palette.primary.main, 0.08), borderRadius: 2 } })}
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

