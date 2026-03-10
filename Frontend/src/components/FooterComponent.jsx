import { Container } from 'react-bootstrap';

function FooterComponent() {
  return (
    <footer className="bg-dark text-white p-4 mt-full">
      <Container className="text-center">
        <p className="mb-0">&copy; {new Date().getFullYear()} GastroGuide - Tu guía de restaurantes premium.</p>
        <small>Diseñado con elegancia para amantes de la buena mesa.</small>
      </Container>
    </footer>
  );
}

export default FooterComponent;
