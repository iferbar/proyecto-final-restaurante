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
      description: 'Consulta nuestro menú exclusivo con las mejores especialidades de la casa.',
      icon: <FaUtensils size={40} className="mb-3" />,
      link: `/restaurant/${id}/menu`,
      color: 'gold'
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
    <Container className="py-5" style={{ marginTop: '80px' }}>
      <div className="reveal">
        <div className="mb-5 text-center px-3">
          <Badge bg="white" text="dark" className="mb-3 px-4 py-2 text-uppercase tracking-widest border shadow-sm small">Panel Admin</Badge>
          <h1 className="display-3 font-display mb-2">{restaurant.restaurante}</h1>
          <div className="mx-auto" style={{ width: '50px', height: '2px', background: 'var(--color-secondary)' }}></div>
          <p className="mt-3 text-muted lead tracking-wider text-uppercase small">{restaurant.barrio}</p>
        </div>

        <Row className="g-5 px-xl-5">
          {categories.map((cat, index) => (
            <Col key={index} xs={12} md={4}>
              <div className="bg-white h-100 p-5 rounded-4 shadow-sm text-center transition-all hover-translate-y d-flex flex-column align-items-center">
                <div className={`p-4 rounded-circle mb-4 bg-light text-${cat.color}`} style={{ width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {cat.icon}
                </div>
                <h3 className="font-display h3 mb-3">{cat.title}</h3>
                <p className="text-muted mb-4 small flex-grow-1" style={{ fontFamily: 'var(--font-body)', lineHeight: '1.7' }}>
                  {cat.description}
                </p>
                <Button 
                  as={Link} 
                  to={cat.link} 
                  className="btn-premium w-100"
                >
                  Entrar
                </Button>
              </div>
            </Col>
          ))}
        </Row>

        <div className="mt-5 text-center">
          <Button as={Link} to="/" variant="link" className="text-dark text-decoration-none text-uppercase tracking-widest small opacity-50 hover-opacity-100 transition-all">
            &larr; Volver al Portal de Restaurantes
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default RestaurantDashboard;
