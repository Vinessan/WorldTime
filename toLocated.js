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
var myTime = 0;

function addZero(input){
    if(input < 10) input = "0" + input;
    return input;
}

function startAdd(datetime){
    let year = datetime.substring(0, 4);
    let month = datetime.substring(5, 7);
    let day  = datetime.substring(8, 10);

    let hour = datetime.substring(11, 13);
    let minutes = datetime.substring(14, 16);
    let seconds = datetime.substring(17, 19);

    let date = new Date(year, (month - 1), day, hour, minutes, seconds);

    myTime = setInterval(() => {
        date.setSeconds(date.getSeconds() + 1);

        document.getElementById("tdlocation").innerHTML = "<span style='font-size: 35px;'>" + addZero(date.getHours()) + ":" + addZero(date.getMinutes()) + ":" + addZero(date.getSeconds()) + "</span><br><br>" + addZero(date.getDate()) + "/" + (addZero(date.getMonth() + 1)) + "/" + addZero(date.getFullYear());
    }, 1000);
}

function loadLocations(continent){
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "https://worldtimeapi.org/api/timezone/" + continent.value);

    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let locations = JSON.parse(this.responseText);

            for(let i = 0; i < locations.length; i++){
                if(i == 0) document.getElementById("location").innerHTML = "<option selected hidden>Selecione</option>";

                else document.getElementById("location").innerHTML += "<option value='" + locations[i].substring(continent.value.length + 1, locations[i].length) + "'>" + locations[i].substring(continent.value.length + 1, locations[i].length) + "</option>";
            }
        }
    }

    xhr.send();
}

function showUTC(location){
    let xhr = new XMLHttpRequest();
    let cont = document.getElementById("continent").value;

    xhr.open("GET", "https://worldtimeapi.org/api/timezone/" + cont + "/" + location.value);

    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let time = JSON.parse(this.responseText);
            let div = document.getElementById("locationUTC");

           

            div.innerHTML = "<table><tr><td><b><span style='font-size: 0.9em;'>"+ time.timezone.substring(cont.length + 1, cont.length + time.timezone.length) +"</span></b></td></tr><tr><td>UTC "+ time.utc_offset +"</td></tr><tr><td>&nbsp;</td></tr><tr><td id='tdlocation'></td></tr></table>";

            clearInterval(myTime);
            startAdd(time.datetime);
        }
    }



    xhr.send();
    document.getElementById("locationUTC").innerHTML = "Carregando...";
}