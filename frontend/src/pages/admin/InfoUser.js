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
 
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
 










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
        <Box sx={{ maxWidth: "100%", margin: "1%", pt: 0 ,left:"20%"}} component="form" className='form_style border-style'>
            {user && (
                <Card
                    style={{
                        borderRadius: '15px',
                        overflow: 'hidden',
                        boxShadow: 'px 8px 15px rgba(0, 0, 0, 0.1)',
                        border: `2px solid ${isHovered ? '#0b3948' : 'transparent'}`,
                        transition: 'border-color 0.3s ease'
                    }}
                >
                    
                    <CardContent>
                        <Grid container spacing={1} alignItems="center">
                            <Grid item xs={12} md={6}>
                                <Typography variant="h5" style={{ fontSize: '29px', fontWeight: 'bold', color: '#0b3948', marginBottom: '-12px' }}>
                                    Infos Personnelles
                                </Typography>
                                <FormControl sx={{ m: 1 }} variant="standard">
                                    <InputLabel id="demo-customized-select-label">Jour</InputLabel>
                                    <Select
                                        labelId="demo-customized-select-label"
                                        id="demo-customized-select"
                                        value={selectedJour}
                                        onChange={handleChangeJour}
                                    >
                                        <MenuItem value="">
                                            <em>Aucun</em>
                                        </MenuItem>
                                        <MenuItem value={'lundi'}>Lundi</MenuItem>
                                        <MenuItem value={'mardi'}>Mardi</MenuItem>
                                        <MenuItem value={'mercredi'}>Mercredi</MenuItem>
                                        <MenuItem value={'jeudi'}>Jeudi</MenuItem>
                                        <MenuItem value={'vendredi'}>Vendredi</MenuItem>
                                        <MenuItem value={'samedi'}>Samedi</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ m: 1 }} variant="standard">
                                    <InputLabel id="demo-customized-select-label">Année</InputLabel>
                                    <Select
                                        labelId="demo-customized-select-label"
                                        id="demo-customized-select"
                                        value={selectedYear}
                                        onChange={handleChangeYear}
                                    >
                                         <MenuItem value="">Aucun</MenuItem>
                                    {/* Insérez ici la liste des années */}
                                    {Array.from({length: 21}, (_, i) => currentYear - 10 + i).map((year) => (
                                        <MenuItem key={year} value={year}>{year}</MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ m: 1 }} variant="standard">
                                    <InputLabel id="demo-customized-select-label">Mois</InputLabel>
                                    <Select
                                        labelId="demo-customized-select-label"
                                        id="demo-customized-select"
                                        value={selectedMonth}
                                        onChange={handleChangeMonth}
                                    >
                                        <MenuItem value="">
                                            <em>Aucun</em>
                                        </MenuItem>
                                        <MenuItem value={'janvier'}>Janvier</MenuItem>
                                        <MenuItem value={'février'}>Février</MenuItem>
                                        <MenuItem value={'mars'}>Mars</MenuItem>
                                        <MenuItem value={'avril'}>Avril</MenuItem>
                                        <MenuItem value={'mai'}>Mai</MenuItem>
                                        <MenuItem value={'juin'}>Juin</MenuItem>
                                        <MenuItem value={'juillet'}>Juillet</MenuItem>
                                        <MenuItem value={'août'}>Août</MenuItem>
                                        <MenuItem value={'septembre'}>Septembre</MenuItem>
                                        <MenuItem value={'octobre'}>Octobre</MenuItem>
                                        <MenuItem value={'décembre'}>Décembre</MenuItem>
                                    </Select>
                                </FormControl>






                            </Grid>
                            { setheuresDépartJourMois && (
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        id="heureDepartJourEntree"
                                        label={`Heures d'Entrée (${selectedJour} ${selectedMonth} ${selectedYear})`}
                                        variant="outlined"
                                        fullWidth
                                        value={heuresDépartJourMois.filter(heure => heure.typeHeure === 'entrée').map(heure => moment(heure.Heure).format('HH:mm')).join(', ')}
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
                            )}
                             {  setheuresDépartJourMois && (
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        id="heureDepartJourEntree"
                                        label={`Date d'Entrée (${selectedJour} ${selectedMonth})`}
                                        variant="outlined"
                                        fullWidth
                                        value={heuresDépartJourMois.filter(heure => heure.typeHeure === 'entrée').map(heure => moment(heure.Heure).format('YYYY-MM-DD')).join(', ')}
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
                            )}
                             {  setheuresDépartJourMois && (
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        id="heureDepartJourEntree"
                                        label={`Heures de sortie (${selectedJour}) ${selectedMonth})`}
                                        variant="outlined"
                                        fullWidth
                                        value={heuresDépartJourMois.filter(heure => heure.typeHeure === 'sortie').map(heure => moment(heure.Heure).format('HH:mm')).join(', ')}
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
                            )}
                            {  setheuresDépartJourMois && (
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        id="heureDepartJourEntree"
                                        label={`Date d'Entrée (${selectedJour} ${selectedMonth})`}
                                        variant="outlined"
                                        fullWidth
                                        value={heuresDépartJourMois.filter(heure => heure.typeHeure === 'entrée').map(heure => moment(heure.Heure).format('YYYY-MM-DD')).join(', ')}
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
                            )}



                            
                             {  setheuresDépartJourMois && (
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        id="heureDepartJourEntree"
                                        label={`date de sortie (${selectedJour}) ${selectedMonth})`}
                                        variant="outlined"
                                        fullWidth
                                        value={heuresDépartJourMois.filter(heure => heure.typeHeure === 'sortie').map(heure => moment(heure.Heure).format('YYYY-MM-DD')).join(', ')}
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
                            )} <Grid item xs={12} md={7}>
                                <TextField
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    value={user.email}
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
                                    label="Nom"
                                    variant="outlined"
                                    fullWidth
                                    value={user.firstName}
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
                            <Grid item xs={12} md={7}>
                                <TextField
                                    id="lastName"
                                    label="Prénom"
                                    variant="outlined"
                                    fullWidth
                                    value={user.lastName}
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
                            <Grid item xs={12} md={7}>
                                <TextField
                                    id="phone"
                                    label="Téléphone"
                                    variant="outlined"
                                    fullWidth
                                    value={user.phone}
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
                            <Grid item xs={12} md={7}>
                                <TextField
                                    id="address"
                                    label="Adresse"
                                    variant="outlined"
                                    fullWidth
                                    value={user.address}
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
                         
                            <Grid item xs={12} md={7} >
                                <TextField
                                    id="Heure"
                                    label="Dernière heure de sortie"
                                    variant="outlined"
                                    fullWidth
                                    value={ derniereEntree ? moment(derniereEntree?.Heure).format('HH:mm') : ''}
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
                            <Grid item xs={12} md={7} >
                                <TextField
                                    id="Heure"
                                    label="Dernière heure d'entrée"
                                    variant="outlined"
                                    fullWidth
                                    value={ derniereSortie ? moment(derniereSortie?.Heure).format('HH:mm') : ''}
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
                    </CardContent>
//hahah












                </Card>
            )}
        </Box>
    );
};

export default InfoUser;