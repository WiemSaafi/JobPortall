 

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
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import AlarmIcon from '@mui/icons-material/Alarm';
import TimerIcon from '@mui/icons-material/Timer';
import freeImage from '../../img/wave7.png';
 



const UserDashboard= () => {
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

  
    useEffect(() => {
        setUser(userProfile.user);
    }, [userProfile.user]);
    useEffect(() => {
        setderniereheure(getDerniereEntreeSortie?.derniereEntree);
        setderniereSortie(getDerniereEntreeSortie?.derniereSortie);
    }, [getDerniereEntreeSortie]);
  ;
    useEffect(() => {
        dispatch(userSingleAction(id));
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
    <Box sx={{ marginTop: '-45px', height: '35vh', backgroundColor: '#f0f2f5' }}>
        {user && (
            <Card
                sx={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                     
                    transition: 'border-color 0.3s ease',
                    padding: '16px',
                    marginTop: '16px'
                }}
            >
                
                


                   

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
                startAdornment={<EventIcon style={{ color: '#F72585' }} />}
                sx={{
                    backgroundColor: '#FFF',
                    borderRadius: '10px'
                }}
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
                                        style={{ backgroundColor: '#FFF' }}
                                        startAdornment={<CalendarTodayIcon style={{ color: '#F72585' }} />}
                                        sx={{
                                            backgroundColor: '#FFF',
                                            borderRadius: '10px'
                                        }}
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
                                        style={{ backgroundColor: '#FFF' }}
                                        startAdornment={<EventIcon style={{ color: '#F72585' }} />}
                                        sx={{
                                            backgroundColor: '#FFF',
                                            borderRadius: '10px'
                                        }}
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

                <CardContent>
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
                startAdornment: <AccessTimeIcon sx={{ color: '#F72585', marginRight: '10px' }} />,
                sx: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderRadius: '10px',
                    }
                }
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
                                        startAdornment: <AccessTimeIcon sx={{ color: '#F72585', marginRight: '10px' }} />,
                                        sx: {
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderRadius: '10px',
                                            }
                                        }
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
                                        .join(', ')}
                                    InputProps={{
                                        readOnly: true,
                                        startAdornment: <EventIcon sx={{ color: '#F72585', marginRight: '10px' }} />,
                                        sx: {
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderRadius: '10px',
                                            }
                                        }
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
                                        .join(', ')}
                                    InputProps={{
                                        readOnly: true,
                                        startAdornment: <EventIcon sx={{ color: '#F72585', marginRight: '10px' }} />,
                                        sx: {
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderRadius: '10px',
                                            }
                                        }
                                    }}
                                />
                            </motion.div>
                        </Grid>



 


                        <Grid item xs={12} md={4}>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 8 }} transition={{ duration: 0.5, delay: 0.6 }}>
                                <TextField
                                    id="heureCalculéParJour"
                                    label={`Heure(s) travaillé(es) (${selectedJour} ${selectedMonth} ${selectedYear})`}
                                    variant="outlined"
                                    fullWidth
                                    value={heuresDépartJourMois
                                        .filter(heure => heure.typeHeure === 'sortie')
                                        .map(heure => moment(heure.Heure).format('HH:mm'))
                                        .join(', ')}
                                    InputProps={{
                                        readOnly: true,
                                        startAdornment: <AccessTimeIcon sx={{ color: '#F72585', marginRight: '10px' }} />,
                                        sx: {
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderRadius: '10px',
                                            }
                                        }
                                    }}
                                />
                            </motion.div>
                        </Grid>



                        <Grid item xs={5} md={4}>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
                                <TextField
                                    id="heureSupplimentaireJour"
                                    label={`Heure(s) supplimentaire(s) (${selectedJour} ${selectedMonth} ${selectedYear})`}
                                    variant="outlined"
                                    fullWidth
                                    value={heuresDépartJourMois
                                        .filter(heure => heure.typeHeure === 'sortie')
                                        .map(heure => moment(heure.Heure).format('HH:mm'))
                                        .join(', ')}
                                    InputProps={{
                                        readOnly: true,
                                        startAdornment: <TimerIcon sx={{ color: '#F72585', marginRight: '10px' }} />,
                                        sx: {
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderRadius: '10px',
                                            }
                                        }
                                    }}
                                />
                            </motion.div>
                        </Grid>




                        <Grid item xs={12} md={4}>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
                                <TextField
                                    id="RetardJour"
                                    label={`temps de retard (${selectedJour} ${selectedMonth} ${selectedYear})`}
                                    variant="outlined"
                                    fullWidth
                                    value={heuresDépartJourMois
                                        .filter(heure => heure.typeHeure === 'sortie')
                                        .map(heure => moment(heure.Heure).format('HH:mm'))
                                        .join(', ')}
                                    InputProps={{
                                        readOnly: true,
                                        startAdornment: <HourglassEmptyIcon sx={{ color: '#F72585', marginRight: '10px' }} />,
                                        sx: {
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderRadius: '10px',
                                            }
                                        }
                                    }}
                                />
                            </motion.div>
                        </Grid>


                    </Grid>
                </CardContent>
            </Card>
        )}
                        <img
  src={freeImage}
  alt="Free Image"
  className="moving-image"
  style={{ 
    maxWidth: '100%', 
    objectFit: 'cover',
    marginTop: '-210px' // Ajustez cette valeur pour déplacer l'image plus haut
  }}
/>
    </Box>
);
};
export default UserDashboard