import './App.css';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import View from './components/View';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/view" element={<View/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
