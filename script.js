let lat;
let lon;

let weatherData;
let city1;
let temp1;
let date1;
let humidity;
let windSpeed1;
let windDirection1;
let icon;

window.addEventListener("load",search("Lucknow"))

document.querySelector("#location").addEventListener("click",getLocation);
searchButton.addEventListener("click",collectInput);

function collectInput(){
    const a=input.value;

    if(a==""){alert("Invalid Input- enter the CITY name")}
else{
    search(a);
}
}

async function search(cityName){
    
    try{
        const holder= await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&exclude=current&appid=49978c250ee1ef824c50b657b709c9ea&units=metric`)
        weatherData=await holder.json();
        console.log(weatherData);

        if(weatherData.cod==="404"){
            throw new Error("Invalid Input");
        }

        dataAssigning(0);
        
        // saveData(a);
    }
    catch(err){
        alert(err);
    }
}


function getLocation() {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("GPS error");
    }
}
async function showPosition(position) {

    try{console.log(position)
    lat1=position.coords.latitude;
    lon2=position.coords.longitude;
    const holder=await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat1}&lon=${lon2}&exclude=current&appid=49978c250ee1ef824c50b657b709c9ea&units=metric`);
    weatherData=await holder.json();


    console.log(weatherData);

    dataAssigning(0);}
    catch(err){
        alert("some ERROR Occurred while Fetching DATA");
    }
}

function dataAssigning(n){
    city1=weatherData.city.name;
    temp1=weatherData.list[n].main.temp;
    date1=weatherData.list[n].dt_txt.split(" ")[n];
    humidity=weatherData.list[n].main.humidity;
    windDirection1=weatherData.list[n].wind.deg;
    windSpeed1=weatherData.list[n].wind.speed;
    icon=weatherData.list[n].weather[n].icon;
    console.log(city , temp , date1 , humidity , windSpeed ,  icon);

    cardUpdater();
}

function cardUpdater(){
    weatherIcon.src=`https://openweathermap.org/img/wn/${icon}@2x.png`;
    temp.innerText=`${Math.floor(temp1)}°C`;
    city.innerText=city1;
    date.innerText=date1;
    humidityData.innerText=humidity+"%";
    windSpeed.innerText=windSpeed1+"km/h";

    arrow.style.scale="0.5";
    arrow.style.transform=`rotate(${windDirection1}deg)`;
}