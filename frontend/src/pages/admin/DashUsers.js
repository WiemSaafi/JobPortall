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
                    color: '	#107dac',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    '&:hover': {
                        color: '#1565c0',
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
            width: 270,
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
            width: 220,
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
                        bgcolor: '#4caf50',
                        color: 'white',
                        '&:hover': {
                            bgcolor: '#388e3c',
                        },
                        '&:active': {
                            bgcolor: '#317331',
                        },
                        '& .MuiButton-label': {
                            textTransform: 'none',
                            fontWeight: 'bold',
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
                        bgcolor: '#f44336',
                        color: 'white',
                        '&:hover': {
                            bgcolor: '#d32f2f',
                        },
                        '&:active': {
                            bgcolor: '#b71c1c',
                        },
                        '& .MuiButton-label': {
                            textTransform: 'none',
                            fontWeight: 'bold',
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
   <Typography variant='h7' sx={{ color: "black", pb: 0.5, borderBottom: '2px solid black', display: 'block', position: 'absolute', top: 80, left: 290, zIndex: 1000 }}>
          Listes des employés
          </Typography>
           
            <Box sx={{ pb: 5, display: "flex", justifyContent: "flex-end" }}>
            <Button
    variant="contained"
    startIcon={<AddIcon />}
    sx={{
        bgcolor: '#5099b9',
        color: 'white',
        '&:hover': {
            bgcolor: '#3d7f9e',
        },
        '&:active': {
            bgcolor: '#306580',
        },
        '& .MuiButton-label': {
            textTransform: 'none',
            fontWeight: 'bold',
        },
        marginTop: '50px', // Ajout de la marge en haut
    }}
>
    <Link style={{ color: "white", textDecoration: "none" }} to="/admin/user/create">Créer un utilisateur</Link>
</Button>


            </Box>
            <Paper sx={{ bgcolor: "#f5f5f5", borderRadius: 8 }}>
                <Box sx={{ height: 400, width: '100%' }}>
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
        </Box>
    );
}

export default DashUsers;
