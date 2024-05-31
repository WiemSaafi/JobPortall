import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { userSingleAction } from '../../redux/actions/userAction';
import { heuredepartjourAction, userSingleHeureAction } from '../../redux/actions/heuredépart';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import { Fade } from '@mui/material';
import {   CalendarToday as CalendarIcon, Event as EventIcon, FlightLand as FlightLandIcon } from '@mui/icons-material';
import FaceIcon from '@mui/icons-material/Face';
import { motion } from 'framer-motion';
 



const InfoUser = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [derniereEntree, setderniereheure] = useState(null);
    
    const [ derniereSortie, setderniereSortie] = useState(null);
  
    const [isHovered] = useState(false);
    const [selectedJour, setSelectedJour] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [heuresDépartJourMois, setheuresDépartJourMois] = useState([]);
    const userProfile = useSelector(state => state.userProfile);
    const getDerniereEntreeSortie = useSelector(state => state.getDerniereEntreeSortie);
    

    useEffect(() => {
        dispatch(userSingleHeureAction(id));
    }, [dispatch, id]);

  
    // useEffect(() => {
    //     setUser(userProfile.user);
    // }, [userProfile.user]);

    
    useEffect(() => {
        setderniereheure(getDerniereEntreeSortie?.derniereEntree);
        setderniereSortie(getDerniereEntreeSortie?.derniereSortie);
    }, [getDerniereEntreeSortie]);
  ;
  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const data = await dispatch(userSingleAction(id));
            setUser(data?.user)
            console.log("User Data:", data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    fetchUserData();
}, [dispatch, id]);
   

    const handleChangeJour = (event) => {
        setSelectedJour(event.target.value);
    };

    const handleChangeMonth = (event) => {
        setSelectedMonth(event.target.value);
    };
    const handleChangeYear = (event) => {
        setSelectedYear(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (selectedJour && selectedMonth && selectedYear) {
                try {
                    const data = await dispatch(heuredepartjourAction(selectedJour, selectedMonth, selectedYear));
                    setheuresDépartJourMois(data);
                } catch (error) {
                    console.error('Erreur lors de la récupération des heures de départ:', error);
                }
            }
        };

        fetchData();
    }, [dispatch, selectedJour, selectedMonth, selectedYear]);
    const currentYear = new Date().getFullYear();



// jw card
return (
    <Box sx={{  marginTop: '-20px',height: '95vh', backgroundColor: '#f0f2f5' }}>
        {user && (
            <Card
                style={{
                    borderRadius: '15px',
                    overflow: 'hidden',
                     
                    border: '2px solid transparent',
                    transition: 'border-color 0.3s ease'
                }}
            >
                <CardContent>
                <Typography variant="h8" sx={{ color: '#3A0CA3' }}>
    Informations Personnelles
</Typography>
<div style={{ height: '20px' }}></div>




                    <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="firstName"
                                    label="Nom"
                                    variant="outlined"
                                    fullWidth
                                    value={user.firstName}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon style={{ color: '#F72585' }} />
                                            </InputAdornment>
                                        ),
                                        readOnly: true
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="lastName"
                                    label="Prénom"
                                    variant="outlined"
                                    fullWidth
                                    value={user.lastName}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon style={{ color: '#F72585' }} />
                                            </InputAdornment>
                                        ),
                                        readOnly: true
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="dateOfBirth"
                                    label="Date de Naissance"
                                    variant="outlined"
                                    fullWidth
                                    value={user.dateOfBirth}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CalendarTodayIcon style={{ color: '#F72585' }} />
                                            </InputAdornment>
                                        ),
                                        readOnly: true
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    value={user.email}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon style={{ color: '#F72585' }} />
                                            </InputAdornment>
                                        ),
                                        readOnly: true
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="phone"
                                    label="Téléphone"
                                    variant="outlined"
                                    fullWidth
                                    value={user.phone}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PhoneIcon style={{ color: '#F72585' }} />
                                            </InputAdornment>
                                        ),
                                        readOnly: true
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id="address"
                                    label="Adresse"
                                    variant="outlined"
                                    fullWidth
                                    value={user.address}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <HomeIcon style={{ color: '#F72585' }} />
                                            </InputAdornment>
                                        ),
                                        readOnly: true
                                    }}
                                />
                            </Grid>
                        </Grid>



                        <CardContent>

                        <Typography variant="h8" sx={{ color: '#3A0CA3' }}>
                        Sélectionner une date
</Typography>
<div style={{ height: '20px' }}></div>

 
    <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} sm={4}>
            <Fade in={true} timeout={1000}>
               
                    <FormControl fullWidth variant="outlined">
    <InputLabel id="select-jour-label">Jour</InputLabel>
    <Select
        labelId="select-jour-label"
        id="select-jour"
        value={selectedJour}
        onChange={handleChangeJour}
        label="Jour"
        style={{ backgroundColor: '#FFf' }}
        startAdornment={<EventIcon style={{ color: '#F72585' }}/>}
    >
                        <MenuItem value="lundi">Lundi</MenuItem>
                        <MenuItem value="mardi">Mardi</MenuItem>
                        <MenuItem value="mercredi">Mercredi</MenuItem>
                        <MenuItem value="jeudi">Jeudi</MenuItem>
                        <MenuItem value="vendredi">Vendredi</MenuItem>
                        <MenuItem value="samedi">Samedi</MenuItem>
                    </Select>
                </FormControl>
            </Fade>
        </Grid>
        <Grid item xs={12} sm={4}>
            <Fade in={true} timeout={1500}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel id="select-mois-label">Mois</InputLabel>
                    <Select
                        labelId="select-mois-label"
                        id="select-mois"
                        value={selectedMonth}
                        onChange={handleChangeMonth}
                        label="Mois"
                        style={{ backgroundColor: '#FFf' }}
                        startAdornment={<CalendarTodayIcon style={{ color: '#F72585' }} />}




                        
                    >
                        <MenuItem value="janvier">Janvier</MenuItem>
                        <MenuItem value="février">Février</MenuItem>
                        <MenuItem value="mars">Mars</MenuItem>
                        <MenuItem value="avril">Avril</MenuItem>
                        <MenuItem value="mai">Mai</MenuItem>
                        <MenuItem value="juin">Juin</MenuItem>
                        <MenuItem value="juillet">Juillet</MenuItem>
                        <MenuItem value="août">Août</MenuItem>
                        <MenuItem value="septembre">Septembre</MenuItem>
                        <MenuItem value="octobre">Octobre</MenuItem>
                        <MenuItem value="novembre">Novembre</MenuItem>
                        <MenuItem value="décembre">Décembre</MenuItem>
                    </Select>
                </FormControl>
            </Fade>
        </Grid>
        <Grid item xs={12} sm={4}>
            <Fade in={true} timeout={2000}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel id="select-annee-label">Année</InputLabel>
                    <Select
                        labelId="select-annee-label"
                        id="select-annee"
                        value={selectedYear}
                        onChange={handleChangeYear}
                        label="Année"
                        style={{ backgroundColor: '#FFf' }}
                        startAdornment={<EventIcon style={{ color: '#F72585' }} />}
                    >
                        <MenuItem value=""><em>Aucun</em></MenuItem>
                        {Array.from({ length: 21 }, (_, i) => currentYear - 10 + i).map(year => (
                            <MenuItem key={year} value={year}>{year}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Fade>
        </Grid>
    </Grid>
</CardContent>

                        
     
    








<Typography variant="h8" sx={{ color: '#3A0CA3' }}>
Heures de départ et de sortie
</Typography>
<div style={{ height: '20px' }}></div>
 
  
    <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <TextField
                    id="heureDerniereEntree"
                    label="Dernière heure d'entrée"
                    variant="outlined"
                    fullWidth
                    value={derniereEntree ? moment(derniereEntree.Heure).format('HH:mm') : ''}
                    InputProps={{
                        readOnly: true,
                        startAdornment: <AccessTimeIcon sx={{ color: '#F72585', marginRight: '10px' }} />
                    }}
                />
            </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <TextField
                    id="heureDerniereSortie"
                    label="Dernière heure de sortie"
                    variant="outlined"
                    fullWidth
                    value={derniereSortie ? moment(derniereSortie.Heure).format('HH:mm') : ''}
                    InputProps={{
                        readOnly: true,
                        startAdornment: <AccessTimeIcon sx={{ color: '#F72585', marginRight: '10px' }} />
                    }}
                />
            </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
                <TextField
                    id="heureDepartJourEntree"
                    label={`Heure(s) d'entrée (${selectedJour} ${selectedMonth} ${selectedYear})`}
                    variant="outlined"
                    fullWidth
                    value={heuresDépartJourMois
                        .filter(heure => heure.typeHeure === 'entrée')
                        .map(heure => moment(heure.Heure).format('HH:mm'))
                        .join(', ')
                    }
                    InputProps={{
                        readOnly: true,
                        startAdornment: <EventIcon sx={{ color: '#F72585', marginRight: '10px' }} />
                    }}
                />         
            </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
                <TextField
                    id="heureDepartJourSortie"
                    label={`Heure(s) de sortie (${selectedJour} ${selectedMonth} ${selectedYear})`}
                    variant="outlined"
                    fullWidth
                    value={heuresDépartJourMois
                        .filter(heure => heure.typeHeure === 'sortie')
                        .map(heure => moment(heure.Heure).format('HH:mm'))
                        .join(', ')
                    }
                    InputProps={{
                        readOnly: true,
                        startAdornment: <EventIcon sx={{ color: '#F72585', marginRight: '10px' }} />
                    }}
                />
            </motion.div>
        </Grid>
    </Grid>
</CardContent>

 




            </Card>
        )}
    </Box>
);
};

export default InfoUser;
