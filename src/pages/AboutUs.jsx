import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

import huda from "../assets/images/huda.png";
import youshia from "../assets/images/youshia.png";
import ahmed from "../assets/images/ahmed.png";
import nada from "../assets/images/nada.png";


const teamMembers = [
  {
    id: 1,
    name: "Youshia Zakaria",
    image: youshia,
    bio: `My Contribution to the Project

I contributed to building and designing the Courses page, implementing filters, pagination, and interactive effects to match the required design. I also created the How to Use page, worked on improving the overall website styling, and integrated the code with GitHub for team collaboration.

Some tasks were done individually, while others were completed in collaboration with the team.

Tools & Technologies Used

Languages: JavaScript (React.js), HTML5, CSS3

Libraries: Material UI (MUI), React Router, Axios

Tools: GitHub (collaboration & version control), Vite (bundler), ESLint`,
  },
  {
    id: 2,
    name: "Hoda Shaarawy",
    image: huda,
    bio: `In my recent E-learning Project, I worked on:

Home Page & About Us Page with responsive design.

Navbar & Footer for smooth navigation.

Dark/Light Mode using Redux Toolkit.

Login & Register functionality, with data saved in local storage for persistent authentication.

Reusable MediaCards for displaying courses and teachers.

T`,
  },
  {
    id: 3,
    name: "Ahmed Zein",
    image: ahmed,
    bio: `control pages for admins to manage the system with ease, and detailed teacher profiles to help students and parents connect with the right educators.`
  },
  {
    id: 4,
    name: "Nada Alnashar",
    image: nada,
    bio: `I developed two key pages for an e-learning project using React: a Cart page and a Favorite Courses page. I built the user interface with Material-UI, implementing responsive layouts and reusable components. I also used Redux Toolkit to manage global state, handle adding/removing courses, and synchronize data between both pages for a smooth user experience.`,
  },
];

function AboutUs() {
  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleOpen = (member) => {
    setSelectedMember(member);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMember(null);
  };

  return (
    <Container sx={{ py: 6, textAlign: "center" }}>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        navigation
        modules={[EffectCoverflow, Pagination, Navigation]}
        style={{ width: "100%", paddingBottom: "40px" }}
      >
        {teamMembers.map((member) => (
          <SwiperSlide key={member.id}>
            <Card
              sx={{
                width: 280,
                borderRadius: 4,
                height: 400,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                boxShadow: "0px 6px 18px rgba(0,0,0,0.15)",
                p: 2,
              }}
              onClick={() => handleOpen(member)}
            >
              <CardMedia
                component="img"
                image={
                  member.image || "https://mui.com/static/images/avatar/1.jpg"
                }
                alt={member.name}
                sx={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: (theme) => `5px solid ${alpha(theme.palette.primary.main, 0.25)}`,
                  mt: 2,
                }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ fontWeight: "bold" }}
                >
                  {member.name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  align="center"
                  sx={{ color: "text.secondary" }}
                >
                  {member.role}
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
          }}
        >
          {selectedMember?.name}
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
              alignItems: "flex-start",
            }}
          >

            <Box sx={{ flex: "0 0 280px" }}>
              <img
                src={
                  selectedMember?.image ||
                  "https://mui.com/static/images/avatar/1.jpg"
                }
                alt={selectedMember?.name}
                style={{
                  width: "100%",
                  maxWidth: "280px",
                  borderRadius: "16px",
                }}
              />
            </Box>


            <Box sx={{ flex: 1, textAlign: "left" }}>
              <Typography variant="h6" gutterBottom>
                {selectedMember?.role}
              </Typography>
              <Typography sx={{ mt: 2 }}>{selectedMember?.bio}</Typography>

            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default AboutUs;
