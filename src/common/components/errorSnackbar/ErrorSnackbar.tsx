import { selectError, setAppError } from '@/app/app-slice';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { useAppSelector } from '@/common/hooks/useAppSelector';
import { Alert } from '@mui/material';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { useState } from 'react';

export const ErrorSnackbar = () => {
    const [open, setOpen] = useState(true);
    const error = useAppSelector(selectError)
    const dispach = useAppDispatch()

    const handleClose = (
        _event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        dispach(setAppError({ error: null }))
        setOpen(false);
    };

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity="error"
                variant="filled"
                sx={{ width: '100%' }}
            >
                {error}
            </Alert>
        </Snackbar>
    );
}
