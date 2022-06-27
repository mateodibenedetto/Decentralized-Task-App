const d = document;

const $taskForm = d.querySelector("#taskForm");

d.addEventListener("DOMContentLoaded", () => {
    App.init()
})

$taskForm.addEventListener("submit", e => {
    e.preventDefault();

    App.createTask($taskForm["title"].value, $taskForm["description"].value )
})