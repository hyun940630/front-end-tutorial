const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id); 
        // 기존의 li.id값은 string값이 였음
    });  
    // .filter()은 마치 forEach에서 function을 실행하며 true인 item을 실행(return)한다.
    // 그리고 return하는 것들을 새로운 객체에 넣는다.
    toDos = cleanToDos;
    saveToDos();
}

// saveToDos()로 toDos를 가져와서 localStorage에 저장
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));  
    // JSON.stringfy() : JS object를 string으로 바꿔준다.
    // (JS는 기본적으로 localStorage에 object를 저장할 수 없다.)
}

function paintToDo(text) {
    const li = document.createElement("li"); 
    // document.createElement("")는 HTML에 element를 추가한다.
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);  
    // .appendChild() : value를 그 element의 father element에 넣는 함수    
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId  
        // array.length를 통해 id값을 부여하기 위해 사용
    };
    toDos.push(toDoObj);
    saveToDos();    
    // 브라우저의 local Storage에는 js의 data를 저장할 수 없다.(string만 저장 가능)
    // js는 local Storage에 있는 모든 데이터를 string으로 저장하려고 한다.
    // 따라서 object가 string이 되도록 만들어야 한다.
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    // todoList는 기본적으로 보여주기만 할 것이다. 없어도 상관없다.
    if (loadedToDos !== null) {
        // JSON 사용(JSON : JavaScript Object Notation)
        //console.log(loadedToDos);   // JSON.parse 해주기 전 확인
        const parsedToDos = JSON.parse(loadedToDos);
        //console.log(parsedToDos);   // JSON.parse 한 후 확인
        parsedToDos.forEach(function(toDo) {    
            // 이 함수를 통해 parseToDos에 있는 것들을 실행
            paintToDo(toDo.text);
        });   
        // forEach() : 기본적으로 함수를 실행하며 array에 담겨있는 것들을 각각에 한번씩 실행시켜줌.
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
