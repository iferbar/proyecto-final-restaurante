import { useState, useEffect } from "react";
import { Row, Col, Spinner, Alert, Container } from "react-bootstrap";
import RestaurantCard from "../components/RestaurantCard";

function Home() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const API_URL = import.meta.env.VITE_API_URL;
        fetch(`${API_URL}/restaurants`)
            .then((res) => {
                if (!res.ok)
                    throw new Error("Error al cargar los restaurantes");
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
                <p className="mt-5">Buscando los mejores sabores para ti...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger" className="mt-5">
                {error}. Por favor, asegúrate de que el backend esté en
                ejecución.
            </Alert>
        );
    }

    return (
        <div className="reveal">
            {/* Hero Section */}
            <div
                className="hero-section text-center py-5 mb-5 rounded-4 shadow-sm"
                style={{
                    background:
                        'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2000")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: "120px 20px",
                    color: "white",
                    marginTop: "80px",
                }}
            >
                <h1 className="display-2 font-display text-white mb-3">
                    Saborea la <span className="text-gold">Excelencia</span>
                </h1>
                <p
                    className="lead fs-4 opacity-90 mb-4"
                    style={{ fontFamily: "var(--font-body)" }}
                >
                    Descubre los rincones más exclusivos de la gastronomía
                    local.
                </p>
                <button
                    className="btn-premium border-white text-white"
                    onClick={() =>
                        window.scrollTo({ top: 800, behavior: "smooth" })
                    }
                >
                    Explorar Ahora
                </button>
            </div>

            <Container>
                <div className="text-center mb-5">
                    <h2 className="display-5 font-display mb-3">
                        Restaurantes Destacados
                    </h2>
                    <div
                        className="mx-auto"
                        style={{
                            width: "60px",
                            height: "3px",
                            background: "var(--color-secondary)",
                        }}
                    ></div>
                </div>

                <Row className="g-5">
                    {restaurants.map((restaurant) => (
                        <Col
                            key={restaurant.restauranteID}
                            xs={12}
                            md={6}
                            lg={4}
                        >
                            <RestaurantCard restaurant={restaurant} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default Home;
