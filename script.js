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
const weatherForcastEl=document.getElementById("weather-forecast");
const currenttempEl=document.getElementById("current-temp");
const imageEl=document.getElementById("style");
const obj=new Date();
// Tow Images for Day and Night purpose
const dayimg="./assets/img/b.jpg";
const nightimg="./assets/img/img.jpg";



// Array of days and months for displaying the right day and month on Screen
const days=['','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']


// Function currentTime which Updates the Date and Time ELements in DOM 
function currentTime(response){
  const days1=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
   const obj1=new Date(response.location.localtime);
    const day =obj1.getDay();
    const date=obj1.getDate();
    const month=obj1.getMonth();
   let  dateandtime= (response.location.localtime).split(" ");
    
    //Updation Time Element 
    var hours =(dateandtime[1].split(":"))[0] > 12 ? (dateandtime[1].split(":"))[0]- 12 : (dateandtime[1].split(":"))[0];
    var am_pm =(dateandtime[1].split(":"))[0]>= 12 ? "PM" : "AM";
    // hours = hours < 10 ? "0" + hours : hours;
    var minutes = (dateandtime[1].split(":"))[1];
   
  let  time=` ${hours} : ${minutes} ${am_pm}`
   timeEl.innerText=time;
// Updation Date Element
 dateEl.innerHTML = days1[day]+", "+date+" "+months[month];
}
//calling that currentTime function every second(1000ms) to upDate the data of Clock every Second
//setInterval(currentTime, 1000);


/*Function getWeather() used to Connect the WeatherStack Api and send response to changeData() function
so Accordingly changeData Function will take response from Api and change the Data on Screen
for Space in name of city use %20
*/
function getWeather(){
  var city = cityName;
  var units ="m"
  fetch("http://api.weatherstack.com/current?access_key=61e6dabba6e9c55962d2869cadcc54ba&query="+city+"&units="+units)
  .then(a => a.json())
  .then(response => {
    console.log(response);
    getData2(response);
    
       
  });
  
}

function getData2(response){
  fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+response.location.lat+"&lon="+response.location.lon+"&exclude=hourly,minutely&units=metric&appid=49cc8c821cd2aff9af04c9f98c36eb74")
  .then(a => a.json() )
  .then(response2 =>{
    console.log(response2);
    changeData(response,response2)
  });
}

// calling getWeather() function
let cityName=window.prompt("Enter city Name: ");
getWeather();

/*
changeData function which takes Response from api and changes the InnerHTML of that div
using js
*/
function changeData(response,response2){
  currentTime(response);
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
// dailyData Update
let todaysarr=getDayNo();
console.log(todaysarr);
console.log(days);
currenttempEl.innerHTML=`
<img src="http://openweathermap.org/img/wn/${response2.daily[todaysarr[0]].weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
<div class="other">
    <div class="day">${days[todaysarr[0]]}</div>
    <div class="temp">Night - ${response2.daily[todaysarr[0]].temp.night}&#176; C</div>
    <div class="temp">Day - ${response2.daily[todaysarr[0]].temp.day}&#176; C</div>
</div>
`
console.log(weatherForcastEl);
weatherForcastEl.innerHTML=`
<div class="weather-forecast-item">
                <div class="day">${days[todaysarr[1]]}</div>
                <img src="http://openweathermap.org/img/wn/${response2.daily[todaysarr[1]].weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night -  ${response2.daily[todaysarr[1]].temp.night}&#176; C</div>
                <div class="temp">Day -  ${response2.daily[todaysarr[1]].temp.day}&#176; C</div>
            </div>
            <div class="weather-forecast-item">
                <div class="day">${days[todaysarr[2]]}</div>
                <img src="http://openweathermap.org/img/wn/${response2.daily[todaysarr[2]].weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${response2.daily[todaysarr[2]].temp.night}&#176; C</div>
                <div class="temp">Day - ${response2.daily[todaysarr[2]].temp.day}&#176; C</div>
            </div>
            <div class="weather-forecast-item">
                <div class="day">${days[todaysarr[3]]}</div>
                <img src="http://openweathermap.org/img/wn/${response2.daily[todaysarr[3]].weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${response2.daily[todaysarr[3]].temp.night}&#176; C</div>
                <div class="temp">Day - ${response2.daily[todaysarr[3]].temp.day}&#176; C</div>
            </div>
            <div class="weather-forecast-item">
                <div class="day">${days[todaysarr[4]]}</div>
                <img src="http://openweathermap.org/img/wn/${response2.daily[todaysarr[4]].weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${response2.daily[todaysarr[4]].temp.night}&#176; C</div>
                <div class="temp">Day - ${response2.daily[todaysarr[4]].temp.day}&#176; C</div>
            </div>
            <div class="weather-forecast-item">
                <div class="day">${days[todaysarr[5]]}</div>
                <img src="http://openweathermap.org/img/wn/${response2.daily[todaysarr[5]].weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${response2.daily[todaysarr[5]].temp.night}&#176; C</div>
                <div class="temp">Day - ${response2.daily[todaysarr[5]].temp.day}&#176; C</div>
            </div>
            <div class="weather-forecast-item">
                <div class="day">${days[todaysarr[6]]}</div>
                <img src="http://openweathermap.org/img/wn/${response2.daily[todaysarr[6]].weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${response2.daily[todaysarr[6]].temp.night}&#176; C</div>
                <div class="temp">Day - ${response2.daily[todaysarr[6]].temp.day}&#176; C</div>
            </div>

`
}




function getDayNo(){
  let dayNo=[];
  console.log(obj.getDay());
  if(obj.getDay()==0)
  dayNo=[7,1,2,3,4,5,6];
  if(obj.getDay()==1)
    dayNo=[1,2,3,4,5,6,7];
   if(obj.getDay()==2)
    dayNo=[2,3,4,5,6,7,1];
    if(obj.getDay()==3)
    dayNo=[3,4,5,6,7,1,2];
    if(obj.getDay()==4)
    dayNo=[4,5,6,7,1,2,3];
    if(obj.getDay()==5)
    dayNo=[5,6,7,1,2,3,4];
    if(obj.getDay()==6)
    dayNo=[6,7,1,2,3,4,5];
    if(obj.getDay()==7)
    dayNo=[7,1,2,3,4,5,6];

    return dayNo;
    
}