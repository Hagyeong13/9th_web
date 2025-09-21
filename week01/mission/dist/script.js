"use strict";
const todoInput = document.getElementById('todo-input');
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');
let todos = [];
let doneTasks = [];
const renderTasks = () => {
    todoList.innerHTML = '';
    doneList.innerHTML = '';
    todos.forEach((todo) => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });
    doneTasks.forEach((todo) => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};
const getTodoText = () => {
    return todoInput.value.trim();
};
const addTodoText = (text) => {
    todos.push({ id: Date.now(), text: text });
    todoInput.value = '';
    renderTasks();
};
const compleTodo = (todo) => {
    todos = todos.filter((t) => t.id !== todo.id);
    doneTasks.push(todo);
    renderTasks();
};
const deleteTodo = (todo) => {
    doneTasks = doneTasks.filter((t) => t.id !== todo.id);
    renderTasks();
};
const createTodoElement = (todo, isDone) => {
    const li = document.createElement('li');
    li.classList.add('todo-container__render_item');
    li.textContent = todo.text;
    const button = document.createElement('button');
    button.classList.add('todo-container__render_item_button');
    if (isDone) {
        button.textContent = '삭제';
        button.style.backgroundColor = 'rgba(6, 21, 53, 1)';
        button.style.color = 'white';
        button.style.cursor = 'pointer';
        button.style.borderRadius = '5px';
        button.style.padding = "6px 8px";
        button.style.padding = "4px 8px";
    }
    else {
        button.textContent = '완료';
        button.style.backgroundColor = 'rgba(12, 49, 105, 1)';
        button.style.color = 'white';
        button.style.cursor = 'pointer';
        button.style.borderRadius = '5px';
        button.style.padding = "4px 8px";
    }
    button.addEventListener('click', () => {
        if (isDone) {
            deleteTodo(todo);
        }
        else {
            compleTodo(todo);
        }
    });
    li.appendChild(button);
    return li;
};
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = getTodoText();
    if (text) {
        addTodoText(text);
    }
});
renderTasks();
