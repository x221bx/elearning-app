import * as React from "react";
import Grid from "@mui/material/Grid";
import { Box, TextField } from "@mui/material";
import CustomPagination from "../common/customPagination";
import useTeachers from "../../hooks/useTeachers";
import useSearchPagination from "../../hooks/useSearchPagination";
import TeacherCard from "./TeacherCard";

const Y = { pageBg: "#FFF9F0", cardBg: "#FFFFFF", focus: "#FBC02D", focusDark: "#F9A825" };

export default function TeacherList() {
    const { teachers } = useTeachers();
    const [q, setQ] = React.useState("");

    const { page, setPage, pageCount, paginated, total } = useSearchPagination(teachers, {
        perPage: 8,
        query: q,
        keys: ["name", "subject"],
    });

    return (
        <Box sx={{ backgroundColor: Y.pageBg, borderRadius: 3, p: { xs: 2, md: 3 } }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                <TextField
                    label="Search teachers"
                    size="small"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Type a name or subject…"
                    sx={{
                        width: { xs: "100%", sm: 420 },
                        bgcolor: Y.cardBg,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                            "&.Mui-focused fieldset": { borderColor: Y.focus },
                        },
                    }}
                />
            </Box>

            <Grid container spacing={3} justifyContent="center">
                {paginated.map((t) => (
                    <Grid key={t.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <TeacherCard
                            id={t.id}
                            name={t.name}
                            subject={t.subject}
                            rating={t.rating}
                            image={t.image}
                            description={t.bio || t.description}
                        />
                    </Grid>
                ))}
            </Grid>

            {!total && (
                <Box sx={{ textAlign: "center", color: "text.secondary", mt: 4 }}>No teachers found.</Box>
            )}

            {total > 0 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <CustomPagination count={pageCount} page={page} onChange={(_, p) => setPage(p)} colorHex={Y.focus} hoverHex={Y.focusDark} />
                </Box>
            )}
        </Box>
    );
}
