//src/pages/Teachers.jsx
import React from "react";
import TeachersList from "../components/teacher/TeacherList";
import { Typography, Box } from "@mui/material";

const Teachers = () => {
    return (
        <Box sx={{ backgroundColor: "#fff", minHeight: "100%", display: "flex", flexDirection: "column" }}>
             <Box sx={{ height: "64px", backgroundColor: "#f5f5f5" }} />

             <Box sx={{ flex: 1, px: { xs: 2, sm: 4, md: 8 }, py: 4 }}>

                 <Box textAlign="center" mb={4}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        A team of experienced teachers at Edudu
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Meet our qualified and passionate teachers who are dedicated to
                        providing the best learning experience.
                    </Typography>
                </Box>

                 <TeachersList />
            </Box>
        </Box>
    );
};

export default Teachers;
