const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    // .innerText() : 객체 안에 텍스트를 넣는 함수
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : `${hours}`}:${minutes < 10 ? `0${minutes}` : `${minutes}`}:${seconds < 10 ? `0${seconds}` : `${seconds}`}`; // 여기까지 하면 정적인 상태로 있다.(시간이 흐르지 않는다.)
}

function init() {
    getTime();
    setInterval(getTime, 1000); // setInterval(function, 실행시간 간격)
}

init();

