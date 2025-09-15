// src/pages/TeacherDetail.jsx
import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Avatar,
    Typography,
    Divider,
    Stack,
    IconButton,
} from "@mui/material";
import { Facebook, YouTube, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { teachers } from "../api/teachers";
import { courses } from "../api/courses";
import CustomPagination from "../components/common/customPagination.jsx";

function Row({ label, value }) {
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
            <Typography variant="body2" color="text.secondary">{label}</Typography>
            <Typography variant="body2" fontWeight={600}>{value}</Typography>
        </Box>
    );
}

function Section({ title, children, sx }) {
    return (
        <Box sx={sx}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>{title}</Typography>
            <Typography variant="body2" color="text.secondary">{children}</Typography>
        </Box>
    );
}

export default function TeacherDetail() {
    const { id } = useParams();

    const teacher = useMemo(
        () => teachers.find(t => String(t.id) === String(id) || t.id === Number(id)),
        [id]
    );

    if (!teacher) {
        return (
            <Box sx={{ p: 4, textAlign: "center" }}>
                <Typography variant="h6">Teacher not found</Typography>
            </Box>
        );
    }

    const allCourses = useMemo(
        () => courses.filter(c => String(c.teacherId) === String(teacher.id)),
        [teacher.id]
    );

    const languages = Array.isArray(teacher.languages) && teacher.languages.length
        ? teacher.languages
        : ["Arabic", "English"];

    const aboutText =
        teacher.about || teacher.description || teacher.bio ||
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    const certText =
        teacher.certification || teacher.cert ||
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.";

    const [page, setPage] = useState(1);
    const perPage = 2;
    const pageCount = Math.max(1, Math.ceil(allCourses.length / perPage));
    const paginated = allCourses.slice((page - 1) * perPage, page * perPage);

    return (
        <Box sx={{ backgroundColor: "#f7f8fa", minHeight: "100vh" }}>
            <Box sx={{ height: { xs: 56, md: 72 } }} />
            <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 4 }, pb: 6 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Home / Teacher / Detail Teacher
                </Typography>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "360px 1fr" },
                        gap: 3
                    }}
                >
                    <Card sx={{ borderRadius: 3, alignSelf: "start", position: { md: "sticky" }, top: { md: 96 } }}>
                        <CardContent>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                                <Avatar
                                    src={teacher.image}
                                    alt={teacher.name}
                                    sx={{ width: 120, height: 120, border: "3px solid #eaeaea" }}
                                />
                                <Typography variant="h6" fontWeight={700}>{teacher.name}</Typography>
                                <Divider sx={{ width: "100%", my: 1 }} />
                                <Stack spacing={1} sx={{ width: "100%" }}>
                                    <Row label="Total Course" value={allCourses.length} />
                                    <Row
                                        label="Ratings"
                                        value={`${Number(teacher.rating || 0).toFixed(2)}${teacher.ratingsCount ? ` (${teacher.ratingsCount})` : ""}`}
                                    />
                                    <Row label="Experiences" value={`${teacher.experience || teacher.experienceYears || 0} Years`} />
                                    <Row label="Graduated" value={teacher.graduated ? "Yes" : "No"} />
                                    <Row label="Language" value={languages.join(", ")} />
                                </Stack>
                                <Divider sx={{ width: "100%", my: 2 }} />
                                <Stack direction="row" spacing={1}>
                                    <IconButton
                                        component="a"
                                        href={teacher.socials?.facebook || "#"}
                                        target={teacher.socials?.facebook ? "_blank" : undefined}
                                        sx={{ color: "text.secondary" }}
                                    >
                                        <Facebook />
                                    </IconButton>
                                    <IconButton
                                        component="a"
                                        href={teacher.socials?.instagram || "#"}
                                        target={teacher.socials?.instagram ? "_blank" : undefined}
                                        sx={{ color: "text.secondary" }}
                                    >
                                        <Instagram />
                                    </IconButton>
                                    <IconButton
                                        component="a"
                                        href={teacher.socials?.twitter || "#"}
                                        target={teacher.socials?.twitter ? "_blank" : undefined}
                                        sx={{ color: "text.secondary" }}
                                    >
                                        <Twitter />
                                    </IconButton>
                                    <IconButton
                                        component="a"
                                        href={teacher.socials?.linkedin || "#"}
                                        target={teacher.socials?.linkedin ? "_blank" : undefined}
                                        sx={{ color: "text.secondary" }}
                                    >
                                        <LinkedIn />
                                    </IconButton>
                                    <IconButton
                                        component="a"
                                        href={teacher.socials?.youtube || "#"}
                                        target={teacher.socials?.youtube ? "_blank" : undefined}
                                        sx={{ color: "text.secondary" }}
                                    >
                                        <YouTube />
                                    </IconButton>
                                </Stack>
                            </Box>
                        </CardContent>
                    </Card>

                    <Box sx={{ display: "grid", gap: 3 }}>
                        <Card sx={{ borderRadius: 3 }}>
                            <CardContent>
                                <Section title={`About ${teacher.name.split(" ")[0]}`}>{aboutText}</Section>
                                <Section title="Certification" sx={{ mt: 3 }}>{certText}</Section>
                            </CardContent>
                        </Card>

                        <Card sx={{ borderRadius: 3 }}>
                            <CardContent>
                                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                                    Courses ({allCourses.length})
                                </Typography>

                                <Box sx={{ display: "grid", gap: 2 }}>
                                    {paginated.map((c) => (
                                        <Card key={c.id} variant="outlined" sx={{ borderRadius: 2 }}>
                                            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "220px 1fr" } }}>
                                                <CardMedia
                                                    component="img"
                                                    image={c.thumb || c.image || "/assets/images/default-course.png"}
                                                    alt={c.title}
                                                    sx={{ height: { xs: 140, sm: "100%" }, objectFit: "cover" }}
                                                />
                                                <CardContent sx={{ py: 2 }}>
                                                    <Typography variant="subtitle1" fontWeight={700}>{c.title}</Typography>
                                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                        {c.blurb || c.description || ""}
                                                    </Typography>
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                        {c.price != null && (
                                                            <Typography variant="subtitle1" fontWeight={700}>${c.price}</Typography>
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
                                </Box>

                                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                                    <CustomPagination
                                        count={pageCount}
                                        page={page}
                                        onChange={(_, p) => setPage(p)}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
