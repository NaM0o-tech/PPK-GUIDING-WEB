const LAT = document.getElementById("LAT")
const LON = document.getElementById("LON")

const more = document.getElementById("more")

const minlat = document.getElementById("minlat")
const minlon = document.getElementById("minlon")
const maxlat = document.getElementById("maxlat")
const maxlon = document.getElementById("maxlon")

navigator.geolocation.watchPosition(
    (position) => {
        const poslat = position.coords.latitude
        const poslon = position.coords.longitude

        LAT.textContent = `ละติจูด : ${poslat}`;
        LON.textContent = `ลองติจูด : ${poslon}`;

        more.textContent = `${poslat},${poslon}`;

        minlat.textContent = latMin;


        minlon.textContent = latMax;


        maxlat.textContent = lonMin;


        maxlon.textContent = lonMax;

        if(poslat >= latMin){
            minlat.style.color = "green"
        }else{
            minlat.style.color = "red"
        }

        if(poslat <= latMax) {
            maxlat.style.color = "green"
        }else {
            maxlat.style.color = "red"
        }

        if(poslon >= lonMin) {
            minlon.style.color = "green"
        }else{
            minlon.style.color = "red"
        }

        if(poslon <= lonMax) {
            maxlon.style.color = "green"
        }else{
            maxlon.style.color = "red"
        }

    },
    () => {
        LAT.textContent = "ตำแหน่งยังไม่ได้รับการอนุญาต";
        LON.textContent = "หากอนุญาติแล้วลองรีเฟรชใหม่!";

        LAT.style.color = "red";
        LON.style.color = "red";

        minlat.textContent = "X";
        minlon.textContent = "X";
        maxlat.textContent = "X";
        maxlon .textContent = "X";
    },
    {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    }
)

