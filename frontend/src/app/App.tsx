import './root.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Home from '@pages/Home/Home.tsx'
import Disk from '@pages/Disk/Disk.tsx'
import Settings from '@pages/Settings/Settings.tsx'
import Login from '@pages/Login/Login.tsx'
import Reg from '@pages/Reg/Reg.tsx'
import Pricing from '@pages/Pricing/Pricing'

function App() {
	useEffect(() => {
		const savedTheme = localStorage.getItem('theme')
		document.documentElement.classList.toggle('dark', savedTheme === 'dark')
	}, [])

	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/disk/:id' element={<Disk />} />
				<Route path='/disk' element={<Disk />} />
				<Route path='/settings' element={<Settings />} />
				<Route path='/login' element={<Login />} />
				<Route path='/reg' element={<Reg />} />
				<Route path='/pricing' element={<Pricing />} />
			</Routes>
		</Router>
	)
}

export default App
