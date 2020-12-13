(function () {

    let todos = [];
    // Parts of date.
    const bodyDay = document.querySelector('.body__day');
    const bodyDate = document.querySelector('.body__date');
    const todoAddBtn = document.querySelector('.todo__btn');
    const todoInput = document.querySelector('.todo__input');
    const todoListPending = document.querySelector('.todo__list--pending');
    const todoNumber = document.querySelector('.todo__number');
    const clearAllBtn = document.querySelector('.footer__btn--clear');

    const dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    // Local storage handler object.
    let localDB = {
        // localDB.setItem('todos', todos);
        setItem(key, value) {
            value = JSON.stringify(value);
            localStorage.setItem(key, value);
        },
        // console.log(localDB.getItem('todos'));
        getItem(key) {
            const value = localStorage.getItem(key);
            if (!value) {
                return null;
            }
            return JSON.parse(value);
        },
        // localDB.removeItem('todos');
        removeItem(key) {
            localStorage.removeItem(key);
        }
    };
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

        showTodoNumber(todos);
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
        clearAllBtn.addEventListener('click', clearTodos);
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
        todoInput.value = '';
        showTodoNumber(todos);
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
    const showTodoNumber = (todos) => {
        const showNumber = todos.length;

        todoNumber.innerHTML = `${showNumber}`;
    };
    // Clear all todos.
    const clearTodos = (todos) => todos.length = 0;


    init();
})();

