import React, { useMemo, useEffect } from "react";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
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
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import useCourses from "../hooks/useCourses";

export default function CourseDetail() {
  const { id } = useParams();
  const { courses, seed } = useCourses();
  const theme = useTheme();
  const navigate = useNavigate();

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

  // Tiny i18n helper based on saved lang
  const lang = (localStorage.getItem('lang') || 'en').toLowerCase();
  const t = (key) => {
    const map = {
      about: { en: "About this course", ar: "حول هذا الكورس" },
      learn: { en: "What you'll learn", ar: "ماذا ستتعلم" },
      outline: { en: "Course Outline", ar: "مخطط الدورة" },
      courses: { en: "Courses", ar: "الدورات" },
    };
    return (map[key] && (map[key][lang] || map[key].en)) || key;
  };

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: "100vh", pb: 8 }}>
      <Box sx={(t) => t.mixins.toolbar} />
      <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, pt: 3 }}>

      <Card sx={{ borderRadius: 3, overflow: "hidden", mb: 3, boxShadow: theme.shadows[6] }}>
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

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <MuiLink component={RouterLink} to="/courses" underline="hover" color="text.secondary" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
          <ArrowBackIcon fontSize="small" /> {t('courses')}
        </MuiLink>
      </Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2, color: 'text.secondary' }}>
        <MuiLink component={RouterLink} underline="hover" color="text.secondary" to="/courses">
          {t('courses')}
        </MuiLink>
        <Typography color="text.primary">{course.title}</Typography>
      </Breadcrumbs>


      <Typography variant="h4" fontWeight={800} sx={{ color: 'text.primary', mb: 0.5 }}>{course.title}</Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
        Lessons: {course.lessonsCount || 0} | Rating: ⭐ {course.rating}
      </Typography>
      <Typography variant="h5" fontWeight={900} sx={{ color: 'primary.main', mb: 3 }}>${course.price}</Typography>


      <Card sx={{ borderRadius: 3, boxShadow: 2, mb: 3, backgroundColor: theme.palette.background.paper }}>
        <CardContent>
          <Typography variant="h6" fontWeight={800} sx={{ mb: 1.25 }}>{t('about')}</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9 }}>
            {course.description}
          </Typography>
        </CardContent>
      </Card>


      <Card sx={{ borderRadius: 3, boxShadow: 2, mb: 3, backgroundColor: theme.palette.background.paper }}>
        <CardContent>
          <Typography variant="h6" fontWeight={800} sx={{ mb: 1.25 }}>{t('learn')}</Typography>
          <List sx={{ pl: 1 }}>
            {course.whatYoullLearn?.map((item, idx) => (
              <ListItem
                key={idx}
                sx={{
                  pl: 0.5,
                  "&:hover": { bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.08), borderRadius: 2 },
                }}
              >
                <MenuBookIcon fontSize="small" style={{ marginRight: 8 }} />
                <ListItemText primary={item} primaryTypographyProps={{ sx: { lineHeight: 1.8 } }} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 3, boxShadow: 2, backgroundColor: theme.palette.background.paper }}>
        <CardContent>
          <Typography variant="h6" fontWeight={800} sx={{ mb: 1.25 }}>{t('outline')}</Typography>
          {course.courseOutline?.map((module, idx) => (
            <Card key={idx} variant="outlined" sx={{ mb: 1.5, borderRadius: 2 }}>
              <CardContent sx={{ py: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Chip label={module.title} color="primary" size="small" sx={{ fontWeight: 700 }} />
                </Box>
                <List dense>
                  {module.lessons.map((lesson, i) => (
                    <ListItem key={i} sx={{ pl: 0.5, '&:hover': { bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.08), borderRadius: 2 } }}>
                      <PlayArrowIcon fontSize="small" style={{ marginRight: 6 }} />
                      <ListItemText primary={lesson} primaryTypographyProps={{ sx: { lineHeight: 1.8 } }} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
      </Box>
    </Box>
  );
}
