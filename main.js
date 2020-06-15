const tasks = getTasksFromLocalStorage();
const TaskBoardEl = document.querySelector("#TaskBoard");
const colors = ["#90EE90", "#FFB6C1", "#FFA07A", "#20B2AA", "#87CEFA", "#B0C4DE	", "#DEB887", "#E9967A", "#ADFF2F", "#DA70D6", "#DB7093", "#FF7F50"];
var counter = 0;

function main() {
    let formEl = document.querySelector("#add-task-form");
    formEl.addEventListener("submit", onAddTask);
    renderAllTasks();
}

main();

function onAddTask(e) {
    e.preventDefault();
    const formEl = e.target;
    const TaskContent = formEl.content.value.trim();
    const TaskDate = formEl.date.value;
    const TaskHour = formEl.hour.value;

    const task = {
        id: counter,
        content: TaskContent,
        date: TaskDate,
        hour: TaskHour,
    };


    const validationErrors = validateTask(task);
    if (validationErrors === 0) {
        addTask(task);
        formEl.reset();
    }
}

focusMethod = function getFocus() {
    document.getElementById("task").focus();
}

function validateTask(task) {
    let flag = 0;
    contentError = document.querySelector('#contentError');
    dateError = document.querySelector('#dateError');
    if (task.content === "") {
        contentError.innerHTML = 'Task content is required!';
        flag = 1;
    }
    if (task.date === "") {
        dateError.innerHTML = 'Task date is required!';
        flag = 1;
    }
    if (!flag) {
        contentError.innerHTML = '';
        dateError.innerHTML = '';
    }
    return flag;
}



function createTaskComponent(task) {
    const componentEl = document.createElement("div");
    componentEl.classList.add("taskCard");

    componentEl.style.backgroundColor = randomColor();

    componentEl.innerHTML = `
    <header class="taskHeader">
    
    <button class="delete-btn"style="font-size:24px">x</button>
    </header>
    <div class="taskDetails"> 
    <p class="taskParagraph">${task.content}</p>
    <div class="taskDate">${task.date}</div >
    <div  class="taskHour">${task.hour}</div ></div>
    
    <div class="taskTools">
    <button class="boldBtn" style="font-size:12px" >B</button>
    <button class="italicBtn" style="font-size:12px">/</button>
    <button class="underlineBtn" style="font-size:12px">U</button>
    <button class="deletedBtn" style="font-size:12px">-</button>
    </div>
    `

    const deleteBtn = componentEl.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
        deleteTask(task, componentEl);
    });
    componentEl.addEventListener('mouseenter', function () {
        deleteBtn.classList.add('show');
    })
    componentEl.addEventListener('mouseleave', function () {
        deleteBtn.classList.remove('show');
    })

    const boldBtn = componentEl.querySelector(".boldBtn");
    const italicBtn = componentEl.querySelector(".italicBtn");
    const underlineBtn = componentEl.querySelector(".underlineBtn");
    const deletedBtn = componentEl.querySelector(".deletedBtn");
    const taskParagraph = componentEl.querySelector(".taskParagraph");

    boldBtn.addEventListener("click", function (e) {
        taskParagraph.classList.toggle('bold');
        boldBtn.classList.toggle('clicked');
    });


    italicBtn.addEventListener("click", function () {
        taskParagraph.classList.toggle('italic');
        italicBtn.classList.toggle('clicked');
    });

    underlineBtn.addEventListener("click", function () {
        taskParagraph.classList.toggle('underline');
        underlineBtn.classList.toggle('clicked');
    });

    deletedBtn.addEventListener("click", function () {
        taskParagraph.classList.toggle('delete');
        deletedBtn.classList.toggle('clicked');
    });


    return componentEl;

}
function deleteTask(task, tasktEll) {
    // delete task from state
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === task.id) {
            tasks.splice(i, 1);
            saveTasksToLocalStorage();
            break;
        }
    }
    // remove task from page
    tasktEll.remove();

}

function addTask(task) {
    if (tasks.length === 0) {
        counter = 1;
        task.id = counter;
    }
    tasks.push(task);
    saveTasksToLocalStorage();
    const taskEl = createTaskComponent(task);
    TaskBoardEl.appendChild(taskEl);
    taskEl.classList.add('fade-in');
    counter++;
}

function saveTasksToLocalStorage() {
    let tasksString = JSON.stringify(tasks);
    localStorage.setItem("tasks", tasksString);
}

function getTasksFromLocalStorage() {
    let tasksString = localStorage.getItem("tasks");
    const taskParse = JSON.parse(tasksString) || [];
    return taskParse;
}



function renderAllTasks() {
    for (let i = 0; i < tasks.length; i++) {
        const taskEl = createTaskComponent(tasks[i]);
        TaskBoardEl.appendChild(taskEl);
        taskEl.classList.add('fade-in');
        counter = tasks[i].id;
    }
    counter++;
}

function randomColor() {
    const colorIndex = Math.floor(Math.random() * colors.length);
    const color = colors[colorIndex]
    return color;
}


