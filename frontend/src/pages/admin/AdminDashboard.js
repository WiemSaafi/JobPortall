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
  }, [dispatch]);

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
      <Box sx={{ textAlign: "right" }}>
        <Button
          sx={{ padding: "6px 8px", textTransform: "capitalize" }}
          variant="contained"
          color="primary"
        >
          <DownloadOutlined />
          Download Reports
        </Button>
      </Box>
      <Box>
        <Typography variant='h4' sx={{ color: "white", pb: 3 }}>
          Dashboard
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <StatComponent
            value={user && moment(user.createdAt).format('YYYY/MM/DD')}
            icon={<CalendarMonthIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
            description="Adminstrators"
            money=''
          />
          <StatComponent
            value={lateEmployeesPercentage.toFixed(2)}
            icon={<WorkIcon sx={{ color: "palette.primary.main", fontSize: 30 }} />}
            description="Les employés en retard"
            money=''
          />
          <CircularProgressbar
            value={lateEmployeesPercentage}
            text={`${lateEmployeesPercentage.toFixed(2)}%`}
            strokeWidth={10}
            styles={{
              root: { width: '300px' },
              path: { stroke: '#3e98c7' },
              text: { fill: '#3e98c7' }
            }}
          />
          <StatComponent
            value={totalEmployés}
            icon={<CategoryIcon sx={{ color: "palette.primary.main", fontSize: 30 }} />}
            description="Nombre des employés "
            money=''
          />
          <CircularProgressbar
            value={totalEmployés}
            text={`${(totalEmployés) || 0} Les employés `}
            strokeWidth={10}
            styles={{
              root: { width: '300px' },
              path: { stroke: '#3e98c7' },
              text: { fill: '#3e98c7' }
            }}
          />
          
        </Stack>
      </Box>
      <Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 3 }}
          spacing={{ xs: 1, sm: 2, md: 4, p: 5 }}>
          <ChartComponent>
            <Chart
              options={options}
              series={dataa}
              type="area"
              width="100%"
              height="300px"
            />
          </ChartComponent>
        </Stack>
      </Box>
    </>
  );
};

export default AdminDashboard;