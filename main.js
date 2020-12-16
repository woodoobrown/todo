
import localDB from './localDB.js';

(function () {

    let todos = [];
    // Parts of date.
    const bodyDay = document.querySelector('.body__day');
    const bodyDate = document.querySelector('.body__date');
    const todoAddBtn = document.querySelector('.todo__btn');
    const todoInput = document.querySelector('.todo__input');
    const todoListPending = document.querySelector('.todo__list--pending');
    const pendingItems = document.querySelector('.todo__number');
    

    const dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    // Initialize application.
    const init = () => {
        showDate();
        setListeners();
        loadExistingTodos();
    };
    // Load existing todos.
    const loadExistingTodos = () => {
        const savedTodos = localDB.getItem('todos');
        if (savedTodos) {
            todos = savedTodos;
        }
        if (todos && Array.isArray(todos)) {
            todos.forEach(todo => showTodo(todo));
        }
        showPending();
    };
    // Show date.
    const showDate = () => {
        const currentDate = new Date();
        const day = [
            currentDate.getMonth() + 1,
            currentDate.getDate(),
            currentDate.getFullYear(),
        ].map(num => num < 10 ? `0${num}` : num);
        bodyDate.textContent = day.join('-');
        bodyDay.textContent = dayNames[currentDate.getDay()];
    };
    // Set event listeners.
    const setListeners = () => {
        todoAddBtn.addEventListener('click', addNewTodo);
    };
    // Save and add todo to the database.
    const addNewTodo = () => {
        const value = todoInput.value;
        if (value === '') {
            alert('Input field is empty');
            return;
        }
        const todo = {
            text: value,
            done: false
        }

        todos.push(todo);
        localDB.setItem('todos', todos);

        showTodo(todo);
        showPending();
        todoInput.value = '';
    };
    // Show todo in the list.
    const showTodo = todo => {
        const todoItem = document.createElement('div');
        todoListPending.appendChild(todoItem);

        todoItem.innerHTML = `
                <input type="checkbox">
                <span>${todo.text}</span>
                <button class="todo__remove">
                    <i class="fa fa-trash"></i>
                </button>
            `;
    };
    // Show todo number.
    // const showTodoNumber = (todos) => {
    //     const showNumber = todos.length;

    //     todoNumber.innerHTML = `${showNumber}`;
    // };

    // Count pending todos
    const showPending = () => {
        const pendingsNum = todos.filter(todo => !todo.done).length;
        pendingItems.textContent = pendingsNum;
    };
    


    init();
})();

