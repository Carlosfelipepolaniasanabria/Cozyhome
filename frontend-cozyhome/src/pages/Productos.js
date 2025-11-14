// src/pages/Productos.js
import { useState } from 'react';

const CATEGORIES = ['All', 'Sofas', 'Beds', 'Tables', 'Chairs', 'Storage'];

const PRODUCTS = [
  {
    id: 1,
    name: 'Modern Sofa',
    price: 799,
    category: 'Sofas',
    image: 'imagenes/tocador.png',
  },
  {
    id: 2,
    name: 'Queen Size Bed',
    price: 599,
    category: 'Beds',
    image: '/images/products/bed-queen.png',
  },
  {
    id: 3,
    name: 'Dining Table',
    price: 399,
    category: 'Tables',
    image: '/images/products/dining-table.png',
  },
  {
    id: 4,
    name: 'Office Chair',
    price: 199,
    category: 'Chairs',
    image: '/images/products/office-chair.png',
  },
  {
    id: 5,
    name: 'Storage Cabinet',
    price: 249,
    category: 'Storage',
    image: '/images/products/storage-cabinet.png',
  },
  {
    id: 6,
    name: 'Accent Chair',
    price: 149,
    category: 'Chairs',
    image: '/images/products/accent-chair.png',
  },
  {
    id: 7,
    name: 'Coffee Table',
    price: 229,
    category: 'Tables',
    image: '/images/products/coffee-table.png',
  },
  {
    id: 8,
    name: 'Nightstand',
    price: 99,
    category: 'Storage',
    image: '/images/products/nightstand.png',
  },
  {
    id: 9,
    name: 'Bookshelf',
    price: 349,
    category: 'Storage',
    image: '/images/products/bookshelf.png',
  },
  {
    id: 10,
    name: 'Console Table',
    price: 279,
    category: 'Tables',
    image: '/images/products/console-table.png',
  },
  {
    id: 11,
    name: 'Bar Stool',
    price: 129,
    category: 'Chairs',
    image: '/images/products/bar-stool.png',
  },
  {
    id: 12,
    name: 'Side Table',
    price: 79,
    category: 'Tables',
    image: '/images/products/side-table.png',
  },
];

export default function Productos() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts =
    activeCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <main className="products-page">
      <div className="products-container">
        {/* Encabezado superior */}
        <header className="products-header">
          

          <div className="products-search">
            <input
              type="text"
              placeholder="Search"
              className="products-search-input"
            />
          </div>
        </header>

        {/* Filtros (chips) */}
        <div className="product-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={
                'filter-pill ' +
                (activeCategory === cat ? 'filter-pill-active' : '')
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de productos */}
        <section className="products-grid">
          {filteredProducts.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-image-wrapper">
                {/* Cambia las rutas de las imágenes por las que tú tengas */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                  onError={(e) => {
                    // Si no encuentra la imagen, ponemos la de inicio para que no se vea roto
                    e.target.src = '/images/inicio.png';
                  }}
                />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price}</p>
              </div>
            </article>
          ))}
        </section>

        {/* Paginación (solo visual) */}
        <div className="products-pagination">
          <button className="page-arrow">{'<'}</button>
          <button className="page-dot page-dot-active">1</button>
          <button className="page-dot">2</button>
          <button className="page-dot">3</button>
          <button className="page-dot">4</button>
          <button className="page-dot">5</button>
          <button className="page-arrow">{'>'}</button>
        </div>
      </div>
    </main>
  );
}
