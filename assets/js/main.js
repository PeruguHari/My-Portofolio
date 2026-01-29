/*=============== HOME SPLIT TEXT ===============*/
const { animate,text, stagger } = anime
const { chars:chars1 } = text.split('.home__professional-1', {chars: true})
const { chars:chars2 } = text.split('.home__professional-2', {chars: true})


animate(chars1, {
  y: [
    { to: ['100%', '0%'] },
    { to: '-100%', delay: 4000, ease: 'in(3)' }
  ],
  duration: 900,
  ease: 'out(3)',
  delay: stagger(80),
  loop: true,
})
animate(chars2, {
  y: [
    { to: ['100%', '0%'] },
    { to: '-100%', delay: 4000, ease: 'in(3)' }
  ],
  duration: 900,
  ease: 'out(3)',
  delay: stagger(80),
  loop: true,
})
/*=============== SWIPER PROJECTS ===============*/
const swiperProjects = new Swiper('.projects__swiper', {
  loop: true,
  spaceBetween: 24,
  slidesPerview: 'auto',
  grabCursor: true,
  speed:  600, 

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },  
  
  breakpoints: {
    540: {
      slidesPerView: 'auto',
    },
    1150: {
      slidesPerView: 'auto',
    }
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,

  }

})




/*=============== WORK TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
  tabContents = document.querySelectorAll('[data-content]')

tabs.forEach((tab) => {
  tab.addEventListener('click',() => {
    const targetSelector = tab.dataset.target,
          targetContent = document.querySelector(targetSelector)
    tabContents.forEach((content) => content.classList.remove('work-active'))
    tabs.forEach((t) => t.classList.remove('work-active'))

    tab.classList.add('work-active') 
    targetContent.classList.add('work-active')
  })
})



const servicesButtons = document.querySelectorAll('.services__button');
const servicesCards = document.querySelectorAll('.services__card');

servicesButtons.forEach(button => {
  button.addEventListener('click', () => {
    const currentCard = button.closest('.services__card');
    const currentInfo = currentCard.querySelector('.services__info');
    const isOpen = currentCard.classList.contains('services-open');

    servicesCards.forEach(card => {
      card.classList.remove('services-open');
      card.classList.add('services-close');

      const info = card.querySelector('.services__info');
      info.style.height = '0';
      info.style.opacity = '0';
    });

    if (!isOpen) {
      currentCard.classList.remove('services-close');
      currentCard.classList.add('services-open');

      currentInfo.style.height = currentInfo.scrollHeight + 'px';
      currentInfo.style.opacity = '1';
    }
  });
});

/*=============== TESTIMONIALS OF DUPLICATE CARDS ===============*/
// Certifications link safety
document.querySelectorAll('.cert-card a').forEach(link => {
  link.addEventListener('click', e => {
    if (!link.getAttribute('href') || link.getAttribute('href') === '#') {
      e.preventDefault();
      alert('Certificate link will be added soon.');
    }
  });
});


/*=============== COPY EMAIL IN CONTACT ===============*/

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const message = document.getElementById('contact-message');

  if (!form) {
    console.error('Form not found');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/mvzkqjdp', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        message.textContent = 'Message sent successfully!';
        form.reset();
      } else {
        message.textContent = 'Something went wrong. Please try again.';
      }
    } catch (error) {
      message.textContent = 'Network error. Please try again later.';
    }
  });
});



/*=============== CURRENT YEAR OF THE FOOTER ===============*/ 
/*const textYear = document.getElementById('footer-year'),
      currentYear = new Date().getFullYear()

textYear.textContent =currentYear*/
document.addEventListener('DOMContentLoaded', () => {
  const textYear = document.getElementById('footer-year');

  if (textYear) {
    textYear.textContent = new Date().getFullYear();
  }
});


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
// We get the position by scrolling down
  const scrollY = window.scrollY

  sections.forEach(section => {
    const id = section.id, // id of each section
          top = section.offsetTop - 50, // Distance from the top edge
          height = section.offsetHeight, // Element height
          link = document.querySelector('.nav__menu a[href*=' + id +']') // id nav link

    if(!link) return

    link.classList.toggle('active-link', scrollY > top && scrollY <= top + height)
  })
}
window. addEventListener('scroll', scrollActive)

/*=============== CUSTOM CURSOR ===============*/
const cursor = document.querySelector('.cursor')
let mouseX = 0, mouseY = 0 // Store mouse position

const cursorMove = () => {
// Position the cursor
  cursor.style.left = `${mouseX}px`
  cursor.style.top = `${mouseY}px`
  cursor.style.transform ='translate(-50%, -50%)'

// Update the cursor animation
  requestAnimationFrame(cursorMove)
}

document.addEventListener('mousemove',(e) =>{

  mouseX = e.clientX
  mouseY = e.clientY
})

cursorMove()
/* Hide custom cursor on links */
const a = document.querySelectorAll('a')

a.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hide-cursor')
  })
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hide-cursor')
  })
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
origin: 'top',
distance: '60px',
duration: 2000,
delay: 300,
// reset: true, // Animations repeat
})
sr.reveal(`.home__image, .projects__container, .work__container,
            .testimonials__container, .contact__container`)
sr.reveal(`.home__data`, {delay: 900, origin: 'bottom'})
sr.reveal(`.home__info`, {delay: 1200, origin: 'bottom'})
sr.reveal(`.home__social, .home __ cv`, {delay: 1500})
sr.reveal(`.about__data`, {origin: 'left'})
sr.reveal(`.about__image`, {origin: 'right'})
sr.reveal(`.services__card`, {interval: 100})