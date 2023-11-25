import logo from './logo.svg';
import './App.css';
import BoxList from './component/boxlist/BoxList';
import BoxForm from './component/boxform/BoxForm';
import NavBar from './component/navbar/NavBar';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/boxlist' element={<BoxList/>}></Route>
      <Route path='/boxform' element={<BoxForm/>}></Route>
      <Route path='/boxform/:id' element={<BoxForm/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
