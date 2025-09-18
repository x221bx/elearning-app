// components/Pages/register.jsx
import React, { useState } from "react";
import pic1 from "../../assets/images/pic1.jpg";
import {
    Dialog, DialogTitle, DialogContent, TextField, Button, Box, Avatar, Typography, MenuItem
} from "@mui/material";
import useAuth from "../../hooks/useAuth";

export default function RegisterModal({ open, onClose }) {
    const { setCredentials } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [errors, setErrors] = useState({});

    const submit = (e) => {
        e.preventDefault();
        const errs = {};
        if (!username.trim()) errs.username = "Username is required.";
        if (!email.trim()) errs.email = "Email is required.";
        if (!password) errs.password = "Password is required.";
        if (!role) errs.role = "Role is required.";
        setErrors(errs);
        if (Object.keys(errs).length) return;

        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);
        localStorage.setItem("userName", username);
        localStorage.setItem("userRole", role);

        setCredentials({ email, name: username, role });
        setUsername(""); setEmail(""); setPassword(""); setRole("");
        onClose?.();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 2, backgroundColor: "#f5f5f5", overflow: "hidden" } }}>
            <DialogTitle textAlign="center" sx={{ pb: 0 }}>
                <Avatar sx={{ width: 60, height: 60, mx: "auto", mb: 1 }} src={pic1} />
                <Typography variant="h6">Sign Up</Typography>
            </DialogTitle>
            <DialogContent sx={{ p: 2 }}>
                <Box component="form" onSubmit={submit} sx={{ backgroundColor: "#fff", borderRadius: 2, boxShadow: "0px 2px 12px rgba(0,0,0,0.08)", p: 2 }}>
                    <TextField fullWidth size="small" label="Username" margin="dense" value={username} onChange={(e)=>setUsername(e.target.value)} error={!!errors.username} helperText={errors.username} />
                    <TextField fullWidth size="small" label="Email" type="email" margin="dense" value={email} onChange={(e)=>setEmail(e.target.value)} error={!!errors.email} helperText={errors.email} />
                    <TextField fullWidth size="small" label="Password" type="password" margin="dense" value={password} onChange={(e)=>setPassword(e.target.value)} error={!!errors.password} helperText={errors.password} />
                    <TextField select fullWidth size="small" label="Role" value={role} margin="dense" onChange={(e)=>setRole(e.target.value)} error={!!errors.role} helperText={errors.role}>
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="teacher">Teacher</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </TextField>
                    <Button type="submit" fullWidth variant="contained"
                            sx={{ mt: 2, borderRadius: "20px", fontWeight: "bold", backgroundColor: "#fbc02d", color: "#000", textTransform: "none" }}>
                        Sign Up
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
