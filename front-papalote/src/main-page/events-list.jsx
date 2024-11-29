// EventList.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../styles/event-list.css';
import { firestore } from '../firebase/firebase';
import { doc, collection, getDocs, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';

const EventList = ({ events, setSelectedEvent }) => {
    const [activeSection, setActiveSection] = useState('eventos');
    const [eventList, setEventList] = useState([]);
    const [activityList, setActivityList] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [tempItem, setTempItem] = useState(null);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchEvents = async () => {
            const querySnapshot = await getDocs(collection(firestore, 'events'));
            const eventsData = [];
            querySnapshot.forEach((doc) => {
                eventsData.push({ id: doc.id, ...doc.data() });
            });
            setEventList(eventsData);
        };

        const fetchActivities = async () => {
            const querySnapshot = await getDocs(collection(firestore, 'activities'));
            const activitiesData = [];
            querySnapshot.forEach((doc) => {
                activitiesData.push({ id: doc.id, ...doc.data() });
            });
            setActivityList(activitiesData);
        };

        fetchActivities();
        fetchEvents();
    }, []);

    const handleCardClick = (item) => {
        setSelectedItem(item);
        setTempItem({ ...item });
        setMessage('');
    };

    const handleCreate = () => {
        setSelectedItem(null);
        setTempItem({
            name: '',
            description: '',
            zone: '',
            date: '',
            image: ''
        });
        setMessage('');
    };

    const handleSave = async () => {
        console.log('handleSave called');
        if (tempItem) {
            try {
                if (tempItem.id) {
                    console.log('Updating document with id:', tempItem.id);
                    const itemRef = doc(firestore, activeSection === 'eventos' ? 'events' : 'activities', tempItem.id);
                    const { id, ...updatedItem } = tempItem;
                    await updateDoc(itemRef, updatedItem);
                    setMessage('Guardado con éxito');
                    console.log('Document updated successfully');
                } else {
                    console.log('Creating new document');
                    const collectionRef = collection(firestore, activeSection === 'eventos' ? 'events' : 'activities');
                    const docRef = await addDoc(collectionRef, tempItem);
                    const newItem = { ...tempItem, id: docRef.id };
                    setTempItem(newItem);
                    setMessage('Creado con éxito');
                    console.log('Document created successfully with id:', docRef.id);

                    // Actualizar la lista de eventos o actividades
                    if (activeSection === 'eventos') {
                        setEventList([...eventList, newItem]);
                    } else {
                        setActivityList([...activityList, newItem]);
                    }
                }
                setSelectedItem(tempItem);
            } catch (error) {
                setMessage('Error al guardar');
                console.error('Error saving document:', error);
            }
        } else {
            console.log('tempItem is undefined');
        }
    };

    const handleDelete = async (item) => {
        const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar este ${activeSection === 'eventos' ? 'evento' : 'actividad'}?`);
        if (confirmDelete) {
            try {
                const itemRef = doc(firestore, activeSection === 'eventos' ? 'events' : 'activities', item.id);
                await deleteDoc(itemRef);
                setMessage('Eliminado con éxito');
                if (activeSection === 'eventos') {
                    setEventList(eventList.filter(event => event.id !== item.id));
                } else {
                    setActivityList(activityList.filter(activity => activity.id !== item.id));
                }
                setSelectedItem(null);
                setTempItem(null);
                console.log('Document deleted successfully');
            } catch (error) {
                setMessage('Error al eliminar');
                console.error('Error deleting document:', error);
            }
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempItem({ ...tempItem, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSectionChange = (section) => {
        setActiveSection(section);
        setSelectedItem(null);
        setTempItem(null);
        setMessage('');
    };

    return (
        <div className='eventlist__container'>
            <div className='evenlist-library__container'>
                <div className='evenlist-library-filter__container'>
                    <button onClick={() => handleSectionChange('eventos')} style={{ backgroundColor: activeSection === 'eventos' ? "#E0E994" : "#FFFFFF"}}>
                        Eventos
                    </button>
                    <button onClick={() => handleSectionChange('actividades')} style={{backgroundColor: activeSection === 'eventos' ? "#FFFFFF" : "#E0E994"}}>
                        Actividades
                    </button>
                </div>
                <div className='evenlist-library-card__container' style={{boxShadowTop: "0px 0px 3px #000 inset"}}>
                    <div className='cards__container'>
                        {activeSection === 'eventos' && eventList.map((event, index) => (
                            <div className='cards' key={index}>
                                <div className='cards__img' onClick={() => handleCardClick(event)}>
                                    <img src={event.image} alt={event.name} />
                                </div>
                                <div className='cards__text' onClick={() => handleCardClick(event)}>
                                    <p id='date'>{event.date}</p>
                                    <p id='name'>{event.name}</p> 
                                    <p id='zone'>Zona {event.zone}</p>
                                </div>
                                <button className='delete-button' onClick={() => handleDelete(event)}>X</button>
                            </div>
                        ))}
                        {activeSection === 'actividades' && activityList.map((activity, index) => (
                            <div className='cards' key={index}>
                                <div className='cards__img' onClick={() => handleCardClick(activity)}>
                                    <img src={activity.image} alt={activity.name} style={{objectFit: "scale-down", paddingLeft: "5px"}} />
                                </div>
                                <div className='cards__text' onClick={() => handleCardClick(activity)}>
                                    <p id='name'>{activity.name}</p> 
                                    <p id='zone'>Zona {activity.zone}</p>
                                </div>
                                <button className='delete-button' onClick={() => handleDelete(activity)}>X</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='eventlist-editor__contanier' />
            <div style={{width: "50%"}}>
                <div className='event-editor-header__container'>
                    Crear/Editar {activeSection === 'eventos' ? 'evento' : 'actividad'}
                </div>
                <div className='eventlist-editor-card__contanier'>
                    {tempItem && (
                        <div style={{paddingTop: "16px"}}>    
                            <div>
                                <p style={{fontWeight: "bold", margin: 0, textAlign: "left", padding: "0px 16px 0px 16px"}}>Nombre:</p>
                                <input placeholder='ej. Hacer arte...' value={tempItem.name} onChange={(e) => setTempItem({ ...tempItem, name: e.target.value })} />
                            </div>
                            <div>
                                <p style={{fontWeight: "bold", margin: 0, textAlign: "left", padding: "0px 16px 0px 16px"}}>Descripción corta:</p>
                                <input  placeholder='ej. Haz arte junto con tu familia...' value={tempItem.description} onChange={(e) => setTempItem({ ...tempItem, description: e.target.value })} />
                            </div>
                            <div>
                                <p style={{fontWeight: "bold", margin: 0, textAlign: "left", padding: "0px 16px 0px 16px"}}>Zona:</p>
                                <input placeholder='ej. Comprendo, Soy, Pequeños...' value={tempItem.zone} onChange={(e) => setTempItem({ ...tempItem, zone: e.target.value })} />
                            </div>

                            { activeSection == 'eventos' &&
                                <div>
                                    <p style={{fontWeight: "bold", margin: 0, textAlign: "left", padding: "0px 16px 0px 16px"}}>Fecha:</p>
                                    <input placeholder='ej. martes 12 enero 2024...' value={tempItem.date} onChange={(e) => setTempItem({ ...tempItem, date: e.target.value })} />
                                </div>
                            }
                            <div>
                                <p style={{fontWeight: "bold", margin: 0, textAlign: "left", padding: "0px 16px 0px 16px"}}>Url de imagen:</p>
                                <input placeholder='ej. https://imagen.com' value={tempItem.image} onChange={(e) => setTempItem({ ...tempItem, image: e.target.value })} />
                            </div>


                            { activeSection === 'actividades' &&
                                <div>
                                    <p style={{fontWeight: "bold", margin: 0, textAlign: "left", padding: "0px 16px 0px 16px"}}>Url de QR:</p>
                                    <input placeholder='ej. https://qr-code.com' value={tempItem.qr} onChange={(e) => setTempItem({ ...tempItem, qr: e.target.value })} />
                                </div>
                            }    
                        </div>
                    )}
                </div>
                <div className='event-editor-button__container'>
                    <button onClick={handleSave} style={{marginRight: "1rem"}}>
                        Guardar
                    </button>
                    <button onClick={handleCreate} style={{marginLeft: "1rem"}}>
                        Crear Nuevo
                    </button>
                </div>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default EventList;