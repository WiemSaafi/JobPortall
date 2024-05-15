import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkIcon from '@mui/icons-material/Work';
import CategoryIcon from '@mui/icons-material/Category';
import moment from 'moment';
import Chart from "react-apexcharts";
import StatComponent from '../../component/StatComponent';
import ChartComponent from '../../component/ChartComponent';
import { DownloadOutlined } from '@mui/icons-material';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { heureDépartAction } from '../../redux/actions/heuredépart';

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

  const options = {
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
    }
  };

  return (
    <>
      <Box sx={{ textAlign: "left"   ,position: "absolute",right: 50, top: 336}}> 
  <Button 
    sx={{
      padding: "3px 4px",
      textTransform: "capitalize",
      color: "#FFF", // Couleur du texte
      backgroundColor: "#FFC4CA", // Couleur de fond du bouton
      '&:hover': {
        backgroundColor: "#FFCAD0", // Couleur de fond au survol
      },
      '& .MuiButton-iconSizeMedium > *:first-child': {
        fontSize: "2rem", // Taille de l'icône
      }
    }}
    variant="contained"
  >
    <DownloadOutlined />
    Télécharger
  </Button>
</Box>


      <Box>
 


      <Box sx={{ marginBottom: 7}}>
  <Typography variant='h8' sx={{ color: "black", pb: 0.5, borderBottom: '2px solid black', display: 'block', position: 'absolute', top: 80, left: 290, zIndex: 1000 }}>
    Tableau du bord
  </Typography>
</Box>


<Stack
  direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 1, sm: 2, md: 4 }}
  sx={{ marginBottom: 10 }} // Ajoute une marge inférieure de 20 unités à la Stack
>




        


          <Stack direction="row" spacing={4}>

{/*** Premier Cadre ***/}
<Box sx={{ p: 5, borderRadius: 12, border: '2px solid #FFC107', bgcolor: '#FFEB3B', minWidth: 280, width: '100%' }}>
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <WorkIcon sx={{ color: '#FFC107', fontSize: 30 }} />
    <Typography variant="body1" sx={{ ml: 2 }}>Présences</Typography>
  </Box>
  <Typography variant="body1" sx={{ mt: 2 }}>75%</Typography>
</Box>

{/*** Deuxième Cadre ***/}
<Box sx={{ p: 5, borderRadius: 12, border: '2px solid #4CAF50', bgcolor: '#C8E6C9', minWidth: 280, width: '100%' }}>
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <CategoryIcon sx={{ color: '#4CAF50', fontSize: 30 }} />
    <Typography variant="body1" sx={{ ml: 2 }}>Absences</Typography>
  </Box>
  <Typography variant="body1" sx={{ mt: 2 }}>25%</Typography>
</Box>

{/*** Troisième Cadre ***/}
<Box sx={{ p: 5, borderRadius: 12, border: '2px solid #FF5722', bgcolor: '#FFCCBC', minWidth: 280, width: '100%' }}>
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <WorkIcon sx={{ color: '#FF5722', fontSize: 30 }} />
    <Typography variant="body1" sx={{ ml: 2 }}>Heures supplémentaires</Typography>
  </Box>
  <Typography variant="body1" sx={{ mt: 2 }}>50%</Typography>
</Box>

{/*** Quatrième Cadre ***/}
<Box sx={{ p: 5, borderRadius: 12, border: '2px solid #9C27B0', bgcolor: '#E1BEE7', minWidth: 280, width: '100%' }}>
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <CategoryIcon sx={{ color: '#9C27B0', fontSize: 30 }} />
    <Typography variant="body1" sx={{ ml: 2 }}>Nombre d'employés</Typography>
  </Box>
  <Typography variant="body1" sx={{ mt: 2 }}>100%</Typography>
</Box>

</Stack>






    {/* <CircularProgressbar
            value={lateEmployeesPercentage}
            text={`${lateEmployeesPercentage.toFixed(2)}%`}
            strokeWidth={10}
            styles={{
              root: { width: '300px' },
              path: { stroke: '#3e98c7' },
              text: { fill: '#3e98c7' }
            }}
          /> */}

          {/* <CircularProgressbar
            value={totalEmployés}
            text={`${(totalEmployés) || 0} Les employés `}
            strokeWidth={10}
            styles={{
              root: { width: '300px' },
              path: { stroke: '#3e98c7' },
              text: { fill: '#3e98c7' }
            }}
          /> */}
          
        </Stack>
      </Box>
     <Box sx={{ bgcolor: '#fff', mt: 6, borderRadius: 8, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }}>
          <ChartComponent>
            <Chart
              options={options}
              series={dataa}
              type="area"
              width="100%"
              height="230px"
            />
          </ChartComponent>
        </Stack>
      </Box>





    </>
  );
};

export default AdminDashboard;