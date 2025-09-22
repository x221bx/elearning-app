import React, { useMemo } from "react";
import {
    Card, CardContent, MenuItem, FormHelperText, Stack, Grid, Box, Typography, CircularProgress,
    Switch, FormControlLabel, Chip, Autocomplete, TextField as MuiTextField, InputAdornment, Button
} from "@mui/material";
import useCourses from "../../hooks/useCourses";
import useTeachers from "../../hooks/useTeachers";
import useAuth from "../../hooks/useAuth";
import YellowButton from "../common/button";
import FormField from "../common/FormField";
import { formPanelSx, formFieldSx } from "./tableUI";
import { useNotification } from "../../contexts/NotificationContext";

const isValidUrl = (s) => {
    try { if (!s) return true; new URL(s); return true; } catch { return false; }
};

export default function CourseForm({ mode = "create", initialValues = null, onSubmit: onSubmitProp }) {
    const { courses, addCourse } = useCourses();
    const { teachers } = useTeachers();
    const { auth } = useAuth();
    const { showNotification } = useNotification();
    const email = auth?.email || null;

    const [form, setForm] = React.useState({
        title: "",
        shortDescription: "",
        description: "",
        category: "",
        language: "English",
        level: "Beginner",
        ageGroup: "9-12",
        price: "",
        currency: "USD",
        discountPrice: "",
        free: false,
        rating: "",
        image: "",
        teacherId: "",
        lessonsCount: "",
        durationHours: "",
        tags: [],
        enrollmentLimit: "",
        featured: false,
    });
    const [imageFileUrl, setImageFileUrl] = React.useState("");
    const [errors, setErrors] = React.useState({});
    const [submitting, setSubmitting] = React.useState(false);

    React.useEffect(() => {
        if (initialValues && typeof initialValues === 'object') {
            setForm((s) => ({
                ...s,
                ...initialValues,
                price: initialValues.price?.toString?.() ?? s.price,
                discountPrice: initialValues.discountPrice?.toString?.() ?? s.discountPrice,
                lessonsCount: initialValues.lessonsCount?.toString?.() ?? s.lessonsCount,
                durationHours: initialValues.durationHours?.toString?.() ?? s.durationHours,
                enrollmentLimit: initialValues.enrollmentLimit?.toString?.() ?? s.enrollmentLimit,
            }));
            if (initialValues.image && initialValues.image.startsWith('blob:')) setImageFileUrl(initialValues.image);
        }
    }, [initialValues]);

    const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    const onBlur = (e) => { const m = validate(); setErrors((s) => ({ ...s, [e.target.name]: m[e.target.name] })); };

    const validate = () => {
        const e = {};
        if (!form.title.trim()) e.title = "Enter a course title.";
        if (!form.category.trim()) e.category = "Choose one category.";
        if (form.price !== "" && isNaN(Number(form.price))) e.price = "Price must be a valid number.";
        const r = Number(form.rating);
        if (form.rating !== "" && (isNaN(r) || r < 0 || r > 5)) e.rating = "Rating must be between 0 and 5.";
        if (!imageFileUrl && form.image && !isValidUrl(form.image)) e.image = "Image must be a valid URL.";
        if (!form.language) e.language = "Choose a language.";
        if (form.discountPrice !== "" && Number(form.discountPrice) >= Number(form.price || 0) && !form.free) e.discountPrice = "Discount must be less than price.";
        if (form.lessonsCount !== "" && (isNaN(Number(form.lessonsCount)) || Number(form.lessonsCount) < 0)) e.lessonsCount = "Lessons must be a non-negative number.";
        if (form.durationHours !== "" && (isNaN(Number(form.durationHours)) || Number(form.durationHours) < 0)) e.durationHours = "Hours must be a non-negative number.";
        if (form.enrollmentLimit !== "" && (isNaN(Number(form.enrollmentLimit)) || Number(form.enrollmentLimit) < 0)) e.enrollmentLimit = "Enrollment limit must be a non-negative number.";
        return e;
    };

    const titleExists = useMemo(() => (t) => (courses || []).some(c => (c.title || "").trim().toLowerCase() === (t || "").trim().toLowerCase()), [courses]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const eMap = validate();
        setErrors(eMap);
        if (Object.keys(eMap).length) return;
        if (titleExists(form.title)) { setErrors((s) => ({ ...s, title: "A course with this title already exists." })); showNotification("Duplicate title. Please choose another title.", "error"); return; }
        try {
            setSubmitting(true);
            const payload = {
                title: form.title.trim(), shortDescription: form.shortDescription.trim(), description: form.description.trim(),
                category: form.category.trim(), language: form.language, level: form.level, ageGroup: form.ageGroup,
                price: Number(form.price || 0), currency: form.currency, discountPrice: form.free ? 0 : Number(form.discountPrice || 0), free: Boolean(form.free),
                rating: Math.max(0, Math.min(5, Number(form.rating || 0))),
                image: imageFileUrl || form.image.trim(), teacherId: form.teacherId || "",
                lessonsCount: Number(form.lessonsCount || 0), durationHours: Number(form.durationHours || 0), tags: form.tags,
                enrollmentLimit: Number(form.enrollmentLimit || 0), featured: Boolean(form.featured), status: "published",
            };
            if (onSubmitProp) {
                await onSubmitProp(payload);
            } else {
                addCourse(payload, email);
            }
            showNotification("Course added successfully", "success");
            setForm({ title: "", shortDescription: "", description: "", category: "", language: "English", level: "Beginner", ageGroup: "9-12", price: "", currency: "USD", discountPrice: "", free: false, rating: "", image: "", teacherId: "", lessonsCount: "", durationHours: "", tags: [], enrollmentLimit: "", featured: false });
            setImageFileUrl(""); setErrors({});
        } catch (err) { console.error(err); showNotification("Failed to add course", "error"); }
        finally { setSubmitting(false); }
    };

    const onSaveDraft = async (e) => {
        e.preventDefault();
        const basic = {}; if (!form.title.trim()) basic.title = "Enter a course title."; if (!form.category.trim()) basic.category = "Choose one category.";
        if (Object.keys(basic).length) { setErrors((s) => ({ ...s, ...basic })); return; }
        try {
            setSubmitting(true);
            const payload = {
                title: form.title.trim(), shortDescription: form.shortDescription.trim(), description: form.description.trim(), category: form.category.trim(), language: form.language, level: form.level, ageGroup: form.ageGroup,
                price: Number(form.price || 0), currency: form.currency, discountPrice: form.free ? 0 : Number(form.discountPrice || 0), free: Boolean(form.free), rating: Math.max(0, Math.min(5, Number(form.rating || 0))), image: imageFileUrl || form.image.trim(), teacherId: form.teacherId || "",
                lessonsCount: Number(form.lessonsCount || 0), durationHours: Number(form.durationHours || 0), tags: form.tags, enrollmentLimit: Number(form.enrollmentLimit || 0), featured: Boolean(form.featured), status: "draft",
            };
            if (onSubmitProp) {
                await onSubmitProp(payload);
            } else {
                addCourse(payload, email);
            }
            showNotification("Draft saved", "success");
        } finally { setSubmitting(false); }
    };

    const isDisabled = !!Object.keys(validate()).length || submitting;

    return (
        <Card variant="outlined" sx={formPanelSx}>
            <CardContent component="form" noValidate onSubmit={onSubmit}>
                <Grid container spacing={2.5}>
                    <Grid item xs={12} md={6}>
                        <FormField label="Title" name="title" value={form.title}   error={!!errors.title} helperText={errors.title} required aria-required aria-describedby="course-title-help" autoGrow minRows={1} maxRows={2} sx={formFieldSx} />
                        <FormHelperText id="course-title-help">Title is required.</FormHelperText>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormField label="Category" name="category" value={form.category}   error={!!errors.category} helperText={errors.category} required aria-required aria-describedby="course-category-help" autoGrow minRows={1} maxRows={2} sx={formFieldSx} />
                        <FormHelperText id="course-category-help">Category is required.</FormHelperText>
                    </Grid>

                    <Grid item xs={12}>
                        <FormField label="Short Description (optional)" name="shortDescription" value={form.shortDescription}   helperText="A brief summary for cards/SEO (max ~160 chars)." autoGrow minRows={1} maxRows={3} sx={formFieldSx} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormField label="Detailed Description (optional)" name="description" value={form.description}   helperText="Full course description." autoGrow minRows={3} maxRows={8} sx={formFieldSx} />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FormField select label="Language" name="language" value={form.language}   sx={formFieldSx}>
                            <MenuItem value="Arabic">Arabic</MenuItem>
                            <MenuItem value="English">English</MenuItem>
                        </FormField>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormField select label="Level" name="level" value={form.level}  sx={formFieldSx}>
                            <MenuItem value="Beginner">Beginner</MenuItem>
                            <MenuItem value="Intermediate">Intermediate</MenuItem>
                            <MenuItem value="Advanced">Advanced</MenuItem>
                        </FormField>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormField select label="Age Group" name="ageGroup" value={form.ageGroup}  sx={formFieldSx}>
                            <MenuItem value="6-8">6–8</MenuItem>
                            <MenuItem value="9-12">9–12</MenuItem>
                            <MenuItem value="13-16">13–16</MenuItem>
                        </FormField>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FormField label="Lessons (optional)" name="lessonsCount" type="number" value={form.lessonsCount}   error={!!errors.lessonsCount} helperText={errors.lessonsCount || "Number of lessons."} sx={formFieldSx} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormField label="Duration (hours, optional)" name="durationHours" type="number" value={form.durationHours}   error={!!errors.durationHours} helperText={errors.durationHours || "e.g., 10 or 10.5"} sx={formFieldSx} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormField label="Enrollment limit (optional)" name="enrollmentLimit" type="number" value={form.enrollmentLimit}   error={!!errors.enrollmentLimit} helperText={errors.enrollmentLimit || "0 means unlimited"} sx={formFieldSx} />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <FormField label="Price (optional)" name="price" type="number" value={form.price}   error={!!errors.price} helperText={errors.price || (form.free ? 'Free course' : 'Min 0; set currency.')} aria-describedby="course-price-help" sx={formFieldSx} InputProps={{ startAdornment: <InputAdornment position="start">{form.currency}</InputAdornment>, inputProps: { min: 0, step: 1 }, readOnly: form.free }} />
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <FormField select label="Currency" name="currency" value={form.currency}  sx={formFieldSx} disabled={form.free}>
                            <MenuItem value="USD">USD</MenuItem>
                            <MenuItem value="EUR">EUR</MenuItem>
                            <MenuItem value="EGP">EGP</MenuItem>
                        </FormField>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <FormControlLabel control={<Switch checked={form.free} onChange={(_, v) => setForm((s) => ({ ...s, free: v, price: v ? "0" : s.price }))} />} label="Free" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormField label="Discount (optional)" name="discountPrice" type="number" value={form.discountPrice}   error={!!errors.discountPrice} helperText={errors.discountPrice || "Must be less than price"} sx={formFieldSx} InputProps={{ startAdornment: <InputAdornment position="start">{form.currency}</InputAdornment>, inputProps: { min: 0, step: 1 }, readOnly: form.free }} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Autocomplete options={teachers} getOptionLabel={(t) => t?.name || ''} onChange={(_, val) => setForm((s) => ({ ...s, teacherId: val?.id || "" }))} renderInput={(params) => (<MuiTextField {...params} label="Teacher (optional)" placeholder="Search by name" />)} />
                        <FormHelperText>Assign a teacher now or later.</FormHelperText>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormField label="Tags (press Enter to add)" name="tags" value="" onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); const v = e.currentTarget.value.trim(); if (v && !form.tags.includes(v)) setForm((s) => ({ ...s, tags: [...s.tags, v] })); e.currentTarget.value = ''; } }} sx={formFieldSx} />
                        <Box sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>{form.tags.map((t) => (<Chip key={t} label={t} onDelete={() => setForm((s) => ({ ...s, tags: s.tags.filter((x) => x !== t) }))} />))}</Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>Course Image</Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems="center">
                            <Button component="label" variant="outlined">Upload<input hidden type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (!f) return; if (f.size > 2 * 1024 * 1024) { setErrors((s) => ({ ...s, image: 'Max size 2MB' })); return; } const url = URL.createObjectURL(f); setImageFileUrl(url); setErrors((s) => ({ ...s, image: undefined })); }} /></Button>
                            <Typography variant="body2" color="text.secondary">or paste URL</Typography>
                            <FormField name="image" value={form.image}   placeholder="https://..." sx={{ flex: 1, ...formFieldSx }} />
                        </Stack>
                        {(imageFileUrl || form.image) && (<Box sx={{ mt: 1.25, display: 'flex', alignItems: 'center', gap: 1.25 }}><Box component="img" src={imageFileUrl || form.image} alt="Preview" sx={{ width: 160, height: 100, objectFit: 'cover', borderRadius: 1.5, border: '1px solid rgba(0,0,0,0.1)' }} /><Typography variant="caption" color="text.secondary">Preview</Typography></Box>)}
                        {errors.image && <FormHelperText error>{errors.image}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel control={<Switch checked={form.featured} onChange={(_, v) => setForm((s) => ({ ...s, featured: v }))} />} label="Featured" />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormField label="Rating (auto)" name="rating" type="number"  value={form.rating}     disabled sx={formFieldSx} />
                        <FormHelperText id="course-rating-help">Computed from student reviews.</FormHelperText>
                    </Grid>

                    <Grid item xs={12}>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2} justifyContent="space-between" alignItems="center">
                            <Box sx={{ color: 'text.secondary', fontSize: 13 }}>{!submitting && !!Object.keys(validate()).length && 'Please fix highlighted fields before publishing.'}</Box>
                            <Box>
                                {mode !== 'edit' && (
                                    <YellowButton type="button" onClick={onSaveDraft} variant="outline" sx={{ mr: 1 }}>Save as draft</YellowButton>
                                )}
                                <YellowButton type="submit" disabled={submitting} aria-disabled={submitting}>{submitting ? (<><CircularProgress size={18} sx={{ mr: 1 }} /> Saving…</>) : (mode === 'edit' ? 'Save Changes' : 'Publish')}</YellowButton>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
