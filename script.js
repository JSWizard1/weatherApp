//api call
const apiKey = "0620b077b4c134b4c42c56a53ffa996b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

function forcast2(){
    
    // getInfo(data);
    
}

function getInfo(data){
    $(".NameCurrLoc").html(data.name);
    $("#summaryTemp").html(data.main.temp+"&#176c");
    $("#summaryCaption").html(data.weather[0].main);
    $("#summaryFeelslike").html(data.main.feels_like+"&#176c");
    $("#highTemp").html("High will be "+data.main.temp_max+"&#176")
    $("#wind").html(data.wind.speed+"km/h");
    $("#humidity").html(data.main.humidity+"%");
    $("#visibility").html(data.visibility+"m");
    $("#pressure").html(data.main.pressure+"mb");
    let sunrise = data.sys.sunrise;
    let sunset = data.sys.sunset;
    let timezone = data.timezone;
    let x = new Date((sunrise)*1000).toLocaleTimeString();
    $("#riseTime").html(x);
    let y = new Date((sunset)*1000).toLocaleTimeString();
    $("#setTime").html(y);
}

async function forcast(){
    const akshay = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=Delhi&cnt=7&appid=0620b077b4c134b4c42c56a53ffa996b&units=metric"); 
    let store = await akshay.json();
    forcast1(store);
}
async function forcast1(store){
    for(i=0; i<7; i++){
        let maxT =Number(store.list[i].main.temp_max).toFixed(1);
        let minT = Number(store.list[i].main.temp_min).toFixed(1);
        $("#day"+(i+1)+"Max").html(maxT+"&#176c");
        $("#day"+(i+1)+"Min").html(minT+"&#176c");
        let imgForcast = store.list[i].weather[0].icon
        $("#today"+(i+1)+"Icon").attr("src", "https://openweathermap.org/img/wn/"+imgForcast+"@4x.png")
    }   

}
forcast();


async function error(){
    const responce = await fetch(apiUrl+"Delhi"+"&appid="+apiKey+"&units=metric");
    let data = await responce.json();
    getInfo(data);
};

let lan="";
let long="";

async function getposition(position){
    lan = position.coords.latitude;
    long = position.coords.longitude;
    const responce = await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lan+"&lon="+long+"&appid="+apiKey+"&units=metric");
    let data = await responce.json();
    getInfo(data);
};




//input location temp
function handlecurlocation(){

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getposition);
        
    }else{
         error();
    }
};
handlecurlocation()

$("#searchInput").click(async function(){
    let newName  = $("#cityInput").val();
    const nitya = await fetch(apiUrl+newName+"&appid="+apiKey+"&units=metric");
    let data = await nitya.json();
    getInfo(data);
    const aks = await fetch("https://api.openweathermap.org/data/2.5/forecast?q="+newName+"&cnt=7&appid=0620b077b4c134b4c42c56a53ffa996b&units=metric");
    let store = await aks.json();
    forcast1(store);


});





async function checkWeather(){
    const response = await fetch(apiUrl+"Delhi"+"&appid="+apiKey+"&units=metric");
    let data = await response.json();
    const icons = data.weather[0].icon;
    if(data.weather[0].description == "haze"||data.weather[0].description == "mist"){
        $("#delhiImg").attr("src","https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v8/Condition_Card/Haze.svg");
    }else{
        $("#delhiImg").attr("src", "https://openweathermap.org/img/wn/"+icons+"@2x.png");

    };
    //this link works but very complications

    $(".delhiTemp").html(data.main.temp+"&#176c");
    


    
    const responses = await fetch(apiUrl+"Mumbai"+"&appid="+apiKey+"&units=metric");
    let data1 = await responses.json();
    const icon = data1.weather[0].icon;
    if(data1.weather[0].description == "haze"){
        $("#mumbaiImg").attr("src","https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v8/Condition_Card/Haze.svg");
    }else{
        $("#mumbaiImg").attr("src", "https://openweathermap.org/img/wn/"+icon+"@2x.png");

    };

    $(".mumbaiTemp").html(data1.main.temp+"&#176c");
    


    const resp = await fetch(apiUrl+"Hyderabad"+"&appid="+apiKey+"&units=metric");
    let data2 = await resp.json();
    const ico = data2.weather[0].icon;
    if(data2.weather[0].description == "haze"){
        $("#hyderabadImg").attr("src", "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v8/Condition_Card/Haze.svg");
    }else{
        $("#hyderabadImg").attr("src", "https://openweathermap.org/img/wn/"+ico+"@2x.png");

    };

    $(".hyderabadTemp").html(data2.main.temp+"&#176c");



    const respo = await fetch(apiUrl+"Bangalore"+"&appid="+apiKey+"&units=metric");
    let data3 = await respo.json();
    const ic = data3.weather[0].icon;
    if(data3.weather[0].description == "haze"){
        $("#bangaloreImg").attr("src", "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v8/Condition_Card/Haze.svg");
    }else{
        $("#bangaloreImg").attr("src","https://openweathermap.org/img/wn/"+ic+"@2x.png");

    };
    $(".bangaloreTemp").html(data3.main.temp+"&#176c");
    


    const respon = await fetch(apiUrl+"Kolkata"+"&appid="+apiKey+"&units=metric");
    let data4 = await respon.json();
    const i = data4.weather[0].icon;
    if(data4.weather[0].description == "haze"){
        $("#kolkataImg").attr("src", "https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v8/Condition_Card/Haze.svg");
    }else{
        $("#kolkataImg").attr("src", "https://openweathermap.org/img/wn/"+i+"@2x.png");
    };

    $(".kolkataTemp").html(data3.main.temp+"&#176c");
    
}
checkWeather();


// registration
let arrow = $(".arrow-up");
let form = $(".login-form");
let status = false;
$("#login").click(function(){
    if(status==false){
        arrow.fadeIn();
        form.fadeIn();
        status=true;
    }else{
        arrow.fadeOut();
        form.fadeOut();
        status=false;
    }
});

// dropdown menu
let dropdown = $(".dropdown");
let menu = $(".menu");
let status2 = false;
$(".lines").click(function(){
    if(status2==false){
        dropdown.fadeIn();
        menu.fadeIn();
        status2 = true;
    }
    $(".cross").click(function(){
        dropdown.fadeOut();
        menu.fadeOut();
        status2= false;
    });
});

// draggable slider bar
const tabsBox = document.querySelector(".tabs-box");
const arrowIcons = document.querySelectorAll(".icon1 i");


const handleIcons = (scrollVal) => {
    let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
    arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? "none" : "flex";
    arrowIcons[1].parentElement.style.display = maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
}

arrowIcons.forEach(icon1 => {
    icon1.addEventListener("click", () => {
        // if clicked icon is left, reduce 350 from tabsBox scrollLeft else add
        let scrollWidth = tabsBox.scrollLeft += icon1.id === "left" ? -340 : 340;
        handleIcons(scrollWidth);
    });
});

//date 
let today = new Date();
let month = today.getMonth()+1;
let year = today.getFullYear();
let date = today.getDate();
if(month<10){
    month=("0"+month);
}
if(date<10){
    date=("0"+date);
}
$(".date").html(year+"-"+month+"-"+date);

//time
let checkAmPm = new Date();
let hours = checkAmPm.getHours();
let minutes = checkAmPm.getMinutes();
let amPm = hours>=12 && hours<24?"Pm":"Am";
let hours12 = hours%12;
hours12 = hours12 ? hours12:12;
minutes = minutes < 10 ? '0'+minutes : minutes;
$(".time").html(hours12+':'+minutes+' '+amPm);

//forcast day and time
let dateObj = new Date();
let currentDate = dateObj.getDate();
let currentDay = dateObj.getDay();
let weekend = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


for(i=0; i<7;i++){
    dateObj.setDate(currentDate+i);
    // console.log(dateObj.getDate());
    let dayIndex = (currentDay + i) % 7;
    $("#day"+(i+1)).html(weekend[dayIndex]+" "+dateObj.getDate());
    dateObj.setDate(currentDate-i);
};




