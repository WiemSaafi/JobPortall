import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fr';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AiFillCalendar } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import  '../admin/Calendrier';
import { heureDépartAction } from '../../redux/actions/heuredépart';
import HeaderTop from '../global/HeaderTop';
import { Sidebar } from 'react-pro-sidebar';
import freeImage from '../../img/wave8.png';
import { Card } from '@mui/material';
function MyCalendar() {
  const [events, setEvents] = useState([]);
  const heureDépart = useSelector(state => state.heureDépart);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  moment.locale('fr');
  const localizer = momentLocalizer(moment);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    dispatch(heureDépartAction());
  }, [dispatch]);

  useEffect(() => {
    if (heureDépart && heureDépart.user) {
      setData(heureDépart.user);
    }
  }, [heureDépart]);
  console.log("data",heureDépart)

  useEffect(() => {
    const formattedEvents = data.flatMap(event => {
      if (event.typeHeure === 'entrée') {
        return [{
          title: `${event.typeHeure} - ${event.typeHeure === 'entrée' ? 'Saafi' : (event.user && event.user.firstName ? event.user.firstName : 'Saafi')}`,
          start: moment(event.createdAt).toDate(),
          end: moment(event.createdAt).toDate(),
        }];
        
        
      } else if (event.typeHeure === 'sortie') {
        return [{
          title: event.typeHeure,
          start: moment(event.createdAt).toDate(),
          end: moment(event.createdAt).toDate(),
        }];
      }
      
      return [];
      
    });
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
          />
        </Card>
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