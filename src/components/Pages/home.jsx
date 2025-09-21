// import React from "react";
// import { Box, Typography, Button } from "@mui/material";
// import pic2 from "../assets/pic2.jpg";
// import { grey } from "@mui/material/colors";
// import pic3 from "../assets/pic3.png";
// import pic4 from "../assets/pic4.png";
// import pic5 from "../assets/pic5.png";
// import pic6 from "../assets/pic6.png";
// import pic7 from "../assets/pic7.png";
// import pic9 from "../assets/pic9.png";
// import pic10 from "../assets/pic10.png";
// import pic11 from "../assets/pic11.png";
// import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
// import MediaCard from "../Components/Card";
//
// function Home() {
//   return (
//     <>
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           bgcolor: "var(--bg-color)",
//           px: { xs: 3, md: 10 },
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column-reverse", md: "row" },
//             alignItems: "center",
//             justifyContent: "space-between",
//             gap: { xs: 5, md: 6 },
//             width: "100%",
//             maxWidth: "1200px",
//             py: { xs: 8, md: 12 },
//             px: { xs: 3, md: 6 },
//             borderRadius: "20px",
//             boxShadow: "var(--card-shadow)",
//             bgcolor: "var(--card-bg)",
//           }}
//         >
//           <Box
//             sx={{
//               flex: 1,
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: { xs: "center", md: "flex-start" },
//               textAlign: { xs: "center", md: "left" },
//             }}
//           >
//             <Typography
//               variant="h3"
//               sx={{
//                 fontWeight: 400,
//                 mb: 1,
//                 fontSize: { xs: "1.6rem", md: "2.8rem" },
//                 lineHeight: 1.3,
//                 color: "var(--text-color)",
//               }}
//             >
//               Knowledge connection
//             </Typography>
//
//             <Typography
//               variant="h3"
//               sx={{
//                 fontWeight: 700,
//                 mb: 3,
//                 fontSize: { xs: "1.6rem", md: "2.8rem" },
//                 lineHeight: 1.2,
//                 whiteSpace: { xs: "normal", md: "nowrap" },
//                 color: "var(--text-color)",
//               }}
//             >
//               Open the door to the future
//             </Typography>
//
//             <Typography
//               variant="h6"
//               sx={{
//                 fontSize: { xs: "0.85rem", md: "1rem" },
//                 mb: 4,
//                 lineHeight: 1.6,
//                 maxWidth: { xs: "100%", md: "90%" },
//                 color: "var(--text-color)",
//               }}
//             >
//               Giving every student the opportunity to access the best education
//               and open the door to the world of knowledge. Start your learning
//               journey today with Edudu to become an outstanding student in our
//               learning community.
//             </Typography>
//
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: "var(--primary-btn-bg)",
//                 color: "var(--primary-btn-color)",
//                 fontWeight: "bold",
//                 borderRadius: "25px",
//                 px: 4,
//                 py: 1.5,
//                 textTransform: "none",
//                 fontSize: "0.95rem",
//                 width: { xs: "100%", md: "fit-content" },
//               }}
//             >
//               Get Started
//             </Button>
//           </Box>
//
//           <Box
//             sx={{
//               flex: 1,
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             <Box
//               component="img"
//               src={pic2}
//               alt="hero"
//               sx={{
//                 width: { xs: "90%", md: "80%" },
//                 height: "auto",
//                 borderRadius: "20px",
//                 boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
//               }}
//             />
//           </Box>
//         </Box>
//       </Box>
//
//       <Box
//         sx={{
//           minHeight: "60vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           bgcolor: "var(--bg-color)",
//           px: { xs: 3, md: 10 },
//           mt: 6,
//         }}
//       >
//         <Box
//           sx={{
//             width: "100%",
//             maxWidth: "900px",
//             textAlign: "center",
//           }}
//         >
//           <Typography
//             variant="h4"
//             sx={{
//               fontWeight: 700,
//               mb: 3,
//               fontSize: { xs: "1.4rem", md: "2rem" },
//               color: "var(--text-color)",
//             }}
//           >
//             Lessons revolve around 4 areas
//           </Typography>
//
//           <Typography
//             variant="body1"
//             sx={{
//               fontSize: { xs: "0.85rem", md: "1rem" },
//               mb: 4,
//               lineHeight: 1.6,
//               color: "var(--text-color)",
//             }}
//           >
//             Diverse lessons around 4 subjects: Math, literature, English, drawing help
//             <br /> children improve their comprehensive knowledge
//           </Typography>
//
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               flexWrap: "wrap",
//               gap: 2,
//             }}
//           >
//             {[{ icon: pic3, label: "Math", width: 120 },
//             { icon: pic4, label: "Literature", width: 140 },
//             { icon: pic5, label: "English", width: 140 },
//             { icon: pic6, label: "Art", width: 120 }
//             ].map((btn, index) => (
//               <Button
//                 key={index}
//                 startIcon={<img src={btn.icon} style={{ width: 50, height: 20 }} />}
//                 variant="outlined"
//                 sx={{
//                   height: 55,
//                   borderColor: "var(--input-border)",
//                   bgcolor: "var(--secondary-btn-bg)",
//                   color: "var(--text-color)",
//                   fontWeight: "bold",
//                   borderRadius: "25px",
//                   width: { xs: "45%", sm: btn.width, md: btn.width },
//                   px: 3,
//                   py: 1.5,
//                   textTransform: "none",
//                   fontSize: "0.9rem",
//                 }}
//               >
//                 {btn.label}
//               </Button>
//             ))}
//           </Box>
//         </Box>
//       </Box>
//
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           bgcolor: "var(--bg-color)",
//           px: { xs: 3, md: 10 },
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column-reverse", md: "row" },
//             alignItems: "center",
//             justifyContent: "space-between",
//             gap: { xs: 5, md: 6 },
//             width: "100%",
//             maxWidth: "1200px",
//             py: { xs: 8, md: 12 },
//             px: { xs: 3, md: 6 },
//             borderRadius: "20px",
//             boxShadow: "var(--card-shadow)",
//             bgcolor: "var(--card-bg)",
//           }}
//         >
//           <Box
//             sx={{
//               flex: 1,
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             <Box
//               component="img"
//               src={pic7}
//               alt="hero"
//               sx={{
//                 width: { xs: "90%", md: "80%" },
//                 height: "auto",
//                 borderRadius: "20px",
//                 boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
//               }}
//             />
//           </Box>
//
//           <Box
//             sx={{
//               flex: 1,
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: { xs: "center", md: "flex-start" },
//               textAlign: { xs: "center", md: "left" },
//             }}
//           >
//             <Typography
//               variant="h3"
//               sx={{
//                 fontWeight: 600,
//                 mb: 3,
//                 fontSize: { xs: "1.6rem", md: "2.8rem" },
//                 lineHeight: 1.2,
//                 color: "var(--text-color)",
//               }}
//             >
//               What will your child <br /> get after studying at <br /> Edudu?
//             </Typography>
//
//             {["Master program knowledge at school",
//               "The ability to criticize knowledge increases",
//               "Respond confidently when encountering difficult situations"
//             ].map((text, index) => (
//               <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 2, flexWrap: "wrap", justifyContent: { xs: "center", md: "flex-start" } }}>
//                 <DomainVerificationIcon sx={{ width: 24, height: 24, mr: 1, color: "var(--text-color)" }} />
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     fontSize: { xs: "0.85rem", md: "1rem" },
//                     mb: 0,
//                     lineHeight: 1.6,
//                     maxWidth: { xs: "100%", md: "90%" },
//                     color: "var(--text-color)",
//                   }}
//                 >
//                   {text}
//                 </Typography>
//               </Box>
//             ))}
//           </Box>
//         </Box>
//       </Box>
//
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "flex-start",
//           bgcolor: "var(--bg-color)",
//           px: { xs: 3, md: 10 },
//           pt: { xs: 3, md: 6 },
//         }}
//       >
//         <Typography
//           variant="h3"
//           sx={{
//             fontWeight: 600,
//             fontSize: { xs: "1.6rem", md: "2.8rem" },
//             lineHeight: 1.2,
//             mb: 6,
//             color: "var(--text-color)",
//           }}
//         >
//           Why should you choose Edudu?
//         </Typography>
//
//         <Box
//           sx={{
//             display: "flex",
//             flexWrap: "wrap",
//             gap: 4,
//             justifyContent: "center",
//             width: "100%",
//           }}
//         >
//           <Box sx={{ flex: "1 1 300px", maxWidth: "350px" }}>
//             <MediaCard
//               image={pic9}
//               title="Experienced teacher"
//               description="Instructors from all over Vietnam and around the world, providing quality learning experiences and helping students develop their full potential"
//             />
//           </Box>
//
//           <Box sx={{ flex: "1 1 300px", maxWidth: "350px" }}>
//             <MediaCard
//               image={pic10}
//               title="Creative program"
//               description=" Flexible payment, suitable to personal financial situation and study schedule. Pay monthly, by course or “study now, pay later”"
//             />
//           </Box>
//
//           <Box sx={{ flex: "1 1 300px", maxWidth: "350px" }}>
//             <MediaCard
//               sx={{
//                 height: 100,
//                 objectFit: "contain",
//                 width: 120,
//                 mx: "auto",
//                 mt: 2,
//               }}
//               image={pic11}
//               title="Appropriate cost"
//               description="Thiết kế giáo trình dựa trên năng lực và nhu cầu từng học viên, hoạt động học tập hấp dẫn, tương tác 2 chiều liên tục."
//             />
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// }
//
// export default Home;
