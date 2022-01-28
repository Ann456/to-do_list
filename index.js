const inputBtn = document.querySelector('#in');
const addBtn = document.querySelector('#add');
const textField = document.querySelector('#out');
const clearField=document.querySelector('#clear');

addBtn.addEventListener('click', onAddBtnClick);
// clearField.addEventListener('click', onClearBtnClick);

// var array = [];
// if (localStorage.getItem('todo') !== undefined) {
//     array = JSON.parse(localStorage.getItem('todo'));
//     textFieldOut();
// }
// function onAddBtnClick() {
//     let temp = {};
//     temp.todo = inputBtn.value;
//     temp.check = false;
    
//     array.push(temp);
//     textFieldOut();
//     localStorage.setItem('todo', JSON.stringify(array));
// }


// function textFieldOut() {
//     let stringText = '';
//     for (let key in array) {
//         if (array[key].check) {
//             stringText += '<input type="checkbox" checked>';
//         }
//         else {
//             stringText+= '<input type="checkbox">'
//         }
//         // console.log(array[key].todo);
//         stringText += array[key].todo + '<br>';
//     }
//     textField.innerHTML = stringText;
//     console.log(stringText);
//     return stringText;
// }

// function onClearBtnClick() {
//     textField.innerHTML = '';
//     inputBtn.value = '';
//     array = [];
// }


let tasks = [];
let toDoItem = [];

if (!localStorage.getItem('todo-list')) {
    tasks = []
} else {
    tasks = JSON.parse(localStorage.getItem('todo-list'))
}
// !localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('todo-list'));

class Task {
    constructor(params) {
        this.description = params;
        this.completed = false;
    }
}

function createTemplate(task, index) {
    return `
        <div class="todo-item" ${task.completed? 'checked':''}>
            <div class="description">${task.description}</div>
            <div class="buttons">
                <input onclick="completeTask(${index})"class="btn-complete" type="checkbox" ${task.completed? 'checked':''}></input>
                <button onclick="deleteTask(${index})"class="btn-delete"> Delete</button>
            </div>
        </div>
    `
}

// function filterTasks() {
//     const activeTasks = tasks.length && tasks.filter(task => task.completed == false);
//     const comletedTasks = tasks.length && tasks.filter(task => task.completed == true);
//     tasks = [...activeTasks,...comletedTasks];
// }

function fillHTMLList() {
    textField.innerHTML = '';
    if (tasks.length > 0) {
        // filterTasks();
        tasks.forEach((task, index) => {
            textField.innerHTML += createTemplate(task, index);
        });
        todoItemAll = document.querySelectorAll('.todo-item');
    }
}

fillHTMLList();

function updateLocalStorage() {
    localStorage.setItem('todo-list', JSON.stringify(tasks));
}

function onAddBtnClick () {
    tasks.push(new Task(inputBtn.value));
    updateLocalStorage();
    fillHTMLList();
    inputBtn.value='';
};

function completeTask(index) {
    console.log(index);
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        todoItemAll[index].classList.add('checked');
        todoItemAll[index].style.backgroundColor=pink;
    } else {
        todoItemAll[index].classList.remove('checked');
        todoItemAll[index].style.backgroundColor=pink;
    }
    updateLocalStorage();
    fillHTMLList();
}

function deleteTask(index) {
    todoItemAll[index].classList.add('delition');
    setTimeout(() => {
         tasks.splice(index, 1);
    updateLocalStorage();
    fillHTMLList();
    }, 500)
    // console.log(index);
}
