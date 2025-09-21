import React, { useMemo, useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Chip,
  Grid,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import CustomPagination from "../components/common/customPagination";
import CourseCard from "../components/course/CourseCard";
import useCourses from "../hooks/useCourses";

export default function Courses() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { courses, seed } = useCourses();

  const perPage = 8;

  useEffect(() => {
    seed();
  }, [seed]);

  const categories = useMemo(() => {
    const cats = ["All", ...new Set(courses.map((c) => c.category))];
    return cats;
  }, [courses]);

  const filteredCourses = useMemo(() =>
    courses.filter((c) => {
      const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || c.category === category;
      return matchesSearch && matchesCategory;
    }),
  [courses, search, category]);

  const pageCount = Math.max(1, Math.ceil(filteredCourses.length / perPage));
  const paginated = filteredCourses.slice((page - 1) * perPage, page * perPage);

  const filterSurface = alpha(theme.palette.background.paper, isDark ? 0.2 : 0.8);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pt: { xs: 6, md: 10 },
        pb: 8,
        px: { xs: 2, sm: 4, md: 6 },
        backgroundImage: isDark
          ? `linear-gradient(180deg, ${alpha(theme.palette.secondary.dark, 0.3)} 0%, ${theme.palette.background.default} 55%)`
          : `linear-gradient(180deg, ${alpha(theme.palette.secondary.light, 0.35)} 0%, ${theme.palette.background.default} 60%)`,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        color="text.primary"
        sx={{ mb: 2 }}
      >
        Explore Our Courses
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        textAlign="center"
        sx={{ mb: 4 }}
      >
        Fun and engaging courses designed for kids and teens to learn and grow!
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "center" },
          justifyContent: "center",
          gap: 2.5,
          mb: 5,
          flexWrap: "wrap",
          borderRadius: 3,
          backgroundColor: filterSurface,
          border: `1px solid ${alpha(theme.palette.secondary.main, isDark ? 0.25 : 0.18)}`,
          boxShadow: theme.customShadows?.card,
          p: { xs: 2.5, md: 3 },
        }}
      >
        <TextField
          label="Search courses"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          sx={{
            width: { xs: "100%", md: "320px" },
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
            '& .MuiOutlinedInput-root': { borderRadius: 2 },
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            justifyContent: "center",
            flex: 1,
          }}
        >
          {categories.map((cat) => {
            const active = category === cat;
            return (
              <Chip
                key={cat}
                label={cat}
                onClick={() => {
                  setCategory(cat);
                  setPage(1);
                }}
                sx={{
                  borderRadius: "16px",
                  bgcolor: active
                    ? theme.palette.secondary.main
                    : alpha(theme.palette.text.primary, 0.08),
                  color: active
                    ? theme.palette.secondary.contrastText
                    : theme.palette.text.primary,
                  fontWeight: active ? 600 : 500,
                  px: 1.5,
                  '&:hover': {
                    bgcolor: active
                      ? theme.palette.secondary.dark
                      : alpha(theme.palette.text.primary, 0.16),
                  },
                  transition: "background-color 0.2s ease, color 0.2s ease",
                }}
              />
            );
          })}
        </Box>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {paginated.map((course) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
            <CourseCard {...course} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CustomPagination
          count={pageCount}
          page={page}
          onChange={(_, p) => setPage(p)}
          colorHex={theme.palette.secondary.main}
          hoverHex={theme.palette.secondary.dark}
        />
      </Box>
    </Box>
  );
}
