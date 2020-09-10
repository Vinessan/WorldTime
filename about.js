const navSlide = () => {
    const menu = document.querySelector('.menu')
    const nav = document.querySelector('.nav_link')
    const navLink = document.querySelectorAll('.nav_link li')
    //Menu de navegação
    menu.addEventListener('click', () => {

        nav.classList.toggle('nav_active')

        //Animação
        navLink.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = "";
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
            }
        })

        //Menu Animação
        menu.classList.toggle('linesNav')
    })
}

navSlide();