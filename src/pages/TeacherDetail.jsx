import React, { useMemo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box, Card, CardContent, CardMedia, Avatar,
  Typography, Divider, Stack, IconButton, Chip
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTheme, alpha } from "@mui/material/styles";
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
      <Typography variant="h6" fontWeight={900} color="text.primary" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">{children}</Typography>
    </Box>
  );
}

export default function TeacherDetail() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { id } = useParams();
  const { teachers } = useTeachers();
  const { courses, seed } = useCourses();

  useEffect(() => {
    seed();
  }, [seed]);

  const teacher = useMemo(
    () => teachers.find((t) => String(t.id) === String(id)),
    [teachers, id]
  );

  const teacherId = teacher?.id;
  const allCourses = useMemo(() =>
    teacherId
      ? courses.filter((c) => String(c.teacherId) === String(teacherId))
      : [],
  [courses, teacherId]);

  const [page, setPage] = useState(1);

  if (!teacher) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6">Teacher not found</Typography>
      </Box>
    );
  }

  const languages = Array.isArray(teacher.languages) && teacher.languages.length
    ? teacher.languages
    : ["Arabic", "English"];
  const aboutText = teacher.about || teacher.description || teacher.bio || "No bio.";
  const certText = teacher.certification || teacher.cert || "No certification info.";
  const rating = Math.max(0, Math.min(5, Number(teacher.rating || 0)));
  const perPage = 4;
  const pageCount = Math.max(1, Math.ceil(allCourses.length / perPage));
  const paginated = allCourses.slice((page - 1) * perPage, page * perPage);

  const heroGradient = isDark
    ? alpha(theme.palette.secondary.dark, 0.3)
    : alpha(theme.palette.secondary.light, 0.32);
  const accentBorder = theme.palette.secondary.main;
  const chipBg = alpha(theme.palette.secondary.main, 0.12);
  const chipBorder = alpha(theme.palette.secondary.main, 0.24);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 6,
        backgroundImage: `linear-gradient(180deg, ${heroGradient} 0%, ${theme.palette.background.default} 70%)`,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 4 } }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderRadius: 3,
                borderTop: `4px solid ${accentBorder}`,
                position: { md: "sticky" },
                top: { md: 96 },
                boxShadow: theme.customShadows?.card,
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <Avatar
                    src={teacher.image || teacherPlaceholder}
                    alt={teacher.name}
                    onError={(e) => { e.currentTarget.src = teacherPlaceholder; }}
                    sx={{ width: 120, height: 120, border: `3px solid ${alpha(accentBorder, 0.35)}` }}
                  />
                  <Typography variant="h6" fontWeight={900}>{teacher.name}</Typography>

                  <Divider sx={{ width: "100%", my: 1.5 }} />

                  <Stack spacing={1.25} sx={{ width: "100%" }}>
                    <Row label="Total Courses" value={allCourses.length} />
                    <Row label="Rating" value={`${rating.toFixed(1)}${teacher.ratingsCount ? ` (${teacher.ratingsCount})` : ""}`} />
                    <Row label="Experience" value={`${teacher.experience || teacher.experienceYears || 0} Years`} />
                    <Row label="Language" value={languages.join(", ")} />
                  </Stack>

                  <Divider sx={{ width: "100%", my: 2 }} />

                  <Stack direction="row" spacing={1}>
                    {[teacher.socials?.facebook, teacher.socials?.instagram, teacher.socials?.twitter, teacher.socials?.linkedin, teacher.socials?.youtube]
                      .map((href, idx) => {
                        const Icon = [Facebook, Instagram, Twitter, LinkedIn, YouTube][idx];
                        return (
                          <IconButton
                            key={Icon.displayName || idx}
                            component="a"
                            href={href || "#"}
                            target="_blank"
                            rel="noopener"
                            sx={{
                              color: theme.palette.secondary.main,
                              border: `1px solid ${alpha(theme.palette.secondary.main, 0.25)}`,
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                              },
                            }}
                          >
                            <Icon fontSize="small" />
                          </IconButton>
                        );
                      })}
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 3, borderTop: `4px solid ${accentBorder}`, mb: 3 }}>
              <CardContent>
                <Section title={`About ${teacher.name.split(" ")[0]}`}>{aboutText}</Section>
                <Box sx={{ mt: 1.5, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {teacher.subject && (
                    <Chip
                      size="small"
                      label={teacher.subject}
                      sx={{
                        bgcolor: chipBg,
                        border: `1px solid ${chipBorder}`,
                        color: theme.palette.text.primary,
                      }}
                    />
                  )}
                  {languages.map((lng) => (
                    <Chip
                      key={lng}
                      size="small"
                      label={lng}
                      sx={{ bgcolor: chipBg, border: `1px solid ${chipBorder}`, color: theme.palette.text.primary }}
                    />
                  ))}
                </Box>
                <Section title="Certification" sx={{ mt: 3 }}>{certText}</Section>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 3, boxShadow: theme.customShadows?.card }}>
              <CardContent>
                <Typography variant="h6" fontWeight={900} color="text.primary" sx={{ mb: 2 }}>
                  Courses ({allCourses.length})
                </Typography>

                <Box sx={{ display: 'grid', gap: 2 }}>
                  {paginated.map((c) => (
                    <Card
                      key={c.id}
                      variant="outlined"
                      component={Link}
                      to={`/courses/${c.id}`}
                      sx={{
                        borderRadius: 2,
                        borderLeft: `4px solid ${accentBorder}`,
                        color: 'inherit',
                        textDecoration: 'none',
                        '&:hover': {
                          borderColor: accentBorder,
                          backgroundColor: alpha(theme.palette.secondary.main, 0.08),
                        },
                      }}
                    >
                      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '220px 1fr' } }}>
                        <CardMedia
                          component="img"
                          image={c.image}
                          alt={c.title}
                          sx={{ height: { xs: 140, sm: '100%' }, objectFit: 'cover' }}
                          onError={(e) => { e.currentTarget.src = 'https://picsum.photos/seed/course/600/400'; }}
                        />
                        <CardContent sx={{ py: 2 }}>
                          <Typography variant="subtitle1" fontWeight={900}>{c.title}</Typography>
                          {!!c.category && (
                            <Chip
                              size="small"
                              label={c.category}
                              sx={{ bgcolor: chipBg, border: `1px solid ${chipBorder}`, mt: 0.5 }}
                            />
                          )}
                          {!!c.description && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                              {c.description}
                            </Typography>
                          )}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                            {typeof c.price === 'number' && (
                              <Typography variant="subtitle1" fontWeight={900} color="warning.main">
                                ${c.price}
                              </Typography>
                            )}
                            {c.oldPrice != null && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ textDecoration: 'line-through' }}
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
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <CustomPagination
                      count={pageCount}
                      page={page}
                      onChange={(_, p) => setPage(p)}
                      colorHex={theme.palette.secondary.main}
                      hoverHex={theme.palette.secondary.dark}
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
