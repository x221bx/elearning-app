import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  Link,
  Grid
} from "@mui/material";

import { grey } from "@mui/material/colors";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import { Container } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material';

import pic1 from "../assets/images/pic1.jpg";
import pic2 from "../assets/images/pic2.jpg";
import pic3 from "../assets/images/pic3.png";
import pic4 from "../assets/images/pic4.png";
import pic5 from "../assets/images/pic5.png";
import pic6 from "../assets/images/pic6.png";
import pic7 from "../assets/images/pic7.png";
import pic9 from "../assets/images/pic9.png";
import pic10 from "../assets/images/pic10.png";
import pic11 from "../assets/images/pic11.png";
import pic12 from "../assets/images/pic12.png";
import pic13 from "../assets/images/pic13.png";
import pic14 from "../assets/images/pic14.png";
import pic15 from "../assets/images/pic15.png";
import pic16 from "../assets/images/pic16.png";
import pic17 from "../assets/images/pic17.png";
import pic18 from "../assets/images/pic18.png";
import pic19 from "../assets/images/pic19.png";

import MediaCard from "../components/common/card";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";


function Home() {
  const navigate = useNavigate();
  return (
    <>

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: (theme) => theme.palette.background.default,
          px: { xs: 3, md: 10 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 5, md: 6 },
            width: "100%",
            maxWidth: "1200px",
            py: { xs: 8, md: 12 },
            px: { xs: 3, md: 6 },
            borderRadius: "20px",
            boxShadow: "0px 8px 30px rgba(0,0,0,0.05)",
            bgcolor: (theme) => theme.palette.background.paper,
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: { xs: "center", md: "flex-start" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 400,
                mb: 1,
                fontSize: { xs: "1.6rem", md: "2.8rem" },
                lineHeight: 1.3,
              }}
            >
              Knowledge connection
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: "1.6rem", md: "2.8rem" },
                lineHeight: 1.2,
                whiteSpace: { xs: "normal", md: "nowrap" },
              }}
            >
              Open the door to the future
            </Typography>

            <Typography
              variant="h6"
              color="text.primary"
              sx={{
                fontSize: { xs: "0.85rem", md: "1rem" },
                mb: 4,
                lineHeight: 1.6,
                maxWidth: { xs: "100%", md: "90%" },
              }}
            >
              Giving every student the opportunity to access the best education
              and open the door to the world of knowledge. Start your learning
              journey today with Edudu to become an outstanding student in our
              learning community.
            </Typography>

            <Button
              variant="contained"
              sx={{
                backgroundColor: (theme) => theme.palette.primary.main,
                color: "text.primary",
                fontWeight: "bold",
                borderRadius: "25px",
                px: 4,
                py: 1.5,
                textTransform: "none",
                fontSize: "0.95rem",
                width: { xs: "100%", md: "fit-content" },
              }}
              onClick={() => navigate("/courses")}
            >
              Get Started
            </Button>
          </Box>

          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <Box
              component="img"
              src={pic2}
              alt="hero"
              sx={{
                width: { xs: "90%", md: "80%" },
                height: "auto",
                borderRadius: "20px",
                boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: (theme) => theme.palette.background.default,
          px: { xs: 3, md: 10 },
          mt: 6,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "900px", textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: "1.4rem", md: "2rem" },
            }}
          >
            Lessons revolve around 4 areas
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "0.85rem", md: "1rem" },
              mb: 4,
              lineHeight: 1.6,
              color: grey[800],
            }}
          >
            Diverse lessons around 4 subjects: Math, literature, English,
            drawing help <br /> children improve their comprehensive knowledge
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {[
              { icon: pic3, label: "Math", width: 120 },
              { icon: pic4, label: "Literature", width: 140 },
              { icon: pic5, label: "English", width: 140 },
              { icon: pic6, label: "Art", width: 120 },
            ].map((btn, index) => (
              <Button
                key={index}
                startIcon={
                  <img
                    src={btn.icon}
                    style={{ width: 50, height: 20 }}
                    alt={btn.label}
                  />
                }
                variant="outlined"
                sx={{
                  height: 55,
                  borderColor: (theme) => theme.palette.divider,
                  bgcolor: (theme) => theme.palette.brand.soft,
                  color: "text.primary",
                  fontWeight: "bold",
                  borderRadius: "25px",
                  width: { xs: "45%", sm: btn.width, md: btn.width },
                  px: 3,
                  py: 1.5,
                  textTransform: "none",
                  fontSize: "0.9rem",
                }}
              >
                {btn.label}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: (theme) => theme.palette.background.default,
          px: { xs: 3, md: 10 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 5, md: 6 },
            width: "100%",
            maxWidth: "1200px",
            py: { xs: 8, md: 12 },
            px: { xs: 3, md: 6 },
            borderRadius: "20px",
            boxShadow: "0px 8px 30px rgba(0,0,0,0.05)",
            bgcolor: (theme) => theme.palette.background.paper,
          }}
        >
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <Box
              component="img"
              src={pic7}
              alt="hero"
              sx={{
                width: { xs: "90%", md: "80%" },
                height: "auto",
                borderRadius: "20px",
                boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
              }}
            />
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: { xs: "center", md: "flex-start" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 600,
                mb: 3,
                fontSize: { xs: "1.6rem", md: "2.8rem" },
                lineHeight: 1.2,
              }}
            >
              What will your child <br /> get after studying at <br /> Edudu?
            </Typography>

            {[
              "Master program knowledge at school",
              "The ability to criticize knowledge increases",
              "Respond confidently when encountering difficult situations",
            ].map((text, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  flexWrap: "wrap",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <DomainVerificationIcon sx={{ width: 24, height: 24, mr: 1 }} />
                <Typography
                  variant="h6"
                  color="text.primary"
                  sx={{
                    fontSize: { xs: "0.85rem", md: "1rem" },
                    mb: 0,
                    lineHeight: 1.6,
                    maxWidth: { xs: "100%", md: "90%" },
                  }}
                >
                  {text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          bgcolor: (theme) => theme.palette.background.default,
          px: { xs: 3, md: 10 },
          pt: { xs: 3, md: 6 },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 600,
            fontSize: { xs: "1.6rem", md: "2.8rem" },
            lineHeight: 1.2,
            mb: 6,
          }}
        >
          Why should you choose Edudu?
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box sx={{ flex: "1 1 300px", maxWidth: "350px" }}>
            <MediaCard
              image={pic9}
              title="Experienced teacher"
              description="Instructors from all over Vietnam and around world providing quality learning experiences helping students develop potential"
            />
          </Box>

          <Box sx={{ flex: "1 1 300px", maxWidth: "350px" }}>
            <MediaCard
              image={pic10}
              title="Creative program"
              description="Flexible payment, suitable to personal financial situation and study schedule. Pay monthly, by course or 'study now, pay later'"
            />
          </Box>

          <Box sx={{ flex: "1 1 300px", maxWidth: "350px" }}>
            <MediaCard
              image={pic11}
              title="Appropriate cost"
              description="Thiết kế giáo trình dựa trên năng lực và nhu cầu từng học viên, hoạt động học tập hấp dẫn, tương tác 2 chiều liên tục."
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          py: 4,
          bgcolor: (theme) => theme.palette.background.paper,
          textAlign: "center",
          px: { xs: 2, md: 10 },
          mt: 2,
        }}
      >










        <Typography variant="h4" fontWeight="bold" gutterBottom>
          What's in the class at <Box component="span" sx={{ color: 'primary.main', fontWeight: 700 }}>Edudu?</Box>
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: "700px", mx: "auto", mb: 1 }}
        >
          Online classes with teachers, continuous questions and answers during
          class if you do not understand. At the end of the session, the lesson
          is recorded for your child to review.
        </Typography>

        <Button
          variant="contained"
          sx={{
            bgcolor: (theme) => theme.palette.primary.main,
            color: "text.primary",
            px: 1,
            py: 1.5,
            fontWeight: "bold",
            borderRadius: "6px",
            mb: -8,
            "&:hover": { bgcolor: (theme) => theme.palette.primary.dark },
          }}
        >
          Free trial lesson
        </Button>

        <Box
          sx={{
            position: "relative",
            maxWidth: 900,
            height: 500,
            mx: "auto",
            mb: 0,
          }}
        >
          <Box
            component="img"
            src={pic12}
            alt="Teacher"
            sx={{
              width: "100%",
            }}
          />
          <Box
            component="img"
            src={pic13}
            alt="Student"
            sx={{
              width: { xs: 150, sm: 200, md: 330 },
              height: "auto",
              borderRadius: "12px",
              position: "absolute",
              bottom: { xs: 5, md: 10 },
              left: { xs: 10, md: 20 },
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
            maxWidth: "900px",
            mx: "auto",
          }}
        >
          <Button
            variant="outlined"
            startIcon={
              <Box
                component="img"
                src={pic14}
                alt="Audio Icon"
                sx={{ width: 28, height: 28, borderRadius: "6px" }}
              />
            }
            sx={{
              borderRadius: "16px",
              px: 3,
              py: 2,
              fontWeight: 500,
              textTransform: "none",
              flex: "1 1 250px",
              boxShadow: 3,
              bgcolor: (theme) => theme.palette.background.paper,
              color: "text.primary",
              "&:hover": {
                bgcolor: (theme) => theme.palette.background.paper,
                borderColor: (theme) => theme.palette.divider,
              },
            }}
          >
            Audio Classes
          </Button>

          <Button
            variant="outlined"
            startIcon={
              <Box
                component="img"
                src={pic15}
                alt="Live Icon"
                sx={{ width: 28, height: 28, borderRadius: "6px" }}
              />
            }
            sx={{
              borderRadius: "16px",
              px: 3,
              py: 2,
              fontWeight: 500,
              textTransform: "none",
              flex: "1 1 250px",
              boxShadow: 3,
              bgcolor: (theme) => theme.palette.background.paper,
              color: "text.primary",
              "&:hover": {
                bgcolor: (theme) => theme.palette.background.paper,
                borderColor: (theme) => theme.palette.divider,
              },
            }}
          >
            Live Classes
          </Button>

          <Button
            variant="outlined"
            startIcon={
              <Box
                component="img"
                src={pic16}
                alt="Recorded Icon"
                sx={{ width: 28, height: 28, borderRadius: "6px" }}
              />
            }
            sx={{
              borderRadius: "16px",
              px: 3,
              py: 2,
              fontWeight: 500,
              textTransform: "none",
              flex: "1 1 250px",
              boxShadow: 3,
              bgcolor: (theme) => theme.palette.background.paper,
              color: "text.primary",
              "&:hover": {
                bgcolor: (theme) => theme.palette.background.paper,
                borderColor: (theme) => theme.palette.divider,
              },
            }}
          >
            Recorded Classes
          </Button>
        </Box>
      </Box>











      {/* section 6 */}
      <Box sx={{ backgroundColor: "rgba(248, 214, 220, 0.56)", py: 1 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" my={6}>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{ mx: "auto", display: "block", width: "fit-content", 'mt': 10 }}
            >
              What do students say about Edudu?
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {[
              {
                name: "Jessica Andrew",
                review: "My child has improved a lot after finishing school. Thank you very much Edudu",
                image: pic17,
              },
              {
                name: "Darlene Robertson",
                review: "My child knows how to write very good essays. English ability is also much better. The cost is very cheap, so you should register. Thank you very much Edudu.",
                image: pic18,
              },
              {
                name: "Dianne Russell",
                review: "My child has improved a lot after finishing school. Thank you very much Edudu",
                image: pic19,
              },
            ].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.name}>
                <Card
                  sx={{
                    maxWidth: 345,
                    margin: "auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.image}
                    title={item.name}
                    sx={{
                      height: { xs: 100, sm: 120, md: 140 },
                      width: { xs: 120, sm: 140, md: 160 },
                      objectFit: "contain",
                      borderRadius: '50%',
                      mx: "auto",
                      mt: 2,
                    }}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
                        textAlign: "center",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Box>
                      <Box display="flex" justifyContent="center" mb={1}>
                        {[...Array(5)].map((_, index) => (
                          <StarIcon key={index} color="warning" />
                        ))}
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                          textAlign: "center",
                          mb: 2
                        }}
                      >
                        {item.review}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>


        </Container>
      </Box>










      {/* section 7 footer */}
      <Box sx={{ backgroundColor: (theme) => theme.palette.background.default, color: 'text.primary', py: 5, mt: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="space-between">

            {/* Social Icons + Trademark */}
            <Grid item xs={12} sm={6} md={2.4}>
              <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, mb: 2 }}>
                <Avatar sx={{ width: 45, height: 45, mr: 1 }} src={pic1} />
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Edudu
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" alignItems={{ xs: "center", md: "flex-start" }}>
                <Box mb={2}>
                  <Link href="#" color="inherit" sx={{ mr: 1 }}>
                    <Facebook />
                  </Link>
                  <Link href="#" color="inherit" sx={{ mr: 1 }}>
                    <Twitter />
                  </Link>
                  <Link href="#" color="inherit">
                    <LinkedIn />
                  </Link>
                </Box>
                <Typography variant="body2" color="inherit">
                  ©2020 Edudu.co
                </Typography>

                <Typography variant="body2" color="inherit">
                  <Box component="span" display="block" >Edudu is a registered  </Box>trademark of Edudu.co
                </Typography>
              </Box>
            </Grid>

            {/* Courses */}
            <Grid item xs={12} sm={6} md={2.4}>
              <Typography variant="h6" gutterBottom>Courses</Typography>
              <Link href="#" color="inherit" display="block" mb={0.8} sx={{ textDecoration: 'none' }}>Classroom courses</Link>
              <Link href="#" color="inherit" display="block" mb={0.8} sx={{ textDecoration: 'none' }}>Virtual classroom courses</Link>
              <Link href="courses" color="inherit" display="block" mb={0.8} sx={{ textDecoration: 'none' }}>E-learning courses</Link>
              <Link href="#" color="inherit" display="block" mb={0.8} sx={{ textDecoration: 'none' }}>Video Courses</Link>
              <Link href="#" color="inherit" display="block" sx={{ textDecoration: 'none' }}>Offline Courses</Link>
            </Grid>

            {/* Community */}
            <Grid item xs={12} sm={6} md={2.4}>
              <Typography variant="h6" gutterBottom>Community</Typography>
              <Link href="#" color="inherit" display="block" mb={0.8} sx={{ textDecoration: 'none' }}>Learners</Link>
              <Link href="#" color="inherit" display="block" mb={0.8} sx={{ textDecoration: 'none' }}>Partners</Link>
              <Link href="#" color="inherit" display="block" mb={0.8} sx={{ textDecoration: 'none' }}>Developers</Link>
              <Link href="#" color="inherit" display="block" mb={0.8} sx={{ textDecoration: 'none' }}>Transactions</Link>
              <Link href="#" color="inherit" display="block" mb={0.8} sx={{ textDecoration: 'none' }}>Blog</Link>
              <Link href="#" color="inherit" display="block" mb={0.8} sx={{ textDecoration: 'none' }}>Teaching Center</Link>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} sm={6} md={2.4}>
              <Typography variant="h6" gutterBottom>Quick links</Typography>
              <Link href="/" color="inherit" display="block" mb={0.8} sx={{ textDecoration: 'none' }}>Home</Link>
              <Link href="#" color="inherit" display="block" mb={0.8} sx={{ textDecoration: 'none' }}>Professional Education</Link>
              <Link href="courses" color="inherit" display="block" mb={0.8} sx={{ textDecoration: 'none' }}>Courses</Link>
              <Link href="#" color="inherit" display="block" mb={0.8} sx={{ textDecoration: 'none' }}>Admissions</Link>
              <Link href="#" color="inherit" display="block" mb={0.8} sx={{ textDecoration: 'none' }}>Testimonial</Link>
              <Link href="#" color="inherit" display="block" mb={0.8} sx={{ textDecoration: 'none' }}>Programs</Link>
            </Grid>

            {/* More */}
            <Grid item xs={12} sm={6} md={2.4}>
              <Typography variant="h6" gutterBottom>More</Typography>
              <Link href="#" color="inherit" display="block" mb={0.8} sx={{ textDecoration: 'none' }}>Press</Link>
              <Link href="#" color="inherit" display="block" mb={0.8} sx={{ textDecoration: 'none' }}>Investors</Link>
              <Link href="#" color="inherit" display="block" mb={0.8} sx={{ textDecoration: 'none' }}>Terms</Link>
              <Link href="#" color="inherit" display="block" mb={0.8} sx={{ textDecoration: 'none' }}>Privacy</Link>
              <Link href="#" color="inherit" display="block" mb={0.8} sx={{ textDecoration: 'none' }}>Help</Link>
            </Grid>

          </Grid>
        </Container>
      </Box>


    </>
  );
}

export default Home;
