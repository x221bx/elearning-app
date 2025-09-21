import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Box, Avatar, Rating, Chip } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import teacherPlaceholder from "../../assets/images/teacher-placeholder.png";

export default function TeacherCard({ id, name, subject, rating = 0, image, description }) {
    const theme = useTheme();
    const r = Math.max(0, Math.min(5, Number(rating || 0)));
    const soft = theme.palette.brand?.soft || (theme.palette.mode === "dark" ? alpha(theme.palette.primary.main, 0.15) : alpha(theme.palette.primary.main, 0.1));
    const border = alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.4 : 0.25);
    const hoverBg = theme.palette.mode === "dark" ? alpha(theme.palette.primary.main, 0.12) : alpha(theme.palette.primary.main, 0.18);
    return (
        <Card
            component={Link}
            to={`/teachers/${id}`}
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                color: "inherit",
                borderRadius: 3,
                border: `1px solid ${border}`,
                background: theme.palette.mode === "dark"
                  ? theme.palette.background.paper
                  : `linear-gradient(180deg, #FFFFFF 0%, ${soft} 100%)`,
                boxShadow: theme.customShadows?.card || "0 12px 32px rgba(15,23,42,0.12)",
                transition: "transform .2s, box-shadow .2s, border-color .2s, background-color .2s",
                "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 18px 38px rgba(15,23,42,0.18)",
                    borderColor: theme.palette.primary.main,
                    backgroundColor: hoverBg,
                },
            }}
            aria-label={`Open ${name} details`}
        >
            {image ? (
                <CardMedia
                    component="img"
                    image={image}
                    alt={name}
                    onError={(e) => { e.currentTarget.src = teacherPlaceholder; }}
                    sx={{ height: 160, objectFit: "cover", borderRadius: "12px 12px 0 0" }}
                />
            ) : (
                <Box sx={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: soft, borderRadius: "12px 12px 0 0" }}>
                    <Avatar src={teacherPlaceholder} sx={{ width: 64, height: 64 }} />
                </Box>
            )}

            <CardContent sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1, flexGrow: 1 }}>
                <Typography variant="subtitle1" fontWeight={900} noWrap>{name}</Typography>
                {!!subject && (
                    <Chip
                        label={subject}
                        size="small"
                        sx={{
                            bgcolor: alpha(theme.palette.primary.main, 0.12),
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                            color: "text.primary",
                            width: "max-content",
                        }}
                    />
                )}
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                    <Rating value={r} readOnly precision={0.5} max={5} sx={{ "& .MuiRating-iconFilled": { color: theme.palette.primary.main } }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{r.toFixed(1)}</Typography>
                </Box>
                {!!description && (
                    <Typography variant="body2" color="text.secondary" sx={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                        {description}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}
