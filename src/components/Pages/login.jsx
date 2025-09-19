import React, { useState } from "react";
import pic1 from "../../assets/images/pic1.jpg";
import {
    Dialog, DialogTitle, DialogContent, TextField, Button, Box, Avatar, Typography
} from "@mui/material";
import useAuth from "../../hooks/useAuth";

const LS = { email:"userEmail", password:"userPassword", name:"userName", role:"userRole" };

export default function LoginModal({ open, onClose }) {
    const { setCredentials } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState({ mail: "", pass: "", auth: "" });

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        setErr((p) => ({
            ...p,
            [name === "email" ? "mail" : "pass"]: value ? "" : `${name === "email" ? "Email" : "Password"} is required`,
            auth: ""
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setErr({
                mail: !email ? "Email is required" : "",
                pass: !password ? "Password is required" : "",
                auth: "",
            });
            return;
        }

        const savedEmail = localStorage.getItem(LS.email);
        const savedPassword = localStorage.getItem(LS.password);
        const savedName = localStorage.getItem(LS.name) || "";
        const savedRole = localStorage.getItem(LS.role) || "student";

        const loginOk = () => {
            setCredentials({ email: savedEmail || email, name: savedName, role: savedRole });
            setErr({ mail: "", pass: "", auth: "" });
            onClose?.();
        };

        if (email === savedEmail && password === savedPassword) {
            loginOk();
            return;
        }

        // باكدور teacher اختياري
        if (email === "teacher@edudu.com" && password === "admin") {
            localStorage.setItem(LS.email, email);
            localStorage.setItem(LS.password, password);
            localStorage.setItem(LS.name, "Teacher Admin");
            localStorage.setItem(LS.role, "teacher");
            setCredentials({ email, name: "Teacher Admin", role: "teacher" });
            onClose?.();
            return;
        }

        setErr((p) => ({ ...p, auth: "Invalid email or password." }));
    };

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: 3, backgroundColor: "#f5f5f5" } }}>
            <DialogTitle component="div" sx={{ textAlign: "center" }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Avatar sx={{ width: 80, height: 80, mb: 1 }} src={pic1} />
                    <Typography variant="h6" component="h2">Login</Typography>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    onSubmit={submit}
                    sx={{ mt: 1, p: 4, backgroundColor: "#fff", borderRadius: 2, boxShadow: "0px 4px 20px rgba(0,0,0,0.1)", maxWidth: 400, mx: "auto" }}
                >
                    <TextField fullWidth label="Email" type="email" margin="normal" name="email" value={email} onChange={onChange}
                               error={!!err.mail} helperText={err.mail} />
                    <TextField fullWidth label="Password" type="password" margin="normal" name="password" value={password} onChange={onChange}
                               error={!!err.pass} helperText={err.pass} />
                    {err.auth && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{err.auth}</Typography>}
                    <Button type="submit" fullWidth variant="contained"
                            sx={{
                                mt: 3, width: 140, mx: "auto", display: "block", borderRadius: "30px",
                                fontWeight: "bold", textTransform: "none", backgroundColor: "#fbc02d", color: "#000",
                                "&:hover": { backgroundColor: "#f9a825" }
                            }}>
                        Login
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
