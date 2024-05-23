
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
import freeImage from '../../img/small3.png';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AdminDashboard = () => {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [buttonColor, setButtonColor] = useState('linear-gradient(to right, #F72585, #7209B7)');

  const handleButtonClick = () => {
    setButtonColor('linear-gradient(to right, #7209B7, #3A0CA3)');
  };




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
        
          </Box>

      <Box>
        <Box sx={{ marginBottom: 7 }}>
        <Typography
            variant="h8"
            sx={{
                color: "#3A0CA3", // Change the text color to white
                pb: 0.5,
                borderBottom: '2px solid #3A0CA3',
                display: 'block',
                position: 'absolute',
                top: 80,
                left: 290,
                zIndex: 1000
            }}
        >
            Tableau du bord
        </Typography>
        </Box>
 {/* 
        <Box sx={{ p: 1, borderRadius: 10, background: '#fff', minWidth: 280, width: 'calc(10% - 10px)', mb: 2, transition: 'all 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
          />
        </Box>
 */}







        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 2 }} sx={{ marginBottom: 10 }}>


        

          {/* Premier Cadre */}
          <Box sx={{ p: 5, borderRadius: 10 , background: 'linear-gradient(to right,#F72585 ,#F72585)', minWidth: 280, width: 'calc(50% - 20px)', mb: 2, transition: 'all 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleIcon sx={{ color: "#fff", fontSize: 30 }} />
              <Typography variant="body1" sx={{ ml: 2, color: 'white', fontFamily: 'Helvetica, sans-serif', fontWeight: 'normal' }}>
        Présences
      </Typography>
            </Box>
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
              <CircularProgressbar
                value={presencesPercentage}
                text={`${presencesPercentage}%`}
                strokeWidth={10}
                styles={{
                  root: { width: '50px', marginRight: '16px' },
                  path: { stroke: "#Fff" },
                  text: { fill: "#Fff"}
                }}
              />
              <Typography variant="body1"></Typography>
            </Box>
          </Box>

          {/* Deuxième Cadre */}
          <Box sx={{ p: 5, borderRadius: 10, background: 'linear-gradient(to right ,#7209B7,  #7209B7)', minWidth: 280, width: 'calc(50% - 20px)', mb: 2, transition: 'all 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CancelIcon sx={{ color: "#fff", fontSize: 30 }} />
              <Typography variant="body1"sx={{ ml: 2, color: 'white', fontFamily: 'Helvetica, sans-serif', fontWeight: 'normal' }}>Absences</Typography>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
              <CircularProgressbar
                value={absencesPercentage}
                text={`${absencesPercentage}%`}
                strokeWidth={10}
                styles={{
                  root: { width: '50px', marginRight: '16px' },
                  path: { stroke: "#fff"},
                  text: { fill: "#fff" }
                }}
              />
              <Typography variant="body1"> </Typography>
            </Box>
          </Box>

          {/* Troisième Cadre */}
          <Box sx={{ p: 5, borderRadius: 10, background: 'linear-gradient(to right,#3A0CA3 , #3A0CA3)', minWidth: 280, width: 'calc(50% - 20px)', mb: 2, transition: 'all 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ScheduleIcon sx={{ color: "#fff" ,fontSize: 30 }} />
              <Typography variant="body1"sx={{ ml: 2, color: 'white', fontFamily: 'Helvetica, sans-serif', fontWeight: 'normal' }}>Heures supplémentaires</Typography>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
              <CircularProgressbar
                value={hoursExtraPercentage}
                text={`${hoursExtraPercentage}%`}
                strokeWidth={10}
                styles={{
                  root: { width: '50px', marginRight: '16px' },
                  path: { stroke: "#fff" },
                  text: { fill: "#fff" }
                }}
              />
              <Typography variant="body1"> </Typography>
            </Box>
          </Box>

          {/* Quatrième Cadre */}
          <Box sx={{ p: 5, borderRadius: 10, background: 'linear-gradient(to right , #4361EE,#4361EE)', minWidth: 280, width: 'calc(50% - 20px)', mb: 2, transition: 'all 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PeopleIcon sx={{ color: "#fff", fontSize: 30 }} />
              <Typography variant="body1" sx={{ ml: 2, color: 'white', fontFamily: 'Helvetica, sans-serif', fontWeight: 'normal' }}>Nombre d'employés</Typography>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
              <CircularProgressbar
                value={totalEmployéss}
                text={`${totalEmployéss}%`}
                strokeWidth={10}
                styles={{
                  root: { width: '50px', marginRight: '16px' },
                  path: { stroke: "#ffff"},
                  text: { fill: "#fff"}
                }}
              />
              <Typography variant="body1"> </Typography>
            </Box>
          </Box>

        </Stack>
      </Box>

     <Box
   
>
<Box
  sx={{
    background: 'linear-gradient(to right , #fff,#fff)',
    mt: 4,
    borderRadius: 10,
    boxShadow: '5 14px 18pxrgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': { transform: 'scale(1.02)' },
    position: 'relative',  // Ensure the button is positioned correctly
    padding: 0  // Add padding for spacing inside the box
  }}
>
<Button
      onClick={handleButtonClick}
      sx={{
        padding: '0.6px 0.6px',
        textTransform: 'capitalize',
        color: '#fff',
        borderRadius: '10px',
        position: 'absolute',
        top: 10,
        right: 15,
        background: buttonColor, // Utilisation de la couleur du bouton
      }}
    >
      <DownloadOutlined />
    </Button>
  <Stack direction={{ xs: 'column', sm: 'row' }}>
    <Chart
      options={chartOptions}
      series={dataa}
      type="area"
      width="100%"
      height="230px"
      

    />
  </Stack>
  <img
  src={freeImage}
  alt="Free Image"
  className="moving-image"
  style={{ 
    maxWidth: '100%', 
    objectFit: 'cover',
    marginTop: '-115px' // Ajustez cette valeur pour déplacer l'image plus haut
  }}
/>
</Box>


</Box>

    </>
  );
};

export default AdminDashboard;
