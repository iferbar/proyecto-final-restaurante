import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
    Row,
    Col,
    Card,
    Button,
    Badge,
    Spinner,
    Alert,
    Container,
} from "react-bootstrap";

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
                    fetch(`http://localhost:4000/dishes`),
                ]);

                if (!resResp.ok || !dishesResp.ok)
                    throw new Error("Error al conectar con el servidor");

                const restaurantsData = await resResp.json();
                const allDishes = await dishesResp.json();

                const currentRestaurant = restaurantsData.find(
                    (r) => r.restauranteID === parseInt(id),
                );
                if (!currentRestaurant)
                    throw new Error("Restaurante no encontrado");

                const filteredDishes = allDishes.filter(
                    (d) => d.restauranteID === parseInt(id),
                );

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
                    <Button as={Link} to="/" variant="outline-danger">
                        Volver al inicio
                    </Button>
                </Alert>
            </Container>
        );
    }

    return (
        <div className="reveal">
            <div
                className="restaurant-header mb-5 p-5 text-white position-relative overflow-hidden"
                style={{
                    background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2000) center/cover`,
                    minHeight: "400px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "60px",
                }}
            >
                <div className="text-center">
                    <Button
                        as={Link}
                        to="/"
                        variant="link"
                        className="text-white p-0 mb-4 text-decoration-none text-uppercase tracking-widest small opacity-75 hover-opacity-100 transition-all"
                    >
                        &larr; Ver Todos los Restaurantes
                    </Button>
                    <h1 className="display-1 font-display mb-3 text-white">
                        {restaurant.restaurante}
                    </h1>
                    <div className="d-flex align-items-center justify-content-center gap-3">
                        <div
                            style={{
                                height: "1px",
                                width: "40px",
                                background: "var(--color-secondary)",
                            }}
                        ></div>
                        <span className="text-uppercase tracking-widest text-gold fw-600">
                            {restaurant.barrio}
                        </span>
                        <div
                            style={{
                                height: "1px",
                                width: "40px",
                                background: "var(--color-secondary)",
                            }}
                        ></div>
                    </div>
                </div>
            </div>

            <Container className="pb-5">
                <div className="text-center mb-5">
                    <h2 className="display-4 font-display mb-2">
                        Nuestra Carta
                    </h2>
                    <p
                        className="text-muted italic"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Selección exclusiva de especialidades de la casa
                    </p>
                </div>

                {dishes.length === 0 ? (
                    <div className="text-center py-5 opacity-50">
                        <p className="font-display h4 italic">
                            Próximamente estaremos añadiendo platos a este menú.
                        </p>
                    </div>
                ) : (
                    <Row className="g-5">
                        {dishes.map((dish) => (
                            <Col key={dish.platoID} xs={12} lg={6}>
                                <div
                                    className="dish-item d-flex align-items-start gap-3 p-3 transition-all hover-translate-y"
                                    style={{ borderBottom: "1px solid #eee" }}
                                >
                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between align-items-baseline mb-2">
                                            <h4 className="font-display h4 mb-0">
                                                {dish.plato}
                                            </h4>
                                            <div
                                                className="flex-grow-1 mx-3 mb-1"
                                                style={{
                                                    borderBottom:
                                                        "1px dotted #ccc",
                                                }}
                                            ></div>
                                            <span className="font-display h5 mb-0 text-gold">
                                                {dish.precio}€
                                            </span>
                                        </div>
                                        {dish.descripcion && (
                                            <p
                                                className="text-muted small mb-0 pe-5"
                                                style={{
                                                    fontFamily:
                                                        "var(--font-body)",
                                                    fontStyle: "italic",
                                                }}
                                            >
                                                {dish.descripcion}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    );
}

export default RestaurantMenu;
