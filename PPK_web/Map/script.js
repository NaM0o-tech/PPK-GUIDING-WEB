const container = document.querySelector(".container")

var latMin = 19.16859662744783
var latMax = 19.17191547616417
var lonMin = 99.90771416583755	
var lonMax = 99.91124395261497

const main = document.querySelector(".main")

const notice = document.querySelector(".notice")
notice.style.opacity = "0";

const header = document.querySelector(".header")
const home = document.querySelector(".home")
const travel = document.querySelector(".travel")
const search = document.querySelector(".search")
const discover = document.querySelector(".discover")

const BODY = document.querySelectorAll(".HOME , .SEARCH , .TRAVEL, .DISCOVER")
const HOME = document.querySelector(".HOME")
const SEARCH = document.querySelector(".SEARCH")
const DISCOVER = document.querySelector(".DISCOVER")
const TRAVEL = document.querySelector(".TRAVEL")

let choose = Number(localStorage.getItem("CHOOSE") ?? 1);
var current_display = choose ?? 1;
changeDisplay(choose);


header.querySelectorAll("button").forEach((button,index) => {
    button.addEventListener("click", ()=> {
        header.querySelectorAll("button").forEach((b) => {
            b.style.background = "gray";
            b.style.color = "white";
        })

        choose = index+1;
        localStorage.setItem("CHOOSE", choose);
        changeDisplay(choose);

        button.style.background = "white";
        button.style.color = "black";
    })
})

function changeDisplay(which) {

  header.querySelectorAll("button").forEach((b) => {
      b.style.background = "gray";
      b.style.color = "white";
  })
  BODY.forEach((element) => {
    element.style.display = "none";
  })

  if(which === 1) {
    HOME.style.display = "flex";
    current_display = 1;
  }else if(which === 2) {
    DISCOVER.style.display = "flex";
    current_display = 2;
  }else if(which === 3) {
    SEARCH.style.display = "flex";
    current_display = 3;
  }else if(which === 4 ) {
    TRAVEL.style.display = "flex";
    current_display = 4;
  }

  header.querySelectorAll("button").forEach((button,index)=> {
    if(index === which-1) {
      button.style.background = "white";
      button.style.color = "black";
    }
  })
}

function gotodiscover() {
  changeDisplay(2);
}

//---------------------------------------------------------------------------------------------------------

const handle = document.querySelector(".buffer_handle")


let startY;

let initialheight = 26;
let currentheight = initialheight
let heightnow = currentheight

handle.addEventListener("touchstart", e => {
  startY = e.touches[0].clientY;
  main.style.transition = "none";
});

handle.addEventListener("touchmove", e => {
  const deltapx = e.touches[0].clientY - startY;
  const delta = deltapx / parseFloat(getComputedStyle(document.documentElement).fontSize);

  heightnow = currentheight - delta;

  if(heightnow < 5.5) {
    heightnow = 5.5;
  }

  if(heightnow > initialheight) {
    heightnow = initialheight;
  }

  main.style.height = `${heightnow}em`;
});

handle.addEventListener("touchend", () => {
  main.style.transition = "height 0.6s cubic-bezier(0.32, 0.72, 0, 1)";

  if(heightnow > initialheight) {
    heightnow = initialheight;
  }

  currentheight = heightnow;
  main.style.height = `${currentheight}em`;
});

/*
let startY;
let currentY = 0;

let Ynow;

handle.addEventListener("touchstart",e => {
  startY = e.touches[0].clientY;
  main.style.transition = "none";
})



handle.addEventListener("touchmove", e => {

  const delta = 
    e.touches[0].clientY - startY;

  main.style.transform = 
    `translateY(${currentY+delta}px)`;

  Ynow = currentY+delta
})

handle.addEventListener("touchend", ()=>{

  main.style.transition = "0.6s cubic-bezier(0.32, 0.72, 0, 1)";

  if(Ynow < 85) {
    currentY = 0;
  }
  else if(Ynow < 195){
    currentY = Math.floor(Ynow-10);
  } 
  else if(Ynow > 200 && Ynow < 340){
    currentY = 225;
  }
  else {
    currentY = 360;
  }

  main.style.transform = 
    `translateY(${currentY}px)`;
})

*/

//-----------------------------------------------------------------------------------------------------------

const map = document.getElementById("map");

let MapX = 0;
let MapY = 0;

let MapstartX;
let MapstartY;


map.addEventListener("touchstart", e => {

  MapstartX = e.touches[0].clientX;
  MapstartY = e.touches[0].clientY;

});

map.addEventListener("touchmove", e => {

  const dx =
    e.touches[0].clientX - MapstartX;

  const dy =
    e.touches[0].clientY - MapstartY;

  map.style.transform =
    `translate(${MapX + dx}px,
               ${MapY + dy}px)`;
  map.style.transition = "none";
});

map.addEventListener("touchend", e => {

  map.style.transition = "0.6s cubic-bezier(0.32, 0.72, 0, 1)";

  MapX +=
    e.changedTouches[0].clientX - MapstartX;

  MapY +=
    e.changedTouches[0].clientY - MapstartY;


  if(MapX > 220) {
    MapX = 220;
  }
  else if(MapX < -220) {
    MapX = -220
  }

  if(MapY > 220) {
    MapY = 220;
  }
  else if(MapY < -220) {
    MapY = -220
  }


  map.style.transform =
    `translate(${MapX}px,
               ${MapY}px)`;

});

let scale = 1;

function zoomin() {
  map.style.transition = "0.6s cubic-bezier(0.32, 0.72, 0, 1)";
  if(scale>=2.5) return;
  scale += 0.1;
  map.style.scale = `${scale}`;
}
function zoomout() {
  map.style.transition = "0.6s cubic-bezier(0.32, 0.72, 0, 1)";
  if(scale<=0.7) return;
  scale -= 0.1;
  map.style.scale = `${scale}`;
}
function resetmap() {
  map.style.transition = "0.6s cubic-bezier(0.32, 0.72, 0, 1)"
  scale = 1;
  map.style.scale = `${scale}`;
  MapX = 0;
  MapY = 0;
  map.style.transform =
    `translate(0px,0px)`;
}

//-----------------------------------------------------------------------------------------------------------
//COMPASS
const compass_arrow = document.getElementById("pos-arrow")
const compass_allow = localStorage.getItem("compass_allow")

if (compass_allow === "true" && !is_ios()) {
  autoStartCompass();
} else {
  notice.style.opacity = "1"; 
  compass_arrow.style.display = "flex"
  compass_arrow.style.opacity = "0"
}


function autoStartCompass() {
  if ('ondeviceorientationabsolute' in window) {
    window.addEventListener('deviceorientationabsolute', handle_orientation, true);
  } else {
    window.addEventListener('deviceorientation', handle_orientation, true);
  }
  notice.style.opacity = "0"; 
}

function handle_orientation(event) {

  compass_arrow.style.display = "flex"
  compass_arrow.style.opacity = "1"

  let heading = 0;

  //for ios
  if (event.webkitCompassHeading) {
    heading = event.webkitCompassHeading;
  }else if(event.alpha !== null) {
    //for android
    heading = 360 - event.alpha;
  }
  
  heading = (heading - 90 + 360) % 360;

  compass_arrow.style.transform = `translateY(-50%) rotate(${heading}deg)`;
}

function initcompass() {

  

  if( typeof DeviceMotionEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function' ) {
    // FOR IOS
    // if ios 13+ ต้องขออนุญาตใช้ก่อน

    DeviceOrientationEvent.requestPermission()
      .then(permissionState => {

        if(permissionState === 'granted') {
          localStorage.setItem("compass_allow", "true");
          window.addEventListener('deviceorientation', handle_orientation, true)

          notice.style.opacity = "0"
        }else {
          notice.style.opacity = "1"; 
        }

      })


  } else {

    localStorage.setItem("compass_allow", "true");
    
    autoStartCompass();

  }
}

function is_ios() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}



//-----------------------------------------------------------------------------------------------------------

function Process_MAP(lat, lon) {
    let slope_lat  = (latMax-latMin)/100
    let result_lat = (lat-latMin)/slope_lat
    let slope_lon  = (lonMax-lonMin)/100
    let result_lon = (lon-lonMin)/slope_lon
    //console.log(`top: ${result_lat} left: ${result_lon}`)

    return {
        top: 100-result_lat,
        left: result_lon
    }
}


const data = [
  "อาคาร:1",
  "อาคาร:2",
  "อาคาร:3",
  "อาคาร:4",
  "อาคาร:5",
  "อาคาร:6",
  "อาคาร:7",


  "สถานที่:ศาลาจริยธรรม",
  "สถานที่:โรงอาหาร",
  "สถานที่:หอประชุมโรงเรียน",
  //"สถานที่:หอประชุม 80ปี",
  "สถานที่:ลาน 70ปี",
  "สถานที่:โดมโรงเรียน",
  "สถานที่:ห้องพยาบาล",
  "สถานที่:ห้องน้ำ",
  "สถานที่:ศูนย์กีฬา",
  "สถานที่:สนามกีฬา",
  "สถานที่:สนามฟุตซอล",
  "สถานที่:ห้องสมุด",
  "สถานที่:ห้องการงาน ดุริยางค์",
  "สถานที่:ห้องหุ่นยนต์",
  "สถานที่:ห้องICT",
  "สถานที่:หอเกียรติยศ",
  //"สถานที่:ห้องดนตรี นาฏศิลป์ และศิลปะ",
];

const Placecoords = {
  "อาคาร:1": {minlat:19.17126398227991,maxlat:19.17154945225331,minlon:99.908617383917,maxlon:99.90970226011801},   
  "อาคาร:2": {minlat:19.170940164989588,maxlat:19.171161724253217,minlon:99.90972707019766,maxlon:99.91066308604677},
  "อาคาร:3": {minlat:19.170939424228173,maxlat:19.171124767094913,minlon:99.90877004867231,maxlon:99.90962486796582},
  "อาคาร:4": {minlat:19.170487019598152,maxlat:19.17111335154675,minlon:99.91065673884613,maxlon:99.91080785465921}, 
  "อาคาร:5": {minlat:19.171215152993888,maxlat:19.171971365514853,minlon:99.91060465923475,maxlon:99.91083112807306}, 
  "อาคาร:6": {minlat:19.169512061729105,maxlat:19.170056759841405,minlon:99.91033715479311,maxlon:99.91071668735725}, 
  "อาคาร:7": {minlat:19.169139058736267,maxlat:19.16982598568272,minlon:99.90980475399073,maxlon:99.91030394234606},
  "สถานที่:ศาลาจริยธรรม": {minlat:19.170885792857188,maxlat:19.171273864045222,minlon:99.90826635702115,maxlon:99.90857691608905},
  "สถานที่:โรงอาหาร": {minlat:19.17015684883312,maxlat:19.170502281361514,minlon:99.91013689225318,maxlon:99.91081021348752},
  "สถานที่:หอประชุมโรงเรียน": {minlat:19.170412408595954,maxlat:19.170880517200565,minlon:99.90820448048781,maxlon:99.90853772323473}, 
  //"สถานที่:หอประชุม 80ปี": {minlat:0,maxlat:0,minlon:0,maxlon:0},
  "สถานที่:ลาน 70ปี": {minlat:19.169878135074004,maxlat:19.170245977615853,minlon:99.90964415993248 ,maxlon:99.90993156775598},
  "สถานที่:โดมโรงเรียน": {minlat:19.170490363153426,maxlat:19.170913274919844,minlon:99.9103232193313,maxlon:99.91066671569705},
  "สถานที่:ห้องพยาบาล": {minlat:19.170907662777626,maxlat:19.17109770074551,minlon:99.90964078707727,maxlon:99.90972817512626},
  "สถานที่:ห้องน้ำ": {minlat:19.171178724842882,maxlat:19.171401329002897,minlon:99.91011878331537,maxlon:99.9105096579553},
  "สถานที่:ศูนย์กีฬา": {minlat:19.168842732302835,maxlat:19.16912875254269,minlon:99.90900561654593,maxlon:99.90961123604836},
  "สถานที่:สนามกีฬา": {minlat:19.169235742407878,maxlat:19.170842848052438,minlon:99.90859603545728,maxlon:99.90954160719656}, 
  "สถานที่:สนามฟุตซอล": {minlat:19.169144608522668,maxlat:19.16950295660348,minlon:99.91033259914565,maxlon:99.91057185034569},
  "สถานที่:ห้องสมุด": {minlat:19.170229753329355,maxlat:19.17057518570494,minlon:99.90966648636999,maxlon:99.9101398619586},
  "สถานที่:ห้องการงาน ดุริยางค์": {minlat:19.16983802472964,maxlat:19.1702012138187,minlon:99.9099599530514 ,maxlon:99.91037009796571},
  "สถานที่:ห้องหุ่นยนต์": {minlat:19.16974924505281,maxlat:19.169831568027497,minlon:99.9099445726171,maxlon:99.91012059314285},
  "สถานที่:ห้องICT": {minlat:19.170877657962006,maxlat:19.170972086606483,minlon:99.90907489960452,maxlon:99.90942010490738},
  "สถานที่:หอเกียรติยศ": {minlat:19.17057087181812,maxlat:19.170826542839148,minlon:99.90965995332431,maxlon:99.90983396307442},
  //"สถานที่:ห้องดนตรี นาฏศิลป์ และศิลปะ": {minlat:0,maxlat:0,minlon:0,maxlon:0},
}

let place = document.getElementById("status")
let describe = document.getElementById("topic")

let onschool;

let pos = document.querySelector("#POS")
let spanpos = document.getElementById("spanpos")

let mapimg = document.getElementById("MAPIMG")

let PPKIMG = document.getElementById("ppkimg")

//--------------------------------------------------------------------------------------------------------
//DISCOVER


const discovermain = document.querySelector(".discovermain")
const discoverplace = document.getElementById("discoverplace")
const discoverabout = document.getElementById("discoverabout")

function describeplacenow(whereplace) {

  let DESCRIBE = describe_place(whereplace)

  discovermain.innerHTML = "";

  DESCRIBE.forEach((text) => {
    const TEXT = document.createElement("li")
    TEXT.innerText = text;

    discovermain.appendChild(TEXT);
  })
}

const discoveroptions = document.querySelectorAll(".discoveroptions button")
const discoverposition = document.getElementById("discoverposition")
const discoverplaceposition = document.getElementById("discoverplaceposition")

let discoverchoose = Number(localStorage.getItem("discoverchoose") ?? 1);
discoverchange(discoverchoose);

discoveroptions.forEach((element,index) => {
  element.addEventListener("click", ()=> {
    discoverchange(index+1);
  })
})

//console.log(localStorage.getItem("discoversearch"))

var tempwhereplace;
var whereplace;
var discoversearch = localStorage.getItem("discoversearch") ?? "กรุณาค้นหาสถานที่ก่อน";
var buffer_whereplace;
var discoverfirstcolor;

function discoverupdate(which) {
  if(which === 1) {
    discoverabout.innerText = "ตำแหน่งของคุณ";
    discoverplace.innerText = tempwhereplace ?? "....";
    discoverplace.style.color = discoverfirstcolor ?? "rgb(115, 115, 115)";
    describeplacenow(buffer_whereplace)
  }else if(which === 2) {
    discoverabout.innerText = "ผลการค้นหา";
    
    let dis_result = discoversearch
    ?.replace(/^สถานที่:/, "")        // ถ้าเจอ "สถานที่:" ให้ลบทิ้ง
    ?.replace(/^อาคาร:/, "อาคาร ");    // ถ้าเจอ "อาคาร:" ให้เปลี่ยนเป็น "อาคาร " (มีช่องว่าง)

    discoverplace.innerText = dis_result?.trim() || "กรุณาค้นหาสถานที่ก่อน";

    discoverplace.style.color = "rgb(255, 234, 140)";
    describeplacenow(discoversearch ?? "กรุณาค้นหาสถานที่ก่อน")
  }
}
discoverchange(discoverchoose);


function discoverchange(which) {

  discoverchoose = which;

  discoveroptions.forEach((e) => {
    e.style.background = "#606060";
  })

  if(which ===1) {
    discoverposition.style.background = "white";
  }else if(which ===2) {
    discoverplaceposition.style.background = "white";
  }

  discoverupdate(which);
}

//--------------------------------------------------------------------------------------------------------
//TRAVEL

const pathsvg = document.getElementById("pathsvg")
pathsvg.innerHTML = "";

const DIST = document.getElementById("dist")

var latnow;
var lonnow;

var POStop;
var POSleft;

var tempPOStop;
var tempPOSleft;

navigator.geolocation.watchPosition(

  (position) => {

    onschool = true;

    const lat = position.coords.latitude
    const lon = position.coords.longitude
    latnow = lat;
    lonnow = lon;

    const isInArea =
      lat >= latMin && lat <= latMax &&
      lon >= lonMin && lon <= lonMax


    mapblack2.style.opacity = "0"

    let photo = IMG_FOR_MAP(buffer_whereplace);
  
    if (photo[0] === "") {
      photo = "ppk.jpg"
    }
    PPKIMG.src = `../../PPK_assets/${photo}`;

    if (isInArea) {

      let { top, left } = Process_MAP(lat,lon)
      pos.style.left = `${left}%`
      pos.style.top = `${top}%`

      POSleft = left;
      POStop = top;

      if(tempPOSleft == null && tempPOStop == null) {
        tempPOSleft = POSleft;  
        tempPOStop = POStop;
      }

      whereplace = Where_Are_You(lat,lon,describe)

      let des_result = whereplace
      ?.replace(/^สถานที่:/, "")
      ?.replace(/^อาคาร:/, "อาคาร ");

      describe.innerText = `${des_result}` /* TELL WHERE ARE UUUUU*/

      buffer_whereplace = whereplace;

      spanpos.style.display = "flex";
      pos.style.border = "2px solid blue";
      spanpos.style.background = "rgb(36, 124, 255)";
      place.innerText = "คุณอยู่ที่นี่"
      place.style.color = "lightgreen"

      mapimg.style.border = "2px solid blue";

      tempwhereplace = des_result
      
      compass_arrow.style.opacity = "1"

      if(discoverchoose === 1) {
        discoverplace.style.color = "rgb(231, 204, 255)";
        discoverfirstcolor = "rgb(231, 204, 255)";
        discoverplace.innerText = tempwhereplace;
        describeplacenow(whereplace);
      }

    } else {
      pos.style.border = "2px solid orange"
      spanpos.style.display = "flex";
      spanpos.style.background = "rgb(255, 69, 69)";

      mapimg.style.border = "2px solid red";

      
      place.style.color = "red"
      place.innerText = "เลยเขตพื้นที่โรงเรียน"
      describe.innerText = "คุณอยู่นอกพื้นที่!"

      compass_arrow.style.opacity = "0"

      if(discoverchoose === 1) {
        discoverplace.style.color = "rgb(115, 115, 115)";
        discoverfirstcolor = "rgb(115, 115, 115)";
        discoverplace.innerText = "นอกพื้นที่ของโรงเรียน";

        describeplacenow("นอกพื้นที่ของโรงเรียน");
        buffer_whereplace = "นอกพื้นที่ของโรงเรียน";
      }
    }
  },
  () => {

    onschool = false;

    spanpos.style.display = "none";
    pos.style.border = "2px solid red"

    place.style.color = "orange"
    place.innerText = "ยังไม่ได้อนุญาตการเข้าถึงตำแหน่ง"
    describe.innerText = "เปิดตำแหน่งของคุณก่อน!"

    mapimg.style.border = "2px solid red";

    compass_arrow.style.opacity = "0"

    discoverplace.style.color = "rgb(115, 115, 115)";
    discoverfirstcolor = "rgb(115, 115, 115)";
    discoverplace.innerText = "ไม่ได้อนุญาตตำแหน่ง";
    describeplacenow("ไม่ได้อนุญาตตำแหน่ง");
    buffer_whereplace = "ไม่ได้อนุญาตตำแหน่ง";

    mapblack2.style.opacity = "0.7"

  },
  {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  }
)


const result = document.querySelector(".result")
const searchbox = document.querySelector(".searchbox")

const statussearch = document.querySelector(".statussearch")

const input = document.getElementById("searchinput");
let currentIndex = -1;

function createBOX(obj) {

  const item = obj.item ? obj.item : obj;

  const PLACE_COORDS = Placecoords[item];

  const box = document.createElement("div")
  box.classList.add("searchbox")

  const title = document.createElement("h4");
  box.appendChild(title);

  let tempitem = item
    ?.replace(/^สถานที่:/, "")
    ?.replace(/^อาคาร:/, "อาคาร ");

  title.textContent = tempitem;

  const img = document.createElement("img");


  let photo = IMG_FOR_MAP(item);
  
  if (photo[0] === "") {
    photo = "white.png"
  }else {
    
  }

  img.src = `../../PPK_assets/${photo}`;
  box.appendChild(img);

  /*if(PLACE_COORDS.maxlat !== 0) {
    
  }*/

  const button = document.createElement("button");
  button.textContent = "เดินทาง";
  button.classList.add("btntravel")
  button.addEventListener("click" , ()=> {
    changeDisplay(4);
    startTravel(tempitem,item);
  })
  box.appendChild(button);

  const button2 = document.createElement("button");
  button2.textContent = "ค้นพบ";
  button2.classList.add("btndiscover")
  button2.addEventListener("click" , ()=> {
    changeDisplay(2);
    discoversearch = item;
    discoverchange(2);
  })
  box.appendChild(button2);

  result.appendChild(box);
}

const fuse = new Fuse(data, {
  includeScore: true,
  threshold: 0.4
})

var tempvalue;

input.addEventListener("input", () => {
  const value = input.value;
  tempvalue = value;
  currentIndex = -1;

  result.innerHTML = "";

  if (!value) {
    statussearch.style.opacity = 1;
    result.innerHTML = "";
    return
  }else {
    statussearch.style.opacity = 0;
  };

  const filtered = fuse.search(value)

  filtered.forEach(obj => {
    createBOX(obj);
  });
});

const travelplace = document.querySelector("#travelplace")
const tralvelbox = document.querySelector(".travelbox")

const mapblack = document.getElementById("mapblack")
let mapblackchange = 0;
let mapblackchange_check = false;

const mapblack2 = document.getElementById("mapblack2")

const pin = document.getElementById("PIN")

const marker = document.getElementById("markers")

const mapcomment = document.querySelector("#mapcomment")

let searchBtn = document.getElementById("btnsearch");
let searchicon = document.getElementById("search_icon");
let searchActive = -1;

searchBtn.addEventListener("click", () => {
  searchActive *= -1;

  const selectedPlace = input.value;
  let frame = document.querySelector(".FRAME")

  if (searchActive === 1) {

    searchicon.src = "../../PPK_icons/xicon.png";

    getallsearch();
  }
  else if (searchActive === -1) {
    delallsearch();
    searchicon.src = "../../PPK_icons/eye_icon.png";
  }
});

function getallsearch() {
  result.innerHTML = "";
  statussearch.style.opacity = 0;
  data.forEach(obj =>{
    createBOX(obj);
  })
}

function delallsearch() {
  
  if(tempvalue && tempvalue > 0) {
    result.innerHTML = "";
    const filtered = fuse.search(tempvalue)
    filtered.forEach(obj => {
      createBOX(obj);
    });
  }else {
    result.innerHTML = "";
    statussearch.style.opacity = 1;
  }
}

var starttravelsearch = (localStorage.getItem("starttravelsearch"));
var tempstarttravelsearch;
if (starttravelsearch !== null && starttravelsearch !== "null") {

  let travel_result = starttravelsearch
    ?.replace(/^สถานที่:/, "")
    ?.replace(/^อาคาร:/, "อาคาร ");

  tempstarttravelsearch = travel_result


  startTravel(tempstarttravelsearch,starttravelsearch);
}

var starttra;

function startTravel(PLACE,EXTPLACE) {

  

  travelplace.innerText = PLACE;
  travelplace.style.color = "yellow";

  const cancel_button = document.createElement("button")
  tralvelbox.appendChild(cancel_button);
  cancel_button.classList.add("canceltravel");
  cancel_button.textContent = "ยกเลิกเดินทาง"

  cancel_button.addEventListener("click", ()=> {
    stopTravel();
    tralvelbox.removeChild(cancel_button);
    starttravelsearch = null;
    changeDisplay(3);
  })

  starttravelsearch = EXTPLACE;

  const PLACE_COORDS = Placecoords[EXTPLACE];

  mark_search(marker,PLACE_COORDS.minlon,PLACE_COORDS.maxlat,PLACE_COORDS.maxlon,PLACE_COORDS.minlat);

  starttra = true;
}

function stopTravel() {
  travelplace.innerText = "--โปรดค้นหาสถานที่ก่อน--";
  travelplace.style.color = "rgb(120, 99, 147)";

  starttra = false;
  DIST.innerText = "---";
  cancel_search();
}

//------------------------------------------------------------------------------------------------------------------

function Setting() {
  alert("การตั้งค่ากำลังมาเร็วๆนี้ :)");
}

function mark_search(mark,minx,miny,maxx,maxy) {

  mapblackchange = 1;
  mapblackchange_check = true;
  
  mark.style.opacity = "1"

  let f_x = (minx - lonMin) / (lonMax - lonMin) * 100
  let f_y = (miny - latMin) / (latMax - latMin) * 100

  let l_x = (maxx - lonMin) / (lonMax - lonMin) * 100
  let l_y = (maxy - latMin) / (latMax - latMin) * 100

  mark.style.width = `${Math.abs(l_x-f_x)}%`
  mark.style.height = `${Math.abs(l_y-f_y)}%`
  mark.style.top = `${100 - f_y}%`
  mark.style.left = `${f_x}%`
}

function cancel_search() {

  mapblackchange = 0;
  mapblackchange_check = false;

  marker.style.opacity = "0"
}



function Where_Are_You (lat,lon,textplace) {
  for (const key in Placecoords) {
    const coords = Placecoords[key];
    if (lat >= coords.minlat && lat <= coords.maxlat &&
        lon >= coords.minlon && lon <= coords.maxlon) {
      textplace.innerText = key;
      return key;
    }
  }
  return "ทางเดิน รอบๆโรงเรียน";
}

function describe_place(place) {
  switch (place) {

    case "อาคาร:1":
      return [
        "อาคารหลักของโรงเรียน",
        "ติดต่อประชาสัมพันธ์,การประชุมและกิจกรรมต่างๆ",
        "นอกจากนี้ยังมีห้องเรียนและสำนักงานต่างๆ"
      ]


    case "อาคาร:2":
      return [
        "อาคารที่สองของโรงเรียน",
        "มีห้องเรียนต่างๆ สำหรับการเรียนการสอน"
      ]


    case "อาคาร:3":
      return [
        "อาคารวิทยาศาสตร์ และวิทยาการคำนวณ",
        "มีสื่อห้องเรียน ICT และห้องปฏิบัติการ",
        "มีห้องปฐมพยาบาล"
      ]


    case "อาคาร:4":
      return [
        "อาคารภาษาต่างประเทศ",
        "มีห้องเรียนสำหรับการเรียนภาษาต่างประเทศต่างๆ",
        "ส่งเสริมทักษะทางภาษาที่ 3"
      ]


    case "อาคาร:5":
      return [
        "อาคารสังคมศึกษาและวัฒนธรรม",
        "สังคมศึกษา ประวัติศาสตร์และวัฒนธรรมต่างๆ",
        "มีห้องอาเซียน การเรียนการสอนสำหรับประเทศ"
      ]


    case "อาคาร:6":
      return [
        "อาคารคณิตศาสตร์",
        "หอประชุมเฮือนคำอยู่ใต้อาคาร 6",
        "ห้อง International Learning Hub"
      ]


    case "อาคาร:7":
      return [
        "อาคาร สสวท. และห้องพิเศษ",
        "มีห้องเรียนสำหรับการเรียนการสอนวิชาต่างๆ เช่น วิทยาศาสตร์ ภาษาไทย คณิต",
        "เป็นอาคารเดียวที่มีลิฟต์ตอนนี้"
      ]

    //----------------------------------------------------------------------

    case "สถานที่:ศาลาจริยธรรม":
      return [
        "ศาลาจริยธรรมของโรงเรียน",
        "สถานที่สวดมนต์ไหว้พระ",
        "สถานที่พักพิง ใต้ร่มเงา"
      ]

    case "สถานที่:โรงอาหาร":
      return [
        "โรงอาหารของโรงเรียน",
        "มีจุดซื้อขายอาหาร และสหกรณ์ที่นี่",
        "มีชั้นบนอีก 3 ชั้น คือ ห้องศิลปะ,ดนตรี   ,นาฐศิลป์,หอประชุม80ปี"
      ]

    case "สถานที่:หอประชุมโรงเรียน":
      return [
        "หอประชุมหลักของโรงเรียน",
        "มีการทำกิจกรรมต่างๆ",
        "ส่วนใหญ่กิจกรรมของครู,นักเรียน จัดที่นี่"
      ]

    case "สถานที่:ลาน 80ปี":
      return [
        "ลานสาธารณะของโรงเรียน",
        "จุดพักพิง ใต้ร่มเงา"
      ]

    case "สถานที่:โดมโรงเรียน":
      return [
        "โดมใหญ่ของโรงเรียน",
        "จุดทำกิจกรรมบนเวทีต่างๆ หรืออาจไว้ใช้สำหรับการเล่นกีฬา",
        "และกิจกรรมอื่นๆ เช่นหอการค้า ตลาด อาจจัดนานๆที"
      ]

    case "สถานที่:ห้องพยาบาล":
      return [
        "จุดรักษา พักฟื้นของโรงเรียน",
        "มีอุปกรณ์ปฐมพยาบาล มีจุดพักผ่อนเพื่อรอฟื้นตัว",
        "หากเกิดการเจ็บป่วย สามารถพบได้อยู่บริเวณ ด้านขวามือของหน้าอาคาร 3"
      ]
    
    case "สถานที่:ห้องน้ำ":
      return [
        "ห้องน้ำใหญ่ของโรงเรียน อยู่ใกล้กับอาคาร 5"
      ]

    case "สถานที่:ศูนย์กีฬา":
      return [
        "อาคารสำหรับการกีฬา",
        "มีจุดสำหรับเล่นกีฬาต่างๆ เช่น แบดมินตัน ตะกร้อ สนามบาสเกตบอล",
        "มีอุปกรณ์ เกี่ยวกับกีฬา"
      ]

    case "สถานที่:สนามกีฬา":
      return [
        "มีลู่วิ่ง และลานกีฬา",
        "สนามฟุตบอล",
        "วันกิจกรรมจัดงานกีฬาสี จัดกิจกรรมที่นี่"
      ]

    case "สถานที่:สนามฟุตซอล":
      return [
        "สนามเล่นฟุตซอล",
        "กีฬาเล็กกลางแจ้ง"
      ]

    case "สถานที่:ห้องสมุด":
      return [
        "ห้องสมุดหลักของโรงเรียน",
        "สำหรับการอ่านหนังสือ ศึกษาความรู้",
        "และเป็นจุดพักพิง หากมีคาบว่าง เวลาว่างสามารถมาพักรอ ที่ห้องสมุดได้"
      ]

    case "สถานที่:ห้องการงาน ดุริยางค์":
      return [
        "ห้องงานช่าง และซ้อมของดุริยางค์ ห้องหุ่นยนต์อยู่บริเวณนั้นด้วย",
        "อุปกรณ์งานช่าง เครื่องดนตรี",
        "คนในชุมนุมหรือวงโยโรงเรียนใช้สำหรับการซ้อมเครื่องดนตรี"
      ]

    case "สถานที่:ห้องหุ่นยนต์":
      return [
        "ห้องปฎิบัติการหุ่นยนต์",
        "อุปกรณ์ทางเทคโนโลยีหุ่นยนต์"
      ]

    case "สถานที่:ห้องICT":
      return [
        "ห้องเทคโนโลยี",
        "สำหรับการเรียนการสอนเทคโนยี"
      ]

    case "สถานที่:หอเกียรติยศ":
      return [
        "จุดเยี่ยมชมผลงานของโรงเรียน",
        "พิพิฒภัณฑ์ ประวัติของโรงเรียน",
        ""
      ]
    
    case "ไม่ได้อนุญาตตำแหน่ง":
      return [
        "คุณยังไม่ได้อนุญาตการเข้าถึงตำแหน่ง",
        "กรุณาเปิดตำแหน่งที่ตั้งและรีเฟรชหน้าเว็บไซต์",
        "ทั้งนี้ อาจเกี่ยวกับเครือข่ายหรืออุปกรณ์ที่รองรับ หากผิดพลาดสามารถแจ้งปัญหาได้ที่หน้าหลัก",
      ]

    case "นอกพื้นที่ของโรงเรียน":
      return [
        "คุณอยู่นอกพื้นที่ของโรงเรียน",
        "พิกัดของคุณอาจ ต่ำกว่า หรือ เกิน กว่าพิกัดของโรงเรียน",
        "คุณควรอยู่ในพื้นที่ของโรงเรียน หากเกิดผิดพลาดประการใด สามารถเช็กข้อมูล หรือแจ้งปัญหาที่หน้าหลักได้"
      ]

    case "ทางเดิน รอบๆโรงเรียน":
      return [
        "คุณอาจอยู่บริเวณถนน ทางเดิน หรือบริเวณรอบๆโรงเรียน",
        "เนื่องจาก พิกัดที่อยู่ ไม่ได้อยู่ตรงกับสถานที่ใดๆ ที่ระบบเพิ่มไว้",
      ]

    case "กรุณาค้นหาสถานที่ก่อน":
    return [
      "ไปที่หน้าค้นหา ค้นหาสถานที่ที่ต้องการ  แล้วกดค้นพบ"
    ]

//----------------------------------------------------------------------------------------------------------
    default:
      return [
        "กรุณารอสักครู่..."
      ]
  }
}

/*

let cellular = document.getElementById("cell")
let net = document.getElementById("net")
let color = NaN

async function checkInternet(){
  let start = Date.now()

  try{
    await fetch("https://www.google.com", {mode:"no-cors"})
    let end = Date.now()
    let ping = end - start

    //console.log("Ping:", ping, "ms")

    if(ping < 100){
      return ["|||","ดีมาก","lightgreen"]
    }else if(ping < 300){
      return ["||","พอใช้","limegreen"]
    }else{
      return ["|","ช้า","red"]
    }

  }catch(err){
    return ["*","ไม่มีเน็ต","red"]
  }
}

setInterval(async () => {
  [cellular.innerText, net.innerText, color] = await checkInternet();
  cellular.style.color = color
}, 1000);


//---------------------------------------------------------------------------------------------------------*/

setInterval(() => {
  localStorage.setItem("starttravelsearch", starttravelsearch);
  localStorage.setItem("discoversearch",discoversearch ?? "กรุณาค้นหาสถานที่ก่อน");
  localStorage.setItem("discoverchoose",discoverchoose);

  discoverchange(discoverchoose);

  if(starttra) {
    DIST.innerText = distance_between_places(latnow,lonnow,starttravelsearch);
  }

  if(mapblackchange === 0) {
    mapblack.style.opacity = "0"
  }else if(mapblackchange === 1) {
    mapblack.style.opacity = "1"
  }

  let checkdata_getlatlon = Getlatlon_maxmin(discoversearch);


  if( (discoverchoose === 2 && current_display === 2) && checkdata_getlatlon) {
    mapblackchange = 1;
    pin.style.display = "flex"
    let [disminlat,dismaxlat,disminlon,dismaxlon] = checkdata_getlatlon;
    let [dis_y,dis_x] = make_2chord(disminlat,dismaxlat,disminlon,dismaxlon)
    let {top , left} = Process_MAP(dis_y,dis_x)

    pin.style.left = `${left}%`
    pin.style.top = `${top}%`

    //console.log(dis_x,dis_y)
  }else {
    
    if(!mapblackchange_check) {
      mapblackchange = 0;
    }
    pin.style.display = "none"
  }

  let checkdata_tracoords = Getlatlon_maxmin(starttravelsearch);

  if(starttra && checkdata_tracoords && tempPOSleft != null && tempPOStop != null) {

    let [traminlat,tramaxlat,traminlon,tramaxlon] = checkdata_tracoords;

    let [tra_y,tra_x] = make_2chord(traminlat,tramaxlat,traminlon,tramaxlon)
    let {top , left} = Process_MAP(tra_y,tra_x)
    pathsvg.innerHTML = `<polyline points="${tempPOSleft},${tempPOStop} ${left},${top}"></polyline>`;
  }else {
    pathsvg.innerHTML = ``;
    tempPOSleft = null;
    tempPOStop = null;
  }

  //console.log(starttravelsearch,discoversearch,discoverchoose)
  //console.log(discovermain.innerHTML)
}, 400);

function distance_between_places(lat , lon ,place2) {
  if(Placecoords[place2] && lat && lon){

    let lat2 = (Placecoords[place2].minlat + Placecoords[place2].maxlat) / 2
    let lon2 = (Placecoords[place2].minlon + Placecoords[place2].maxlon) / 2

    const R = 6371;
    
    let dlat = deg2rad(lat2 - lat);
    let dlon = deg2rad(lon2 - lon);

    let a =
      Math.sin(dlat / 2) * Math.sin(dlat / 2) +
      Math.cos(deg2rad(lat)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dlon / 2) * Math.sin(dlon / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    let d = R * c;

    return (d * 1000).toFixed(2);

  }
  else {
    return "...";
  }
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function Getlatlon_maxmin (textplace) {

  const coord = Placecoords[textplace];


  if (!coord) return [0, 0, 0, 0];
  
  
  return [coord.minlat, coord.maxlat, coord.minlon, coord.maxlon];
}
  

function make_2chord(latmin,latmax,lonmin,lonmax) {
  let centerlat = (latmin + latmax) / 2  
  let centerlon = (lonmin + lonmax) / 2 
  return [
    centerlat,centerlon
  ]
}



function IMG_FOR_MAP (yourplace) {
  switch (yourplace) {
    case "อาคาร:1":
      return [
        "PPK_Gallery/build1.png"
      ]


    case "อาคาร:2":
      return [
        "PPK_Gallery/build2.png"
      ]


    case "อาคาร:3":
      return [
        "PPK_Gallery/build3.jpg"
      ]


    case "อาคาร:4":
      return [
        "PPK_Gallery/build4.jpg"
      ]


    case "อาคาร:5":
      return [
        "PPK_Gallery/build5.jpg"
      ]


    case "อาคาร:6":
      return [
        "PPK_Gallery/build6.jpg"
      ]


    case "อาคาร:7":
      return [
        "PPK_Gallery/build7.jpg"
      ]

    //----------------------------------------------------------------------

    case "สถานที่:ศาลาจริยธรรม":
      return [
        "PPK_Gallery/ethics.jpg"
      ]

    case "สถานที่:โรงอาหาร":
      return [
        "PPK_Gallery/canteen.jpg"
      ]

    case "สถานที่:หอประชุมโรงเรียน":
      return [
        "PPK_Gallery/auditorium.jpg"
      ]

    case "สถานที่:ลาน 80ปี":
      return [
        "PPK_Gallery/auditorium_multi.jpg"
      ]

    case "สถานที่:โดมโรงเรียน":
      return [
        "PPK_Gallery/dome.jpg"
      ]

    case "สถานที่:ห้องพยาบาล":
      return [
        ""
      ]
    
    case "สถานที่:ห้องน้ำ":
      return [
        "PPK_Gallery/restroom.jpg"
      ]

    case "สถานที่:ศูนย์กีฬา":
      return [
        "PPK_Gallery/sportcenter.jpg"
      ]

    case "สถานที่:สนามกีฬา":
      return [
        "ppk.jpg"
      ]

    case "สถานที่:สนามฟุตซอล":
      return [
        ""
      ]

    case "สถานที่:ห้องสมุด":
      return [
        "PPK_Gallery/library.jpg"
      ]

    case "สถานที่:ห้องการงาน ดุริยางค์":
      return [
        ""
      ]

    case "สถานที่:ห้องหุ่นยนต์":
      return [
        ""
      ]

    case "สถานที่:ห้องICT":
      return [
        "PPK_Gallery/ICT.jpg"
      ]

    case "สถานที่:หอเกียรติยศ":
      return [
        "PPK_Gallery/fame.jpg"
      ]
    
    case "ไม่ได้อนุญาตตำแหน่ง":
      return [
        ""
      ]

    case "นอกพื้นที่ของโรงเรียน":
      return [
        ""
      ]

    case "ทางเดิน รอบๆโรงเรียน":
      return [
        ""
      ]

    case "กรุณาค้นหาสถานที่ก่อน":
    return [
      ""
    ]

//----------------------------------------------------------------------------------------------------------
    default:
      return [
        ""
      ]
  }
}