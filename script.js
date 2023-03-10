var todoList = [];

  function saveListData () { 
    localStorage.setItem('myObject', JSON.stringify(todoList));
}
const accessListData = JSON.parse(localStorage.getItem('myObject'));
const todoListElement = document.querySelector("#myUL");
document.querySelector("#add_button").addEventListener("click", addTodo);
document.querySelector("#myInput").addEventListener("keypress", function(e) {
  if (e.key == 'Enter') {
    addTodo()
  }
});

function addTodo() {
  const todoText = document.querySelector("#myInput").value;

  if (todoText == "") {
    alert("You did not enter any item");
  } else {
    const todoObject = {
      id: todoList.length,
      todoText: todoText,
      isDone: false,
    };

    todoList.push(todoObject);
    saveListData();
    displayTodos();
  }
}

function doneTodo(todoId) {
  const selectedTodoIndex = todoList.findIndex((item) => item.id == todoId);

  todoList[selectedTodoIndex].isDone
    ? (todoList[selectedTodoIndex].isDone = false)
    : (todoList[selectedTodoIndex].isDone = true);
  saveListData();
  displayTodos();
}

function deleteItem(x) {
  todoList.splice(todoList.findIndex((item) => item.id == x),1);
  saveListData();
  displayTodos();
}

function displayTodos() {
  todoListElement.innerHTML = "";
  document.querySelector("#myInput").value = "";
  todoList = accessListData;
    todoList.forEach((item) => {
    const listElement = document.createElement("li");
    const delBtn = document.createElement("i");
    const doneList = document.createElement("i");

    listElement.innerHTML = item.todoText;
    listElement.setAttribute("data-id", item.id);
    delBtn.setAttribute("data-id", item.id);
    doneList.setAttribute("data-id",item.id);

    delBtn.classList.add("far");
    delBtn.classList.add("fa-trash-can");
    delBtn.classList.add("fa-solid");
    delBtn.setAttribute("data-id", item.id);

    doneList.classList.add("farr");
    doneList.classList.add("fa-solid"); 
    doneList.classList.add("fa-clipboard-check");
    doneList.setAttribute("data-id",item.id);
 


    if (item.isDone) {
      listElement.classList.add("checked");
    }

    listElement.addEventListener("click", function (e) {
      const selectedId = e.target.getAttribute("data-id");
      doneTodo(selectedId);
    });

    delBtn.addEventListener("click", function (e) {
      const delId = e.target.getAttribute("data-id");
      deleteItem(delId);
    });

    todoListElement.appendChild(listElement);
    listElement.appendChild(delBtn);
    listElement.appendChild(doneList);
  });
}
displayTodos();