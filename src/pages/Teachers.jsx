import React from "react";
import { Typography, Box } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import TeachersList from "../components/teacher/TeacherList";

const Teachers = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
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
            Meet Our Teachers
          </Typography>
          <Typography variant="body1" color="text.secondary">
            A team of compassionate mentors dedicated to making every learning moment enjoyable and inspiring.
          </Typography>
        </Box>

        <TeachersList />
      </Box>
    </Box>
  );
};

export default Teachers;
