import "./GuiaUso.css";

export default function GuiaUso({ tipo = "usuario" }) {
  const esAdmin = tipo === "admin";

  return (
    <div className="guia-page">
      <div className="guia-container">
        <div className="guia-header">
          <p className="guia-kicker">Cozy Home</p>
          <h1>
            {esAdmin ? "Guía de uso para administrador" : "Guía de uso para usuarios"}
          </h1>
          <p className="guia-subtitle">
            {esAdmin
              ? "Aquí encontrarás cómo gestionar productos y pedidos dentro del sistema."
              : "Aquí encontrarás cómo navegar, comprar productos y gestionar tu cuenta dentro del sistema."}
          </p>
        </div>

        {!esAdmin ? (
          <>
            <section className="guia-section">
              <h2>1. Inicio</h2>
              <p>
                En la página principal encontrarás la bienvenida a Cozy Home y el botón
                <strong> “Empieza a comprar”</strong>, que te llevará directamente al catálogo de productos.
              </p>
            </section>

            <section className="guia-grid">
              <div className="guia-card">
                <h3>2. Registro</h3>
                <p>
                  Si aún no tienes cuenta, ingresa a <strong>“Registrarse”</strong> y completa tus datos:
                  nombres, apellidos, identificación, correo y contraseña.
                </p>
              </div>

              <div className="guia-card">
                <h3>3. Inicio de sesión</h3>
                <p>
                  Si ya tienes cuenta, ve a <strong>“Log in”</strong>, escribe tu correo y contraseña,
                  y entra al sistema.
                </p>
              </div>

              <div className="guia-card">
                <h3>4. Ver productos</h3>
                <p>
                  En la sección <strong>“Productos”</strong> podrás ver el catálogo disponible,
                  con imagen, nombre, descripción y precio de cada producto.
                </p>
              </div>

              <div className="guia-card">
                <h3>5. Agregar al carrito</h3>
                <p>
                  Presiona el botón <strong>“Comprar”</strong> para añadir productos al carrito.
                  También puedes usar el botón del carrito para ir directamente a la compra.
                </p>
              </div>

              <div className="guia-card">
                <h3>6. Carrito de compras</h3>
                <p>
                  En la sección <strong>“Compra”</strong> podrás aumentar o disminuir cantidades,
                  eliminar productos y revisar el total antes de pagar.
                </p>
              </div>

              <div className="guia-card">
                <h3>7. Pago</h3>
                <p>
                  Al hacer clic en <strong>“Proceder al pago”</strong>, deberás completar tus datos
                  personales. Luego el sistema registrará la compra y te mostrará las instrucciones
                  de pago y envío.
                </p>
              </div>

              <div className="guia-card">
                <h3>8. Pedidos realizados</h3>
                <p>
                  En <strong>“Pedidos Realizados”</strong> podrás consultar tus compras,
                  su estado y el detalle de los productos adquiridos.
                </p>
              </div>

              <div className="guia-card">
                <h3>9. Cambiar contraseña</h3>
                <p>
                  Si necesitas actualizar tu clave, entra a <strong>“Cambiar contraseña”</strong>,
                  completa tu correo, contraseña actual y nueva contraseña.
                </p>
              </div>
            </section>

            <section className="guia-section guia-highlight">
              <h2>Recomendaciones para el usuario</h2>
              <ul>
                <li>Inicia sesión antes de comprar.</li>
                <li>Verifica bien tus datos antes de pagar.</li>
                <li>Consulta el estado de tus pedidos desde tu cuenta.</li>
                <li>Usa una contraseña segura de mínimo 8 caracteres.</li>
              </ul>
            </section>
          </>
        ) : (
          <>
            <section className="guia-section">
              <h2>1. Acceso al panel administrativo</h2>
              <p>
                El administrador inicia sesión con su cuenta. Si el rol del usuario es
                <strong> “admin”</strong>, el sistema lo redirige al panel de administración.
              </p>
            </section>

            <section className="guia-grid">
              <div className="guia-card">
                <h3>2. Resumen del panel</h3>
                <p>
                  En la parte superior encontrarás un resumen con la cantidad de productos activos,
                  pedidos registrados y pedidos pendientes.
                </p>
              </div>

              <div className="guia-card">
                <h3>3. Agregar productos</h3>
                <p>
                  Completa el formulario con nombre, descripción, precio, categoría e imagen.
                  Luego haz clic en <strong>“Agregar producto”</strong>.
                </p>
              </div>

              <div className="guia-card">
                <h3>4. Editar productos</h3>
                <p>
                  Desde la lista de productos, pulsa <strong>“Editar”</strong>. El formulario
                  se cargará automáticamente con la información del producto para actualizarlo.
                </p>
              </div>

              <div className="guia-card">
                <h3>5. Eliminar productos</h3>
                <p>
                  Puedes ocultar un producto del catálogo con el botón <strong>“Eliminar”</strong>.
                  El sistema solicitará confirmación antes de hacerlo.
                </p>
              </div>

              <div className="guia-card">
                <h3>6. Ver pedidos</h3>
                <p>
                  En la tabla de pedidos podrás revisar el ID de la compra, el usuario,
                  el total, el estado y los productos incluidos en cada pedido.
                </p>
              </div>

              <div className="guia-card">
                <h3>7. Cambiar estado del pedido</h3>
                <p>
                  Puedes cambiar el estado entre <strong>“pendiente”</strong> y
                  <strong> “completada”</strong> con el botón <strong>“Cambiar estado”</strong>.
                </p>
              </div>
            </section>

            <section className="guia-section guia-highlight">
              <h2>Recomendaciones para el administrador</h2>
              <ul>
                <li>Verifica que los precios estén bien antes de publicar productos.</li>
                <li>Usa imágenes claras y de buena calidad.</li>
                <li>Haz seguimiento periódico a los pedidos pendientes.</li>
                <li>Confirma los pagos antes de marcar pedidos como completados.</li>
              </ul>
            </section>
          </>
        )}
      </div>
    </div>
  );
}