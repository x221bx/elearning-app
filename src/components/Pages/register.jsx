import React, { useState } from "react";
import pic1 from "../../assets/images/pic1.jpg";
import {
    Dialog, DialogTitle, DialogContent,
    TextField, Button, Box, Avatar, Typography, MenuItem
} from "@mui/material";
import useAuth from "../../hooks/useAuth";

const LS = { email:"userEmail", password:"userPassword", name:"userName", role:"userRole" };

export default function RegisterModal({ open, onClose }) {
    const { setCredentials } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState(""); // student | teacher
    const [errors, setErrors] = useState({});

    const submit = (e) => {
        e.preventDefault();
        const errs = {};
        if (!username.trim()) errs.username = "Username is required.";
        else if (!/^[a-zA-Z\s]+$/.test(username)) errs.username = "Username can only contain letters.";
        if (!email.trim()) errs.email = "Email is required.";
        else if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = "Email format is invalid.";
        if (!password) errs.password = "Password is required.";
        else if (password.length < 6) errs.password = "Password must be at least 6 characters.";
        if (!role) errs.role = "Role is required.";
        setErrors(errs);
        if (Object.keys(errs).length) return;

        localStorage.setItem(LS.email, email);
        localStorage.setItem(LS.password, password);
        localStorage.setItem(LS.name, username);
        localStorage.setItem(LS.role, role);
        setCredentials({ email, name: username, role });

        setUsername(""); setEmail(""); setPassword(""); setRole("");
        onClose?.();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth
                PaperProps={{ sx: { borderRadius: 2, backgroundColor: "var(--card-bg)", overflow: "hidden" } }}>
            <DialogTitle component="div" textAlign="center" sx={{ pb: 0 }}>
                <Avatar sx={{ width: 60, height: 60, mx: "auto", mb: 1 }} src={pic1} />
                <Typography variant="h6" component="h2">Sign Up</Typography>
            </DialogTitle>
            <DialogContent sx={{ p: 2 }}>
                <Box component="form" onSubmit={submit}
                     sx={{ backgroundColor: "var(--card-bg)", borderRadius: 2, boxShadow: "var(--card-shadow)", p: 2 }}>
                    <TextField fullWidth size="small" label="Username" margin="dense"
                               value={username} onChange={(e)=>setUsername(e.target.value)}
                               error={!!errors.username} helperText={errors.username} />
                    <TextField fullWidth size="small" label="Email" type="email" margin="dense"
                               value={email} onChange={(e)=>setEmail(e.target.value)}
                               error={!!errors.email} helperText={errors.email} />
                    <TextField fullWidth size="small" label="Password" type="password" margin="dense"
                               value={password} onChange={(e)=>setPassword(e.target.value)}
                               error={!!errors.password} helperText={errors.password} />
                    <TextField select fullWidth size="small" label="Role" value={role} margin="dense"
                               onChange={(e)=>setRole(e.target.value)} error={!!errors.role} helperText={errors.role}>
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="teacher">Teacher</MenuItem>
                    </TextField>
                    <Button type="submit" fullWidth variant="contained"
                            sx={{ mt: 2, borderRadius: "20px", fontWeight: "bold", backgroundColor: "var(--primary-btn-bg)", color: "var(--primary-btn-color)", textTransform: "none",
                                "&:hover": { backgroundColor: "var(--primary-btn-hover)" } }}>
                        Sign Up
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
