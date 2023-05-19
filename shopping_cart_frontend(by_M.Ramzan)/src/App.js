import './App.css';
import { Routes,Route ,BrowserRouter } from 'react-router-dom';
import Shopping from './Shopping';
import Cart from './Cart';


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Shopping/>} />
    <Route path='/cart' element={<Cart/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
