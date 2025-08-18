/********************************EMAIL JS*********************************/
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message')

const sendEmail = (e) => {
    e.preventDefault()

    //serviceID - templateID - #form - publicKey
    emailjs.sendForm('service_8gk51bq', 'template_r2iuvof', '#contact-form', '')

    .then(() => {
        //show sent message
        contactMessage.textContent = 'Message sent successfully'

        //remove message after five seconds 
        setTimeout(() => {
            contactMessage.textContent = ''
        }, 5000)

        //clear input fields
        contactForm.reset()
    }, () => {
        //show error message
        contactMessage.textContent = 'Message not sent (service error)'
    })
}

contactForm.addEventListener('submit', sendEmail)

/*********************************SHOW SCROLL UP*************************/

const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    //when the scroll is higher than 350 viewport height, add the show-scroll class to the "a" tag with the scrollup class
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                    : scrollUp.classList.remove('show-scroll')
}

window.addEventListener('scroll', scrollUp)

/*****************************SCROLL SECTIONS ACTIVE LINK**********************************/

const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__list a[href*=' + sectionId + ']')

        if (sectionsClass) { // ✅ chequeo para que no sea null
            if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
                sectionsClass.classList.add('active-link')
            } else {
                sectionsClass.classList.remove('active-link')
            }
        }
    })
}

window.addEventListener('scroll', scrollActive)
window.addEventListener('scroll', scrollActive)

/**********************************SCROLL REVEAL ANIMATION**************************/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    //reset: true, //animations repeat

})

sr.reveal(`.profile, .contact__form`)
sr.reveal(`.info`, {origin: 'left', delay: 800})
sr.reveal(`.skills`, {origin: 'left', delay: 1000})
sr.reveal(`.about`, {origin: 'right', delay: 1200})
sr.reveal(`.projects__card, .services__card, .experience__card`, {interval: 100})