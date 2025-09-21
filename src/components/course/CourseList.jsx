import * as React from "react";
import { Box, TextField } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import CustomPagination from "../common/customPagination";
import useCourses from "../../hooks/useCourses";
import useSearchPagination from "../../hooks/useSearchPagination";
import CourseCard from "./CourseCard";

export default function CourseList() {
  const theme = useTheme();
  const { courses } = useCourses();
  const [q, setQ] = React.useState("");
  const surface = theme.palette.mode === "dark"
    ? alpha(theme.palette.secondary.dark, 0.24)
    : alpha(theme.palette.secondary.light, 0.28);

  const { page, setPage, pageCount, paginated, total } = useSearchPagination(courses, {
    perPage: 8,
    query: q,
    keys: ["title", "category"],
  });

  return (
    <Box
      sx={{
        backgroundColor: surface,
        borderRadius: 3,
        p: { xs: 2.5, md: 3.5 },
        border: `1px solid ${alpha(theme.palette.secondary.main, 0.18)}`,
        boxShadow: theme.customShadows?.card,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <TextField
          label="Search courses"
          size="small"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Type a title or category…"
          sx={{
            width: { xs: "100%", sm: 420 },
            bgcolor: theme.palette.background.paper,
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
            },
          }}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 3,
        }}
      >
        {paginated.map((c) => (
          <CourseCard key={c.id} {...c} />
        ))}
      </Box>

      {!total && (
        <Box sx={{ textAlign: "center", color: "text.secondary", mt: 4 }}>
          No courses found.
        </Box>
      )}

      {total > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CustomPagination
            count={pageCount}
            page={page}
            onChange={(_, p) => setPage(p)}
            colorHex={theme.palette.secondary.main}
            hoverHex={theme.palette.secondary.dark}
          />
        </Box>
      )}
    </Box>
  );
}
