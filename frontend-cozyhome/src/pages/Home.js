export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="cozy-hero">
        <div className="hero-container">
          
          {/* Texto */}
          <div className="hero-content">
            <h1 className="hero-title">Bienvenido a Cozy Home</h1>

            <p className="hero-subtitle">
              Descubre una cuidada selección de muebles y decoración para transformar tu espacio
              en un acogedor refugio. Tanto si amueblas una casa nueva como si renuevas una
              habitación, tenemos todo lo que necesitas para crear un espacio que te encantará.
            </p>

            <div className="hero-divider"></div>

            <div className="hero-buttons">
              <a href="#" className="hero-btn hero-btn-primary">Empieza a comprar</a>
              <a href="#" className="hero-btn hero-btn-secondary">Explora habitaciones</a>
            </div>
          </div>

          {/* Imagen */}
          <div className="hero-image">
            <img src="/images/inicio.png" alt="Cozy Home Interior" />
          </div>
        </div>
      </section>
    </>
  );
}
