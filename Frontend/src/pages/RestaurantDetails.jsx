import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
    Container,
    Table,
    Button,
    Spinner,
    Alert,
    Badge,
    Breadcrumb,
} from "react-bootstrap";

function RestaurantDetails() {
    const { id, type } = useParams();
    const [data, setData] = useState([]);
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const API_URL = import.meta.env.VITE_API_URL;
            setLoading(true);
            try {
                // Fetch restaurant info
                const resResp = await fetch(
                    `${API_URL}/restaurants`,
                );
                const restaurants = await resResp.json();
                const current = restaurants.find(
                    (r) => r.restauranteID === parseInt(id),
                );
                setRestaurant(current);

                // Fetch type data (dishes, orders, or customers)
                const dataResp = await fetch(`${API_URL}/${type}`);
                if (!dataResp.ok) throw new Error(`Error al cargar ${type}`);
                const allData = await dataResp.json();

                // Filter data by restaurant ID (Note: customers might need a join or are global)
                // For simplicity, we assume Dishes and Orders have restauranteID.
                // Customers are global in this DB but we'll show them as related.
                let filtered = allData;
                if (type !== "customers") {
                    filtered = allData.filter(
                        (item) => item.restauranteID === parseInt(id),
                    );
                }

                if (type === "orders") {
                    const custResp = await fetch(`${API_URL}/customers`);
                    const customersData = custResp.ok ? await custResp.json() : [];

                    filtered = await Promise.all(
                        filtered.map(async (order) => {
                            const customerInfo = customersData.find(
                                (c) => c.clienteID === order.clienteID
                            );

                            const dishesResp = await fetch(
                                `${API_URL}/order/${order.pedidoID}/dishes`
                            );
                            const dishesInfo = dishesResp.ok ? await dishesResp.json() : [];

                            return {
                                ...order,
                                customer: customerInfo,
                                dishes: dishesInfo,
                            };
                        })
                    );
                }

                setData(filtered);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [id, type]);

    if (loading)
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="warning" />
                <p className="mt-3">Obteniendo datos...</p>
            </div>
        );

    if (error)
        return (
            <Container className="py-5">
                <Alert variant="danger">{error}</Alert>
                <Button
                    as={Link}
                    to={`/restaurant/${id}`}
                    variant="outline-danger"
                >
                    Volver al Dashboard
                </Button>
            </Container>
        );

    const getTitle = () => {
        switch (type) {
            case "dishes":
                return "Carta de Platos";
            case "orders":
                return "Registro de Pedidos";
            case "customers":
                return "Base de Clientes";
            default:
                return "Detalles";
        }
    };

    const renderTable = () => {
        if (data.length === 0)
            return (
                <Alert variant="info">
                    No se encontraron registros para esta categoría.
                </Alert>
            );

        switch (type) {
            case "dishes":
                return (
                    <Table
                        responsive
                        hover
                        className="shadow-sm rounded overflow-hidden"
                    >
                        <thead className="bg-dark text-white">
                            <tr>
                                <th>ID</th>
                                <th>Plato</th>
                                <th>Descripción</th>
                                <th className="text-end">Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((dish) => (
                                <tr key={dish.platoID}>
                                    <td>{dish.platoID}</td>
                                    <td className="fw-bold">{dish.plato}</td>
                                    <td className="text-muted small">
                                        {dish.descripcion}
                                    </td>
                                    <td className="text-end fw-bold">
                                        {dish.precio}€
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                );
            case "orders":
                return (
                    <Table
                        responsive
                        hover
                        className="shadow-sm rounded overflow-hidden"
                    >
                        <thead className="bg-dark text-white">
                            <tr>
                                <th>Pedido ID</th>
                                <th>Cliente</th>
                                <th>Platos</th>
                                <th>Total</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((order) => (
                                <tr key={order.pedidoID} className="align-middle">
                                    <td className="fw-bold text-nowrap">#{order.pedidoID}</td>
                                    <td>
                                        {order.customer ? (
                                            <>
                                                <div className="fw-bold">{order.customer.nombre} {order.customer.apellido1} {order.customer.apellido2}</div>
                                                <div className="text-muted small">ID: {order.clienteID}</div>
                                            </>
                                        ) : (
                                            order.clienteID
                                        )}
                                    </td>
                                    <td>
                                        {order.dishes && order.dishes.length > 0 ? (
                                            <ul className="list-unstyled mb-0">
                                                {order.dishes.map((dish, i) => (
                                                    <li key={i} className="small">
                                                        <Badge bg="light" text="dark" className="me-2 mb-1 border">
                                                            {dish.cantidad}x
                                                        </Badge>
                                                        {dish.plato}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span className="text-muted small">Sin platos</span>
                                        )}
                                    </td>
                                    
                                    <td className="fw-bold text-success">
                                        {order.dishes && order.dishes.length > 0
                                            ? order.dishes.reduce((total, dish) => total + (parseFloat(dish.precio) * parseInt(dish.cantidad, 10)), 0).toFixed(2)
                                            : "0.00"}€
                                    </td>
                                    <td className="text-nowrap">
                                        {new Date(
                                            order.fecha,
                                        ).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                );
            case "customers":
                return (
                    <Table
                        responsive
                        hover
                        className="shadow-sm rounded overflow-hidden"
                    >
                        <thead className="bg-dark text-white">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Sexo</th>
                                <th>Población</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((customer) => (
                                <tr key={customer.clienteID}>
                                    <td>{customer.clienteID}</td>
                                    <td className="fw-bold">
                                        {customer.nombre}
                                    </td>
                                    <td>
                                        {customer.apellido1}{" "}
                                        {customer.apellido2}
                                    </td>
                                    <td>
                                        <Badge
                                            bg={
                                                customer.sexo === "M"
                                                    ? "danger"
                                                    : "primary"
                                            }
                                        >
                                            {customer.sexo}
                                        </Badge>
                                    </td>
                                    <td>{customer.poblacion}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                );
            default:
                return null;
        }
    };

    return (
        <Container className="py-5" style={{ marginTop: "80px" }}>
            <div className="reveal">
                <Breadcrumb className="mb-4 custom-breadcrumb">
                    <Breadcrumb.Item
                        linkAs={Link}
                        linkProps={{ to: "/" }}
                        className="text-uppercase small tracking-wider"
                    >
                        Inicio
                    </Breadcrumb.Item>
                    <Breadcrumb.Item
                        linkAs={Link}
                        linkProps={{ to: `/restaurant/${id}` }}
                        className="text-uppercase small tracking-wider"
                    >
                        {restaurant?.restaurante}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item
                        active
                        className="text-uppercase small tracking-wider text-gold"
                    >
                        {getTitle()}
                    </Breadcrumb.Item>
                </Breadcrumb>

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-5 gap-4">
                    <div>
                        <h1 className="display-4 font-display mb-1">
                            {getTitle()}
                        </h1>
                        <p className="text-muted lead mb-0">
                            <span className="text-gold fw-600">
                                {restaurant?.restaurante}
                            </span>{" "}
                            &mdash; {restaurant?.barrio}
                        </p>
                    </div>
                    <Button
                        as={Link}
                        to={`/restaurant/${id}`}
                        className="btn-premium"
                    >
                        &larr; Volver al Panel
                    </Button>
                </div>

                <div className="bg-white p-2 p-md-4 rounded-4 shadow-sm overflow-hidden mb-5">
                    {renderTable()}
                </div>
            </div>
        </Container>
    );
}

export default RestaurantDetails;
