
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import PokemonDetail from './components/PokemonDetail';
import ThemeToggle from './components/ThemeToggle';



function App() {
  return (
    
    <BrowserRouter>
      <div className="min-h-screen">
        <div className="p-4 flex justify-end">
          <ThemeToggle />
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;