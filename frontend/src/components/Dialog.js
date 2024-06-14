import * as React from 'react';
import { Popper } from '@mui/base/Popper';
import { styled, css } from '@mui/system';
import { Tab } from '@mui/base/Tab';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tabs } from '@mui/base/Tabs';
import "./styles/dialog.css"
import { Switch, switchClasses } from '@mui/base/Switch';
import axios from 'axios';
import { useState } from 'react';
import Button from '@mui/material/Button';

export default function Dialog(data) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const label = { slotProps: { input: { 'aria-label': 'Demo switch' } } };
    const [switchStateUser, setSwitchStateUser] = useState(data.user);  // reccupere l'etat initial de l'utilisateur  (format booleen)
    const [switchStateAdmin, setSwitchStateAdmin] = useState(data.admin);
    const [switchStateActive, setSwitchStateActive] = useState(data.active); // reccupere la status initiale de l'utilisateur (format booleen)
    const [switchStateAttente, setSwitchStateAttente] = useState(data.attente);
    const [switchStateRefuse, setSwitchStateRefuse] = useState(data.refuse);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    // open component or close component 
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    // change user status with switch  
    const handleStatusSwitchStateActive = () => {
        setSwitchStateActive(true)
        setSwitchStateAttente(false)
        setSwitchStateRefuse(false)
        handleUpdate("Active")
    }
    const handleStatusSwitchStateAttente = () => {
        setSwitchStateActive(false)
        setSwitchStateAttente(true)
        setSwitchStateRefuse(false)
        handleUpdate("en attente")
    }
    const handleStatusSwitchStateRefuse = () => {
        setSwitchStateActive(false)
        setSwitchStateAttente(false)
        setSwitchStateRefuse(true)
        handleUpdate("refuse")
    }
    // change user role
    const handleSwitchChangeAdmin = () => {
        setSwitchStateAdmin(true);
        setSwitchStateUser(false);
        handleUpdateUserToAdmin('admin')
    };
    const handleSwitchChangeUser = () => {
        setSwitchStateUser(true);
        setSwitchStateAdmin(false);
        handleUpdateUserToAdmin('user')
    };
    // refresh page 
    const handleRefresh = () => {
        window.location.reload();
    };
    // request to api (valid user and render user to admin)
    const handleUpdate = async (status) => {
        try {
            axios.put(`http://localhost:5000/valid/${data.id}/${status}`);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
    const handleUpdateUserToAdmin = async (role) => {
        try {
            axios.put(`http://localhost:5000/share/${data.id}/${role}`);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
    return (
        <div>
            <TriggerButton aria-describedby={id} type="button" onClick={handleClick}>
                Edit
            </TriggerButton>
            <Popper id={id} open={open} anchorEl={anchorEl}>
                <StyledPopperDiv>
                    <Tabs defaultValue={1}>
                        <TabsList>
                            <Tab value={1} >Role</Tab>

                            <Tab value={2}>Status</Tab>
                        </TabsList>
                        <TabPanel value={1}>
                            <div class='role'>

                                <div>
                                    <tr>
                                        <td>
                                            <label>
                                                Admin
                                            </label>
                                        </td>
                                        <td>   <Switch
                                            slots={{
                                                root: Root,
                                            }}
                                            {...label}
                                            onChange={handleSwitchChangeAdmin}
                                            checked={switchStateAdmin}
                                        />
                                        </td>

                                    </tr>
                                    <br />
                                    <label>Utilisateur
                                        <Switch
                                            slots={{
                                                root: Root,
                                            }}
                                            {...label}
                                            onChange={handleSwitchChangeUser}
                                            checked={switchStateUser}


                                        />
                                    </label>

                                </div>
                            </div>

                        </TabPanel>
                        <TabPanel value={2}>
                            <tr>
                                <td>
                                    <label>Accepté
                                    </label>
                                </td>
                                <td>
                                    <Switch
                                        slots={{
                                            root: Root,
                                        }}
                                        {...label}
                                        onChange={handleStatusSwitchStateActive}
                                        checked={switchStateActive}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <label>En attente
                                    </label>
                                </td>
                                <td>
                                    <Switch
                                        slots={{
                                            root: Root,
                                        }}
                                        {...label}
                                        onChange={handleStatusSwitchStateAttente}
                                        checked={switchStateAttente}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Refusé
                                    </label>
                                </td>
                                <td>
                                    <Switch
                                        slots={{
                                            root: Root,
                                        }}
                                        {...label}
                                        onChange={handleStatusSwitchStateRefuse}
                                        checked={switchStateRefuse}
                                    />
                                </td>
                            </tr>
                        </TabPanel>
                        <div class="controle" >
                            <Button autoFocus onClick={handleClick}>
                                Cancel
                            </Button>
                            <Button autoFocus onClick={handleRefresh}>
                                confirmer
                            </Button>
                        </div>

                    </Tabs>

                </StyledPopperDiv>
            </Popper>
        </div >
    );
};
// code css 
const Root = styled('span')(
    ({ theme }) => `
    box-sizing: border-box;
    font-size: 0;
    position: relative;
    display: inline-block;
    width: 38px;
    height: 24px;
    cursor: pointer;
    margin-left:5px;
    vertical-align: bottom;

    &.${switchClasses.disabled} {
      opacity: 0.4;
      cursor: not-allowed;
    }
  
    & .${switchClasses.track} {
      box-sizing: border-box;
      background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
      border-radius: 24px;
      display: block;
      height: 100%;
      width: 100%;
      position: absolute;
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 120ms;
      box-shadow: inset 0px 1px 1px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.05)'
        };
    }
  
    &:hover .${switchClasses.track} {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }
  
    &.${switchClasses.focusVisible} .${switchClasses.track} {
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
    }
  
    & .${switchClasses.thumb} {
      box-sizing: border-box;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
      display: block;
      width: 16px;
      height: 16px;
      top: 4px;
      left: 4px;
      border-radius: 16px;
      background-color: #FFF;
      position: relative;
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 120ms;
      box-shadow: 0px 1px 2px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.1)'
        };
    }
  
    &.${switchClasses.checked} {
      .${switchClasses.thumb} {
        left: 18px;
        background-color: #fff;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
      }
  
      .${switchClasses.track} {
        border: none;
        background: ${blue[500]};
      }
    }
  
    &:hover .${switchClasses.checked} .${switchClasses.track} {
      background: ${blue[700]};
    }
  
    & .${switchClasses.input} {
      cursor: inherit;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
      z-index: 1;
      margin: 0;
    }
    `,
); 
const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#99CCF3',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
    800: '#004C99',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const TriggerButton = styled('button')(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${blue[500]};
  box-shadow: 0 2px 1px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
        }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

  &:hover {
    background-color: ${blue[600]};
  }

  &:active {
    background-color: ${blue[700]};
    box-shadow: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }

  &.disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
    &:hover {
      background-color: ${blue[500]};
    }
  }
`,
);

const StyledPopperDiv = styled('div')(
    ({ theme }) => css`
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: ${theme.palette.mode === 'dark'
            ? `0px 4px 8px rgb(0 0 0 / 0.7)`
            : `0px 4px 8px rgb(0 0 0 / 0.1)`};
    padding: 0.75rem;
    color: ${theme.palette.mode === 'dark' ? grey[100] : grey[700]};
    font-size: 0.875rem;
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    opacity: 1;
    margin: 0.25rem 0;
    height:230px;
    width:180px
  `,
);