document.addEventListener('DOMContentLoaded', function () {
    const phoneNumber = '584123159975'; // Reemplazar con el número de WhatsApp real

    // --- Datos de ejemplo ---
    const cursos = [
        { id: 1, nombre: "Pack: Pintura en Cerámica", edad: "Niños y Adultos", precio: 25, img: "/course1.png", video: "https://www.youtube.com/embed/dQw4w9WgXcQ", desc: "Descarga nuestro pack completo y aprende a decorar tus propias macetas y platos con diseños únicos.", contenido: ["5 Videos en HD", "Guía PDF paso a paso", "Plantillas de diseño"] },
        { id: 2, nombre: "Pack: Arte con Papel (Quilling)", edad: "12+ años", precio: 30, img: "/course2.png", video: "https://www.youtube.com/embed/dQw4w9WgXcQ", desc: "Un pack con todo lo necesario para crear figuras increíbles enrollando tiras de papel de colores.", contenido: ["8 Videos detallados", "PDF con 20 patrones", "Galería de inspiración"] },
        { id: 3, nombre: "Pack: Creación de Pulseras", edad: "8+ años", precio: 20, img: "/course3.png", video: "https://www.youtube.com/embed/dQw4w9WgXcQ", desc: "Descarga videos y guías para aprender a hacer pulseras de la amistad con diferentes nudos y estilos.", contenido: ["10 Video-tutoriales", "Guía de nudos en PDF", "Ideas de combinación de colores"] }
    ];

    const productos = [
        { id: 1, nombre: "Diario Hecho a Mano", precio: 15, img: "/product1.png" },
        { id: 2, nombre: "Set de Macetas Pintadas", precio: 22, img: "/product2.png" },
        { id: 3, nombre: "Oso de Peluche Amigurumi", precio: 18, img: "/product3.png" }
    ];

    let cart = JSON.parse(localStorage.getItem('mcmCart')) || [];

    // --- Funcionalidad del Menú Hamburguesa ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    // --- Cargar Cursos ---
    const catalogoCursos = document.getElementById('cursos-catalogo');
    if (catalogoCursos) {
        cursos.forEach(curso => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${curso.img}" alt="${curso.nombre}">
                <div class="card-content">
                    <h3>${curso.nombre}</h3>
                    <div class="card-info">
                        <span>Edad: ${curso.edad}</span>
                        <span class="price">$${curso.precio}</span>
                    </div>
                    <p>${curso.desc.substring(0, 50)}...</p>
                    <button class="btn btn-primary open-modal-btn" data-id="${curso.id}">Ver Detalles</button>
                </div>
            `;
            catalogoCursos.appendChild(card);
        });
    }

    // --- Funcionalidad del Modal de Cursos ---
    const modal = document.getElementById('curso-modal');
    const modalBody = document.getElementById('modal-body');

    if (modal) {
        catalogoCursos.addEventListener('click', function (e) {
            if (e.target.classList.contains('open-modal-btn')) {
                const cursoId = parseInt(e.target.dataset.id);
                const curso = cursos.find(c => c.id === cursoId);
                const contenidoList = curso.contenido.map(item => `<li>${item}</li>`).join('');

                modalBody.innerHTML = `
                    <h2>${curso.nombre}</h2>
                    <div class="video-container">
                       <iframe src="${curso.video}" title="Video de muestra" frameborder="0" allowfullscreen></iframe>
                    </div>
                    <p>${curso.desc}</p>
                    <h3>¿Qué incluye este pack?</h3>
                    <ul>
                        ${contenidoList}
                    </ul>
                    <div class="modal-info">
                        <span><strong>Precio:</strong> $${curso.precio}</span>
                        <span><strong>Edad Recomendada:</strong> ${curso.edad}</span>
                    </div>
                    <a href="https://wa.me/${phoneNumber}?text=${encodeURIComponent(`Hola 👋, estoy interesado en comprar el pack del curso "${curso.nombre}" de Mi Casa de Manualidades.`)}" target="_blank" class="btn btn-success">Comprar por WhatsApp</a>
                `;
                modal.style.display = "block";
            }
        });

        const closeBtn = document.querySelector('.close-button');
        closeBtn.onclick = () => modal.style.display = "none";
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
    }

    // --- Cargar Productos ---
    const catalogoProductos = document.getElementById('productos-catalogo');
    if (catalogoProductos) {
        productos.forEach(producto => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${producto.img}" alt="${producto.nombre}">
                <div class="card-content">
                    <h3>${producto.nombre}</h3>
                    <div class="card-info">
                        <span class="price">$${producto.precio}</span>
                    </div>
                    <button class="btn btn-secondary add-to-cart-btn" data-id="${producto.id}">Añadir al carrito</button>
                </div>
            `;
            catalogoProductos.appendChild(card);
        });

        catalogoProductos.addEventListener('click', function (e) {
            if (e.target.classList.contains('add-to-cart-btn')) {
                const productoId = parseInt(e.target.dataset.id);
                addToCart(productoId);
            }
        });
    }

    // --- Funcionalidad del Carrito ---
    function addToCart(productId) {
        const product = productos.find(p => p.id === productId);
        const cartItem = cart.find(item => item.id === productId);

        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    function updateCart() {
        localStorage.setItem('mcmCart', JSON.stringify(cart));
        renderCart();
        updateCartIcon();
    }

    function renderCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartSummary = document.getElementById('cart-summary');
        if (!cartItemsContainer) return;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
            cartSummary.style.display = 'none';
        } else {
            cartItemsContainer.innerHTML = '';
            let total = 0;
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                const formatter = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });
                const lineTotal = formatter.format(item.precio * item.quantity);
                // use ${lineTotal} in the template
                itemElement.innerHTML = `
                    <div class="cart-item-info">
                        <strong>${item.nombre}</strong> (x${item.quantity})
                    </div>
                    <div class="cart-item-price">${lineTotal}</div>
                    <div class="cart-item-actions">
                        <button class="remove-from-cart-btn" data-id="${item.id}">Quitar</button>
                    </div>
                `;
                cartItemsContainer.appendChild(itemElement);
                total += item.precio * item.quantity;
            });
            document.getElementById('cart-total-price').textContent = total;
            cartSummary.style.display = 'block';
        }
    }

    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', e => {
            if (e.target.classList.contains('remove-from-cart-btn')) {
                const productId = parseInt(e.target.dataset.id);
                removeFromCart(productId);
            }
        });
    }

    const whatsappOrderBtn = document.getElementById('whatsapp-order-btn');
    if (whatsappOrderBtn) {
        whatsappOrderBtn.addEventListener('click', () => {
            let message = "Hola 👋, quiero realizar un pedido en Mi Casa de Manualidades:\n";
            let total = 0;
            cart.forEach(item => {
                message += `- ${item.nombre} x${item.quantity}\n`;
                total += item.precio * item.quantity;
            });
            message += `\nTotal: $${total}`;

            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    function updateCartIcon() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    // --- Inicialización ---
    updateCartIcon();
    renderCart();

});