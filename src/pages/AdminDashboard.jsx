import React, { useMemo, useEffect } from "react";
import { Typography, Card, CardContent, Box, Grid, Link as MuiLink, Chip, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputAdornment, Select, MenuItem, IconButton, Tooltip, TablePagination } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import useCourses from "../hooks/useCourses";
import useTeachers from "../hooks/useTeachers";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import VisibilityIcon from "@mui/icons-material/Visibility";

function StatCard({ title, value, hint }) {
    return (
        <Card sx={(theme) => ({
            borderRadius: 3,
            backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.22 : 0.12),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
            boxShadow: theme.customShadows?.card,
            minHeight: 120,
        })}>
            <CardContent>
                <Typography variant="body2" color="text.secondary">{title}</Typography>
                <Typography variant="h5" fontWeight={900}>{value}</Typography>
                {hint && <Typography variant="caption" color="text.secondary">{hint}</Typography>}
            </CardContent>
        </Card>
    );
}

function ListCard({ title, rows, linkPrefix }) {
    return (
        <Card sx={(theme) => ({
            borderRadius: 3,
            backgroundColor: alpha(theme.palette.secondary.dark, theme.palette.mode === 'dark' ? 0.28 : 0.1),
            border: `1px solid ${alpha(theme.palette.secondary.main, 0.18)}`,
            boxShadow: theme.customShadows?.card,
            height: '100%',
        })}>
            <CardContent sx={{ height: '100%' }}>
                <Typography variant="subtitle1" fontWeight={900} sx={{ mb: 1 }}>{title}</Typography>
                <Box component="table" sx={{ width: "100%", borderCollapse: "collapse" }}>
                    <Box component="tbody">
                        {rows.map((r) => (
                            <Box
                                component="tr"
                                key={r.id}
                                sx={{ borderBottom: (theme) => `1px solid ${alpha(theme.palette.divider, 0.7)}` }}
                            >
                                <Box component="td" sx={{ py: 1.25, pl: 1.5, pr: 1.5 }}>
                                    <MuiLink
                                        component={RouterLink}
                                        to={`${linkPrefix}/${r.id}`}
                                        underline="hover"
                                        color="text.primary"
                                        fontWeight={700}
                                        sx={{ display: "inline-block" }}
                                    >
                                        {r.title}
                                    </MuiLink>
                                </Box>
                                <Box component="td" sx={{ py: 1.25, pr: 1.5, color: "text.secondary" }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {r.meta}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                        {!rows.length && (
                            <Box component="tr">
                                <Box component="td" colSpan={2} sx={{ py: 2, color: "text.secondary" }}>
                                    <Typography variant="body2" color="text.secondary">No data</Typography>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

function CoursesTableCard({ rows }) {
    const [q, setQ] = React.useState("");
    const [cat, setCat] = React.useState("All");
    const [sortBy, setSortBy] = React.useState("title");
    const [sortDir, setSortDir] = React.useState("asc");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const categories = React.useMemo(() => ["All", ...Array.from(new Set((rows || []).map(r => r.category).filter(Boolean)))], [rows]);

    const filtered = React.useMemo(() => (rows || []).filter(r => {
        const matchesQ = q ? (r.title?.toLowerCase().includes(q.toLowerCase()) || r.category?.toLowerCase().includes(q.toLowerCase())) : true;
        const matchesCat = cat === 'All' || r.category === cat;
        return matchesQ && matchesCat;
    }), [rows, q, cat]);

    const sorted = React.useMemo(() => [...filtered].sort((a,b)=>{
        const dir = sortDir === 'asc' ? 1 : -1;
        if (sortBy === 'price' || sortBy === 'rating') {
            const av = Number(a[sortBy] || 0); const bv = Number(b[sortBy] || 0);
            return (av - bv) * dir;
        }
        const av = String(a[sortBy] || '').toLowerCase(); const bv = String(b[sortBy] || '').toLowerCase();
        return av.localeCompare(bv) * dir;
    }), [filtered, sortBy, sortDir]);

    const paginated = React.useMemo(() => sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [sorted, page, rowsPerPage]);
    React.useEffect(()=>{ setPage(0); }, [q, cat, rowsPerPage, sortBy, sortDir]);

    const toggleSort = (key) => {
        if (sortBy === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        else { setSortBy(key); setSortDir('asc'); }
    };

    const sortIcon = (key) => sortBy !== key ? <UnfoldMoreIcon fontSize="inherit" /> : (sortDir === 'asc' ? <ArrowUpwardIcon fontSize="inherit" /> : <ArrowDownwardIcon fontSize="inherit" />);

    return (
        <Card sx={(theme)=>({ borderRadius: 3, boxShadow: theme.customShadows?.card })}>
            <CardContent>
                <Box sx={{ display:'flex', gap:1, flexWrap:'wrap', alignItems:'center', mb: 1.5 }}>
                    <TextField size="small" placeholder="Search…" value={q} onChange={(e)=>setQ(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small"/></InputAdornment> }} />
                    <Select size="small" value={cat} onChange={(e)=>setCat(e.target.value)}>
                        {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                    </Select>
                    {cat !== 'All' || q ? (
                        <Chip label="Clear" onClick={()=>{ setQ(''); setCat('All'); }} size="small" />
                    ) : null}
                    <Box sx={{ ml:'auto', color:'text.secondary', fontSize:13 }}>{filtered.length} results</Box>
                </Box>

                <TableContainer component={Paper} sx={{ maxHeight: 420, border: (t)=>`1px solid ${t.palette.divider}` }}>
                    <Table stickyHeader size="small" aria-label="Courses table">
                        <TableHead>
                            <TableRow sx={{ '& th': { fontWeight:700 } }}>
                                <TableCell scope="col" onClick={()=>toggleSort('title')} sx={{ cursor:'pointer' }} aria-sort={sortBy==='title'? (sortDir==='asc'?'ascending':'descending') : 'none'}>Title {sortIcon('title')}</TableCell>
                                <TableCell scope="col" onClick={()=>toggleSort('category')} sx={{ cursor:'pointer' }} aria-sort={sortBy==='category'? (sortDir==='asc'?'ascending':'descending') : 'none'}>Category {sortIcon('category')}</TableCell>
                                <TableCell align="right" scope="col" onClick={()=>toggleSort('price')} sx={{ cursor:'pointer', whiteSpace:'nowrap' }} aria-sort={sortBy==='price'? (sortDir==='asc'?'ascending':'descending') : 'none'}>Price {sortIcon('price')}</TableCell>
                                <TableCell align="right" scope="col" onClick={()=>toggleSort('rating')} sx={{ cursor:'pointer' }} aria-sort={sortBy==='rating'? (sortDir==='asc'?'ascending':'descending') : 'none'}>Rating {sortIcon('rating')}</TableCell>
                                <TableCell align="right" scope="col">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginated.map((r)=> (
                                <TableRow key={r.id} hover sx={(t)=>({
                                    '&:nth-of-type(odd)': { backgroundColor: alpha(t.palette.text.primary, t.palette.mode==='dark'?0.04:0.02) },
                                })}>
                                    <TableCell title={r.title} sx={{ maxWidth: 220 }}>
                                        <Typography noWrap fontWeight={700}>{r.title}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ maxWidth: 140 }}>
                                        <Chip label={r.category || '-'} size="small" />
                                    </TableCell>
                                    <TableCell align="right">{typeof r.price==='number' ? `$${r.price}` : '-'}</TableCell>
                                    <TableCell align="right">{Number(r.rating||0).toFixed(1)}</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="View">
                                            <IconButton size="small" component={RouterLink} to={`/courses/${r.id}`}><VisibilityIcon fontSize="small"/></IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {!paginated.length && (
                                <TableRow><TableCell colSpan={5} align="center" sx={{ py:4, color:'text.secondary' }}>No results</TableCell></TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    component="div"
                    count={filtered.length}
                    page={page}
                    onPageChange={(_, p)=>setPage(p)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(e)=>{ setRowsPerPage(parseInt(e.target.value,10)); setPage(0); }}
                    rowsPerPageOptions={[5,10,25]}
                    labelDisplayedRows={({ from, to, count }) => `${from}–${to} of ${count}`}
                />
            </CardContent>
        </Card>
    );
}

function CategoryOverview({ categories }) {
    const entries = Object.entries(categories)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6);
    const total = entries.reduce((s, e) => s + e.count, 0) || 1;
    const colorFor = (theme, name) => {
        const map = {
            Programming: theme.palette.secondary.main,
            Science: theme.palette.success.main,
            Health: theme.palette.error.main,
            Languages: theme.palette.info?.main || theme.palette.secondary.light,
            History: theme.palette.warning.main,
            Music: theme.palette.primary.dark,
            Art: theme.palette.secondary.dark,
            Writing: theme.palette.primary.main,
            Math: theme.palette.success.dark,
            Culinary: theme.palette.error.dark,
            Photography: theme.palette.info?.dark || theme.palette.secondary.main,
            General: theme.palette.primary.light,
        };
        return map[name] || theme.palette.primary.main;
    };
    return (
        <Card sx={(theme) => ({
            borderRadius: 3,
            backgroundColor: alpha(theme.palette.secondary.dark, theme.palette.mode === 'dark' ? 0.26 : 0.1),
            border: `1px solid ${alpha(theme.palette.secondary.main, 0.18)}`,
            boxShadow: theme.customShadows?.card,
            height: '100%',
        })}>
            <CardContent>
                <Typography variant="subtitle1" fontWeight={900} sx={{ mb: 1 }}>Categories Overview</Typography>
                {entries.map((e) => (
                    <Box key={e.name} sx={{ mb: 1.25 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{e.name}</Typography>
                            <Chip size="small" label={e.count} sx={{ fontWeight: 700 }} />
                        </Box>
                        <Box sx={(theme) => {
                            const c = colorFor(theme, e.name);
                            return {
                                '& .MuiLinearProgress-root': { height: 8, borderRadius: 6 },
                                '& .MuiLinearProgress-bar': { backgroundColor: c },
                                '& .MuiLinearProgress-colorPrimary': { backgroundColor: alpha(c, 0.2) },
                            };
                        }}>
                            <LinearProgress variant="determinate" value={(e.count / total) * 100} />
                        </Box>
                    </Box>
                ))}
                {!entries.length && (
                    <Typography variant="body2" color="text.secondary">No categories</Typography>
                )}
            </CardContent>
        </Card>
    );
}

export default function AdminDashboard() {
    const { courses, seed } = useCourses();
    const { teachers } = useTeachers();

    useEffect(() => {
        seed();
    }, [seed]);

    const totalCourses = courses.length;
    const totalTeachers = teachers.length;

    const avgPrice = useMemo(() => {
        const priced = courses.filter((c) => typeof c.price === "number");
        if (!priced.length) return 0;
        const sum = priced.reduce((s, c) => s + (c.price || 0), 0);
        return Math.round((sum / priced.length) * 100) / 100;
    }, [courses]);

    const recentCourses = useMemo(
        () => courses.slice(-6).reverse().map((c) => ({ id: c.id, title: c.title, meta: c.category || "-" })),
        [courses]
    );

    const recentTeachers = useMemo(
        () => teachers.slice(-6).reverse().map((t) => ({ id: t.id, title: t.name, meta: t.subject || "-" })),
        [teachers]
    );

    const priced = useMemo(() => courses.filter(c => typeof c.price === 'number'), [courses]);
    const priceStats = useMemo(() => {
        const prices = priced.map(c => Number(c.price) || 0);
        const min = prices.length ? Math.min(...prices) : 0;
        const max = prices.length ? Math.max(...prices) : 0;
        return { min, max };
    }, [priced]);

    const ratingAvg = useMemo(() => {
        const rated = courses.filter(c => typeof c.rating === 'number');
        if (!rated.length) return 0;
        const sum = rated.reduce((s, c) => s + (Number(c.rating) || 0), 0);
        return Math.round((sum / rated.length) * 100) / 100;
    }, [courses]);

    const paidCount = useMemo(() => courses.filter(c => (Number(c.price) || 0) > 0).length, [courses]);
    const freeCount = Math.max(0, totalCourses - paidCount);

    const categoryCounts = useMemo(() => {
        const map = {};
        for (const c of courses) {
            const key = c.category || 'General';
            map[key] = (map[key] || 0) + 1;
        }
        return map;
    }, [courses]);

    const users = useMemo(() => {
        try {
            const keys = Object.keys(localStorage);
            const emails = keys.filter(k => k.startsWith('edudu:uid:')).map(k => k.replace('edudu:uid:', ''));
            const uniq = Array.from(new Set(emails));
            return uniq.map((email) => {
                const id = localStorage.getItem(`edudu:uid:${email}`);
                const name = localStorage.getItem(`edudu:name:${id}`) || email.split('@')[0];
                const role = localStorage.getItem(`edudu:role:${id}`) || 'student';
                return { id, title: name, meta: `${role} • ${email}` };
            });
        } catch {
            return [];
        }
    }, []);

    return (
        <>
            <Grid container spacing={2.5} sx={{ mb: 2 }} alignItems="stretch">
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Total Courses" value={totalCourses} hint="All courses in system" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Total Teachers" value={totalTeachers} hint="Active teachers" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Avg Course Price" value={`$${avgPrice.toFixed ? avgPrice.toFixed(2) : avgPrice}`} hint="Across priced courses" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Avg Rating" value={ratingAvg.toFixed ? ratingAvg.toFixed(2) : ratingAvg} hint="Across rated courses" />
                </Grid>
            </Grid>

            <Grid container spacing={2.5} alignItems="stretch" sx={{ mb: 2 }}>
                <Grid item xs={12} md={7}>
                    <CoursesTableCard rows={courses} />
                </Grid>
                <Grid item xs={12} md={5}>
                    <ListCard title="Recent Teachers" rows={recentTeachers} linkPrefix="/teachers" />
                </Grid>
            </Grid>

            <Grid container spacing={2.5} alignItems="stretch">
                <Grid item xs={12} md={7}>
                    <CategoryOverview categories={categoryCounts} />
                </Grid>
                <Grid item xs={12} md={5}>
                    <Card sx={(theme) => ({
                        borderRadius: 3,
                        backgroundColor: alpha(theme.palette.secondary.dark, theme.palette.mode === 'dark' ? 0.26 : 0.1),
                        border: `1px solid ${alpha(theme.palette.secondary.main, 0.18)}`,
                        boxShadow: theme.customShadows?.card,
                        height: '100%',
                    })}>
                        <CardContent>
                            <Typography variant="subtitle1" fontWeight={900} sx={{ mb: 2 }}>Price Summary</Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                <Chip label={`Paid: ${paidCount}`} color="success" variant="outlined" />
                                <Chip label={`Free: ${freeCount}`} color="info" variant="outlined" />
                                <Chip label={`Min: $${priceStats.min}`} variant="outlined" />
                                <Chip label={`Max: $${priceStats.max}`} variant="outlined" />
                            </Box>
                            <Box sx={(theme) => ({ mt: 2, position: 'relative', height: 16, borderRadius: 8, backgroundColor: alpha(theme.palette.primary.main, 0.15) })}>
                                {(() => {
                                    const min = priceStats.min;
                                    const max = priceStats.max;
                                    const avg = Number(isNaN(+avgPrice) ? 0 : +avgPrice);
                                    const range = Math.max(1, max - min);
                                    const pos = Math.min(100, Math.max(0, ((avg - min) / range) * 100));
                                    return (
                                        <>
                                            <Box sx={(theme) => ({ position: 'absolute', left: 0, top: 0, bottom: 0, borderRadius: 8, background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.35)} 0%, ${alpha(theme.palette.secondary.main, 0.35)} 100%)`, right: 0 })} />
                                            <Box sx={(theme) => ({ position: 'absolute', top: '50%', left: `${pos}%`, transform: 'translate(-50%, -50%)', width: 14, height: 14, borderRadius: '50%', backgroundColor: theme.palette.primary.main, boxShadow: '0 0 0 3px rgba(0,0,0,0.15)' })} />
                                            <Box sx={{ position: 'absolute', top: 18, left: 0, fontSize: 12, color: 'text.secondary' }}>${'{'}min{'}'}</Box>
                                            <Box sx={{ position: 'absolute', top: 18, right: 0, fontSize: 12, color: 'text.secondary' }}>${'{'}max{'}'}</Box>
                                            <Box sx={{ position: 'absolute', top: 18, left: `calc(${pos}% - 12px)`, fontSize: 12, color: 'text.secondary', whiteSpace: 'nowrap' }}>avg ${'{'}avg.toFixed ? avg.toFixed(2) : avg{'}'}</Box>
                                        </>
                                    );
                                })()}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={2.5} alignItems="stretch" sx={{ mt: 0 }}>
                <Grid item xs={12}>
                    <ListCard title="Users (Students & Admins)" rows={users} linkPrefix="/profile" />
                </Grid>
            </Grid>
        </>
    );
}
