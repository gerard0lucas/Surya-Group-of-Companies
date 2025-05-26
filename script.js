// Project data
const projects = [
    {
        id: 1,
        title: "Skandhasiri Enclave",
        description: "premium residential villa plots with modern amenities.",
        location: "Vaddarahalli Village, Doddaballapura",
        imageUrl: "./assets/skandhssiri.JPG",
        category: "residential",
        features: ["24/7 Security", "30 mins to Bangalore Airport", "45–60 mins to Hebbal, ITPL.", "10 mins to Ghati Subramanya Temple"]
    },
    {
        id: 2,
        title: "Manor Farms",
        description: "Picturesque farmlands perfect for weekend homes and agriculture.",
        location: "Doddaballapur, Bangalore",
        imageUrl: "./assets/monar farms.JPG",
        category: "farmland",
        features: ["Organic Soil", "Water Sources", "Farm Development", "Legal Clearance"]
    },
    {
        id: 3,
        title: "Kousthubham Layout",
        description: "Modern apartments with stunning city views and smart home features.",
        location: "Devanahalli, Bangalore, Karnataka",
        imageUrl: "https://housing-images.n7net.in/012c1500/478b2a1189928842c0b1707f3febe51f/v0/medium.jpeg",
        category: "apartment",
        features: ["Smart Home", "Fitness Center", "Swimming Pool", "Parking"]
    }
];

// Header scroll effect
const header = document.querySelector('.header');
const scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Scroll to top button visibility
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Mobile menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
let isMenuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    mobileNav.classList.toggle('active');
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    
    // Animate menu button
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (isMenuOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking links
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        isMenuOpen = false;
        document.body.style.overflow = '';
        
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Projects filtering and rendering
const projectsGrid = document.querySelector('.projects-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderProjects(filteredProjects) {
    projectsGrid.innerHTML = filteredProjects.map(project => `
        <div class="project-card">
            <div class="project-image">
                <img src="${project.imageUrl}" alt="${project.title}">
                <span class="project-category">${project.category.charAt(0).toUpperCase() + project.category.slice(1)}</span>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <div class="project-location">
                    <img src="https://api.iconify.design/lucide:map-pin.svg" alt="Location" width="16" height="16">
                    <span>${project.location}</span>
                </div>
                <p>${project.description}</p>
                <div class="project-features">
                    ${project.features.map(feature => `
                        <div class="project-feature">
                            <img src="https://api.iconify.design/lucide:check.svg" alt="Check" width="16" height="16">
                            <span>${feature}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Initial render
renderProjects(projects);

// Filter functionality
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter and render projects
        const filteredProjects = filter === 'all' 
            ? projects 
            : projects.filter(project => project.category === filter);
        
        renderProjects(filteredProjects);
    });
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form validation
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        let isValid = true;
        const errors = {};
        
        if (!data.name.trim()) {
            errors.name = 'Name is required';
            isValid = false;
        }
        
        if (!data.email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Email is invalid';
            isValid = false;
        }
        
        if (!data.phone.trim()) {
            errors.phone = 'Phone number is required';
            isValid = false;
        } else if (!/^\d{10}$/.test(data.phone.replace(/[^0-9]/g, ''))) {
            errors.phone = 'Phone number must be 10 digits';
            isValid = false;
        }
        
        if (!data.message.trim()) {
            errors.message = 'Message is required';
            isValid = false;
        }
        
        // Display errors or submit form
        if (!isValid) {
            Object.keys(errors).forEach(field => {
                const errorElement = document.querySelector(`#${field}-error`);
                if (errorElement) {
                    errorElement.textContent = errors[field];
                }
            });
        } else {
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = `
                <svg class="spinner" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5"></circle>
                </svg>
                Processing...
            `;
            
            setTimeout(() => {
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.innerHTML = `
                    Send Message
                    <img src="https://api.iconify.design/lucide:send.svg" alt="Send" width="20" height="20">
                `;
                
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you! Your message has been sent. We will get back to you soon.';
                contactForm.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1500);
        }
    });
}