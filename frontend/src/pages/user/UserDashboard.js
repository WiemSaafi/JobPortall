import React, { useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, ButtonGroup, Button } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import moment from 'moment';
import ScheduleIcon from '@mui/icons-material/Schedule';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';

const EmployeeAttendanceSheet = () => {
    // Données fictives pour simuler la présence d'un employé
    const employee = {
        fullName: "",
        entryTime: new Date(),
        exitTime: new Date(new Date().getTime() + 3600 * 1000), // Ajoute une heure pour simuler une sortie
        expectedEntryTime: new Date(new Date().setHours(8, 30, 0)), // Heure d'entrée prévue
        expectedExitTime: new Date(new Date().setHours(17, 0, 0)), // Heure de sortie prévue
    };

    // Extraire les informations de l'employé
    const { fullName, entryTime, exitTime, expectedEntryTime, expectedExitTime } = employee;

    // Calcul du retard
    const calculateDelay = (entry, expectedEntry) => {
        const delay = Math.max(0, moment(entry).diff(expectedEntry, 'minutes'));
        return delay;
    };

    // Calcul du nombre d'heures de retard
    const delayMinutes = calculateDelay(entryTime, expectedEntryTime);
    const delayHours = Math.floor(delayMinutes / 60);
    const delayMinutesRemainder = delayMinutes % 60;

    // Calcul du nombre d'heures déjà travaillées
    const workedHours = moment(exitTime).diff(entryTime, 'hours', true);

    // Renvoie l'icône en fonction de la ponctualité
    const renderPunctualityIcon = () => {
        if (delayMinutes === 0) {
            return <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 36 }} />;
        } else {
            return <ErrorIcon sx={{ color: '#f44336', fontSize: 36 }} />;
        }
    };

    const [viewMode, setViewMode] = useState('day');

    return (
        <Box>
            <ButtonGroup sx={{ mb: 0 }}>
            <Button onClick={() => setViewMode('day')} variant={viewMode === 'day' ? 'contained' : 'outlined'} sx={{ color: 'black', bgcolor: viewMode === 'day' ? '#bb76d2' : '#ffffff' }}>Jour</Button>
<Button onClick={() => setViewMode('week')} variant={viewMode === 'week' ? 'contained' : 'outlined'} sx={{ color: 'black', bgcolor: viewMode === 'week' ? '#bb76d2' : '#ffffff' }}>Semaine</Button>
<Button onClick={() => setViewMode('month')} variant={viewMode === 'month' ? 'contained' : 'outlined'} sx={{ color: 'black', bgcolor: viewMode === 'month' ? '#bb76d2' : '#ffffff' }}>Mois</Button>

            </ButtonGroup>
            <TableContainer component={Paper} sx={{ boxShadow: 4, borderRadius: 8, padding: 2 }}>
                <Typography variant="h6" align="center" sx={{ mt: 2, mb: 4 }}>
                    Fiche de présence {fullName}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <ScheduleIcon sx={{ fontSize: 60, color: '#be875b' }} />
                </Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Heure d'entrée</TableCell>
                            <TableCell>Heure de sortie</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell><AccessTimeIcon sx={{ fontSize: 36 }} /></TableCell>
                            <TableCell>{entryTime ? moment(entryTime).format('LLL') : 'Non disponible'}</TableCell>
                            <TableCell>{exitTime ? moment(exitTime).format('LLL') : 'Non disponible'}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><AlarmOnIcon sx={{ fontSize: 36 }} /></TableCell>
                            <TableCell>{expectedEntryTime ? moment(expectedEntryTime).format('LT') : 'Non disponible'}</TableCell>
                            <TableCell>{expectedExitTime ? moment(expectedExitTime).format('LT') : 'Non disponible'}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Typography variant="body1" align="center" sx={{ mt: 4 }}>
                    {delayMinutes === 0 ? 'Ponctuel' : `Retardé de ${delayHours} heures et ${delayMinutesRemainder} minutes`}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    {renderPunctualityIcon()}
                </Box>
                <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                    Nombre d'heures travaillées : {workedHours.toFixed(2)} heures
                </Typography>
            </TableContainer>
        </Box>
    );
};

export default EmployeeAttendanceSheet;
