import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/index';
import SignUp from './pages/login';
import Register from './pages/register';

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route exact path='/' index element={<SignUp />} />
				<Route path='/home' element={<Home />} />
				<Route path='/register' element={<Register />} />
			</Routes>
		</Router>
	);
}

export default App;
