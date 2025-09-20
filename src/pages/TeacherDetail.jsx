// src/pages/TeacherDetail.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box, Card, CardContent, CardMedia, Avatar,
  Typography, Divider, Stack, IconButton, Chip
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Facebook, YouTube, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import useTeachers from "../hooks/useTeachers";
import useCourses from "../hooks/useCourses";
import CustomPagination from "../components/common/customPagination";

import teacherPlaceholder from "../assets/images/teacher-placeholder.png";

function Row({ label, value }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="body2" fontWeight={700}>{value}</Typography>
    </Box>
  );
}

function Section({ title, children, sx }) {
  return (
    <Box sx={sx}>
      <Typography variant="h6" fontWeight={900} sx={{ mb: 1, color: "#5e3b76" }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">{children}</Typography>
    </Box>
  );
}

export default function TeacherDetail() {
  const { id } = useParams();
  const { teachers } = useTeachers();
  const { courses, seed } = useCourses();

  // Seed courses on component mount
  useEffect(() => {
    seed();
  }, [seed]);

  const teacher = useMemo(
    () => teachers.find((t) => String(t.id) === String(id)),
    [teachers, id]
  );

  if (!teacher) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6">Teacher not found</Typography>
      </Box>
    );
  }

  const allCourses = useMemo(
    () => courses.filter((c) => String(c.teacherId) === String(teacher.id)),
    [courses, teacher.id]
  );

  const languages = Array.isArray(teacher.languages) && teacher.languages.length
    ? teacher.languages
    : ["Arabic", "English"];
  const aboutText = teacher.about || teacher.description || teacher.bio || "No bio.";
  const certText = teacher.certification || teacher.cert || "No certification info.";
  const rating = Math.max(0, Math.min(5, Number(teacher.rating || 0)));

  const [page, setPage] = useState(1);
  const perPage = 4;
  const pageCount = Math.max(1, Math.ceil(allCourses.length / perPage));
  const paginated = allCourses.slice((page - 1) * perPage, page * perPage);

  return (
    <Box sx={{ backgroundColor: "#FFFDF2", minHeight: "100vh", py: 4 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 4 } }}>
        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ borderRadius: 3, borderTop: "4px solid #FBC02D", position: { md: "sticky" }, top: { md: 96 } }}>
              <CardContent>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <Avatar
                    src={teacher.image || teacherPlaceholder}
                    alt={teacher.name}
                    onError={(e) => { e.currentTarget.src = teacherPlaceholder; }}
                    sx={{ width: 120, height: 120, border: "3px solid #FFEEAD" }}
                  />
                  <Typography variant="h6" fontWeight={900}>{teacher.name}</Typography>

                  <Divider sx={{ width: "100%", my: 1 }} />

                  <Stack spacing={1} sx={{ width: "100%" }}>
                    <Row label="Total Courses" value={allCourses.length} />
                    <Row label="Rating" value={`${rating.toFixed(1)}${teacher.ratingsCount ? ` (${teacher.ratingsCount})` : ""}`} />
                    <Row label="Experience" value={`${teacher.experience || teacher.experienceYears || 0} Years`} />
                    <Row label="Language" value={languages.join(", ")} />
                  </Stack>

                  <Divider sx={{ width: "100%", my: 2 }} />

                  <Stack direction="row" spacing={1}>
                    <IconButton component="a" href={teacher.socials?.facebook || "#"} target="_blank" rel="noopener" sx={{ color: "#F9A825" }}><Facebook /></IconButton>
                    <IconButton component="a" href={teacher.socials?.instagram || "#"} target="_blank" rel="noopener" sx={{ color: "#F9A825" }}><Instagram /></IconButton>
                    <IconButton component="a" href={teacher.socials?.twitter || "#"} target="_blank" rel="noopener" sx={{ color: "#F9A825" }}><Twitter /></IconButton>
                    <IconButton component="a" href={teacher.socials?.linkedin || "#"} target="_blank" rel="noopener" sx={{ color: "#F9A825" }}><LinkedIn /></IconButton>
                    <IconButton component="a" href={teacher.socials?.youtube || "#"} target="_blank" rel="noopener" sx={{ color: "#F9A825" }}><YouTube /></IconButton>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Main Content */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ borderRadius: 3, borderTop: "4px solid #FBC02D", mb: 3 }}>
              <CardContent>
                <Section title={`About ${teacher.name.split(" ")[0]}`}>{aboutText}</Section>
                <Box sx={{ mt: 1.5, display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {teacher.subject && (
                    <Chip size="small" label={teacher.subject} sx={{ bgcolor: "#FFF3CD", border: "1px solid #F9E0A7" }} />
                  )}
                  {languages.map((lng) => (
                    <Chip key={lng} size="small" label={lng} sx={{ bgcolor: "#FFF9F0", border: "1px solid #FFE7AA" }} />
                  ))}
                </Box>
                <Section title="Certification" sx={{ mt: 3 }}>{certText}</Section>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={900} sx={{ mb: 2, color: "#5e3b76" }}>
                  Courses ({allCourses.length})
                </Typography>

                <Box sx={{ display: "grid", gap: 2 }}>
                  {paginated.map((c) => (
                    <Card
                      key={c.id}
                      variant="outlined"
                      component={Link}
                      to={`/courses/${c.id}`}
                      sx={{ borderRadius: 2, borderLeft: "4px solid #FBC02D" }}
                    >
                      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "220px 1fr" } }}>
                        <CardMedia
                          component="img"
                          image={c.image}
                          alt={c.title}
                          sx={{ height: { xs: 140, sm: "100%" }, objectFit: "cover" }}
                          onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/course/600/400"; }}
                        />
                        <CardContent sx={{ py: 2 }}>
                          <Typography variant="subtitle1" fontWeight={900}>{c.title}</Typography>
                          {!!c.category && (
                            <Chip size="small" label={c.category} sx={{ bgcolor: "#FFF3CD", border: "1px solid #F9E0A7", mr: 1, mt: .5 }} />
                          )}
                          {!!c.description && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                              {c.description}
                            </Typography>
                          )}
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                            {typeof c.price === "number" && (
                              <Typography variant="subtitle1" fontWeight={900} sx={{ color: "#F57C00" }}>
                                ${c.price}
                              </Typography>
                            )}
                            {c.oldPrice != null && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ textDecoration: "line-through" }}
                              >
                                ${c.oldPrice}
                              </Typography>
                            )}
                          </Box>
                        </CardContent>
                      </Box>
                    </Card>
                  ))}
                  {!paginated.length && (
                    <Typography variant="body2" color="text.secondary">No courses for this teacher.</Typography>
                  )}
                </Box>

                {pageCount > 1 && (
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <CustomPagination
                      count={pageCount}
                      page={page}
                      onChange={(_, p) => setPage(p)}
                      colorHex="#FBC02D"
                      hoverHex="#F9A825"
                    />
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
