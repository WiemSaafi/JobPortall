import React, { useEffect } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { allUserAction, deleteUSERAction } from '../../redux/actions/userAction';
import VisibilityIcon from '@mui/icons-material/Visibility';
import freeImage from '../../img/wave8.png';
const DashUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allUserAction());
    }, [dispatch]);

    const { success: deleteSuccess } = useSelector(state => state.deleteUser || {});

    const { users } = useSelector(state => state.allUsers);
    const data = users || [];

    const deleteUserById = (id) => {
        if (window.confirm(`Are you sure you want to delete user ID: "${id}"?`)) {
            dispatch(deleteUSERAction(id));
            if (deleteSuccess && deleteSuccess === true) {
                dispatch(allUserAction());
            }
        }
    }

    const columns = [
        {
            field: 'firstName',
            headerName: 'Prénom',
            width: 150,
            renderCell: (params) => (
                <Link
                to={`/employee/details/${params.row._id}`}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: "#3A0CA3",
                    textDecoration: 'none',
                     
                    '&:hover': {
                        color: "#fff",
                        textDecoration: 'underline',
                    },
                }}
            >
                {params.value}
                <VisibilityIcon sx={{ marginLeft: 2, fontSize: 'large' }} />
            </Link>
            
            )
        },
        {
            field: 'email',
            headerName: 'E-mail',
            width: 230,
        },
        {
            field: 'role',
            headerName: "Statut de l'utilisateur",
            width: 230,
            renderCell: (params) => (
                params.row.role === 1 ? "Admin" : "Regular User"
            )
        },
        {
            field: 'createdAt',
            headerName: 'Date de création',
            width: 230,
            renderCell: (params) => (
                moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS')
            )
        },
        {
            field: "Actions",
            headerName: "Actions",
            width: 300,
            renderCell: (values) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    sx={{
                        bgcolor: "#F72585",
                        color: 'white',
                        '&:hover': {
                            bgcolor: "#7209B7",
                        },
                        '&:active': {
                            bgcolor: "#39999f",
                        },
                        '& .MuiButton-label': {
                            textTransform: 'none',
                            
                        },
                        minWidth: '100px',
                        mr: 1,
                    }}
                >
                    <Link style={{ color: "white", textDecoration: "none" }} to={`/admin/edit/user/${values.row._id}`}>Modifier</Link>
                </Button>
                <Button
                    onClick={() => deleteUserById(values.row._id)}
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    sx={{
                        bgcolor: "#7209B7",
                        color: 'white',
                        '&:hover': {
                            bgcolor: "#3A0CA3",
                        },
                        '&:active': {
                            bgcolor: "#39999f",
                        },
                        '& .MuiButton-label': {
                            textTransform: 'none',
                             
                        },
                        minWidth: '100px',
                        mr: 1,
                    }}
                >
                    Supprimer
                </Button>
            </Box>
            
            )
        }
    ];
 
 
 
    return (
        <Box>
   <Typography variant='h8' sx={{ color: "#3A0CA3", pb: 0.5, borderBottom: '2px solid #3A0CA3', display: 'block', position: 'absolute', top: 80, left: 290, zIndex: 1000 }}>
          Listes des employés
          </Typography>
           
            <Box sx={{ pb: 8, display: "flex", justifyContent: "flex-end" }}>
            <Button
    variant="contained"
    startIcon={<AddIcon />}
    sx={{
        bgcolor: "#3A0CA3",
        color: 'white',
        '&:hover': {
            bgcolor: "#4361EE",
        },
        '&:active': {
            bgcolor: "#39999f",
        },
        '& .MuiButton-label': {
            textTransform: 'none',
            
        },
        marginTop: '5px', // Ajout de la marge en haut
    }}
>
    <Link style={{ color: "white", textDecoration: "none" }} to="/admin/user/create">Créer un utilisateur</Link>
</Button>


            </Box>
            <Paper sx={{ bgcolor: "#fff", borderRadius: 6 }}>
                <Box sx={{ height: 360, width: '100%' , marginTop: '-50px'}}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        rows={data}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        components={{ Toolbar: GridToolbar }}
                    />
                </Box>
            </Paper>
            <img
  src={freeImage}
  alt="Free Image"
  className="moving-image"
  style={{ 
    maxWidth: '100%', 
    objectFit: 'cover',
    marginTop: '-160px' // Ajustez cette valeur pour déplacer l'image plus haut
  }}
/>
        </Box>
    );
}

export default DashUsers;
