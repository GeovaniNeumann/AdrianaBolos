
    // Aguardar carregamento do DOM
    document.addEventListener('DOMContentLoaded', function() {
        
        // Elementos do DOM
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const header = document.querySelector('.header');
        const galleryItems = document.querySelectorAll('.gallery-item');
        const modal = document.getElementById('galleryModal');
        const modalImg = document.getElementById('modalImage');
        const modalCaption = document.getElementById('modalCaption');
        const closeModal = document.querySelector('.close');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        let currentImageIndex = 0;
        const images = Array.from(galleryItems).map(item => item.querySelector('.gallery-img'));

        // Menu Mobile Toggle
        function toggleMobileMenu() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        }

        // Event listeners para menu mobile
        if (hamburger) {
            hamburger.addEventListener('click', toggleMobileMenu);
        }

        // Fechar menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Header scroll effect
        function handleScroll() {
            const scrollTop = window.pageYOffset;
            
            if (scrollTop > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        }

        window.addEventListener('scroll', handleScroll);

        // Smooth scroll para links internos
        function smoothScroll() {
            const links = document.querySelectorAll('a[href^="#"]');
            
            links.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        const headerHeight = header.offsetHeight;
                        const targetPosition = targetSection.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }

        smoothScroll();

        // Modal da Galeria com navegação
        function initGalleryModal() {
            galleryItems.forEach((item, index) => {
                item.addEventListener('click', function() {
                    const img = this.querySelector('.gallery-img');
                    
                    if (img && modal) {
                        currentImageIndex = index;
                        updateModalImage();
                        modal.style.display = 'block';
                        document.body.style.overflow = 'hidden';
                    }
                });
            });

            // Fechar modal
            function closeGalleryModal() {
                if (modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            }

            // Atualizar imagem no modal
            function updateModalImage() {
                const img = images[currentImageIndex];
                const overlay = galleryItems[currentImageIndex].querySelector('.gallery-overlay');
                
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                
                if (overlay) {
                    const title = overlay.querySelector('h4');
                    const description = overlay.querySelector('p');
                    modalCaption.innerHTML = `
                        <h3>${title ? title.textContent : ''}</h3>
                        <p>${description ? description.textContent : ''}</p>
                    `;
                }
            }

            // Navegação entre imagens
            function showNextImage() {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                updateModalImage();
            }

            function showPrevImage() {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                updateModalImage();
            }

            // Event listeners
            if (closeModal) {
                closeModal.addEventListener('click', closeGalleryModal);
            }

            if (modal) {
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        closeGalleryModal();
                    }
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', showNextImage);
            }

            if (prevBtn) {
                prevBtn.addEventListener('click', showPrevImage);
            }

            // Navegação por teclado
            document.addEventListener('keydown', function(e) {
                if (modal.style.display === 'block') {
                    if (e.key === 'Escape') {
                        closeGalleryModal();
                    } else if (e.key === 'ArrowRight') {
                        showNextImage();
                    } else if (e.key === 'ArrowLeft') {
                        showPrevImage();
                    }
                }
            });
        }

        initGalleryModal();

        // Botão de voltar ao topo
        function initBackToTop() {
            const backToTopBtn = document.createElement("button");
            backToTopBtn.innerHTML = "<i class=\"fas fa-arrow-up\"></i>";
            backToTopBtn.className = "back-to-top";
            backToTopBtn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: var(--gradient-primary);
                border: none;
                border-radius: 50%;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 1000;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            `;

            document.body.appendChild(backToTopBtn);

            // Mostrar/esconder botão baseado no scroll
            window.addEventListener("scroll", () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.style.opacity = "1";
                    backToTopBtn.style.visibility = "visible";
                } else {
                    backToTopBtn.style.opacity = "0";
                    backToTopBtn.style.visibility = "hidden";
                }
            });

            // Scroll suave para o topo
            backToTopBtn.addEventListener("click", () => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            });

            // Hover effect
            backToTopBtn.addEventListener("mouseenter", () => {
                backToTopBtn.style.transform = "scale(1.1)";
            });

            backToTopBtn.addEventListener("mouseleave", () => {
                backToTopBtn.style.transform = "scale(1)";
            });
        }

        initBackToTop();

        // Redimensionamento da janela
        window.addEventListener("resize", () => {
            // Fechar menu mobile se a tela ficar grande
            if (window.innerWidth > 768) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.classList.remove("menu-open");
            }
        });

        console.log("🎂 Adriana Bolos - Site carregado com sucesso!");
    });
    