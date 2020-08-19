// selector
todoInput = document.querySelector('.todo__input');
todoBtnAdd = document.querySelector('.todo__btn');
todoListEle = document.querySelector('.todo__list');
todoFilter = document.querySelector('.todo-filter');

// todoItem = document.querySelector('.todo__item');

// events

todoBtnAdd.addEventListener("click", addTodo);
todoListEle.addEventListener("click", actionOnItem);
todoFilter.addEventListener("click", filterTodo);

// functions

let todoList = [];

function addTodo(e) {
    e.preventDefault();

    if(todoInput.value == "") {
        return;
    }

    const todoItemLi = document.createElement('li');
    todoItemLi.classList.add('todo__item');

    const todoDetail = document.createElement('div');
    todoDetail.classList.add('todo__input');
    todoDetail.innerText = todoInput.value;
    todoItemLi.appendChild(todoDetail);

    const todoActions = document.createElement('div');
    todoActions.classList.add('action-container');
    todoActions.innerHTML = `
                    <button class="btn--view"><i class="far fa-eye"></i></button>
                    <button class="btn--done"><i class="fas fa-check"></i></button>
                    <button class="btn--delete"><i class="fas fa-times"></i></button>`;
    todoItemLi.appendChild(todoActions);


    todoListEle.appendChild(todoItemLi);
    todoInput.value = "";
}

function actionOnItem(e) {
    let itemClicked = e.target;
    if (itemClicked.classList[0] === 'btn--delete') {
        const todoItem = itemClicked.parentElement.parentElement;
        todoItem.classList.add('fall');
        todoItem.addEventListener('transitionend', () => {
            todoItem.remove();
        })
    }

    if (itemClicked.classList[0] === 'btn--done') {
        const todoItem = itemClicked.parentElement.parentElement;
        todoItem.classList.toggle('completed');
    }

    if (itemClicked.classList[0] === 'btn--view') {
        const todoItem = itemClicked.parentElement.parentElement;
        // todoItem.classList.toggle('finish');
        // todo: something like module/popup
    }
}

function filterTodo(e) {
    console.log(e);
    const todoList = todoListEle.childNodes;
    console.log(todoList);
    todoList.forEach(todoItem => {
        console.log(todoItem);
        if (todoItem.classList && todoItem.classList.contains('todo__item')) {
            switch(e.target.value) {
                case "all":
                    todoItem.style.display = 'flex';
                    break;
                case "completed":
                    if (todoItem.classList.contains('completed')) {
                        todoItem.style.display = 'flex';
                    } else {
                        todoItem.style.display = 'none';
                    }
                    break;
                case "uncompleted":
                    if (!todoItem.classList.contains('completed')) {
                        todoItem.style.display = 'flex';
                    } else {
                        todoItem.style.display = 'none';
                    }
                    break;
            }
        }
    });
}