import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function RestaurantCard({ restaurant }) {
  const navigate = useNavigate();

  // Generate a random image for placeholder if no image exists in DB
  const placeholderImg = `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800&h=500&restaurant=${restaurant.restauranteID}`;

  return (
    <Card className="h-100 border-0 shadow-sm restaurant-card overflow-hidden">
      <div className="card-img-container">
        <Card.Img 
          variant="top" 
          src={placeholderImg} 
          className="restaurant-img"
          alt={restaurant.restaurante}
        />
        <div className="card-img-overlay-custom d-flex align-items-end p-3">
          <Badge bg="warning" text="dark" className="fw-bold px-3 py-2">
            {restaurant.barrio}
          </Badge>
        </div>
      </div>
      <Card.Body className="d-flex flex-column p-4">
        <Card.Title className="fw-bold h4 mb-3">{restaurant.restaurante}</Card.Title>
        <Card.Text className="text-muted mb-4 small">
          Disfruta de la mejor gastronomía en el corazón de {restaurant.barrio}. 
          Un ambiente excepcional y sabores que te sorprenderán.
        </Card.Text>
        <Button 
          variant="outline-dark" 
          className="mt-auto fw-bold py-2 custom-btn"
          onClick={() => navigate(`/restaurant/${restaurant.restauranteID}`)}
        >
          Ver Menú Completo
        </Button>
      </Card.Body>
    </Card>
  );
}

export default RestaurantCard;
