//import response from "./data.js";
/*
This Project is for weather forcasting . we have used WeatherStack API for the data.
you can see response object (data) coming from Api in console as it is Logged in Console
According to DOM (HTML) id's we have get the Elements in js file and stored it in const variable bellow

*/


// Getting Elements from DOM(HTML)
const timeEl=document.getElementById("time");
const dateEl=document.getElementById("date");
const currentWeatherItemsEl=document.getElementById("current-weather-items");
const timezone=document.getElementById("time-zone");
const countryEl=document.getElementById("country");
const weatherForcastEl=document.getElementById("weather-forcast");
const currenttempEl=document.getElementById("current-temp");
const imageEl=document.getElementById("style");
// Tow Images for Day and Night purpose
const dayimg="./assets/img/b.jpg";
const nightimg="./assets/img/img.jpg";



// Array of days and months for displaying the right day and month on Screen
const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']


// Function currentTime which Updates the Date and Time ELements in DOM 
function currentTime(){
    const obj=new Date();
    const day =obj.getDay();
    const date=obj.getDate();
    const month=obj.getMonth();

    //Updation Time Element 
    var hours = obj.getHours() > 12 ? obj.getHours() - 12 : obj.getHours();
    var am_pm = obj.getHours() >= 12 ? "PM" : "AM";
    hours = hours < 10 ? "0" + hours : hours;
    var minutes = obj.getMinutes() < 10 ? "0" + obj.getMinutes() : obj.getMinutes();
    var seconds = obj.getSeconds() < 10 ? "0" + obj.getSeconds() : obj.getSeconds();
  let  time=` ${hours} : ${minutes} ${am_pm}`
   timeEl.innerText=time;
// Updation Date Element
 dateEl.innerHTML = days[day]+", "+date+" "+months[month];
}
//calling that currentTime function every second(1000ms) to upDate the data of Clock every Second
setInterval(currentTime, 1000);


/*Function getWeather() used to Connect the WeatherStack Api and send response to changeData() function
so Accordingly changeData Function will take response from Api and change the Data on Screen
*/
function getWeather(){
  var city = "shegaon";
  var units ="m"
  fetch("http://api.weatherstack.com/current?access_key=61e6dabba6e9c55962d2869cadcc54ba&query="+city+"&units="+units)
  .then(a => a.json())
  .then(response => {
    console.log(response);
    getData2(response);
     changeData(response);
       
  });
  
}

function getData2(response){
  fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+response.location.lat+"&lon="+response.location.lon+"&exclude=hourly,minutely&units=metric&appid=49cc8c821cd2aff9af04c9f98c36eb74")
  .then(a => a.json() )
  .then(response2 =>{
    console.log(response2);
  });
}

// calling getWeather() function
getWeather();

/*
changeData function which takes Response from api and changes the InnerHTML of that div
using js
*/
function changeData(response){
  timezone.innerText=response.location.name+" , "+response.location.region +" "+response.location.country;
  countryEl.innerText="TimeZone : "+response.location.timezone_id;
  if(response.current.is_day==='yes'){
     imageEl.innerHTML=`
     body{
      background:url(${dayimg});
      background-size: cover;
      /* background-repeat: no-repeat;
      background-size:cover; */
      overflow:hidden;
      height: 100vh;
      font-family: 'Poppins', sans-serif;
  }
     `
  }

  else{
    imageEl.innerHTML=`
    body{
     background:url(${nightimg});
     background-size: cover;
     /* background-repeat: no-repeat;
     background-size:cover; */
     overflow:hidden;
     height: 100vh;
     font-family: 'Poppins', sans-serif;
 }
    `
  }
  currentWeatherItemsEl.innerHTML=`
  <div class="weather-item">
  <div>Humidity</div>
  <div>${response.current.humidity} g.kg -1</div>
</div>

<div class="weather-item">
  <div>Pressure</div>
  <div>${response.current.pressure} Pa</div>
</div>

<div class="weather-item">
  <div>Wind Speed</div>
  <div>${response.current.wind_speed} m/s</div>
</div>
<div class="weather-item">
  <div>Wind Degree</div>
  <div>${response.current.wind_degree} degrees</div>
</div>
<div class="weather-item">
  <div>Wind Direction</div>
  <div>${response.current.wind_dir}</div>
</div>
`
}

