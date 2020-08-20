const api = {
  key: "275bfe9706c6b60546e0d03719a2c81d",
  base: "http://api.openweathermap.org/data/2.5/"
}


//http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={YOUR API KEY}


const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);



  let now1 = new Date();
  let date1 = document.querySelector('.location .time');
  date1.innerText = dateBuilder1(now1);



  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}


function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  let hour = hours[d.getHours()];
  let minute = d.getMinutes();
  let seconds = d.getSeconds();
  if (hour > 12){
    hour = hour-12;
   }

  return `${day} ${date} ${month} ${year} `;
}




setInterval(dateBuilder1 (d1),1000);
function dateBuilder1 (d1){

  let hour = d1.getHours();
  let minute = d1.getMinutes();
  let seconds = d1.getSeconds();
   if (hour > 12){
    hour = hour-12;
   }
   if (minute < 10){
    minute = "0"+minute;
   }
   if (seconds < 10){
    seconds = "0"+seconds;
   }


  return `${hour} : ${minute} : ${seconds}`;


}
