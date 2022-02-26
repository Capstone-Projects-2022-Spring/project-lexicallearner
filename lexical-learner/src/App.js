import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';

function App() {
  return (
    <div>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />}/>
          <Route path="/login" element={<Upload />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
