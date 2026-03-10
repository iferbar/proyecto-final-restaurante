import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';
import Home from './pages/Home';
import RestaurantMenu from './pages/RestaurantMenu';
import './App.css';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent />
      <main className="flex-grow-1 py-4">
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurant/:id" element={<RestaurantMenu />} />
          </Routes>
        </Container>
      </main>
      <FooterComponent />
    </div>
  );
}

export default App;
