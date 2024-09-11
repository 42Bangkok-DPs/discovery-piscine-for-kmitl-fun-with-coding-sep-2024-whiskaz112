$(document).ready(function () {
  const $list = $("#ft_list");
  const $newButton = $("#new_todo");

  loadList();

  $newButton.on("click", function () {
    const todoText = prompt("Enter a new TO DO:");
    if (todoText && todoText.trim() !== "") {
      addTodoItem(todoText);
      saveList();
    }
  });

  function addTodoItem(text) {
    const $todoDiv = $("<div></div>")
      .addClass("todo-item")
      .text(text)
      .on("click", function () {
        if (confirm("Do you want to remove this TO DO?")) {
          $(this).remove();
          saveList();
        }
      });
    $list.prepend($todoDiv);
  }

  function saveList() {
    const todos = $list
      .children()
      .map(function () {
        return $(this).text();
      })
      .get();
    document.cookie = `todo_list=${JSON.stringify(todos)};path=/`;
  }

  function loadList() {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith("todo_list="));
    if (cookieString) {
      const todos = JSON.parse(cookieString.split("=")[1]);
      $.each(todos.reverse(), function (_, todo) {
        addTodoItem(todo);
      });
    }
  }
});
