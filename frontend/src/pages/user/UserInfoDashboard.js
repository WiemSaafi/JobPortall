import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useDispatch, useSelector } from 'react-redux';
import { userUpdateAction } from '../../redux/actions/userAction';
import axios from "axios";
import { Button } from '@mui/material';

const UserInfoDashboard = () => {
    const { user } = useSelector(state => state.userProfile);
    const [photo, setPhoto] = useState(null);
    const [file, setFile] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [res, setRes] = useState({});
    const [url,setUrl] = useState("");

    const handleSelectFile = (e) => setFile(e.target.files[0]);

    const handleUpload = async (img) => {
        try {
            setLoading(true);
            const data = new FormData();
            data.append("my_file", file);
            const res = await axios.put(`http://localhost:3000/api/user/edit/${user._id}`, {image:img});
            setRes(res.data);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };  

    const uploadedPhoto = async () => {
        try {
            const form = new FormData()
            form.append('file',file)
            form.append('upload_preset',"wiemsa");
            const response = await axios.post('https://api.cloudinary.com/v1_1/ddlsrj3cn/upload' ,form);
            setUrl(response.data.url);
            handleUpload(response.data.url);
        } catch (error) {
            console.error('Error uploading image:', error.message);
        }
    };

    useEffect(() => {
        const storedPhotoDataURL = localStorage.getItem('userphoto');
        if (storedPhotoDataURL) {
            setPhoto(storedPhotoDataURL);
        }
    }, []); 

    const handlePhotoUpload = async (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const uploadedPhoto = event.target.files[0];
            setFile(uploadedPhoto);
            setPhoto(URL.createObjectURL(uploadedPhoto));
        }
    };

    const handleSubmit = () => {
        if (!file) {
            console.error("Aucun fichier sélectionné.");
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        dispatch(userUpdateAction(formData, user._id));
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    }; 

    return (
        <Box sx={{ maxWidth: "100%", margin: "3%", pt: -80 }}>
            <Card
                style={{
                    borderRadius: '15px',
                    overflow: 'hidden',
                    boxShadow: '4px 4px 4px #ccc',
                    border: `2px solid ${isHovered ? '#ccc' : 'transparent'}`,
                    transition: 'border-color 0.8s ease'
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <CardContent sx={{ color: '#333' }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                            <Typography variant="h5" style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
                                Informations Personnelles 
                            </Typography>
                            <IconButton component="label" htmlFor="photo-upload">
    <PhotoCameraIcon />
</IconButton>
<input
    id="photo-upload"
    type="file"
    accept="image/*"
    onChange={handlePhotoUpload}
    style={{ display: 'none' }}
/>

                            <input
                                id="photo-upload"
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                style={{ display: 'none' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <img src={url ? url : (photo ? photo : '/default-avatar.png')} alt="User" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                            {isHovered && (
                                <IconButton style={{ position: 'absolute', top: '0', right: '0' }}>
                                    
                                </IconButton>
                            )}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={user ? user.email : ""}
                                InputProps={{
                                    sx: {
                                        borderRadius: '8px',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#666',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#666',
                                        },
                                    },
                                    disableUnderline: true,
                                    focused: {
                                        borderColor: '#666'
                                    }
                                }}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="firstName"
                                label="Prénom"
                                variant="outlined"
                                fullWidth
                                value={user ? user.firstName : ""}
                                InputProps={{
                                    sx: {
                                        borderRadius: '8px',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#666',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#666',
                                        },
                                    },
                                    disableUnderline: true,
                                    focused: {
                                        borderColor: '#666'
                                    }
                                }}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="lastName"
                                label="Nom"
                                variant="outlined"
                                fullWidth
                                value={user ? user.lastName : ""}
                                InputProps={{
                                    sx: {
                                        borderRadius: '8px',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#666',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#666',
                                        },
                                    },
                                    disableUnderline: true,
                                    focused: {
                                        borderColor: '#666'
                                    }
                                }}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="phone"
                                label="Téléphone"
                                variant="outlined"
                                fullWidth
                                value={user ? user.phone : ""}
                                InputProps={{
                                    sx: {
                                        borderRadius: '8px',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#666',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#666',
                                        },
                                    },
                                    disableUnderline: true,
                                    focused: {
                                        borderColor: '#666'
                                    }
                                }}
                                disabled
                            />
                        </Grid>
                    </Grid>
                    <Typography style={{ marginTop: '16px', color: "#666" }}>
                        Statut: {user ? (user.role === 0 ? "Utilisateur régulier" : "Administrateur") : ""}
                    </Typography>
                    <Button onClick={handleSubmit}>Soumettre</Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UserInfoDashboard;
