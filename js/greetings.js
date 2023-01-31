const loginForm = document.querySelector('#login-form');
const loginInput = document.querySelector('#login-form input');
const greeting = document.querySelector('#greeting');
const clockHidden = document.querySelector('#clock');
const todoFormHidden = document.querySelector('#todo-form');
const quoteHidden = document.querySelector('#quote');
const clearBtn = document.querySelector('#clearbtn');

const HIDDEN_CLASSNAME = 'hidden';
const USERNAME_KEY = 'userName';


function onLoginSubmit(event) {
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const userName = loginInput.value;
    localStorage.setItem(USERNAME_KEY, userName);
    paintGreetings();
}


function paintGreetings() {
    const userName = localStorage.getItem(USERNAME_KEY);
    greeting.innerText = `Hello ${userName}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
    clockHidden.classList.remove(HIDDEN_CLASSNAME);
    todoFormHidden.classList.remove(HIDDEN_CLASSNAME);
    quoteHidden.classList.remove(HIDDEN_CLASSNAME);
    clearBtn.classList.remove(HIDDEN_CLASSNAME);
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);  // weather
}

const savedUsename = localStorage.getItem(USERNAME_KEY);

if (savedUsename === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener('submit', onLoginSubmit);
} else {
    paintGreetings();
}

//------weather------

const API_KEY = 'cc2efb161d98fc8b1eb55544d9bb94a3';

function onGeoOk(positon) {
    const lat = positon.coords.latitude;
    const lon = positon.coords.longitude;
    console.log('You live in', lat, lon);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url).then(response => response.json().then(data => {
        const weather = document.querySelector('#weather span:first-child');
        const city = document.querySelector('#weather span:last-child');
        city.innerText = data.name;
        weather.innerText = `${data.weather[0].main}, ${data.main.temp}°, `;
    }));
}

function onGeoError() {
    alert("Can't find you. No weather for you.");
}

function onClickClear() {
    window.localStorage.clear();
}

clearBtn.addEventListener('click', onClickClear);



