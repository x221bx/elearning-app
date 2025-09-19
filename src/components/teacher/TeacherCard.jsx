
import React from "react";
import { Card, CardContent, CardMedia, Typography, Rating, Box } from "@mui/material";
import { Link } from "react-router-dom";

const TeacherCard = ({ id, image, name, rating, description }) => {
    return (
        <Card
            sx={{
                maxWidth: 300,
                borderRadius: 3,
                boxShadow: 2,
                p: 1,
                backgroundColor: "#fafafa",
                position: "relative"
            }}
        >
            <CardMedia component="img" height="200" image={image} alt={name} style={{ borderRadius: "12px" }} />
            <CardContent>
                <Typography variant="h6" fontWeight="bold">{name}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Rating value={rating} precision={0.5} readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>{rating}</Typography>
                </Box>
                {description && (
                    <Typography variant="body2" color="text.secondary">{description}</Typography>
                )}
            </CardContent>
            <Box
                component={Link}
                to={`/teachers/${id}`}
                aria-label={`Open ${name} details`}
                sx={{ position: "absolute", inset: 0, borderRadius: 3, display: "block", textDecoration: "none" }}
            />
        </Card>
    );
};

export default TeacherCard;
