import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fr';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AiFillCalendar } from 'react-icons/ai'; // Importer une icône de calendrier de la bibliothèque d'icônes
import { MOCK_EVENTS } from './Event';
import '../Calendar/Calendar.css'; // Fichier CSS pour les styles personnalisés
import HeaderTop from '../pages/global/HeaderTop'; // Importer le composant de la barre de navigation
import Sidebar from '../pages/global/Sidebar'; // Importer le composant de la barre latérale

moment.locale('fr');
const localizer = momentLocalizer(moment);

function MyCalendar() {
  const events = MOCK_EVENTS.map((event) => ({
    title: event.title,
    start: new Date(event.start),
    end: new Date(event.end),
    color: event.color,
  }));

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.color,
    },
  });

  const handleEventSelect = (event) => {
    alert(`Title: ${event.title}\nStart: ${event.start}\nEnd: ${event.end}`);
  };

  return (
    <div>
      <HeaderTop />
      <div style={{ display: 'flex', justifyContent: '-moz-initial' }}>
        <Sidebar />
        <div style={{ flexGrow: 500, maxWidth: '1600px', padding: '69px' }}>
          <div style={{ textAlign: 'center', marginBottom: '5px' }}>
            <h1><AiFillCalendar /> Mon Calendrier</h1>
          </div>
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
      </div>
    </div>
  );
}

export default MyCalendar;
