import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/index';
import SignUp from './pages/login';
import Register from './pages/register';
import Vista from './pages/vista';
import Admin from './pages/admin';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route exact path='/' index element={<SignUp />} />
				<Route path='/home' element={<Home />} />
				<Route path='/register' element={<Register />} />
				<Route path='/view' element={<Vista />} />
				<Route path='/admin' element={<Admin />} />
			</Routes>
		</Router>
	);
}

export default App;