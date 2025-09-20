import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Box, Avatar, Rating, Chip } from "@mui/material";
import teacherPlaceholder from "../../assets/images/teacher-placeholder.png";

const Y = {
    bgSoft: "#FFF9F0",
    bgHover: "#FFFDF2",
    border: "#F7E27E",
    primaryDark: "#F9A825",
    hairline: "#EFEFEF",
};

export default function TeacherCard({ id, name, subject, rating = 0, image, description }) {
    const r = Math.max(0, Math.min(5, Number(rating || 0)));
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
                border: `1px solid ${Y.hairline}`,
                background: `linear-gradient(180deg, #FFFFFF 0%, ${Y.bgSoft} 100%)`,
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                transition: "transform .2s, box-shadow .2s, border-color .2s, background-color .2s",
                "&:hover": { transform: "translateY(-3px)", boxShadow: "0 8px 22px rgba(0,0,0,0.10)", borderColor: Y.border, backgroundColor: Y.bgHover },
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
                <Box sx={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: Y.bgSoft, borderRadius: "12px 12px 0 0" }}>
                    <Avatar src={teacherPlaceholder} sx={{ width: 64, height: 64 }} />
                </Box>
            )}

            <CardContent sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1, flexGrow: 1 }}>
                <Typography variant="subtitle1" fontWeight={900} noWrap>{name}</Typography>
                {!!subject && <Chip label={subject} size="small" sx={{ bgcolor: "#FFF3CD", border: "1px solid #F9E0A7", width: "max-content" }} />}
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                    <Rating value={r} readOnly precision={0.5} max={5} sx={{ "& .MuiRating-iconFilled": { color: Y.primaryDark } }} />
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
