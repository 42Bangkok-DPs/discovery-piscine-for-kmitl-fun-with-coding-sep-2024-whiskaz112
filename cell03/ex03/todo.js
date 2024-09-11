document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("ft_list");
  const newButton = document.getElementById("new_todo");

  loadList();

  newButton.addEventListener("click", () => {
    const todoText = prompt("Enter a new TO DO:");
    if (todoText && todoText.trim() !== "") {
      addTodoItem(todoText);
      saveList();
    }
  });

  function addTodoItem(text) {
    const todoDiv = document.createElement("div");
    todoDiv.textContent = text;
    todoDiv.className = "todo-item";
    todoDiv.addEventListener("click", () => {
      if (confirm("Do you want to remove this TO DO?")) {
        list.removeChild(todoDiv);
        saveList();
      }
    });
    list.insertBefore(todoDiv, list.firstChild);
  }

  function saveList() {
    const todos = Array.from(list.children).map((item) => item.textContent);
    document.cookie = `todo_list=${JSON.stringify(todos)};path=/`;
  }

  function loadList() {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("todo_list="));
    if (cookieString) {
      const todos = JSON.parse(cookieString.split("=")[1]);
      todos.reverse().forEach((todo) => addTodoItem(todo));
    }
  }
});
