import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid ps-4">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="OctoFit Logo" />
            OctoFit Tracker
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto me-4">
              <li className="nav-item"><Link className="nav-link" to="/activities">Activities</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/workouts">Workouts</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/teams">Teams</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/leaderboard">Leaderboard</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container-lg">
        <Routes>
          <Route path="/" element={
            <div className="text-center py-5">
              <h1 className="display-4 mb-4">Welcome to OctoFit Tracker</h1>
              <p className="lead text-muted">Track your fitness journey with your team and compete on the leaderboard!</p>
              <div className="mt-4">
                <Link to="/activities" className="btn btn-primary me-2">View Activities</Link>
                <Link to="/leaderboard" className="btn btn-secondary">See Leaderboard</Link>
              </div>
            </div>
          } />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
