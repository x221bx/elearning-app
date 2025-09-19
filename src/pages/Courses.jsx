
import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Chip,
} from "@mui/material";
import { courses } from "../api/courses";
import CustomPagination from "../components/common/customPagination";
import CourseCard from "../components/course/CourseCard";

export default function Courses() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const perPage = 8;


  const categories = useMemo(() => {
    const cats = ["All", ...new Set(courses.map((c) => c.category))];
    return cats;
  }, []);


  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || c.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const pageCount = Math.max(1, Math.ceil(filteredCourses.length / perPage));
  const paginated = filteredCourses.slice((page - 1) * perPage, page * perPage);

  return (
    <Box
      sx={{
        backgroundColor: "#fdf7ff",
        minHeight: "100vh",
        py: 8,
        px: { xs: 2, sm: 4, md: 6 },
      }}
    >

      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        sx={{ mb: 2, color: "#5e3b76" }}
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
          gap: 2,
          mb: 5,
          flexWrap: "wrap",
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
            bgcolor: "#fff",
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
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
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => {
                setCategory(cat);
                setPage(1);
              }}
              color={category === cat ? "secondary" : "default"}
              sx={{
                borderRadius: "16px",
                bgcolor: category === cat ? "#ba68c8" : "#f1f1f1",
                color: category === cat ? "#fff" : "black",
                "&:hover": {
                  bgcolor: category === cat ? "#ab47bc" : "#e0e0e0",
                },
              }}
            />
          ))}
        </Box>
      </Box>


      <Grid
        container
        spacing={3}
        justifyContent="center"
      >
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
          colorHex="#ba68c8"
          hoverHex="#ab47bc"
        />
      </Box>
    </Box>
  );
}
