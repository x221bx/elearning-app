import * as React from "react";
import { Box, TextField } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import CustomPagination from "../common/customPagination";
import useTeachers from "../../hooks/useTeachers";
import useSearchPagination from "../../hooks/useSearchPagination";
import TeacherCard from "./TeacherCard";

export default function TeacherList() {
  const theme = useTheme();
  const { teachers } = useTeachers();
  const [q, setQ] = React.useState("");
  const surface = theme.palette.mode === "dark"
    ? alpha(theme.palette.secondary.dark, 0.24)
    : alpha(theme.palette.secondary.light, 0.28);

  const { page, setPage, pageCount, paginated, total } = useSearchPagination(teachers, {
    perPage: 8,
    query: q,
    keys: ["name", "subject"],
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
          label="Search teachers"
          size="small"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Type a name or subject…"
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
        {paginated.map((t) => (
          <TeacherCard
            key={t.id}
            id={t.id}
            name={t.name}
            subject={t.subject}
            rating={t.rating}
            image={t.image}
            description={t.bio || t.description}
          />
        ))}
      </Box>

      {!total && (
        <Box sx={{ textAlign: "center", color: "text.secondary", mt: 4 }}>
          No teachers found.
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
