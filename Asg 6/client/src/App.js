import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import Login from './Components/Login';
import ScheduleEmail from './Components/ScheduleEmail';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <h1>Welcome</h1> */}
        <Navbar />
        <Routes>
          <Route path="/register" element={Register} />
          <Route path="/login" element={Login} />
          <Route path="/schedule-email" element={ScheduleEmail} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
