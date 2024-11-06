const heroSection = document.getElementById("hero");

function createParticle() {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
    heroSection.appendChild(particle);
    setTimeout(() => {
        particle.remove();
    }, 5000);
}

setInterval(createParticle, 150);


document.addEventListener("DOMContentLoaded", function () {
    const skillItems = document.querySelectorAll(".skill-item");

    skillItems.forEach((item) => {
        const skillLevel = item.getAttribute("data-skill-level");
        const circle = item.querySelector(".fg-circle");
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        
        // Define o valor de dashoffset para o nível de habilidade
        const offset = circumference - (skillLevel / 100) * circumference;
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = offset;
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const testimonials = document.querySelectorAll(".testimonial");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const indicators = document.querySelectorAll(".indicator");
    let index = 0;
    let intervalId;

    function typeEffect(element, text) {
        let i = 0;
        element.textContent = "";
        const typing = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 80);
    }

    function updateIndicators() {
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle("active", i === index);
        });
    }

    function showTestimonial(newIndex) {
        // Limpa o intervalo existente
        clearInterval(intervalId);

        testimonials.forEach(testimonial => testimonial.style.display = "none");
        testimonials[newIndex].style.display = "block";

        const text = testimonials[newIndex].getAttribute("data-text");
        typeEffect(testimonials[newIndex], text);
        updateIndicators();

        // Reinicia o intervalo
        startInterval();
    }

    function startInterval() {
        intervalId = setInterval(() => {
            index = (index + 1) % testimonials.length;
            showTestimonial(index);
        }, 6000);
    }

    // Event Listeners para os botões
    prevBtn.addEventListener("click", () => {
        index = (index - 1 + testimonials.length) % testimonials.length;
        showTestimonial(index);
    });

    nextBtn.addEventListener("click", () => {
        index = (index + 1) % testimonials.length;
        showTestimonial(index);
    });

    // Event Listeners para os indicadores
    indicators.forEach((indicator, i) => {
        indicator.addEventListener("click", () => {
            index = i;
            showTestimonial(index);
        });
    });

    // Inicia o carrossel
    showTestimonial(index);
    startInterval();

    // Pausa o carrossel quando o mouse está sobre ele
    document.querySelector(".carousel").addEventListener("mouseenter", () => {
        clearInterval(intervalId);
    });

    // Reinicia o carrossel quando o mouse sai
    document.querySelector(".carousel").addEventListener("mouseleave", startInterval);
});


var form = document.getElementById("contact-form");
var formStatus = document.getElementById("form-status");
    
async function handleSubmit(event) {
  event.preventDefault();
  var status = formStatus;
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Obrigado pela sua mensagem!";
      form.reset()
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
          status.innerHTML = "Oops! Ocorreu um problema ao enviar o formulário"
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "Oops! Ocorreu um problema ao enviar o formulário"
  });
}
form.addEventListener("submit", handleSubmit)


// Exibe o botão de "Scroll-to-Top" ao rolar a página
window.addEventListener("scroll", function () {
    const scrollToTopButton = document.getElementById("scrollToTop");
    if (window.scrollY > 300) { // Mostra o botão ao rolar 300px
        scrollToTopButton.classList.add("visible");
    } else {
        scrollToTopButton.classList.remove("visible");
    }
});

// Função para rolar suavemente até o topo ao clicar
document.getElementById("scrollToTop").addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownBtn = document.querySelector('.dropdown-btn');

    // Toggle dropdown ao clicar no botão
    dropdownBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });

    // Fechar dropdown ao clicar fora
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });

    // Fechar dropdown ao clicar em um link
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function() {
            dropdown.classList.remove('active');
        });
    });
});
