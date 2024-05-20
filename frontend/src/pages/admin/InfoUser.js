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
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';










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
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh', backgroundColor: '#f0f2f5' }}>
        {user && (
            <Card
                style={{
                    borderRadius: '15px',
                    overflow: 'hidden',
                    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
                    border: '2px solid transparent',
                    transition: 'border-color 0.3s ease'
                }}
            >
                <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#0b3948' }}>
                        Infos Personnelles
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="firstName"
                                label="Nom"
                                variant="outlined"
                                fullWidth
                                value={user.firstName}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="lastName"
                                label="Prénom"
                                variant="outlined"
                                fullWidth
                                value={user.lastName}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                       
                         
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="firstName"
                                label="Date de Naissance"
                                variant="outlined"
                                fullWidth
                                value={user.firstName}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="email"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={user.email}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="phone"
                                label="Téléphone"
                                variant="outlined"
                                fullWidth
                                value={user.phone}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="address"
                                label="Adresse"
                                variant="outlined"
                                fullWidth
                                value={user.address}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                       
                    </Grid>

                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 4, mb: 2, color: '#0b3948' }}>
                        Sélectionnez une date
                    </Typography>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={4}>
                            <ToggleButtonGroup
                                value={selectedJour}
                                exclusive
                                onChange={handleChangeJour}
                                aria-label="Jour"
                                fullWidth
                            >
                                <ToggleButton value="lundi">Lundi</ToggleButton>
                                <ToggleButton value="mardi">Mardi</ToggleButton>
                                <ToggleButton value="mercredi">Mercredi</ToggleButton>
                                <ToggleButton value="jeudi">Jeudi</ToggleButton>
                                <ToggleButton value="vendredi">Vendredi</ToggleButton>
                                <ToggleButton value="samedi">Samedi</ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <ToggleButtonGroup
                                value={selectedMonth}
                                exclusive
                                onChange={handleChangeMonth}
                                aria-label="Mois"
                                fullWidth
                            >
                                <ToggleButton value="janvier">Janvier</ToggleButton>
                                <ToggleButton value="février">Février</ToggleButton>
                                <ToggleButton value="mars">Mars</ToggleButton>
                                <ToggleButton value="avril">Avril</ToggleButton>
                                <ToggleButton value="mai">Mai</ToggleButton>
                                <ToggleButton value="juin">Juin</ToggleButton>
                                <ToggleButton value="juillet">Juillet</ToggleButton>
                                <ToggleButton value="août">Août</ToggleButton>
                                <ToggleButton value="septembre">Septembre</ToggleButton>
                                <ToggleButton value="octobre">Octobre</ToggleButton>
                                <ToggleButton value="novembre">Novembre</ToggleButton>
                                <ToggleButton value="décembre">Décembre</ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="select-annee-label">Année</InputLabel>
                                <Select
                                    labelId="select-annee-label"
                                    id="select-annee"
                                    value={selectedYear}
                                    onChange={handleChangeYear}
                                    label="Année"
                                >
                                    <MenuItem value=""><em>Aucun</em></MenuItem>
                                    {Array.from({ length: 21 }, (_, i) => currentYear - 10 + i).map(year => (
                                        <MenuItem key={year} value={year}>{year}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 4, mb: 2, color: '#0b3948' }}>
                        Heures de départ et de sortie
                    </Typography>
                    <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                            <TextField
                                id="heureDerniereEntree"
                                label="Dernière heure d'entrée"
                                variant="outlined"
                                fullWidth
                                value={derniereEntree ? moment(derniereEntree.Heure).format('HH:mm') : ''}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="heureDerniereSortie"
                                label="Dernière heure de sortie"
                                variant="outlined"
                                fullWidth
                                value={derniereSortie ? moment(derniereSortie.Heure).format('HH:mm') : ''}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                id="dateEntree"
                                label={`Date (s) d'Entrée (s) (${selectedJour} ${selectedMonth})`}
                                variant="outlined"
                                fullWidth
                                value={heuresDépartJourMois.filter(heure => heure.typeHeure === 'entrée').map(heure => moment(heure.Heure).format('YYYY-MM-DD')).join(', ')}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                id="heureDepartJourEntree"
                                label={`Heure (s) d'Entrée (s)(${selectedJour} ${selectedMonth} ${selectedYear})`}
                                variant="outlined"
                                fullWidth
                                value={heuresDépartJourMois.filter(heure => heure.typeHeure === 'entrée').map(heure => moment(heure.Heure).format('HH:mm')).join(', ')}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                id="dateSortie"
                                label={`Date (s) de Sortie (s) (${selectedJour} ${selectedMonth})`}
                                variant="outlined"
                                fullWidth
                                value={heuresDépartJourMois.filter(heure => heure.typeHeure === 'sortie').map(heure => moment(heure.Heure).format('YYYY-MM-DD')).join(', ')}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="heureDepartJourSortie"
                                label={`Heure (s) de Sortie (s)(${selectedJour} ${selectedMonth} ${selectedYear})`}
                                variant="outlined"
                                fullWidth
                                value={heuresDépartJourMois.filter(heure => heure.typeHeure === 'sortie').map(heure => moment(heure.Heure).format('HH:mm')).join(', ')}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                       
                       
                    
                    
                    </Grid>
                </CardContent>
            </Card>
        )}
    </Box>
);
};

export default InfoUser;
