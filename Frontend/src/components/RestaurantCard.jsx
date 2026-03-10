import { Badge, Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUtensils, FaClipboardList, FaUsers } from 'react-icons/fa';

function RestaurantCard({ restaurant }) {
  const navigate = useNavigate();

  // Premium placeholder image logic
  const placeholderImg = `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800&h=500&restaurant=${restaurant.restauranteID}`;

  return (
    <div className="restaurant-card h-100 p-0 overflow-hidden d-flex flex-column bg-white">
      <div className="card-img-container position-relative">
        <img 
          src={placeholderImg} 
          className="restaurant-img w-100 h-100 object-fit-cover"
          alt={restaurant.restaurante}
        />
        <div className="position-absolute top-0 end-0 p-3 z-3">
          <span className="badge-premium">
            {restaurant.barrio}
          </span>
        </div>
      </div>
      <div className="p-4 d-flex flex-column flex-grow-1">
        <h3 className="font-display mb-2">{restaurant.restaurante}</h3>
        <p className="text-muted small mb-4 flex-grow-1" style={{ fontFamily: 'var(--font-body)', lineHeight: '1.8' }}>
          Sabores exclusivos en {restaurant.barrio}. Una experiencia diseñada para los paladares más exigentes.
        </p>
        
        <div className="d-flex flex-wrap gap-2 mt-auto">
          <Button 
            variant="outline-dark" 
            size="sm"
            className="flex-grow-1 d-flex align-items-center justify-content-center gap-2 py-2 text-uppercase tracking-wider small fw-600"
            onClick={() => navigate(`/restaurant/${restaurant.restauranteID}/menu`)}
          >
            <FaUtensils size={12} /> Menú
          </Button>
          <Button 
            variant="outline-dark" 
            size="sm"
            className="flex-grow-1 d-flex align-items-center justify-content-center gap-2 py-2 text-uppercase tracking-wider small fw-600"
            onClick={() => navigate(`/restaurant/${restaurant.restauranteID}/orders`)}
          >
            <FaClipboardList size={12} /> Pedidos
          </Button>
          <Button 
            variant="outline-dark" 
            size="sm"
            className="flex-grow-1 d-flex align-items-center justify-content-center gap-2 py-2 text-uppercase tracking-wider small fw-600"
            onClick={() => navigate(`/restaurant/${restaurant.restauranteID}/customers`)}
          >
            <FaUsers size={12} /> Clientes
          </Button>
        </div>
        
        <button 
          className="btn-premium w-100 mt-3 py-2 small"
          onClick={() => navigate(`/restaurant/${restaurant.restauranteID}`)}
        >
          Gestionar Local
        </button>
      </div>
    </div>
  );
}

export default RestaurantCard;
