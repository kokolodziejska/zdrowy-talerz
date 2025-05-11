
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartPage from './pages/CartPage';
import ProductListPage from './pages/ProductListPage';
import SummaryPage from './pages/SummaryPage';


function App() {


  return (
    <>
      <Router basename="/zdrowy-talerz">
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/Cart" element={<CartPage />} />
          <Route path="/Summary" element={<SummaryPage />} />
        </Routes>
      </Router>
      
    </>
  );
}

export default App
