import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import LogIn from './log-in/log-in.jsx';
import Home from './main-page/home.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<LogIn />} />
            </Routes>
        </Router>
    );
}

export default App;
