import { Container } from "react-bootstrap";

function FooterComponent() {
    return (
        <footer className="glass-nav py-3 mt-auto">
            <Container>
                <div className="text-center">
                    <h4 className="font-display text-black mb-4 tracking-widest text-uppercase">
                        Gastro<span className="text-gold">Guide</span>
                    </h4>
                    <p className="text-gold mb-0 small text-black">
                        &copy; {new Date().getFullYear()} GastroGuide.
                        Reservados todos los derechos.
                    </p>
                    <div className="mt-3 small text-gold text-black">
                        Diseñado para experiencias culinarias inolvidables.
                    </div>
                </div>
            </Container>
        </footer>
    );
}

export default FooterComponent;
