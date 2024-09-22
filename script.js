const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const filterInput = document.getElementById("filter-input"); 


function addTask() {
  const task = inputBox.value.trim();
  if (!task) {
    alert("Please write down a task");
    return;
  }
  const li = document.createElement("li");

  li.innerHTML = `
      <label>
        <input type="checkbox">
        <span>${task}</span>
      </label>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</spbuttonan>`;

  listContainer.appendChild(li);
  inputBox.value = "";

  const checkbox = li.querySelector("input");
  const editBtn = li.querySelector(".edit-btn");
  const taskSpan = li.querySelector("span");
  const deleteBtn = li.querySelector(".delete-btn");

  checkbox.addEventListener("click", function () {
    li.classList.toggle("completed", checkbox.checked);
    //add the function below
    updateCounters();
  });

  editBtn.addEventListener("click", function () {
    const update = prompt("Edit task:", taskSpan.textContent);
    if (update !== null) {
      taskSpan.textContent = update;
      li.classList.remove("completed");
      //add the code below
      checkbox.checked = false;
      updateCounters();
    }
  });

  deleteBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete this task?")) {
      li.remove();
      updateCounters();
    }
  });

  updateCounters();
}


// Функция фильтрации задач по тексту
filterInput.addEventListener("input", function() {
    const filterText = filterInput.value.toLowerCase();
    const tasks = listContainer.querySelectorAll("li");

    tasks.forEach(task => {
        const taskText = task.querySelector("span").textContent.toLowerCase();
        task.style.display = taskText.includes(filterText) ? "" : "none";
    });
});

// Обработчик события для клавиатуры
inputBox.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});


const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

function updateCounters() {
  const completedTasks = document.querySelectorAll(".completed").length;
  const uncompletedTasks =
    document.querySelectorAll("li:not(.completed)").length;

  completedCounter.textContent = completedTasks;
  uncompletedCounter.textContent = uncompletedTasks;
}