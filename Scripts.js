const inputElement = document.querySelector(".new-task-input"),
  addTaskButton = document.querySelector(".new-task-button"),
  tasksContainer = document.querySelector(".tasks-container"),
  validateInput = () => 0 < inputElement.value.trim().length,
  handleAddTask = () => {
    const a = validateInput();
    if ((console.log(a), !a)) return inputElement.classList.add("error");
    const b = document.createElement("div");
    b.classList.add("task-item");
    const c = document.createElement("p");
    (c.innerText = inputElement.value),
      c.addEventListener("click", () => handleClick(c));
    const d = document.createElement("i");
    d.classList.add("far"),
      d.classList.add("fa-trash-alt"),
      d.addEventListener("click", () => handleDeleteClick(b, c)),
      b.appendChild(c),
      b.appendChild(d),
      tasksContainer.appendChild(b),
      (inputElement.value = ""),
      updateLocalStorage();
  },
  handleClick = (a) => {
    const b = tasksContainer.childNodes;
    for (const c of b) {
      const b = c.firstChild.isSameNode(a);
      b && c.firstChild.classList.toggle("completed");
    }
    updateLocalStorage();
  },
  handleDeleteClick = (a, b) => {
    const c = tasksContainer.childNodes;
    for (const d of c) {
      const c = d.firstChild.isSameNode(b);
      c && a.remove();
    }
    updateLocalStorage();
  },
  handleInputChange = () => {
    const a = validateInput();
    if (a) return inputElement.classList.remove("error");
  },
  updateLocalStorage = () => {
    const a = tasksContainer.childNodes,
      b = [...a].map((a) => {
        const b = a.firstChild,
          c = b.classList.contains("completed");
        return { description: b.innerText, isCompleted: c };
      });
    localStorage.setItem("tasks", JSON.stringify(b));
  },
  refreshTasksUsingLocalStorage = () => {
    const a = JSON.parse(localStorage.getItem("tasks"));
    if (a)
      for (const b of a) {
        const a = document.createElement("div");
        a.classList.add("task-item");
        const c = document.createElement("p");
        (c.innerText = b.description),
          b.isCompleted && c.classList.add("completed"),
          c.addEventListener("click", () => handleClick(c));
        const d = document.createElement("i");
        d.classList.add("far"),
          d.classList.add("fa-trash-alt"),
          d.addEventListener("click", () => handleDeleteClick(a, c)),
          a.appendChild(c),
          a.appendChild(d),
          tasksContainer.appendChild(a);
      }
  };
refreshTasksUsingLocalStorage(),
  addTaskButton.addEventListener("click", () => handleAddTask()),
  inputElement.addEventListener("change", () => handleInputChange());
