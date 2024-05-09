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

function MyCalendar() {
  const [events, setEvents] = useState([]);
  const heureDépart = useSelector(state => state.heureDépart);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  moment.locale('fr');
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    dispatch(heureDépartAction());
  }, [dispatch]);

  useEffect(() => {
    if (heureDépart && heureDépart.Heure) {
      setData(heureDépart.Heure);
    }
  }, [heureDépart]);

  useEffect(() => {
    const formattedEvents = data.flatMap(event => {
      if (event.typeHeure === 'entrée') {
        return [{
          title: event.typeHeure,
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
      <HeaderTop />
      <AiFillCalendar />
      <Sidebar />
      <div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '65vh' }}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleEventSelect}
          views={['month', 'week', 'day', 'agenda']}
          toolbar={true}
        />
      </div>
    </div>
  );
}

export default MyCalendar;