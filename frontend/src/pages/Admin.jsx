import React, { useState, useEffect } from 'react';
// import "./styles/AdminPage.css"
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Dialog from '../components/Dialog';
import CancelAccept from '../components/CancelAccept';
import Profile from '../components/profile'
function Table({ isLoggedIn, isAdmin}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/list/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  
  // la colaration des cellules selon status
  var green = "#2ECC71"
  const renderCell = (params) => {
    let style = {};
    if (params.value === 'Active') {
      style = { backgroundColor: green, textAlign: "center", color: "#145A32" };
    } else if (params.value === 'en attente') {
      style = { backgroundColor: '#F0B27A', textAlign: "center", color: "##D35400" };
    } else {
      style = { backgroundColor: '#E74C3C', textAlign: "center", color: "#7B241C" };
    }
    return <div style={style}>{params.value}</div>;
  };


  const columns = [
    { field: '_id', headerName: 'ID', width: 90 },
    { field: 'email', headerName: 'email', width: 150 },
    {
      field: 'role', headerName: 'Role', width: 150, editable: true
    },
    {
      field: 'status',
      headerName: 'status',
      width: 110,
      editable: true,
      renderCell,
    },
    {
      field: 'profile',
      headerName: 'profile',
      width: 110,
      editable: true,
      renderCell : (params) => {
        return (
          <Profile id={params.row._id} >

          </Profile>        
          
          )
    }
    },

    {
      field: 'Edit',
      headerName: 'Action',
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <Dialog
            id={params.row._id}
            active={params.row.status === "Active" ? true : false}
            attente={params.row.status === "en attente" ? true : false}
            refuse={params.row.status === "refusé" ? true : false}
            admin={params.row.role === "admin" ? true : false}
            user={params.row.role === "user" ? true : false}
          ></Dialog>
        );
      },
    },

    {
      field: 'Autre',
      headerName: 'Autre',
      sortable: false,
      width: 180,
      renderCell: (params) => {
        return (
          <CancelAccept email={params.row.email}></CancelAccept>
        );
      },
    },


  ];

  const getRowId = (row) => row._id; // Assuming _id is unique


  return (
    <div>
      {isLoggedIn && isAdmin ? (
        <div style={{ height: 700, width: '100%', background: 'white' }}>
          <DataGrid rows={data} columns={columns} pageSize={5} getRowId={getRowId} />
        </div>
      ) : (
        <>Vous ne pouvez pas accéder à cette page</>
      )}
    </div>
  );  
}
export default Table;