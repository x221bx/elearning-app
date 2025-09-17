
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const TeacherCard = ({ id, image, name, rating, description }) => {
  return (
    <Card
      component={Link}
      to={`/teachers/${id}`}
      sx={{
        maxWidth: 300,
        borderRadius: 3,
        boxShadow: 3,
        p: 1,
        backgroundColor: "#fff9f0",
        textDecoration: "none",
        color: "inherit",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={name}
        sx={{
          borderRadius: "12px",
          objectFit: "cover",
        }}
      />

      <CardContent>
        <Typography variant="h6" fontWeight="bold" noWrap>
          {name}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Rating value={Number(rating)} precision={0.5} readOnly />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {rating}
          </Typography>
        </Box>

        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2, 
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default TeacherCard;
