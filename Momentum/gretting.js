const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    // 이를 통해 form에 값이 들어오더라도 event의 발생을 막는다.
    // (event를 금지 : 기본 동작을 막는데 필요한 1단계)
    const currentValue = input.value;
    // console.log()를 토어해 받아온 currentValue를 console에서 보여준다.
    // console.log(currentValue);
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
    // form을 제출하는 event가 발생하면 event가 document까지 올라가게 된다.
    // 그렇게 되면 event를 통해 페이지가 refresh 되어진다.
    // 이 event의 기본 동작(default)를 막기 위해서 event.preventDefault()를 사용한다.
    // (function handleSubmit()을 확인)
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}!`;
}

// loadName() : localStorage에서 value를 가져온다.
function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    // currentUser가 null인지 확인
    if (currentUser === null) {
        // he is not
        askForName();
    } else {
        // he is
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();

// 구글 개발자 옵션 application >> local storage
// local storage를 통해 js의 정보를 저장한다.