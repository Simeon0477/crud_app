import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import Show from './pages/Show';
import Update from './pages/Update';
import Navbar from './components/Navbar';

export default function App() {
    return (
        <>
            <Navbar />

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/update" element={<Update />} />
                    <Route path="/students" element={<Show />} />
                </Routes>
            </main>
        </>
    );
}