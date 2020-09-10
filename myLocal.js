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



//API
function addZero(input){
    if(input < 10) input = "0" + input
    return input
}

function theDate(date, id){
    let year = date.substring(0, 4)
    let month = date.substring(5, 7)
    let day  = date.substring(8, 10)

    let hour = date.substring(11, 13)
    let minutes = date.substring(14, 16)
    let seconds = date.substring(17, 19)

    let fdate = new Date(year, (month - 1), day, hour, minutes, seconds)

    setInterval(function(){
        let aux = fdate.getSeconds()
        fdate.setSeconds(aux + 1)

        document.getElementById(id).innerHTML = "<span style='font-size: 35px;'>" + addZero(fdate.getHours()) + ":" + addZero(fdate.getMinutes()) + ":" + addZero(fdate.getSeconds()) + "</span><br><br>" + addZero(fdate.getDate()) + "/" + (addZero(fdate.getMonth() + 1)) + "/" + addZero(fdate.getFullYear())
    }, 1000);
}

const xhr = new XMLHttpRequest()
xhr.open("GET", "https://worldtimeapi.org/api/ip")

xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        let time = JSON.parse(this.responseText)
        let div = document.getElementById("ip")

       

        div.innerHTML = "<table><tr><td><span><b>"+ time.client_ip +"</b></span></td></tr><tr><td></td></tr><tr><td><b>"+ time.timezone +"</b></td></tr><tr><td>UTC "+ time.utc_offset +"</td></tr><tr><td></td></tr><tr><td id='tdip'></td></tr></table>"

        theDate(time.datetime, "tdip")
    }
}

xhr.send()