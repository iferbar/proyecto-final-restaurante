import { Container } from 'react-bootstrap';

function FooterComponent() {
  return (
    <footer className="bg-dark-premium text-white py-5 mt-auto">
      <Container>
        <div className="text-center">
          <h4 className="font-display text-white mb-4 tracking-widest text-uppercase">Gastro<span className="text-gold">Guide</span></h4>
          <p className="text-muted mb-0 small opacity-75">
            &copy; {new Date().getFullYear()} GastroGuide. Reservados todos los derechos.
          </p>
          <div className="mt-3 small text-gold opacity-50">
            Diseñado para experiencias culinarias inolvidables.
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default FooterComponent;
