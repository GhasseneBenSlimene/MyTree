import * as React from 'react';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
export default function Profile(dataGet) {

  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const showInfo = async () => {
    try {
      setOpen(true);

      axios.get(`http://localhost:5000/valid/info/${dataGet.id}`)
        .then(response => {
          // Handle successful response here
          console.log("Response:", response.data.person);
          setData(response.data.person);
        })
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={showInfo}>
      <VisibilityIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Profile
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          {data? (

            <div>
              <p>Nom: {data.nom}</p>
              <p>Prénom: {data.prenom}</p>
              <p>Sexe: {data.sexe}</p>
              <p>Professions: {data.professions}</p>
              <p>Adresse: {data.adresse}</p>

              <p>tel: {data.tel}</p>


              {/* Add more properties as needed */}
            </div>           ) : (
        <p>No data to display</p>
      )}
            
             </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};