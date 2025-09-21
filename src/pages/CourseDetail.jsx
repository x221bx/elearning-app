import React, { useMemo, useEffect } from "react";
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
import { alpha } from "@mui/material/styles";
import useCourses from "../hooks/useCourses";

export default function CourseDetail() {
  const { id } = useParams();
  const { courses, seed } = useCourses();

  // Seed courses on component mount
  useEffect(() => {
    seed();
  }, [seed]);

  const course = useMemo(
    () => courses.find((c) => String(c.id) === String(id)),
    [courses, id]
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
        backgroundColor: "var(--brand-soft)",
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
          boxShadow: (theme) => theme.shadows[6],
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
        sx={{ color: "secondary.main", mb: 1 }}
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
        sx={{ color: "warning.main", mb: 4 }}
      >
        ${course.price}
      </Typography>


      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 2,
          mb: 4,
          backgroundColor: "var(--brand-soft)",
          p: 2,
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            About this course
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
          backgroundColor: "var(--brand-soft)",
          p: 2,
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            What you'll learn
          </Typography>
          <List>
            {course.whatYoullLearn?.map((item, idx) => (
              <ListItem
                key={idx}
                sx={{
                  pl: 0,
                  "&:hover": { bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.12), borderRadius: 2 },
                }}
              >
                <ListItemText primary={"- " + item} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 2,
          backgroundColor: "var(--card-bg)",
          p: 2,
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Course Outline
          </Typography>
          {course.courseOutline?.map((module, idx) => (
            <Box key={idx} sx={{ mb: 3 }}>
              <Chip
                label={module.title}
                sx={{
                  bgcolor: "var(--primary-btn-bg)",
                  color: (theme) => theme.palette.primary.contrastText,
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
                      "&:hover": { bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.18), borderRadius: 2 },
                    }}
                  >
                    <ListItemText primary={"- " + lesson} />
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
