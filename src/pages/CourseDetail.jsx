
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from "@mui/material";
import { courses } from "../api/courses";

export default function CourseDetail() {
  const { id } = useParams();

  const course = useMemo(
    () => courses.find((c) => String(c.id) === String(id)),
    [id]
  );

  if (!course) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6">Course not found</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#fdf7ff",
        minHeight: "100vh",
        py: 8,
        px: { xs: 2, sm: 4, md: 6 },
      }}
    >
    
      <Card
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          mb: 4,
          boxShadow: "0px 6px 15px rgba(0,0,0,0.1)",
        }}
      >
        <CardMedia
          component="img"
          height="300"
          image={course.image}
          alt={course.title}
          sx={{
            objectFit: "cover",
            transition: "transform 0.3s ease",
            "&:hover": { transform: "scale(1.05)" },
          }}
        />
      </Card>

  
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ color: "#7b1fa2", mb: 1 }}
      >
        {course.title}
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ mb: 2 }}
      >
        Lessons: {course.lessonsCount || 0} | Rating: ⭐ {course.rating}
      </Typography>
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ color: "#f57c00", mb: 4 }}
      >
        ${course.price}
      </Typography>

  
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 2,
          mb: 4,
          backgroundColor: "#fff9f0",
          p: 2,
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            🌟 About this course
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {course.description}
          </Typography>
        </CardContent>
      </Card>

      
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 2,
          mb: 4,
          backgroundColor: "#f0f4ff",
          p: 2,
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            🎯 What you'll learn
          </Typography>
          <List>
            {course.whatYoullLearn?.map((item, idx) => (
              <ListItem
                key={idx}
                sx={{
                  pl: 0,
                  "&:hover": { bgcolor: "#ede7f6", borderRadius: 2 },
                }}
              >
                <ListItemText primary={`✨ ${item}`} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 2,
          backgroundColor: "#fff",
          p: 2,
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            📘 Course Outline
          </Typography>
          {course.courseOutline?.map((module, idx) => (
            <Box key={idx} sx={{ mb: 3 }}>
              <Chip
                label={module.title}
                sx={{
                  bgcolor: "#ba68c8",
                  color: "#fff",
                  fontWeight: "bold",
                  mb: 1,
                }}
              />
              <List dense>
                {module.lessons.map((lesson, i) => (
                  <ListItem
                    key={i}
                    sx={{
                      pl: 2,
                      "&:hover": { bgcolor: "#f3e5f5", borderRadius: 2 },
                    }}
                  >
                    <ListItemText primary={`- ${lesson}`} />
                  </ListItem>
                ))}
              </List>
              {idx < course.courseOutline.length - 1 && (
                <Divider sx={{ my: 2 }} />
              )}
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}
