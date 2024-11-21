import React, { useState } from 'react';
import EventList from './events-list';
import UserSection from './user-section';
import UserIcon from '../assets/account_circle.svg';
import EventIcon from '../assets/calendar_month.svg';
import '../styles/home.css';

const Home = ({ events = [] }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [activeSection, setActiveSection] = useState('eventos');

    return (
        <div>
            <header>
                <nav style={{}}>
                    <button onClick={() => setActiveSection('eventos')} style={{backgroundColor: activeSection === 'eventos' ? "#E0E994" : "#FFFFFF"}}>
                        <img src={EventIcon} alt="Eventos" />
                    </button>
                    <button onClick={() => setActiveSection('usuario')} style={{backgroundColor: activeSection === 'eventos' ? "#FFFFFF" : "#E0E994"}}>
                        <img src={UserIcon} alt="Usuario" />    
                    </button>
                </nav>
            </header>
            
            <div className="body">
                {activeSection === 'eventos' && (
                    <EventList events={events} setSelectedEvent={setSelectedEvent} />
                )}
                {activeSection === 'usuario' && (
                    <UserSection />
                )}
                {selectedEvent && (
                    <div>
                        <h2>{selectedEvent.name}</h2>
                        <p>{selectedEvent.location}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;