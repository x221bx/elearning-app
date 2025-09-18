import * as React from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";

const th = { textAlign: "left", padding: "8px", borderBottom: "1px solid #eee" };
const td = { padding: "8px", borderBottom: "1px solid #f5f5f5" };

export default function RecentTable({ columns, rows, empty }) {
    const list = Array.isArray(rows) ? rows : [];

    return (
        <Card variant="outlined" sx={{ borderRadius: 2, mb: 2 }}>
            <CardContent>
                <Box sx={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                        <tr>
                            {columns.map((c) => (
                                <th key={c.key} style={th}>{c.label}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {list.map((row, idx) => (
                            <tr key={idx}>
                                {columns.map((c) => (
                                    <td key={c.key} style={td}>
                                        {c.render ? c.render(row[c.key], row) : row[c.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {!list.length && (
                            <tr>
                                <td style={td} colSpan={columns.length} align="center">
                                    <Typography variant="body2" color="text.secondary">
                                        {empty}
                                    </Typography>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </Box>
            </CardContent>
        </Card>
    );
}
