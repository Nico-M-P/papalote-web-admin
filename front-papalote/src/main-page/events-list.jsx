// EventList.jsx
import React, { useState, useEffect } from 'react';
import '../styles/event-list.css';

const EventList = ({ events, setSelectedEvent }) => {
    const cantidad = 10;
    const [activeSection, setActiveSection] = useState('eventos');

    return (
        <div className='eventlist__container'>
            <div className='evenlist-library__container'>
                <div className='evenlist-library-filter__container'>
                    <button onClick={() => setActiveSection('eventos')} style={{ backgroundColor: activeSection === 'eventos' ? "#E0E994" : "#FFFFFF"}}>
                        Eventos
                    </button>
                    <button onClick={() => setActiveSection('actividades')} style={{backgroundColor: activeSection === 'eventos' ? "#FFFFFF" : "#E0E994"}}>
                        Actividades
                    </button>
                </div>
                <div className='evenlist-library-card__container' style={{boxShadowTop: "0px 0px 3px #000 inset"}}>
                    <div className='cards__container'>
                        {Array.from({ length: cantidad }).map((_, index) => (
                            <div className='cards' key={index}>
                            {/* Contenido del div */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='eventlist-editor__contanier' />
            <div style={{width: "50%"}}>
                <div className='event-editor-header__container'>
                    Crear/Editar nuevo evento
                </div>
                <div className='eventlist-editor-card__contanier'>

                </div>
                <div className='event-editor-addDate__container'>
                    <input placeholder='20/12/2024'>
                        
                    </input>
                </div>
                <div className='event-editor-button__container'>
                    <button>
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventList;