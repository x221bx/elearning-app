import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, MenuItem, FormHelperText, Grid, Stack } from "@mui/material";
import YellowButton from "../common/button";
import useTeachers from "../../hooks/useTeachers";
import useAuth from "../../hooks/useAuth";
import FormField from "../common/FormField";

const isValidUrl = (s) => { try { if (!s) return true; new URL(s); return true; } catch { return false; } };
const clampRating = (n) => Math.max(0, Math.min(5, Number(n || 0)));

export default function TeacherForm({ editing, onSaved, onCancel }) {
    const { addTeacher, updateTeacher } = useTeachers();
    const { auth } = useAuth();
    const email = auth?.email || null;

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

    // JS Validation
    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Name is required.";
        if (!form.subject.trim()) e.subject = "Subject is required.";
        if (form.rating !== "" && (isNaN(+form.rating) || +form.rating < 0 || +form.rating > 5)) e.rating = "Rating must be between 0 and 5.";
        if (!isValidUrl(form.image)) e.image = "Image must be a valid URL.";
        if (form.experienceYears !== "" && (isNaN(+form.experienceYears) || +form.experienceYears < 0)) e.experienceYears = "Experience must be a non-negative number.";
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

        if (editing?.id) updateTeacher({ id: editing.id, ...payload });
        else addTeacher(payload, email);

        onSaved?.();
        setForm(initial);
        setErrors({});
    };

    return (
        <Card variant="outlined" sx={{ borderRadius: 3, backgroundColor: "#FFF9F0" }}>
            <CardContent component="form" noValidate onSubmit={onSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <FormField label="Name" name="name" value={form.name} onChange={onChange}
                                   error={!!errors.name} helperText={errors.name} autoGrow minRows={1} maxRows={2} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormField label="Subject" name="subject" value={form.subject} onChange={onChange}
                                   error={!!errors.subject} helperText={errors.subject} autoGrow minRows={1} maxRows={2} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormField label="Rating (0–5)" name="rating" value={form.rating} onChange={onChange}
                                   error={!!errors.rating} helperText={errors.rating} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormField select label="Language" name="language" value={form.language} onChange={onChange}>
                            <MenuItem value="Arabic">Arabic</MenuItem>
                            <MenuItem value="English">English</MenuItem>
                        </FormField>
                        <FormHelperText>Select the main spoken language.</FormHelperText>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormField label="Image URL" name="image" value={form.image} onChange={onChange}
                                   error={!!errors.image} helperText={errors.image} autoGrow minRows={1} maxRows={3} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormField label="Experience (Years)" name="experienceYears" value={form.experienceYears}
                                   onChange={onChange} error={!!errors.experienceYears} helperText={errors.experienceYears} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormField label="Certification" name="certification" value={form.certification} onChange={onChange}
                                   error={!!errors.certification} helperText={errors.certification} autoGrow minRows={1} maxRows={3} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormField multiline autoGrow minRows={3} maxRows={8} label="About" name="bio" value={form.bio} onChange={onChange}
                                   error={!!errors.bio} helperText={errors.bio} />
                    </Grid>

                    <Grid item xs={12}>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2} justifyContent="flex-end" flexWrap="wrap">
                            <YellowButton type="submit">{editing ? "Save Changes" : "Add Teacher"}</YellowButton>
                            {editing && (
                                <YellowButton type="button" variant="outline" onClick={onCancel}>
                                    Cancel
                                </YellowButton>
                            )}
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
