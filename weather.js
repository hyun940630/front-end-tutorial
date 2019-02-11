const weather = document.querySelector(".js-weather");

const API_KEY = "ce00e0937050af4188942de158fabaa2";
    // 해당 API를 제공하는 업체의 API key 값을 받아옵니다.
    // http://openweathermap.org에 로그인 후 Key값을 받아 올 수 있습니다.
const COORDS = 'coords';

function getWeather(lat, lng) {
    // 데이터를 얻는 방법 >> fetch()
    // fetch(가져올 데이터_`https://~`)
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function(response) { // json 데이터가 잘 준비되면 여기서 새로고침.
            return response.json();
        }).then(function(json) {    // json 데이터를 console에서 보여줌.
            //  console.log(json);
            const temperature = json.main.temp; 
            const place = json.name;
            weather.innerText = `${temperature}℃ @ ${place}`;
        });
    // AppID를 추가로 넣어줘야한다.
    // API를 제공하는 쪽에서 요청자의 API Key를 통해서 요청 메세지의 양을 판단할 수 있다.
    // &units=metric 추가(온도 format을 섭씨로 사용)
    // .then() : 데이터가 우리한테 완전히 넘어 왔을 때 실행되게 하는 명령어
    // js에서 뭔가가 끝나길 기다리는 방법은 then()을 사용
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coords));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,       // (=) latitude : latitude
        longitude       // (=) longitude : longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Can't access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    // localStorage에서 가진 COORDS(좌표 값)를 가져온다.
    const loadedCoords = localStorage.getItem(COORDS);
    // local storage에 COORDS 값이 존재 하는지 확인한다.
    if(loadedCoords === null) { // COORDS값이 존재하지 않는다.
        askForCoords(); // 좌표를 요청
    } else {
        const parseCoords = JSON.parse(loadedCoords);   // localStorage의 좌표값을 
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();

// API : 특정 웹사이트로부터 데이터를 얻거나 컴퓨터끼리 소통하기 위해 만들어진 것