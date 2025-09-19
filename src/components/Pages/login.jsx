import React, { useState } from 'react';
import pic1 from "../../assets/images/pic1.jpg";
import {
  Dialog, DialogTitle, DialogContent,
  TextField, Button, Box, Avatar, Typography
} from '@mui/material';



function LoginModal({ open, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    mailErr: '',
    passErr: '',
    authErr: ''
  });

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
      setError((prev) => ({
        ...prev,
        mailErr: e.target.value ? '' : 'Email is required',
        authErr: ''
      }));
    } else if (e.target.name === "pass") {
      setPassword(e.target.value);
      setError((prev) => ({
        ...prev,
        passErr: e.target.value ? '' : 'Password is required',
        authErr: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError((prev) => ({
        ...prev,
        mailErr: !email ? 'Email is required' : '',
        passErr: !password ? 'Password is required' : '',
        authErr: ''
      }));
      return;
    }

    const savedEmail = localStorage.getItem('userEmail');
    const savedPassword = localStorage.getItem('userPassword');

    if (email === savedEmail && password === savedPassword) {
      setError({ mailErr: '', passErr: '', authErr: '' });
      onClose();
    } else {
      setError((prev) => ({
        ...prev,
        authErr: 'Invalid email or password.'
      }));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '30px',
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            sx={{ width: 80, height: 80, mb: 1 }}
            src={pic1}
          />
          <Typography variant="h6" component="div">Login</Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 1,
            p: 4,
            backgroundColor: '#fff',
            borderRadius: '20px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '400px',
            mx: 'auto',
          }}
        >
         
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            value={email}
            name="email"
            onChange={handleChange}
            error={!!error.mailErr}
            helperText={error.mailErr}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            name="pass"
            onChange={handleChange}
            error={!!error.passErr}
            helperText={error.passErr}
          />

          {error.authErr && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error.authErr}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              width: '140px',
              mx: 'auto',
              display: 'block',
              borderRadius: '30px',
              fontWeight: 'bold',
              textTransform: 'none',
              backgroundColor: '#fbc02d',
              color: '#000',
              '&:hover': {
                backgroundColor: '#f9a825',
              },
            }}
          >
            Login
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
