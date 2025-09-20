import React from 'react';
import { Box, Typography, Stack, Grid, Card, CardContent, Button, Avatar, List, ListItem, ListItemIcon, ListItemText, Fab } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { motion } from 'framer-motion';

const STRINGS = {
  heroTitle: 'How to use Kids Courses',
  heroSubtitle: 'A fun, safe, and easy way to start learning! Let’s see how it works.',
  steps: [
    {
      icon: <PersonAddIcon fontSize="large" sx={{ color: 'primary.main' }} />, title: 'Create Account',
      desc: 'Sign up with your parent or guardian to get started.'
    },
    {
      icon: <LoginIcon fontSize="large" sx={{ color: 'primary.main' }} />, title: 'Sign In',
      desc: 'Log in securely to your new account.'
    },
    {
      icon: <MenuBookIcon fontSize="large" sx={{ color: 'primary.main' }} />, title: 'Explore Courses',
      desc: 'Browse fun courses by category and level.'
    },
    {
      icon: <SchoolIcon fontSize="large" sx={{ color: 'primary.main' }} />, title: 'View Teachers',
      desc: 'Meet friendly teachers and see their ratings.'
    },
    {
      icon: <FavoriteIcon fontSize="large" sx={{ color: 'secondary.main' }} />, title: 'Wishlist & Cart',
      desc: 'Add courses to your wishlist or cart for later.'
    },
    {
      icon: <ShoppingCartCheckoutIcon fontSize="large" sx={{ color: 'secondary.main' }} />, title: 'Enroll & Learn',
      desc: 'Enroll and start your learning adventure!'
    },
  ],
  features: [
    {
      icon: <SearchIcon fontSize="large" />, title: 'Search courses',
      desc: 'Find the perfect course for you.'
    },
    {
      icon: <FilterAltIcon fontSize="large" />, title: 'Filter by age/level',
      desc: 'See courses just right for your age.'
    },
    {
      icon: <TrackChangesIcon fontSize="large" />, title: 'Track your progress',
      desc: 'See how much you’ve learned!'
    },
    {
      icon: <QuestionAnswerIcon fontSize="large" />, title: 'Ask your teacher',
      desc: 'Get help from your teacher anytime.'
    },
  ],
  tipsTitle: 'Tips for Kids & Parents',
  tips: [
    'Always ask a parent or guardian before signing up.',
    'Keep your password safe and private.',
    'Be kind and respectful to teachers and classmates.',
    'If you need help, ask your teacher or a grown-up.',
    'Have fun and enjoy learning!'
  ],
  ctaTitle: 'Ready to start?',
  ctaCourses: 'Go to Courses',
  ctaTeachers: 'Meet the Teachers',
};

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const arrowVariant = {
  animate: { y: [0, 10, 0], transition: { duration: 0.5, repeat: Infinity } },
};

const cardVariant = {
  rest: { scale: 1, boxShadow: 1 },
  hover: { scale: 1.06, boxShadow: 6, transition: { duration: 0.2 } },
};

const HowToUse = () => {
  const theme = useTheme();
  const [showFab, setShowFab] = React.useState(false);
  const handleScroll = () => {
    setShowFab(window.scrollY > 300);
  };
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  
  const shapes = [
    { top: 30, left: 20, size: 36, color: theme.palette.secondary.light, rotate: 8 },
    { top: 80, right: 40, size: 28, color: theme.palette.primary.light, rotate: -12 },
    { bottom: 40, left: 60, size: 24, color: theme.palette.warning.light, rotate: 16 },
    { bottom: 20, right: 30, size: 32, color: theme.palette.info.light, rotate: -6 },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: theme.palette.warning[50] || '#FFFDE7', pb: 6 }}>
   
      <Box data-testid="howto-hero" sx={{ position: 'relative', py: { xs: 5, md: 8 }, textAlign: 'center', overflow: 'hidden' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant}>
          <Typography variant="h2" sx={{ fontWeight: 700, color: theme.palette.primary.main, mb: 2, fontFamily: 'Comic Sans MS, Comic Sans, cursive', letterSpacing: 1 }}>
            {STRINGS.heroTitle}
          </Typography>
          <Typography variant="h6" sx={{ color: theme.palette.info.dark, mb: 3, maxWidth: 500, mx: 'auto' }}>
            {STRINGS.heroSubtitle}
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
            <Avatar sx={{ bgcolor: theme.palette.warning.main, width: 56, height: 56 }} aria-label="Sign Up">
              <PersonAddIcon fontSize="large" />
            </Avatar>
            <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 56, height: 56 }} aria-label="Explore Courses">
              <MenuBookIcon fontSize="large" />
            </Avatar>
            <Avatar sx={{ bgcolor: theme.palette.secondary.main, width: 56, height: 56 }} aria-label="Wishlist">
              <FavoriteIcon fontSize="large" />
            </Avatar>
          </Stack>
        </motion.div>
       
        {shapes.map((shape, i) => (
          <motion.div
            key={i}
            initial={{ rotate: 0 }}
            animate={{ rotate: shape.rotate }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            style={{
              position: 'absolute',
              ...('top' in shape ? { top: shape.top } : { bottom: shape.bottom }),
              ...('left' in shape ? { left: shape.left } : { right: shape.right }),
              width: shape.size,
              height: shape.size,
              borderRadius: '50%',
              background: shape.color,
              opacity: 0.25,
              zIndex: 0,
            }}
            aria-hidden="true"
          />
        ))}
      </Box>

    
      <Box data-testid="howto-timeline" sx={{ maxWidth: 700, mx: 'auto', py: { xs: 3, md: 5 } }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant}>
          <Typography variant="h4" sx={{ color: theme.palette.primary.dark, fontWeight: 600, mb: 3, textAlign: 'center', position: 'relative', display: 'inline-block', px: 2 }}>
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                left: 0,
                bottom: -4,
                height: 4,
                background: theme.palette.warning.main,
                borderRadius: 2,
                zIndex: -1,
              }}
            />
            Step-by-step Guide
          </Typography>
          <Stack spacing={0} alignItems="center" sx={{ mt: 2 }}>
            {STRINGS.steps.map((step, idx) => (
              <React.Fragment key={step.title}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={sectionVariant}
                  style={{ width: '100%' }}
                >
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1, bgcolor: idx % 2 === 0 ? theme.palette.primary[50] : theme.palette.warning[50], borderRadius: 3, px: 3, py: 2, boxShadow: 1, width: { xs: '100%', sm: 500 } }}>
                    <Box aria-hidden="true">{step.icon}</Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>{step.title}</Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>{step.desc}</Typography>
                    </Box>
                  </Stack>
                </motion.div>
                {idx < STRINGS.steps.length - 1 && (
                  <motion.div variants={arrowVariant} animate="animate" style={{ margin: 0 }}>
                    <ArrowDownwardIcon sx={{ color: theme.palette.info.main, fontSize: 32 }} aria-label="Next step" />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </Stack>
        </motion.div>
      </Box>

   
      <Box data-testid="howto-features" sx={{ maxWidth: 1100, mx: 'auto', py: { xs: 3, md: 5 } }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant}>
          <Typography variant="h4" sx={{ color: theme.palette.primary.dark, fontWeight: 600, mb: 3, textAlign: 'center', position: 'relative', display: 'inline-block', px: 2 }}>
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                left: 0,
                bottom: -4,
                height: 4,
                background: theme.palette.primary.main,
                borderRadius: 2,
                zIndex: -1,
              }}
            />
            Features for You
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {STRINGS.features.map((feature, idx) => (
              <Grid item xs={12} sm={6} md={3} key={feature.title}>
                <motion.div
                  variants={cardVariant}
                  initial="rest"
                  whileHover="hover"
                  whileTap="hover"
                  style={{ height: '100%' }}
                >
                  <Card sx={{ bgcolor: idx % 2 === 0 ? theme.palette.warning.light : theme.palette.primary.light, borderRadius: 4, boxShadow: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'box-shadow 0.2s' }}>
                    <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 48, height: 48, mb: 1, mx: 'auto' }} aria-label={feature.title}>
                        {feature.icon}
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.dark }}>{feature.title}</Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>{feature.desc}</Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>

    
      <Box data-testid="howto-tips" sx={{ maxWidth: 700, mx: 'auto', py: { xs: 3, md: 5 } }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant}>
          <Typography variant="h4" sx={{ color: theme.palette.secondary.dark, fontWeight: 600, mb: 2, textAlign: 'center', position: 'relative', display: 'inline-block', px: 2 }}>
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                left: 0,
                bottom: -4,
                height: 4,
                background: theme.palette.secondary.main,
                borderRadius: 2,
                zIndex: -1,
              }}
            />
            {STRINGS.tipsTitle}
          </Typography>
          <List>
            {STRINGS.tips.map((tip, idx) => (
              <ListItem key={idx} sx={{ pl: 0 }}>
                <ListItemIcon>
                  <CheckCircleIcon sx={{ color: theme.palette.success.main }} aria-label="Tip" />
                </ListItemIcon>
                <ListItemText primary={tip} primaryTypographyProps={{ fontSize: 16 }} />
              </ListItem>
            ))}
          </List>
        </motion.div>
      </Box>


      <Box data-testid="howto-cta" sx={{ textAlign: 'center', py: 4, bgcolor: theme.palette.primary[50], borderRadius: 4, maxWidth: 700, mx: 'auto', boxShadow: 1 }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionVariant}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.primary.main, mb: 2 }}>{STRINGS.ctaTitle}</Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button variant="contained" color="warning" size="large" href="/courses" sx={{ borderRadius: 3, fontWeight: 600 }}>
              {STRINGS.ctaCourses}
            </Button>
            <Button variant="outlined" color="primary" size="large" href="/teachers" sx={{ borderRadius: 3, fontWeight: 600 }}>
              {STRINGS.ctaTeachers}
            </Button>
          </Stack>
        </motion.div>
      </Box>

   
      {showFab && (
        <Fab
          color="primary"
          size="medium"
          aria-label="Back to top"
          onClick={scrollToTop}
          sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1200, boxShadow: 4 }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}
    </Box>
  );
};

export default HowToUse;
