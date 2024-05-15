// DashUsers.js

import React, { useEffect } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { allUserAction, deleteUSERAction } from '../../redux/actions/userAction';

const DashUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allUserAction());
    }, [dispatch]);

    const { success: deleteSuccess } = useSelector(state => state.deleteUser || {});

    const { users } = useSelector(state => state.allUsers);
    const data = users || [];

    const deleteUserById = (e, id) => {
        if (window.confirm(`You really want to delete product ID: "${id}" ?`)) {
            dispatch(deleteUSERAction(id));
            if (deleteSuccess && deleteSuccess === true) {
                dispatch(allUserAction());
            }
        }
    }

    const columns = [
        {
            field: 'firstName',
            headerName: 'First',
            width: 150,
            renderCell: (params) => {
                if (params.row.role !== 1) { // Vérifie si l'utilisateur n'est pas un admin
                    return (
                        <Link to={`/employee/details/${params.row._id}`} style={{ color: 'white', textDecoration: 'none' }}>
                            {params.value}
                        </Link>
                    );
                } else {
                    return params.value; // Retourne simplement le prénom sans lien pour les admins
                }
            }
        },
        {
            field: 'email',
            headerName: 'E_mail',
            width: 150,
        },
        {
            field: 'role',
            headerName: 'User status',
            width: 150,
            renderCell: (params) => (
                params.row.role === 1 ? "Admin" : "Regular user"
            )
        },
        {
            field: 'createdAt',
            headerName: 'Creation date',
            width: 150,
            renderCell: (params) => (
                moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS')
            )
        },
        {
            field: "Actions",
            width: 200,
            renderCell: (values) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    <Button variant="contained"><Link style={{ color: "white", textDecoration: "none" }} to={`/admin/edit/user/${values.row._id}`}>Edit</Link></Button>
                    <Button onClick={(e) => deleteUserById(e, values.row._id)} variant="contained" color="error">Delete</Button>
                </Box>
            )
        }
    ];

    return (
        <>
            <Box>
                <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                    All users
                </Typography>
                <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                    <Button variant='contained' color="success" startIcon={<AddIcon />}><Link style={{ color: "white", textDecoration: "none" }} to="/admin/user/create">CREATE USER</Link></Button>
                </Box>
                <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            sx={{
                                '& .MuiTablePagination-displayedRows': {
                                    color: 'white',
                                },
                                color: 'white',
                                [`& .${gridClasses.row}`]: {
                                    bgcolor: (theme) =>
                                        theme.palette.secondary.main
                                },
                                button: {
                                    color: 'red'
                                }
                            }}
                            getRowId={(row) => row._id}
                            rows={data}
                            columns={columns}
                            pageSize={4}
                            rowsPerPageOptions={[4]}
                            checkboxSelection
                            slots={{ toolbar: GridToolbar }}
                        />
                    </Box>
                </Paper>
            </Box>
        </>
    );
}

export default DashUsers;
