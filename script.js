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

window.addEventListener("load",search("Lucknow"));

// history section
window.addEventListener("load",()=>{
    historyHolder.innerHTML=localStorage.getItem("history");

    document.querySelectorAll(".data").forEach(element => {
        element.addEventListener("click",changeInput)
    });

    document.querySelectorAll(".deleteIcon").forEach(element => {
        element.addEventListener("click",deleteHistory)
    });
    
});

// event listener for input field
input.addEventListener("focus",()=>{
    if(localStorage.getItem("history"))
    {historyHolder.style.display="block"}});
input.addEventListener("blur",hideHistory);

// function to add data in history field
function addHistory(data){
    const newInput=document.createElement('div');
    newInput.setAttribute("id","individualHistory");

    const delIcon=document.createElement("img");
    const individualdata=document.createElement("div");
    delIcon.setAttribute("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAOlJREFUOE+tlO0NgkAQRIdK1E60ErUStRKxEu1ErUR5hCF7BI7DyC/C7b2d2Q8q/empRjhrSfsM/y3pJekRY4agU3N4LhRJ3MWxEXRvsmw7UB+QUQyolnQkxiDsPAsgkXuQdJW0w6ZB/rjp/HMBdUkdmjPiUMHj5CiqDXJtcgrJDqhV0ME+djEFIs5wakF2q2lrsgQUYbz3hf0FZDvcTdq9RJEhKGEAAQ1hszWiY8xVtOOaxc7OglAeW+2yDEcCULb9JVuSKMy1fwrmpR5dkSXL6gTJOMRJxv+qxJOkW1il9srY/6iQlYZ9ARLzRxO3GvdlAAAAAElFTkSuQmCC");
    delIcon.setAttribute("class","deleteIcon");
    delIcon.addEventListener("click",deleteHistory);

    individualdata.innerText=data;
    individualdata.setAttribute("class","data")
    individualdata.addEventListener("click",changeInput)
    
    newInput.appendChild(delIcon);
    newInput.appendChild(individualdata);

    historyHolder.appendChild(newInput);

    localStorage.setItem("history",historyHolder.innerHTML);
}

// function to delete history items
function deleteHistory(e){

    const toDelete=e.target.parentElement;

    toDelete.remove();
    
    localStorage.setItem("history",historyHolder.innerHTML);
}

// to update the value of input field
function changeInput(e){
    input.value=e.target.innerText;
    
    search(input.value);
}

function hideHistory(){
    setTimeout(()=>{historyHolder.style.display="none"},200);
}

// end of history section

document.querySelector("#location").addEventListener("click",getLocation);

// to search on press of ENTER
input.addEventListener("keypress", (e)=>{
    if(e.key==="Enter"){
        collectInput();
    }
});

searchButton.addEventListener("click",collectInput);

// to collect data from input field and search
function collectInput(){
    const a=input.value;

    if(a==""){alert("Invalid Input- enter the CITY name")}
else{
    search(a);
    addHistory(a);
}
}

// to call and resolve API
async function search(cityName){
    
    try{
        const holder= await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&exclude=current&appid=49978c250ee1ef824c50b657b709c9ea&units=metric`)
        weatherData=await holder.json();
        // console.log(weatherData);

        if(weatherData.cod==="404"){
            throw new Error("Invalid Input");
        }

        dataAssigning(0);
        dateUpdater();
        
        // saveData(a);
    }
    catch(err){
        alert(err);
    }
}

// function to get location
function getLocation() {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("GPS error");
    }
}

// function to call API i response to Lattitude and Longitude
async function showPosition(position) {

    try{console.log(position)
    lat1=position.coords.latitude;
    lon2=position.coords.longitude;
    const holder=await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat1}&lon=${lon2}&exclude=current&appid=49978c250ee1ef824c50b657b709c9ea&units=metric`);
    weatherData=await holder.json();


    // console.log(weatherData);

    dataAssigning(0);
    dateUpdater();
    }
    catch(err){
        alert("some ERROR Occurred while Fetching DATA");
    }
}

// fucntion to extract data from object
function dataAssigning(n){

    mainCard.classList.add(`entryExit`);

    setTimeout(()=>{city1=weatherData.city.name;
    temp1=weatherData.list[n].main.temp;
    date1=weatherData.list[n].dt_txt.split(" ")[0];
    humidity=weatherData.list[n].main.humidity;
    windDirection1=weatherData.list[n].wind.deg;
    windSpeed1=weatherData.list[n].wind.speed;
    icon=weatherData.list[n].weather[0].icon;
    // console.log(city , temp , date1 , humidity , windSpeed ,  icon);

    cardUpdater();

    },1000);

    // to wait for the animation to complete
    setTimeout(()=>mainCard.classList.remove(`entryExit`),2001);
}

// to update the main card
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

// to update the cards at the bottom
function dateUpdater(){
   day2.innerText=weatherData.list[8].dt_txt.split(" ")[0];
   day3.innerText=weatherData.list[16].dt_txt.split(" ")[0];
   day4.innerText=weatherData.list[24].dt_txt.split(" ")[0];
   day5.innerText=weatherData.list[32].dt_txt.split(" ")[0];
}

// eventListener for bottom cards
day1.addEventListener("click",()=>dataAssigning(0));
day2.addEventListener("click",()=>dataAssigning(8));
day3.addEventListener("click",()=>dataAssigning(16));
day4.addEventListener("click",()=>dataAssigning(24));
day5.addEventListener("click",()=>dataAssigning(32));