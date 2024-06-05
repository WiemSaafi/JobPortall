import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { userProfileAction, userSingleAction, userUpdateAction } from '../../redux/actions/userAction';
import { Button, InputAdornment } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HomeIcon from '@mui/icons-material/Home';
import freeImage from '../../img/wave7.png';
import { useParams } from 'react-router-dom';

const UserUpdateDashboard = () => {
    // const { user } = useSelector(state => state.userProfile);

    const [user, setUser] = useState()
    const [updatedUser, setUpdatedUser] = useState(user);
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
console.log("user",user)
useEffect(() => {
    setUpdatedUser(user)
}, [user?._id])

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUpdatedUser(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSelectFile = (e) => setFile(e.target.files[0]);

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('file', file);
        dispatch(userUpdateAction(updatedUser, user._id));
    };
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await dispatch(userProfileAction());
                setUser(data?.user)
                //updatedUser(data?.user)
                console.log("User Data:", data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
    
        fetchUserData();
    }, [dispatch]);

    const handleButtonClick = () => {
        // Changer la couleur du bouton lorsqu'un utilisateur fait une sélection
        setButtonColor('linear-gradient(to right, #7209B7, #3A0CA3  )');
      };
    const [buttonColor, setButtonColor] = useState('linear-gradient(to right, #F72585, #7209B7)');


    return (
        <Box sx={{ maxWidth: "100%", margin: "0%", pt: -200 }}>
            
            <Card sx={{ boxShadow: '5 14px 18px rgba(0, 0, 0, 0.2)', borderRadius: '15px', overflow: 'hidden' }}>
                <CardContent sx={{ background: 'linear-gradient(to right, #Fff)' }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                            <Typography variant="h8" sx={{  color: "#3A0CA3" }}>
                                Informations Personnelles  
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={updatedUser?.email}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon sx={{ color: "#F72585" }} />
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
                                value={updatedUser?.firstName}
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
                                value={updatedUser?.lastName}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon sx={{ color:"#F72585"}} />
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
                                value={updatedUser?.phone}
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
                                type="date"
                                variant="outlined"
                                fullWidth
                                value={updatedUser?.dateOfBirth}
                                onChange={handleInputChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CalendarTodayIcon sx={{ color:"#F72585" }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="address"
                                label="Adresse"
                                variant="outlined"
                                fullWidth
                                value={updatedUser?.address}
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
                      //  disabled={!file}
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
    maxWidth: '100%', 
    objectFit: 'cover',
    marginTop: '-140px' // Ajustez cette valeur pour déplacer l'image plus haut
  }}
/>
            </Card>
        

        </Box>
    );
};

export default UserUpdateDashboard;
