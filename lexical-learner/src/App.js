import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className='App'>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/upload" element={<Upload />}/>
          <Route path="/login" element={<Upload />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
