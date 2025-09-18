// src/components/admin/TeacherForm.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, TextField, MenuItem, FormHelperText } from "@mui/material";
import Grid from "@mui/material/Grid";
import YellowButton from "../common/button";
import useTeachers from "../../hooks/useTeachers";
import useAuth from "../../hooks/useAuth";

const isValidUrl = (s) => { try { if (!s) return true; new URL(s); return true; } catch { return false; } };
const clampRating = (n) => Math.max(0, Math.min(5, Number(n || 0)));

export default function TeacherForm({ editing, onSaved, onCancel }) {
    const { addTeacher, updateTeacher } = useTeachers();
    const { auth } = useAuth();
    const email = auth?.email || null;

    // mirrors CourseForm layout: 2 fields per row (md:6/md:6), then md:6/md:6, etc.
    const initial = useMemo(() => ({
        id: "",
        name: "",
        subject: "",
        rating: "",
        image: "",
        language: "Arabic",
        experienceYears: "",
        certification: "",
        bio: "",
    }), []);

    const [form, setForm] = useState(initial);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editing) {
            setForm({
                id: editing.id || "",
                name: editing.name || "",
                subject: editing.subject || "",
                rating: editing.rating ?? "",
                image: editing.image || "",
                language: Array.isArray(editing.languages) && editing.languages.length ? editing.languages[0] : "Arabic",
                experienceYears: editing.experienceYears ?? "",
                certification: editing.certification || "",
                bio: editing.bio || editing.description || "",
            });
            setErrors({});
        } else {
            setForm(initial);
            setErrors({});
        }
    }, [editing, initial]);

    const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

    // JS-only validation (no HTML validation attributes)
    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Name is required.";
        if (!form.subject.trim()) e.subject = "Subject is required.";

        if (form.rating !== "" && (isNaN(+form.rating) || +form.rating < 0 || +form.rating > 5)) {
            e.rating = "Rating must be between 0 and 5.";
        }
        if (!isValidUrl(form.image)) e.image = "Image must be a valid URL.";

        if (form.experienceYears !== "" && (isNaN(+form.experienceYears) || +form.experienceYears < 0)) {
            e.experienceYears = "Experience must be a non-negative number.";
        }
        if (form.bio && form.bio.length > 800) e.bio = "About should be under 800 characters.";
        if (form.certification && form.certification.length > 200) e.certification = "Certification should be under 200 characters.";
        return e;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const nextErrors = validate();
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length) return;

        const payload = {
            id: form.id || undefined,
            name: form.name.trim(),
            subject: form.subject.trim(),
            rating: clampRating(form.rating),
            image: form.image.trim(),
            languages: [form.language],
            experienceYears: Number(form.experienceYears || 0),
            certification: form.certification.trim(),
            bio: form.bio.trim(),
        };

        if (editing?.id) {
            updateTeacher({ id: editing.id, ...payload });
        } else {
            addTeacher(payload, email);
        }

        if (onSaved) onSaved();
        setForm(initial);
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
                    {/* row 1 — mirrors CourseForm (title/category) shape */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={form.name}
                            onChange={onChange}
                            error={!!errors.name}
                            helperText={errors.name}
                            sx={fieldSx}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Subject"
                            name="subject"
                            value={form.subject}
                            onChange={onChange}
                            error={!!errors.subject}
                            helperText={errors.subject}
                            sx={fieldSx}
                        />
                    </Grid>

                    {/* row 2 — mirrors (price/rating) layout */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Rating (0–5)"
                            name="rating"
                            value={form.rating}
                            onChange={onChange}
                            error={!!errors.rating}
                            helperText={errors.rating}
                            sx={fieldSx}
                            inputMode="decimal"
                            placeholder="e.g., 4.5"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            select
                            fullWidth
                            label="Language"
                            name="language"
                            value={form.language}
                            onChange={onChange}
                            sx={fieldSx}
                        >
                            <MenuItem value="Arabic">Arabic</MenuItem>
                            <MenuItem value="English">English</MenuItem>
                        </TextField>
                        <FormHelperText>Select the main spoken language.</FormHelperText>
                    </Grid>

                    {/* row 3 — mirrors (image/teacher) layout */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Image URL"
                            name="image"
                            value={form.image}
                            onChange={onChange}
                            error={!!errors.image}
                            helperText={errors.image}
                            sx={fieldSx}
                            placeholder="https://..."
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Experience (Years)"
                            name="experienceYears"
                            value={form.experienceYears}
                            onChange={onChange}
                            error={!!errors.experienceYears}
                            helperText={errors.experienceYears}
                            sx={fieldSx}
                            inputMode="numeric"
                            placeholder="e.g., 6"
                        />
                    </Grid>

                    {/* row 4 — mirrors CourseForm final text input row */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label="Certification"
                            name="certification"
                            value={form.certification}
                            onChange={onChange}
                            error={!!errors.certification}
                            helperText={errors.certification}
                            sx={fieldSx}
                            placeholder="e.g., PhD in Mathematics"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            label="About"
                            name="bio"
                            value={form.bio}
                            onChange={onChange}
                            error={!!errors.bio}
                            helperText={errors.bio}
                            sx={fieldSx}
                            placeholder="Brief bio…"
                        />
                    </Grid>

                    {/* actions — identical CTA pattern */}
                    <Grid size={{ xs: 12 }}>
                        <YellowButton type="submit">{editing ? "Save Changes" : "Add Teacher"}</YellowButton>
                        {editing && (
                            <YellowButton type="button" variant="outline" onClick={onCancel} style={{ marginLeft: 8 }}>
                                Cancel
                            </YellowButton>
                        )}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
