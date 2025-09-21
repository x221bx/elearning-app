import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import useCourses from "../hooks/useCourses";
import CourseList from "../components/course/CourseList";

export default function Courses() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { seed } = useCourses();

  useEffect(() => {
    seed();
  }, [seed]);

  const gradientStart = isDark
    ? alpha(theme.palette.secondary.dark, 0.28)
    : alpha(theme.palette.secondary.light, 0.36);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundImage: `linear-gradient(180deg, ${gradientStart} 0%, ${theme.palette.background.default} 65%)`,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box sx={{ flex: 1, px: { xs: 2, sm: 4, md: 8 }, py: { xs: 5, md: 8 } }}>
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
            maxWidth: 640,
            mx: "auto",
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="text.primary" gutterBottom>
            Explore Our Courses
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Fun and engaging courses designed for kids and teens to learn and grow!
          </Typography>
        </Box>

        <CourseList />
      </Box>
    </Box>
  );
}
