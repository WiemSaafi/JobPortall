import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { userSingleAction, userUpdateAction } from '../../redux/actions/userAction';
import { Button, InputAdornment } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HomeIcon from '@mui/icons-material/Home';
import freeImage from '../../img/wave7.png';
import { useParams } from 'react-router-dom';

const UserUpdateDashboard = () => {
    const { id } = useParams();

    // const { user } = useSelector(state => state.userProfile);
    const [user, setUser] = useState()
    const [updatedUser, setUpdatedUser] = useState();
    const [file, setFile] = useState(null); // Nouvelle variable d'état pour le fichier
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUpdatedUser(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await dispatch(userSingleAction(id));
                setUpdatedUser(data?.user)
                setUser(data?.user)
                console.log("User Data:", data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
    
        fetchUserData();
    }, [dispatch, id]);
    const handleSelectFile = (e) => setFile(e.target.files[0]); // Met à jour la valeur de file

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('file', file);
        dispatch(userUpdateAction(updatedUser, user._id));
    };
    const handleButtonClick = () => {
        // Changer la couleur du bouton lorsqu'un utilisateur fait une sélection
        setButtonColor('linear-gradient(to right, #7209B7, #3A0CA3  )');
      };
    const [buttonColor, setButtonColor] = useState('linear-gradient(to right, #F72585, #7209B7)');


    return (
        <Box sx={{
            marginTop: '400px', // Augmentez cette valeur pour la déplacer plus haut
            height: '80vh', // Réduisez cette valeur pour réduire la hauteur
            maxWidth: "100%",
            margin: "1%",
            pt: -50,
            animation: 'fadeIn 2s'
          }}>
             {user && (
            <Card sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '16px', overflow: 'hidden' }}>
                <CardContent sx={{ background: 'linear-gradient(to right, #f8f9fa, #e9ecef)' }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                            <Typography variant="h8" sx={{ color: "#3A0CA3" }}>
                                Informations Personnelles  
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={updatedUser?.email ||''}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon sx={{ color: "#F72585"}} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
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
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon sx={{ color: "#F72585" }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
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
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon sx={{ color: "#F72585" }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
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
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneIcon sx={{ color: "#F72585" }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
    <TextField
        id="dateOfBirth"
        label="Date de Naissance"
        variant="outlined"
        fullWidth
        value={updatedUser?.dateOfBirth || ''}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <CalendarTodayIcon style={{ color: '#F72585' }} />
                </InputAdornment>
            ),
            readOnly: true,
            sx: { borderRadius: '10px' }
        }}
    />
</Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                id="address"
                                label="Adresse"
                                variant="outlined"
                                fullWidth
                                value={updatedUser.address}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <HomeIcon sx={{ color: "#F72585"}} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                            />
                        </Grid>
                    </Grid>

                    

                    <Button
                        onClick={handleSubmit}
                       
                        sx={{
                            marginTop: '10px',
                            background: buttonColor,
                            color: '#fff',
                            '&:hover': {
                              background: buttonColor,
                            },
                            borderRadius: '10px',
                            transition: 'transform 0.3s ease',
                            '&:disabled': {
                              background: "#F72585",
                              color: '#e9ecef'
                            }
                          }}
                    >
                        Soumettre 
                    </Button>
                </CardContent>
                <img
  src={freeImage}
  alt="Free Image"
  className="moving-image"
  style={{ 
    maxWidth: '125%', 
    objectFit: 'cover',
    margin: '55',
    marginTop: '-325px', // Ajustez cette valeur pour déplacer l'image plus haut
  }}
/>

            </Card>
             )}
        </Box>
    );
};

export default UserUpdateDashboard;
