import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, MenuItem, FormHelperText, Stack, Grid, Box, Typography, Chip, Switch, FormControlLabel, Button, Autocomplete, TextField as MuiTextField } from "@mui/material";
import YellowButton from "../common/button";
import useTeachers from "../../hooks/useTeachers";
import useAuth from "../../hooks/useAuth";
import FormField from "../common/FormField";
import { formPanelSx, formFieldSx } from "./tableUI";

const isValidUrl = (s) => {
    try {
        if (!s) return true;
        new URL(s);
        return true;
    } catch {
        return false;
    }
};
const clampRating = (n) => Math.max(0, Math.min(5, Number(n || 0)));

export default function TeacherForm({ editing, onSaved, onCancel }) {
    const { addTeacher, updateTeacher } = useTeachers();
    const { auth } = useAuth();
    const email = auth?.email || null;

    const initial = useMemo(
        () => ({
            id: "",
            name: "",
            subject: "",
            rating: "",
            image: "",
            language: "Arabic",
            experienceYears: "",
            certification: "",
            bio: "",
            email: "",
            phone: "",
            status: "active",
            tags: [],
            languages: [],
        }),
        []
    );

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
                language: "Arabic",
                languages: Array.isArray(editing.languages) ? editing.languages : [],
                experienceYears: editing.experienceYears ?? "",
                certification: editing.certification || "",
                bio: editing.bio || editing.description || "",
                email: editing.email || "",
                phone: editing.phone || "",
                status: editing.status || "active",
                tags: Array.isArray(editing.tags) ? editing.tags : [],
            });
            setErrors({});
        } else {
            setForm(initial);
            setErrors({});
        }
    }, [editing, initial]);

    const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Name is required.";
        if (!form.subject.trim()) e.subject = "Subject is required.";
        if (form.rating !== "" && (isNaN(+form.rating) || +form.rating < 0 || +form.rating > 5))
            e.rating = "Rating must be between 0 and 5.";
        if (!isValidUrl(form.image)) e.image = "Image must be a valid URL.";
        if (form.experienceYears !== "" && (isNaN(+form.experienceYears) || +form.experienceYears < 0))
            e.experienceYears = "Experience must be a non-negative number.";
        if (form.bio && form.bio.length > 800) e.bio = "About should be under 800 characters.";
        if (form.certification && form.certification.length > 200)
            e.certification = "Certification should be under 200 characters.";
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
        <Card variant="outlined" sx={formPanelSx}>
            <CardContent component="form" noValidate onSubmit={onSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <FormField
                            label="Name"
                            name="name"
                            value={form.name}
                            onChange={onChange}
                            error={!!errors.name}
                            helperText={errors.name}
                            autoGrow
                            minRows={1}
                            maxRows={2}
                            sx={formFieldSx}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormField
                            label="Subject"
                            name="subject"
                            value={form.subject}
                            onChange={onChange}
                            error={!!errors.subject}
                            helperText={errors.subject}
                            autoGrow
                            minRows={1}
                            maxRows={2}
                            sx={formFieldSx}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormField
                            label="Rating (0–5)"
                            name="rating"
                            value={form.rating}
                            onChange={onChange}
                            error={!!errors.rating}
                            helperText={errors.rating}
                            sx={formFieldSx}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Autocomplete
                            multiple
                            options={["Arabic", "English"]}
                            value={form.languages}
                            onChange={(_, v) => setForm((s) => ({ ...s, languages: v }))}
                            renderInput={(params) => (
                                <MuiTextField {...params} label="Languages" placeholder="Select languages" />
                            )}
                        />
                        <FormHelperText>Select one or more languages.</FormHelperText>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>Photo</Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems="center">
                            <Button component="label" variant="outlined">Upload<input hidden type="file" accept="image/*" onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (!f) return;
                                if (f.size > 2 * 1024 * 1024) { setErrors((s) => ({ ...s, image: 'Max size 2MB' })); return; }
                                const url = URL.createObjectURL(f);
                                setForm((s) => ({ ...s, image: url }));
                                setErrors((s) => ({ ...s, image: undefined }));
                            }} /></Button>
                            <Typography variant="body2" color="text.secondary">or paste URL</Typography>
                            <FormField name="image" value={form.image} onChange={onChange} placeholder="https://..." sx={{ flex: 1, ...formFieldSx }} />
                        </Stack>
                        {form.image && (
                            <Box sx={{ mt: 1.25, display: 'flex', alignItems: 'center', gap: 1.25 }}>
                                <Box component="img" src={form.image} alt="Preview" sx={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 1.5, border: '1px solid rgba(0,0,0,0.1)' }} />
                                <Typography variant="caption" color="text.secondary">Preview</Typography>
                            </Box>
                        )}
                        {errors.image && <FormHelperText error>{errors.image}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormField
                            label="Experience (Years)"
                            name="experienceYears"
                            value={form.experienceYears}
                            onChange={onChange}
                            error={!!errors.experienceYears}
                            helperText={errors.experienceYears}
                            sx={formFieldSx}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormField
                            label="Certification"
                            name="certification"
                            value={form.certification}
                            onChange={onChange}
                            error={!!errors.certification}
                            helperText={errors.certification}
                            autoGrow
                            minRows={1}
                            maxRows={3}
                            sx={formFieldSx}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormField
                            multiline
                            autoGrow
                            minRows={3}
                            maxRows={8}
                            label="About"
                            name="bio"
                            value={form.bio}
                            onChange={onChange}
                            error={!!errors.bio}
                            helperText={errors.bio}
                            sx={formFieldSx}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormField label="Email (optional)" name="email" value={form.email} onChange={onChange} sx={formFieldSx} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormField label="Phone (optional)" name="phone" value={form.phone} onChange={onChange} sx={formFieldSx} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormField select label="Status" name="status" value={form.status} onChange={onChange} sx={formFieldSx}>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                            <MenuItem value="pending">Pending</MenuItem>
                        </FormField>
                    </Grid>
                    <Grid item xs={12}>
                        <FormField label="Tags (press Enter to add)" name="tags" value="" onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); const v = e.currentTarget.value.trim(); if (v && !(form.tags||[]).includes(v)) setForm((s) => ({ ...s, tags: [...(s.tags||[]), v] })); e.currentTarget.value=''; } }} sx={formFieldSx} />
                        <Box sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>{(form.tags||[]).map((t) => (<Chip key={t} label={t} onDelete={() => setForm((s) => ({ ...s, tags: s.tags.filter((x)=>x!==t) }))} />))}</Box>
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
