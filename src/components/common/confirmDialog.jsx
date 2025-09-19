import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';

export default function ConfirmDialog({
    open,
    onClose,
    onConfirm,
    title = 'Confirm Action',
    message = 'Are you sure you want to proceed?',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    severity = 'warning' // 'warning' | 'error' | 'info'
}) {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    const getButtonColor = () => {
        switch (severity) {
            case 'error':
                return 'error';
            case 'warning':
                return 'warning';
            default:
                return 'primary';
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
        >
            <DialogTitle id="confirm-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="confirm-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">
                    {cancelText}
                </Button>
                <Button
                    onClick={handleConfirm}
                    color={getButtonColor()}
                    variant="contained"
                    autoFocus
                >
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
