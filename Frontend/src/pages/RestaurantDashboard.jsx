import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import { FaUtensils, FaClipboardList, FaUsers } from 'react-icons/fa';

function RestaurantDashboard() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/restaurants`)
      .then(res => {
        if (!res.ok) throw new Error('Error al conectar con el servidor');
        return res.json();
      })
      .then(data => {
        const current = data.find(r => r.restauranteID === parseInt(id));
        if (!current) throw new Error('Restaurante no encontrado');
        setRestaurant(current);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="text-center py-5">
      <Spinner animation="border" variant="warning" />
      <p className="mt-3">Cargando panel de control...</p>
    </div>
  );

  if (error) return (
    <Container className="py-5">
      <Alert variant="danger">{error}</Alert>
      <Button as={Link} to="/" variant="outline-danger">Volver</Button>
    </Container>
  );

  const categories = [
    {
      title: 'Carta de Platos',
      description: 'Gestiona el menú, precios y descripciones de los platos.',
      icon: <FaUtensils size={40} className="mb-3 text-warning" />,
      link: `/restaurant/${id}/dishes`,
      color: 'warning'
    },
    {
      title: 'Pedidos',
      description: 'Visualiza el historial de pedidos realizados en este local.',
      icon: <FaClipboardList size={40} className="mb-3 text-primary" />,
      link: `/restaurant/${id}/orders`,
      color: 'primary'
    },
    {
      title: 'Clientes',
      description: 'Listado de clientes que han interactuado con el restaurante.',
      icon: <FaUsers size={40} className="mb-3 text-success" />,
      link: `/restaurant/${id}/customers`,
      color: 'success'
    }
  ];

  return (
    <Container className="py-5">
      <div className="mb-5 text-center">
        <Badge bg="warning" text="dark" className="mb-2 px-3 py-2 fs-6">Panel de Gestión</Badge>
        <h1 className="display-4 fw-bold">{restaurant.restaurante}</h1>
        <p className="lead text-muted">{restaurant.barrio}</p>
      </div>

      <Row className="g-4">
        {categories.map((cat, index) => (
          <Col key={index} xs={12} md={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-4 dashboard-card hover-lift">
              <Card.Body className="d-flex flex-column align-items-center">
                {cat.icon}
                <Card.Title className="fw-bold h3 mb-3">{cat.title}</Card.Title>
                <Card.Text className="text-muted mb-4">
                  {cat.description}
                </Card.Text>
                <Button 
                  as={Link} 
                  to={cat.link} 
                  variant={`outline-${cat.color}`} 
                  className="mt-auto fw-bold px-4 py-2"
                >
                  Acceder
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="mt-5 text-center">
        <Button as={Link} to="/" variant="link" className="text-muted text-decoration-none">
          &larr; Volver a la lista de restaurantes
        </Button>
      </div>
    </Container>
  );
}

export default RestaurantDashboard;
