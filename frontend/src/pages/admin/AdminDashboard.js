
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import moment from 'moment';
import Chart from "react-apexcharts";
import { DownloadOutlined } from '@mui/icons-material';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { heureDépartAction } from '../../redux/actions/heuredépart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PeopleIcon from '@mui/icons-material/People';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.userProfile);
  const { jobs } = useSelector(state => state.loadJobs);
  const heureDépart = useSelector(state => state.heureDépart);
  
  const [lateEmployeesPercentage, setLateEmployeesPercentage] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(heureDépartAction());
  }, []);

  useEffect(() => {
    if (heureDépart && heureDépart.Heure) {
      setData(heureDépart.Heure);
    }
  }, [heureDépart]);

  useEffect(() => {
    if (data.length > 0) {
      const heuredepartLength = data.filter(heure => heure.typeHeure === 'entrée').map(heure => moment(heure.createdAt).format('YYYY-MM-DD HH:mm'));
      const lateEmployeesAfter0830 = heuredepartLength.filter(heure => moment(heure, 'HH:mm').isAfter(moment('08:30', 'HH:mm')));
      const totalEmployees = heuredepartLength.length;
      const totalLateEmployeesAfter0830 = lateEmployeesAfter0830.length;

      if (totalEmployees > 0) {
        const percentageLateAfter0830 = (totalLateEmployeesAfter0830 / totalEmployees) * 100;
        setLateEmployeesPercentage(percentageLateAfter0830);
      }
    }
  }, [data]);

  const heuredepartLength = !!data?.length ? data.filter(heure => heure.typeHeure === 'entrée').map(heure => moment(heure.createdAt).format('YYYY-MM-DD HH:mm')) : [];
  const heuresortieLength = !!data?.length ? data.filter(heure => heure.typeHeure === 'sortie').map(heure => moment(heure.createdAt).format('YYYY-MM-DD HH:mm')) : [];
  const totalEmployés = !!user?.length ? user.map(use => (use.firstName)) : [];

  const dataa = [
    {
      name: 'départ',
      data: heuredepartLength.map(i => ({ x: moment(i).format("YYYY-MM-DD"), y: moment(i).format("HH:mm") })),
    },
    {
      name: 'sortie',
      data: heuresortieLength.map(i => ({ x: moment(i).format("YYYY-MM-DD"), y: moment(i).format("HH:mm") })),
    },
  ];

  const [chartOptions, setChartOptions] = useState({
    chart: {
      title: {
        text: "HR Performance",
        align: "left"
      },
      type: "area",
      height: 350
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM 'yy",
          day: 'dd MMM',
          hour: 'HH:mm'
        }
      }
    },
    animations: {
      enabled: true,
      dynamicAnimation: {
        enabled: true,
        speed: 2000
      }
    }
  });

  const presencesPercentage = 75;
  const absencesPercentage = 25;
  const hoursExtraPercentage = 50;
  const totalEmployéss = 80;

  return (
    <>
      <Box sx={{ textAlign: "left", position: "absolute", right: 52, top: 364 }}>
        <Button
          sx={{
            padding: "3px 4px",
            textTransform: "capitalize",
            color: "white",
            backgroundColor: "  #3F51B5",
            '&:hover': {
              backgroundColor: "#606fc7",
            },
            '& .MuiButton-iconSizeMedium > *:first-child': {
              fontSize: "0rem",
            }
          }}
          variant="contained"
        >
          <DownloadOutlined />
          Télécharger
        </Button>
      </Box>

      <Box>
        <Box sx={{ marginBottom: 7 }}>
          <Typography variant='h8' sx={{ color: "black", pb: 0.5, borderBottom: '2px solid black', display: 'block', position: 'absolute', top: 80, left: 290, zIndex: 1000 }}>
            Tableau du bord
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} sx={{ marginBottom: 10 }}>
          {/* Premier Cadre */}
          <Box sx={{ p: 5, borderRadius: 12, border: '2px solid #e9e9ee', bgcolor: '#e9e9ee', minWidth: 280, width: 'calc(50% - 20px)', mb: 2, transition: 'all 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleIcon sx={{ color: '#3F51B5', fontSize: 30 }} />
              <Typography variant="body1" sx={{ ml: 2 }}>Présences</Typography>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
              <CircularProgressbar
                value={presencesPercentage}
                text={`${presencesPercentage}%`}
                strokeWidth={10}
                styles={{
                  root: { width: '50px', marginRight: '16px' },
                  path: { stroke: '#3F51B5' },
                  text: { fill: '#3F51B5' }
                }}
              />
              <Typography variant="body1">{presencesPercentage}%</Typography>
            </Box>
          </Box>

          {/* Deuxième Cadre */}
          <Box sx={{ p: 5, borderRadius: 12, border: '2px solid #E9e9e9', bgcolor: '#E9e9e9', minWidth: 280, width: 'calc(50% - 20px)', mb: 2, transition: 'all 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CancelIcon sx={{ color: '#596fd9', fontSize: 30 }} />
              <Typography variant="body1" sx={{ ml: 2 }}>Absences</Typography>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
              <CircularProgressbar
                value={absencesPercentage}
                text={`${absencesPercentage}%`}
                strokeWidth={10}
                styles={{
                  root: { width: '50px', marginRight: '16px' },
                  path: { stroke: '#596fd9' },
                  text: { fill: '#596fd9' }
                }}
              />
              <Typography variant="body1">{absencesPercentage}%</Typography>
            </Box>
          </Box>

          {/* Troisième Cadre */}
          <Box sx={{ p: 5, borderRadius: 12, border: '2px solid #ede9e9', bgcolor: '#ede9e9', minWidth: 280, width: 'calc(50% - 20px)', mb: 2, transition: 'all 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ScheduleIcon sx={{ color: '#5976D2', fontSize: 30 }} />
              <Typography variant="body1" sx={{ ml: 2 }}>Heures supplémentaires</Typography>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
              <CircularProgressbar
                value={hoursExtraPercentage}
                text={`${hoursExtraPercentage}%`}
                strokeWidth={10}
                styles={{
                  root: { width: '50px', marginRight: '16px' },
                  path: { stroke: '#5976D2' },
                  text: { fill: '#5976D2' }
                }}
              />
              <Typography variant="body1">{hoursExtraPercentage}%</Typography>
            </Box>
          </Box>

          {/* Quatrième Cadre */}
          <Box sx={{ p: 5, borderRadius: 12, border: '2px solid #e9e9ee', bgcolor: '#e9e9ee', minWidth: 280, width: 'calc(50% - 20px)', mb: 2, transition: 'all 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PeopleIcon sx={{ color: '#5575CD', fontSize: 30 }} />
              <Typography variant="body1" sx={{ ml: 2 }}>Nombre d'employés</Typography>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
              <CircularProgressbar
                value={totalEmployéss}
                text={`${totalEmployéss}%`}
                strokeWidth={10}
                styles={{
                  root: { width: '50px', marginRight: '16px' },
                  path: { stroke: '#5575CD' },
                  text: { fill: '#5575CD' }
                }}
              />
              <Typography variant="body1">{totalEmployéss}%</Typography>
            </Box>
          </Box>

        </Stack>
      </Box>

     <Box
  sx={{
    bgcolor: '#e9e9ef',
    mt: 6,
    borderRadius: 6,
    boxShadow: '10px 30px 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': { transform: 'scale(1.02)' }
  }}
>
  <Stack direction={{ xs: 'column', sm: 'row' }}>
    <Chart
      options={chartOptions}
      series={dataa}
      type="area"
      width="100%"
      height="230px"
    />
  </Stack>
</Box>



    </>
  );
};

export default AdminDashboard;
