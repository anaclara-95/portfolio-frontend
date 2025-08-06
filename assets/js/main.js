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