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
    

 const [url,setUrl] = useState("");
  
 // objectif teena nebaath tswira taay ll cloud ye9belha menha yebaathli un api pch ensteemlo w afficheler taswira te3y
 //fct hedhy pch taaml une requete poste aala adrresse api w pech tebaath meeha fichier wel peset eli taswira taay en7ebha tsejel aaleha keelh lezem nestaaml form data
 
 
 
 const uploadedPhoto = async () => {
 try {
     const form = new FormData()
     form.append('file',file)
     form.append('upload_preset',"wiemsa");
     //axios lezem erejeeli reponse
     const response = await axios.post('https://api.cloudinary.com/v1_1/ddlsrj3cn/upload' ,form); //https://api.cloudinary.com/v1_1/:cloud_name/:action
         console.log(response.data.url);
         handleUpload(response.data.url);
 
 } catch (error) {
     console.error('Error uploading image:', error.message);
 }
 };
 
 

    //just heka eli ken 
    useEffect(() => {
        const storedPhotoDataURL = localStorage.getItem('userphoto');
        if (storedPhotoDataURL) {
            setPhoto(storedPhotoDataURL);
        }
    }, []); 

     const handlePhotoUpload = async (event) => {
        const uploadedPhoto = event.target.files[0];
        setFile(uploadedPhoto);
        setPhoto(URL.createObjectURL(uploadedPhoto));
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
        <Box sx={{ maxWidth: "92%", margin: "6.25%", pt: 0 }}>
            <Card
                style={{
                    borderRadius: '15px',
                    overflow: 'hidden',
                    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
                    border: `2px solid ${isHovered ? '#0b3948' : 'transparent'}`,
                    transition: 'border-color 0.3s ease'
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <CardContent>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" style={{ fontSize: '29px', fontWeight: 'bold', color: '#0b3948', marginBottom: '-12px' }}>
                                Personal Info
                            </Typography>
                        </Grid>
                       
                        <Grid item xs={12} md={6} style={{ textAlign: 'right' }}>
                            <label htmlFor="photo-upload">
                                <input
                                    id="photo-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                    style={{ display: 'none' }}
                                />
                                <IconButton component="span">
                                    <PhotoCameraIcon />
                                </IconButton>
                            </label>
                        </Grid>
                        <button onClick={uploadedPhoto}> upload ! </button>  
            <img src = {URL}/> 
                        {photo && (
                            <Grid item xs={12} md={6}>
                                <img
                                    src={photo}
                                    alt="User"
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '100%',
                                        marginTop: '2px',
                                        transition: 'transform 0.1 ease',
                                        transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                                    }}
                                />
                            </Grid>
                        )}
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={user ? user.email : ""}
                                InputProps={{
                                    sx: {
                                        color: isHovered ? '#0b3948' : 'black',
                                        borderRadius: '8px',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: isHovered ? '#0b3948' : 'transparent',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#0b3948',
                                        },
                                    },
                                    disableUnderline: true,
                                    focused: {
                                        borderColor: 'blue'
                                    }
                                }}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="firstName"
                                label="First name"
                                variant="outlined"
                                fullWidth
                                value={user ? user.firstName : ""}
                                InputProps={{
                                    sx: {
                                        color: isHovered ? '#0b3948' : 'black',
                                        borderRadius: '9px',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: isHovered ? '#0b3948' : 'transparent',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#0b3948',
                                        },
                                    },
                                    disableUnderline: true,
                                    focused: {
                                        borderColor: 'blue'
                                    }
                                }}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="lastName"
                                label="Last name"
                                variant="outlined"
                                fullWidth
                                value={user ? user.lastName : ""}
                                InputProps={{
                                    sx: {
                                        color: isHovered ? '#0b3948' : 'black',
                                        borderRadius: '8px',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: isHovered ? '#0b3948' : 'transparent',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#0b3948',
                                        },
                                    },
                                    disableUnderline: true,
                                    focused: {
                                        borderColor: 'blue'
                                    }
                                }}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="phone"
                                label="Phone number"
                                variant="outlined"
                                fullWidth
                                value={user ? user.phone : ""}
                                InputProps={{
                                    sx: {
                                        color: isHovered ? '#0b3948' : 'black',
                                        borderRadius: '8px',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: isHovered ? '#0b3948' : 'transparent',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#0b3948',
                                        },
                                    },
                                    disableUnderline: true,
                                    focused: {
                                        borderColor: 'blue'
                                    }
                                }}
                                
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="address"
                                label="Address"
                                variant="outlined"
                                fullWidth
                                value={user ? user.address : ""}
                                InputProps={{
                                    sx: {
                                        color: isHovered ? '#0b3948' : 'black',
                                        borderRadius: '8px',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: isHovered ? '#0b3948' : 'transparent',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#0b3948',
                                        },
                                    },
                                    disableUnderline: true,
                                    focused: {
                                        borderColor: 'blue'
                                    }
                                }}
                                disabled
                            />
                        </Grid>
                    </Grid>
                    <Typography style={{ marginTop: '16px', color: "grey" }} color="text.secondary">
                        Status: {user ? (user.role === 0 ? "Regular user" : "Admin") : ""}
                    </Typography>
                    <Button onClick={handleSubmit}>Submit</Button>
                </CardContent>
            </Card>
        </Box>
    );
};







// //wiemsa
// //const handleUpload  =async () => {
  

//  const [file,setFile] = useState(null)
// const [url,setUrl] = useState("");
 
// // objectif teena nebaath tswira taay ll cloud ye9belha menha yebaathli un api pch ensteemlo w afficheler taswira te3y
// //fct hedhy pch taaml une requete poste aala adrresse api w pech tebaath meeha fichier wel peset eli taswira taay en7ebha tsejel aaleha keelh lezem nestaaml form data



// const uploadedPhoto = async () => {
// try {
//     const form = new FormData()
//     form.append('file',file)
//     form.append('upload_preset',"wiemsa");
//     //axios lezem erejeeli reponse
//     const response = await axios.post('https://api.cloudinary.com/v2_1/upload' ,form);
//     response.then (result=>{
//         console.log(result.data.secure.URL);

// });
// } catch (error) {
//     console.error('Error uploading image:', error.message);
// }
// };


//     return (
//         <div className='upload'>
//             <input type ="file" value={file}
//             onChange={(e)=>setFile(e.target.files[0])} />
//             <br/>
 
//         </div>
//     );

 
export default UserInfoDashboard;