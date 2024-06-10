
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import moment from 'moment';
import Chart from "react-apexcharts";
import { DownloadOutlined } from '@mui/icons-material';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { heureDépartAction, pourcentagePresenceAction } from '../../redux/actions/heuredépart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PeopleIcon from '@mui/icons-material/People';
import freeImage from '../../img/small3.png';
import ChartComponent from '../../component/ChartComponent';
import { allUserAction } from '../../redux/actions/userAction';




const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.userProfile);
  const { jobs } = useSelector(state => state.loadJobs);
 const [calculerPourcentagePresence, setCalculerPourcentagePresence] = useState()
  // const { calculerPourcentagePresence} = useSelector((state) => state.calculerPourcentagePresence);
  //const calculerPourcentagePresence = useSelector(state => state.calculerPourcentagePresence);
 const [pourcentagePresence, setPourcentagePresence] = useState(null);
 const heureDépart = useSelector(state => state.heureDépart);
 // const { pourcentagePresence } = useSelector(state => state.calculerPourcentagePresence);
//const calculerPourcentagePresence = useSelector(state => state.calculerPourcentagePresence);
//const calculerPourcentagePresence = useSelector((state) => state.calculerPourcentagePresence);


  const [data, setData] = useState(null);
  useEffect(() => {
    dispatch(heureDépartAction());
   
  }, []);
 useEffect(() => {
    const fetchUserData = async () => {
        try {
            const data = await   dispatch(pourcentagePresenceAction());
            setCalculerPourcentagePresence(data)
            setPourcentagePresence(data?.pourcentagePresence)
            console.log(" Data:", data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    fetchUserData();
}, [dispatch]);

  useEffect(() => {
    console.log("Données de l'heure de départ :", heureDépart); // Vérifier les données reçues
   // if (heureDépart && heureDépart.length) {
      setData(heureDépart.user);
      
   // }
  }, [heureDépart]);
   
  //   // Calculer le pourcentage d'absence en soustrayant le pourcentage de présence du total (100%)
  const absencesPercentage = 100 - pourcentagePresence;
  //   // Utiliser le pourcentage d'absence calculé
 
 const totalUsers = user?.length || 32;


  const heuredepartLength = !!data?.length ? data.filter(heure => heure.typeHeure === 'entrée') : [];
  const heuresortieLength = !!data?.length ? data.filter(Heure => Heure.typeHeure === 'sortie') : [];
  //const totalEmployés = !!user?.length ? user.map(use => (use.firstName)) : [];
console.log("heuredepartLength")
const convertToMinutes = (time) => {
  const momentTime = moment(time, "HH:mm");
  return momentTime.hours() * 60 + momentTime.minutes();
};

const filterValidData = (data, typeHeure) => {
  return data.filter(i => {
    const timeInMinutes = convertToMinutes(moment(i?.Heure).format("HH:mm"));
    return !isNaN(timeInMinutes) && timeInMinutes >= 420 && timeInMinutes <= 1080;
  }).map(i => {
    return({
      x: moment(i?.Heure).format("YYYY-MM-DD"),
      y: convertToMinutes(moment(i?.Heure).format("HH:mm")),
      name: `${i?.user?.firstName} ${i?.user?.lastName}`,
      type: typeHeure,
    })
   });
};

const dataa = [
  {
    name: 'départ',
    data: filterValidData(heuredepartLength, "entrée"),
  },
  {
    name: 'sortie',
    data: filterValidData(heuresortieLength,"sortie"),
  },
];
  
  const [options, setoptions] = useState({
    chart: {
      title: {
        text: "HR Performance",
        align: "left"
      },
   
      type: "area",
      height: "600",
    
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
    yaxis: {
      labels: {
        formatter: function (val) {
          const hours = Math.floor(val / 60);
          const minutes = val % 60;
          return `${hours}h ${minutes}m`;
        }
      },
      title: {
        text: 'Time of Day'
      },
      min: 420,  // 7:00 AM in minutes
      max: 1080,  // 6:00 PM in minutes
      tickAmount: 12,
    },  
    dataLabels: {
      enabled: false // Disable data labels on the lines
    },
    // tooltip: {
    //   x: {
    //     format: 'dd MMM yyyy HH:mm',
    //   },
    //   custom: function ({ series, seriesIndex, dataPointIndex, w }) {
    //     const dataPoint = w.globals.series[seriesIndex][dataPointIndex];
    //     console.log("dataPoint",series)
    //     const { name, type, x } = dataPoint;
    //     const time = moment(x).format('HH:mm');
    //     return `<div class="apexcharts-tooltip-title">${name}</div>
    //             <div>Type: ${type}</div>
    //             <div>Time: ${time}</div>`;
    //   },
    // },
  
  });

  //const presencesPercentage = 75;
  //const absencesPercentage = 25;
  const hoursExtraPercentage = 50;
 


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
              zIndex:2222000
            }}
        >
            Tableau du bord
        </Typography>
        </Box>
 
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 4, md: 10}} sx={{ marginBottom: 10 }}>
          {/* Premier Cadre */}
          <Box sx={{ p: 2, borderRadius: 12 , background: 'linear-gradient(to right,#F72585 ,#F72585)', minWidth: 300, width: 'calc(25% - 10px)', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleIcon sx={{ color: "#fff", fontSize: 35 }} />
              <Typography variant="body1" sx={{ ml: 2, color: 'white' }}>
            Présences
        </Typography>
            </Box>
            <Box sx={{ mt: 7, display: 'flex', alignItems: 'center' }}>
              <CircularProgressbar
              
              value={ pourcentagePresence || 0}
              text={`${pourcentagePresence || 0}%`}
                strokeWidth={13}
                styles={{
                  root: { width: '65px', marginRight: '16px' },
                  path: { stroke: "#Fff" },
                  text: { fill: "#Fff"}
                }}
              />
              <Typography variant="body1"></Typography>
            </Box>
          </Box>

          {/* Deuxième Cadre */}
          <Box sx={{ p: 2, borderRadius: 12, background: 'linear-gradient(to right ,#7209B7,  #7209B7)', minWidth: 300, width: 'calc(25% - 10px)', mb: 2, transition: 'all 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CancelIcon sx={{ color: "#fff", fontSize: 35 }} />
              <Typography variant="body1" sx={{ ml: 2 ,color: 'white' }}>Absences</Typography>
            </Box>
            <Box sx={{ mt: 7, display: 'flex', alignItems: 'center' }}>
              <CircularProgressbar
                value={absencesPercentage ||0}
                text={`${absencesPercentage ||0 }%`}
                strokeWidth={13}
                styles={{
                  root: { width: '65px', marginRight: '16px' },
                  path: { stroke: "#fff"},
                  text: { fill: "#fff" }
                }}
              />
              <Typography variant="body1"> </Typography>
            </Box>
          </Box>


          {/* troisiéme Cadre */}
          <Box sx={{ p: 2, borderRadius: 12, background: 'linear-gradient(to right , #4361EE,#4361EE)', minWidth: 300, width: 'calc(25% - 10px)', mb: 2, transition: 'all 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PeopleIcon sx={{ color: "#fff", fontSize: 35 }} />
              <Typography variant="body1" sx={{ ml: 2,color: 'white' }}>Nombre d'employés</Typography>
            </Box>
            <Box sx={{ mt: 7, display: 'flex', alignItems: 'center' }}>
              <CircularProgressbar
               
                value={totalUsers}
                text={`${totalUsers}`}
                strokeWidth={13}
                styles={{
                  root: { width: '65px', marginRight: '16px' },
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

>
  <Button
    sx={{
      padding: "0.6px 0.6px",
      textTransform: "capitalize",
       color:"#F72585",
       
      position: 'absolute',
      top: 0,
      right: 15,
      
    }}
  >



    
     
  </Button>
</Box>


</Box>

<Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 3 }} spacing={{ xs: 1, sm: 2, md: 4, p: 5 }}>
          <ChartComponent>
            <Chart
              options={options}
              series={dataa}
              type="area"
              width="100%"
              height="397px"
            />
          </ChartComponent>
        </Stack>
      </Box>
     

    </>
  );
};

export default AdminDashboard;
