import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { userUpdateAction } from '../../redux/actions/userAction';
import { Button } from '@mui/material';

const UserUpdateDashboard = () => {
    const { user } = useSelector(state => state.userProfile);
    const [updatedUser, setUpdatedUser] = useState(user);
    const [file, setFile] = useState(null); // Nouvelle variable d'état pour le fichier
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUpdatedUser(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSelectFile = (e) => setFile(e.target.files[0]); // Met à jour la valeur de file

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('file', file);
        dispatch(userUpdateAction(formData, user._id));
    };

    return (
        <Box sx={{ maxWidth: "100%", margin: "3%", pt: -80 }}>
            <Card>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                            <Typography variant="h5">
                                Informations Personnelles
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={updatedUser.email}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="firstName"
                                label="Prénom"
                                variant="outlined"
                                fullWidth
                                value={updatedUser.firstName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="lastName"
                                label="Nom"
                                variant="outlined"
                                fullWidth
                                value={updatedUser.lastName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="phone"
                                label="Téléphone"
                                variant="outlined"
                                fullWidth
                                value={updatedUser.phone}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>
                 
                    <Typography style={{ marginTop: '16px', color: "#666" }}>
                         Statut: {user ? (user.role === 0 ? "Utilisateur régulier" : "Administrateur") : ""}
                         </Typography>

                    <Button onClick={handleSubmit} disabled={!file}>Soumettre</Button> {/* Bouton désactivé si aucun fichier n'est sélectionné */}
                </CardContent>
            </Card>
        </Box>
    );
};

export default UserUpdateDashboard;
