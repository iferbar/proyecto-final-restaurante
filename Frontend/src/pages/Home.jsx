import { useState, useEffect } from 'react';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import RestaurantCard from '../components/RestaurantCard';

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/restaurants')
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar los restaurantes');
        return res.json();
      })
      .then((data) => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="warning" />
        <p className="mt-3">Buscando los mejores sabores para ti...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-4">
        {error}. Por favor, asegúrate de que el backend esté en ejecución.
      </Alert>
    );
  }

  return (
    <div>
      <h1 className="display-4 fw-bold mb-4 text-center">Explora Restaurantes</h1>
      <p className="lead text-center mb-5 text-muted">Descubre experiencias culinarias únicas en tu barrio.</p>
      <Row className="g-4">
        {restaurants.map((restaurant) => (
          <Col key={restaurant.restauranteID} xs={12} md={6} lg={4}>
            <RestaurantCard restaurant={restaurant} />
          </Col>
        ))}
      </Row> 
    </div>
  );
}

export default Home;
