import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/index';
import SignUp from './pages/login';
import Register from './pages/register';
import Vista from './pages/admin/vista';
import Admin from './pages/admin/admin';
import Change from './pages/changePassword';
import Calendario from './pages/calendar';
import Export from './pages/admin/exportData';
import Fullcalendar from './pages/fullCalendar';
import AddEvent from './pages/admin/addEvent';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

function App() {
	return (	//Route list
		<Router>
			<Navbar />
			<Routes>
				<Route exact path='/' index element={<SignUp />} />	{/*First page when site load */}
				<Route path='/home' element={<Home />} />
				<Route path='/register' element={<Register />} />
				<Route path='/view' element={<Vista />} />
				<Route path='/admin' element={<Admin />} />
				<Route path='/password' element={<Change />} />
				<Route path='/calendar' element={<Calendario />} />
				<Route path='/export' element={<Export />} />
				<Route path='/fullcalendar' element={<Fullcalendar />} />
				<Route path='/addEvent' element={<AddEvent />} />
			</Routes>
		</Router>
	);
}

export default App;