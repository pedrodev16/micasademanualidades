import confetti from 'canvas-confetti';

document.addEventListener('DOMContentLoaded', () => {

    // --- DATOS DE EJEMPLO ---
    const courses = [
        {
            id: 1,
            name: "Introducción a la Acuarela",
            image: "course-1.png",
            age: "Adultos",
            price: 45.00,
            description: "Aprende las técnicas básicas de la acuarela, desde la mezcla de colores hasta la creación de tu primera obra de arte.",
            duration: "4 semanas",
            video: "https://www.youtube.com/embed/xIshYFP_v4w?si=hC7O94-8tW-y2rP1"
        },
        {
            id: 2,
            name: "Amigurumi para Principiantes",
            image: "course-2.png",
            age: "Jóvenes y Adultos",
            price: 55.00,
            description: "Crea adorables muñecos de ganchillo. Aprenderás los puntos básicos y a leer patrones para dar vida a tus personajes.",
            duration: "6 semanas",
            video: "https://www.youtube.com/embed/1T5gJ3b8jBg?si=D3uGvC1G5n1m5b-C"
        },
        {
            id: 3,
            name: "Taller de Origami Creativo",
            image: "course-3.png",
            age: "Niños +8",
            price: 30.00,
            description: "Descubre el arte japonés de plegar papel. Crearemos figuras de animales, flores y objetos decorativos.",
            duration: "3 semanas",
            video: "https://www.youtube.com/embed/z-5jLLP2OaY?si=zC-hU87QkYn54JvA"
        }
    ];

    const products = [
        {
            id: 101,
            name: "Kit de Macramé para Colgar",
            image: "product-1.png",
            price: 25.50,
            description: "Un kit completo con todo lo necesario para crear un hermoso tapiz de macramé para tu pared."
        },
        {
            id: 102,
            name: "Cuadro Bordado a Mano",
            image: "product-2.png",
            price: 38.00,
            description: "Delicado cuadro con un diseño floral bordado a mano, perfecto para decorar cualquier rincón."
        },
        {
            id: 103,
            name: "Set de Velas Aromáticas DIY",
            image: "product-3.png",
            price: 29.99,
            description: "Crea tus propias velas con cera de soja y esencias naturales. Incluye todo lo que necesitas."
        },
        {
            id: 104,
            name: "Libreta Artesanal de Papel Reciclado",
            image: "product-4.png",
            price: 18.00,
            description: "Una libreta única con tapas duras decoradas y 100 hojas de papel reciclado."
        }
    ];

    const videos = [
        {
            id: 201,
            title: "Origami fácil: Grulla de papel",
            embedUrl: "https://www.youtube.com/embed/z-5jLLP2OaY?si=zC-hU87QkYn54JvA"
        },
        {
            id: 202,
            title: "Pintura con acuarelas para principiantes",
            embedUrl: "https://www.youtube.com/embed/xIshYFP_v4w?si=hC7O94-8tW-y2rP1"
        },
        {
            id: 203,
            title: "Creando pulseras de la amistad",
            embedUrl: "https://www.youtube.com/embed/1T5gJ3b8jBg?si=D3uGvC1G5n1m5b-C"
        }
    ];

    const WHATSAPP_NUMBER = "1234567890"; // Reemplazar con el número real

    // --- INICIALIZACIÓN DEL CARRITO ---
    let cart = JSON.parse(localStorage.getItem('craftCart')) || [];

    // --- RENDERIZADO DINÁMICO DE CONTENIDO ---
    const coursesGrid = document.getElementById('courses-grid');
    const productsGrid = document.getElementById('products-grid');
    const videosGrid = document.getElementById('videos-grid');
    const courseSearchInput = document.getElementById('course-search-input');
    const productSearchInput = document.getElementById('product-search-input');
    const videoSearchInput = document.getElementById('video-search-input');

    function renderCourses(searchTerm = '') {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filteredCourses = courses.filter(course => 
            course.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            course.description.toLowerCase().includes(lowerCaseSearchTerm)
        );

        if (filteredCourses.length === 0) {
            coursesGrid.innerHTML = `<div class="no-results"><h3>No se encontraron cursos</h3><p>Intenta con otra palabra clave.</p></div>`;
            return;
        }

        coursesGrid.innerHTML = filteredCourses.map(course => `
            <div class="card">
                <img src="${course.image}" alt="${course.name}" class="card-image">
                <div class="card-content">
                    <h3>${course.name}</h3>
                    <p class="card-description">${course.description}</p>
                    <div class="card-info">
                        <span class="card-price">$${course.price.toFixed(2)}</span>
                        <span class="card-age">${course.age}</span>
                    </div>
                    <button class="btn btn-primary open-modal-btn" data-course-id="${course.id}">Suscribirse</button>
                </div>
            </div>
        `).join('');
    }

    function renderProducts(searchTerm = '') {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            product.description.toLowerCase().includes(lowerCaseSearchTerm)
        );

        if (filteredProducts.length === 0) {
            productsGrid.innerHTML = `<div class="no-results"><h3>No se encontraron productos</h3><p>Intenta con otra palabra clave.</p></div>`;
            return;
        }

        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="card">
                <img src="${product.image}" alt="${product.name}" class="card-image">
                <div class="card-content">
                    <h3>${product.name}</h3>
                    <p class="card-description">${product.description}</p>
                    <div class="card-info">
                        <span class="card-price">$${product.price.toFixed(2)}</span>
                    </div>
                    <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}">Añadir al carrito</button>
                </div>
            </div>
        `).join('');
    }

    function renderVideos(searchTerm = '') {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filteredVideos = videos.filter(video => 
            video.title.toLowerCase().includes(lowerCaseSearchTerm)
        );

        if (filteredVideos.length === 0) {
            videosGrid.innerHTML = `<div class="no-results"><h3>No se encontraron videos</h3><p>Intenta con otra palabra clave.</p></div>`;
            return;
        }

        videosGrid.innerHTML = filteredVideos.map(video => `
            <div class="video-card">
                <div class="video-wrapper">
                    <iframe src="${video.embedUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <h3>${video.title}</h3>
            </div>
        `).join('');
    }

    // --- BÚSQUEDA ---
    courseSearchInput.addEventListener('input', (e) => {
        renderCourses(e.target.value);
    });

    productSearchInput.addEventListener('input', (e) => {
        renderProducts(e.target.value);
    });

    videoSearchInput.addEventListener('input', (e) => {
        renderVideos(e.target.value);
    });

    // --- NAVEGACIÓN SPA (Single Page Application) ---
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    function navigateTo(hash) {
        pages.forEach(page => page.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));

        const targetPage = document.querySelector(hash);
        const targetLink = document.querySelector(`a[href="${hash}"]`);

        if (targetPage) targetPage.classList.add('active');
        if (targetLink) targetLink.classList.add('active');
        
        window.scrollTo(0, 0);
        
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const hash = e.currentTarget.getAttribute('href');
            if (hash) {
                 navigateTo(hash);
                 // Update URL hash without jumping
                 history.pushState(null, null, hash);
            }
        });
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        navigateTo(location.hash || '#home');
    });


    // --- MODAL DE CURSOS ---
    const modal = document.getElementById('course-modal');
    const modalBody = document.getElementById('modal-body');
    const closeButton = document.querySelector('.close-button');

    function openModal(courseId) {
        const course = courses.find(c => c.id === courseId);
        if (!course) return;

        modalBody.innerHTML = `
            <div class="modal-image">
                <img src="${course.image}" alt="${course.name}">
            </div>
            <div class="modal-details">
                <h2>${course.name}</h2>
                <p>${course.description}</p>
                <p><strong>Edad recomendada:</strong> ${course.age}</p>
                <p><strong>Duración:</strong> ${course.duration}</p>
                <h3>Precio: <span class="card-price">$${course.price.toFixed(2)}</span></h3>
                <div class="modal-video-container">
                    <iframe src="${course.video}" title="Video de muestra" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <a href="${generateWhatsappCourseMessage(course.name)}" target="_blank" class="btn btn-whatsapp" style="width:100%; margin-top:1.5rem; text-align:center;">
                    Consultar por WhatsApp
                </a>
            </div>
        `;
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
        modalBody.innerHTML = ''; // Limpiar contenido para el próximo uso
    }

    coursesGrid.addEventListener('click', e => {
        if (e.target.classList.contains('open-modal-btn')) {
            const courseId = parseInt(e.target.dataset.courseId);
            openModal(courseId);
        }
    });

    closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', e => {
        if (e.target === modal) {
            closeModal();
        }
    });

    function generateWhatsappCourseMessage(courseName) {
        const message = `Hola 👋, estoy interesado en el curso "${courseName}" de Mi Casa de Manualidades. ¿Me pueden dar más información?`;
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    }

    // --- FUNCIONALIDAD DEL CARRITO ---
    productsGrid.addEventListener('click', e => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(e.target.dataset.productId);
            addToCart(productId);
            showAddToCartAnimation(e.target);
        }
    });

    function addToCart(productId, quantity = 1) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }
        updateCart();
    }
    
    function showAddToCartAnimation(button) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: {
                x: button.getBoundingClientRect().left / window.innerWidth,
                y: button.getBoundingClientRect().top / window.innerHeight
            }
        });
    }

    function updateCart() {
        renderCart();
        updateCartCount();
        localStorage.setItem('craftCart', JSON.stringify(cart));
    }

    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    function renderCart() {
        const cartContainer = document.getElementById('cart-container');
        if (cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <img src="empty-cart.png" alt="Carrito vacío">
                    <h3>Tu carrito está vacío</h3>
                    <p>¡Añade algunos productos creativos para empezar!</p>
                    <a href="#shop" class="btn btn-primary nav-link">Ir a la Tienda</a>
                </div>
            `;
            // Add event listener for the new link
             cartContainer.querySelector('.nav-link').addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo('#shop');
            });
            return;
        }

        const itemsHtml = cart.map(item => `
            <div class="cart-item" data-product-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                </div>
                <div class="cart-item-quantity">
                    <input type="number" class="cart-item-qty" value="${item.quantity}" min="1">
                </div>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="cart-item-remove">&times;</button>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        cartContainer.innerHTML = `
            <div id="cart-items">${itemsHtml}</div>
            <div id="cart-summary">
                <div id="cart-total">Total: $${total.toFixed(2)}</div>
                <a href="${generateWhatsappOrderMessage()}" target="_blank" class="btn btn-whatsapp" style="width:100%; max-width: 300px;">
                    Enviar Pedido por WhatsApp
                </a>
            </div>
        `;
    }

    document.getElementById('cart-container').addEventListener('click', e => {
        const target = e.target;
        if (target.classList.contains('cart-item-remove')) {
            const productId = parseInt(target.closest('.cart-item').dataset.productId);
            cart = cart.filter(item => item.id !== productId);
            updateCart();
        }
    });

     document.getElementById('cart-container').addEventListener('change', e => {
        const target = e.target;
        if (target.classList.contains('cart-item-qty')) {
            const productId = parseInt(target.closest('.cart-item').dataset.productId);
            const newQuantity = parseInt(target.value);
            const cartItem = cart.find(item => item.id === productId);
            if (cartItem && newQuantity > 0) {
                cartItem.quantity = newQuantity;
                updateCart();
            } else if (newQuantity <= 0) {
                 cart = cart.filter(item => item.id !== productId);
                 updateCart();
            }
        }
    });

    function generateWhatsappOrderMessage() {
        if (cart.length === 0) return '#';
        let message = 'Hola 👋, quiero realizar un pedido en Mi Casa de Manualidades:\n\n';
        let total = 0;
        cart.forEach(item => {
            message += `- ${item.name} x${item.quantity} ($${(item.price * item.quantity).toFixed(2)})\n`;
            total += item.price * item.quantity;
        });
        message += `\n*Total: $${total.toFixed(2)}*`;
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    }


    // --- INICIALIZACIÓN DE LA APLICACIÓN ---
    function init() {
        renderCourses();
        renderProducts();
        renderVideos();
        updateCart(); // Renderiza el carrito y actualiza el contador al cargar
        navigateTo(location.hash || '#home');
    }

    init();
});