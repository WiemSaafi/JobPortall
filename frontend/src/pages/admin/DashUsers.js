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
import freeImage from '../../img/wave777.png';
const DashUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allUserAction());
    }, [dispatch]);

    const { success } = useSelector(state => state.deleteUser || {});

    const { users } = useSelector(state => state.allUsers);
    const data = users || [];

    const deleteUserById = (id) => {
        if (window.confirm(`Are you sure you want to delete user ID: "${id}"?`)) {
            dispatch(deleteUSERAction(id));

            // if (success && success === true) {
                dispatch(allUserAction());
            // }
        }
    }
 
    const columns = [
        {
            field: 'firstName',
            headerName: 'Prénom',
            width: 120,
           
        },
        {
             
        
            width: 120,
            renderCell: (params) => (
                <Link to={`/employee/details/${params.row._id}`}>
                    <Button
                        variant="contained"
                        startIcon={<VisibilityIcon sx={{ marginLeft: '8px' }}/>}
                        sx={{
                            bgcolor: "#F20089",
                            color: 'white',
                            borderRadius: '10px',
                            '&:hover': {
                                bgcolor: "#E500A4",
                            },
                            '&:active': {
                                bgcolor: "#E500A4",
                            },
                            '& .MuiButton-label': {
                                textTransform: 'none',
                            },
                            minWidth: '40px',
                            mr: 3,
                             
                        }}
                    >
                        
                    </Button>
                </Link>
 
            
            )
        },
        {
            field: 'email',
            headerName: 'E-mail',
            width: 250,
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
            width: 200,
            renderCell: (values) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>








<Link   to={`/admin/edit/user/${values.row._id}`}> 
                <Button variant="contained" startIcon={<EditIcon sx={{ marginLeft: '8px' }}/>}
                
                    sx={{
                        bgcolor: "#7209B7",
                        color: 'white',
                        borderRadius: '10px',
                        '&:hover': {
                            bgcolor: "#9a21e9",
                        },
                        '&:active': {
                            bgcolor: "#9a21e9",
                        },
                        '& .MuiButton-label': {
                            textTransform: 'none',
                            
                        },
                        minWidth: '40px',
                        mr: 3,
                    }}
                >
                  
                </Button>
                </Link>
    







                <Button
                    onClick={() => deleteUserById(values.row._id)}
                    variant="contained"
                    startIcon={<DeleteIcon sx={{ marginLeft: '8px' }} />}
                    sx={{
                        bgcolor: " #b3105b    ",
                        color: 'white',
                        borderRadius: '10px',
                        '&:hover': {
                            bgcolor: "#F72585 ",
                        },
                        '&:active': {
                            bgcolor: "#F72585",
                        },
                        '& .MuiButton-label': {
                            textTransform: 'none',
                             
                        },
                        minWidth: '40px',
                        mr: 3,

                    }}
                >
                 
                </Button>





 
            </Box>
            
            )
        }
    ];
 
 
 
    return (


        <Box>
 <Link  to="/admin/user/create">
                <Button  
    variant="contained" 
    startIcon={<AddIcon sx={{ marginLeft: '8px' }} />}
    sx={{
        bgcolor: "#3A0CA3",
        color: 'white',
        borderRadius: '10px',  // Ajout de la propriété border-radius
        '&:hover': {
            bgcolor: "#4361EE",
        },
        '&:active': {
            bgcolor: "#4361EE",
        },
        '& .MuiButton-label': {
            textTransform: 'none',
        },
        marginTop: '-8px', // Ajout de la marge en haut
        minWidth: '40px',
        mr: 1,
    }}
>
      
</Button>

</Link>



   <Typography variant='h8' sx={{ color: "#3A0CA3", pb: 0.5, borderBottom: '2px solid #3A0CA3', display: 'block', position: 'absolute', top: 65, left: 290, zIndex: 1000 }}>
          Listes des employés
          </Typography>
           
            <Box sx={{ pb: 6.75, display: "flex", justifyContent: "flex-end" }}>
    



            </Box>
            <Paper sx={{ bgcolor: "#fff", borderRadius: 6 }}>
                <Box sx={{ height: 555, width: '100%' , marginTop: '-50px'}}>
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
    marginTop: '-550px' // Ajustez cette valeur pour déplacer l'image plus haut
  }}
/>
        </Box>
    );
}

export default DashUsers;
