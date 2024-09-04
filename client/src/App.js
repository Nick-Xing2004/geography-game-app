import './App.css';
import './index.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { MainMenu } from './components/MainMenu';
import { GeographyGame } from './components/GeographyGame';
import { Leaderboard } from './components/Leaderboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainMenu/>}/>
        <Route path='/game' element={<GeographyGame/>}/>
        <Route path='/leaderboard' element={<Leaderboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
