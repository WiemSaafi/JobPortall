import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fr';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AiFillCalendar } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import  '../admin/Calendrier';
import { heureDépartAction, heureDépartByDateAction } from '../../redux/actions/heuredépart';
import HeaderTop from '../global/HeaderTop';
import { Sidebar } from 'react-pro-sidebar';
import freeImage from '../../img/wave8.png';
import { Button, Card } from '@mui/material';
import { exportCSV } from '../../component/ExportCSV';
function MyCalendar() {
  const [events, setEvents] = useState([]);
  const heureDépart = useSelector(state => state.heureDépart);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  moment.locale('fr');
  const localizer = momentLocalizer(moment);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState({ debut: moment().format("YYYY-MM-DD"), fin: moment().format("YYYY-MM-DD") });

  const handleNavigate = (date, view) => {
    let debut, fin;
    if (view === 'week') {
      debut = moment(date).startOf('week').toDate();
      fin = moment(date).endOf('week').toDate();
    } else if (view === 'month') {
      debut = moment(date).startOf('month').toDate();
      fin = moment(date).endOf('month').toDate();
    } else {
      debut = date;
      fin = date;
    }

    setSelectedDateRange({ debut, fin });
    console.log("Selected date range:", { debut, fin });
    console.log("Current view:", view);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const datas = await dispatch(heureDépartByDateAction(moment(selectedDateRange?.debut).format("YYYY-MM-DD"),moment(selectedDateRange?.fin).format("YYYY-MM-DD")));
        console.log("erferer",datas)
        setData(datas?.data || []) 
      } catch (error) {
        console.log(error)
      }
      
    }
    getData()
  }, [dispatch, selectedDateRange]);


  console.log("data",data)

  useEffect(() => {
    const formattedEvents = !!data?.length ? data.flatMap(event => {
      console.log("event",event)
      return [{
        title: `${event?.user?.firstName} ${event?.user?.lastName}`,
        start: moment(event.createdAt).toDate(),
        end: moment(event.createdAt).toDate(),
        type:event?.typeHeure
      }];
      
    }) : [];
    setEvents(formattedEvents);
  }, [data]);
  
  const eventStyleGetter = (event) => {
    let style = {
      backgroundColor: event.type === 'entrée' ? 'green' : 'red', // Couleur basée sur le type d'événement
    };
    style.className = 'custom-event-class'; // Ajoutez la classe CSS spécifique aux événements
    return { style };
  };

  const handleEventSelect = (event) => {
    alert(`Title: ${event.title}\nStart: ${event.start}\nEnd: ${event.end}`);
    console.log(event.title);
  };

  const exportToCSV = () => {
    const groupedData = data.reduce((acc, curr) => {
      const userId = curr.user._id;
      if (!acc[userId]) {
          acc[userId] = [];
      }
      acc[userId].push(curr);
      return acc;
  }, {});
  
  // Convert the grouped data into the required format
  const usersData = Object.entries(groupedData).map(([userId, userData]) => {
      const fileName = `${userData[0].user.firstName}_${userData[0].user.lastName}`;
      return { fileName, data: userData?.map(i=>({Heure:i?.Heure, typeHeure:i?.typeHeure}))};
  });
  // Generate the filename based on the user's first name
    exportCSV(usersData,`Pointage`)
};
  return (
    <div>
      
      <Sidebar />
      <div>
        <Card
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            maxWidth: 2100,
            borderRadius: '15px',
            overflow: 'hidden',
            boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
            border: `2px solid ${isHovered ? "#3A0CA3" : 'transparent'}`,
            transition: 'border-color 0.1s ease',
            margin: '0 auto',
            backgroundColor: 'white',
            padding: '15px',
            height: '68vh'
          }}
           
        >
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '64vh', width: '100%' }}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={handleEventSelect}
            views={['month', 'week', 'day', 'agenda']}
            toolbar={true}
            onNavigate={handleNavigate}
           

          />
        </Card>
    <Button onClick={exportToCSV}>Exporter csv</Button>

      </div>
      <img
        src={freeImage}
        alt="Free Image"
        className="moving-image"
        style={{
          maxWidth: '100%',
          objectFit: 'cover',
          marginTop: '-232px' ,
          marginRight: '95px',
        // Ajustez cette valeur pour déplacer l'image plus haut
        }}
      />
    </div>
  );
};

export default MyCalendar;