import React, { useState, useMemo } from "react";
import { Card, CardContent, TextField, MenuItem, FormHelperText } from "@mui/material";
import Grid from "@mui/material/Grid";
import useCourses from "../../hooks/useCourses";
import useTeachers from "../../hooks/useTeachers";
import useAuth from "../../hooks/useAuth";
import YellowButton from "../common/button";

const isValidUrl = (s) => { try { new URL(s); return true; } catch { return false; } };

export default function CourseForm() {
    const { addCourse } = useCourses();
    const { teachers } = useTeachers();
    const { auth } = useAuth();
    const email = auth?.email || null;

    const [form, setForm] = useState({
        title: "",
        category: "",
        price: "",
        rating: "",
        image: "",
        teacherId: "",
    });
    const [errors, setErrors] = useState({});

    const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

    const validate = () => {
        const e = {};
        if (!form.title.trim()) e.title = "Title is required.";
        if (!form.category.trim()) e.category = "Category is required.";
        // optional numeric fields
        if (form.price !== "" && isNaN(Number(form.price))) e.price = "Price must be a valid number.";
        const r = Number(form.rating);
        if (form.rating !== "" && (isNaN(r) || r < 0 || r > 5)) e.rating = "Rating must be between 0 and 5.";
        if (form.image && !isValidUrl(form.image)) e.image = "Image must be a valid URL.";
        return e;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const eMap = validate();
        setErrors(eMap);
        if (Object.keys(eMap).length) return;

        addCourse(
            {
                title: form.title.trim(),
                category: form.category.trim(),
                price: Number(form.price || 0),
                rating: Math.max(0, Math.min(5, Number(form.rating || 0))),
                image: form.image.trim(),
                teacherId: form.teacherId || "",
            },
            email
        );
        setForm({ title: "", category: "", price: "", rating: "", image: "", teacherId: "" });
        setErrors({});
    };

    const fieldSx = {
        "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            "&.Mui-focused fieldset": { borderColor: "#FBC02D" },
        },
    };

    return (
        <Card variant="outlined" sx={{ borderRadius: 3, backgroundColor: "#FFF9F0" }}>
            <CardContent component="form" onSubmit={onSubmit}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Title" name="title" value={form.title} onChange={onChange}
                                   error={!!errors.title} helperText={errors.title} sx={fieldSx} required />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Category" name="category" value={form.category} onChange={onChange}
                                   error={!!errors.category} helperText={errors.category} sx={fieldSx} required />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Price" name="price" type="number" value={form.price} onChange={onChange}
                                   error={!!errors.price} helperText={errors.price} sx={fieldSx} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Rating (0–5)" name="rating" type="number" inputProps={{ step: "0.1", min: 0, max: 5 }}
                                   value={form.rating} onChange={onChange} error={!!errors.rating} helperText={errors.rating} sx={fieldSx} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Image URL" name="image" value={form.image} onChange={onChange}
                                   error={!!errors.image} helperText={errors.image} sx={fieldSx} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField select fullWidth label="Teacher" name="teacherId" value={form.teacherId} onChange={onChange} sx={fieldSx}>
                            <MenuItem value="">(None)</MenuItem>
                            {teachers.map((t) => (
                                <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
                            ))}
                        </TextField>
                        <FormHelperText>Select a teacher (optional).</FormHelperText>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <YellowButton type="submit">Add Course</YellowButton>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
