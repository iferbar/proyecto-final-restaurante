import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Card, Button, Badge, Spinner, Alert, Container } from 'react-bootstrap';

function RestaurantMenu() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resResp, dishesResp] = await Promise.all([
          fetch(`http://localhost:4000/restaurants`),
          fetch(`http://localhost:4000/dishes`)
        ]);

        if (!resResp.ok || !dishesResp.ok) throw new Error('Error al conectar con el servidor');

        const restaurantsData = await resResp.json();
        const allDishes = await dishesResp.json();

        const currentRestaurant = restaurantsData.find(r => r.restauranteID === parseInt(id));
        if (!currentRestaurant) throw new Error('Restaurante no encontrado');

        const filteredDishes = allDishes.filter(d => d.restauranteID === parseInt(id));

        setRestaurant(currentRestaurant);
        setDishes(filteredDishes);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="warning" />
        <p className="mt-3">Preparando la carta...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>¡Vaya! Algo salió mal</Alert.Heading>
          <p>{error}</p>
          <hr />
          <Button as={Link} to="/" variant="outline-danger">Volver al inicio</Button>
        </Alert>
      </Container>
    );
  }

  return (
    <div>
      <div className="restaurant-header mb-5 p-5 rounded-4 text-white shadow" 
           style={{ 
             background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1600&h=400) center/cover` 
           }}>
        <Button as={Link} to="/" variant="link" className="text-white p-0 mb-3 text-decoration-none">
          &larr; Volver a Restaurantes
        </Button>
        <h1 className="display-3 fw-bold">{restaurant.restaurante}</h1>
        <p className="lead"><Badge bg="warning" text="dark" className="fs-6 px-3 py-2">{restaurant.barrio}</Badge></p>
      </div>

      <h2 className="mb-4 fw-bold">Nuestra Carta</h2>
      
      {dishes.length === 0 ? (
        <p className="text-muted">Próximamente estaremos añadiendo platos a este menú.</p>
      ) : (
        <Row className="g-4">
          {dishes.map((dish) => (
            <Col key={dish.platoID} xs={12} lg={6}>
              <Card className="h-100 border-0 shadow-sm dish-card">
                <Card.Body className="d-flex align-items-center p-4">
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h4 className="fw-bold mb-0">{dish.plato}</h4>
                      <span className="fw-bold fs-5 text-warning">{dish.precio}€</span>
                    </div>
                    {dish.descripcion && <p className="text-muted small mb-0">{dish.descripcion}</p>}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default RestaurantMenu;
