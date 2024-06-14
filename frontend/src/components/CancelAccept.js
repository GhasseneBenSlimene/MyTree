import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import axios from 'axios';

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

export default function CancelAccept(data) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const deleteUser = async () => {
        try {
            axios.delete(`http://localhost:5000/delete/${data.email}`);

        } catch (error) {
            console.error('Error deleting item:', error);
        }

        setOpen(false);

    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                delete
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    supprimer
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        confirmer la supression de l'utilisateur
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={deleteUser}>confirmer</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}