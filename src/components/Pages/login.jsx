// components/Pages/login.jsx
import React, { useState } from "react";
import pic1 from "../../assets/images/pic1.jpg";
import {
    Dialog, DialogTitle, DialogContent, TextField, Button, Box, Avatar, Typography
} from "@mui/material";
import useAuth from "../../hooks/useAuth";

export default function LoginModal({ open, onClose }) {
    const { setCredentials } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");

    const submit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setErr("Email and password are required.");
            return;
        }
        // read saved creds from localStorage (created by Register)
        const savedEmail = localStorage.getItem("userEmail");
        const savedPassword = localStorage.getItem("userPassword");
        const savedName = localStorage.getItem("userName");
        const savedRole = localStorage.getItem("userRole");

        if (email === savedEmail && password === savedPassword) {
            setCredentials({ email: savedEmail, name: savedName, role: savedRole });
            setErr("");
            onClose?.();
        } else {
            // quick admin login helper (اختياري)
            if (email === "admin@edudu.com" && password === "admin") {
                localStorage.setItem("userEmail", email);
                localStorage.setItem("userName", "Admin");
                localStorage.setItem("userRole", "admin");
                localStorage.setItem("userPassword", password);
                setCredentials({ email, name: "Admin", role: "admin" });
                onClose?.();
                return;
            }
            setErr("Invalid email or password.");
        }
    };

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: 3, backgroundColor: "#f5f5f5" } }}>
            <DialogTitle sx={{ textAlign: "center" }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Avatar sx={{ width: 80, height: 80, mb: 1 }} src={pic1} />
                    <Typography variant="h6">Login</Typography>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={submit}
                     sx={{ mt: 1, p: 4, backgroundColor: "#fff", borderRadius: 2, boxShadow: "0px 4px 20px rgba(0,0,0,0.1)", maxWidth: 400, mx: "auto" }}>
                    <TextField fullWidth label="Email" type="email" margin="normal" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    {err && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{err}</Typography>}
                    <Button type="submit" fullWidth variant="contained"
                            sx={{ mt: 3, width: 140, mx: "auto", display: "block", borderRadius: "30px", fontWeight: "bold", textTransform: "none", backgroundColor: "#fbc02d", color: "#000" }}>
                        Login
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
