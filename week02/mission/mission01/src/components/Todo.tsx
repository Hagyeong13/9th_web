import { useState, type FormEvent } from "react";
import type {TTodo} from '../types/todo';
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const Todo = () => {
    const [todos,setTodos]=useState<TTodo[]>([]);
    const [donetodos,setDoneTodos]=useState<TTodo[]>([]);
    const [input,setInput]=useState<string>('');

    const handleSubmit = (e:FormEvent<HTMLFormElement>):void => {
        e.preventDefault(); //새로고침 방지
        const text=input.trim(); //띄어쓰기 잘라내기

        if(text){
            const newTodo : TTodo = {id:Date.now(), text:text}
            setTodos((prevTodos):TTodo[]=>[...prevTodos,newTodo]);
            setInput('');
        }
    }

    const handleComplete = (todo:TTodo) => {
        setTodos(prevTodos=>prevTodos.filter((t)=>t.id!==todo.id));
        setDoneTodos((prevDoneTodos):TTodo[]=>[...prevDoneTodos,todo]);
    };

    const handleDelete = (todo:TTodo) => {
        setDoneTodos(prevTodos=>prevTodos.filter((t)=>t.id!==todo.id));
    };

    return (
        <>
            <h1 className='todo-container__header'>[TO-DO LIST]</h1>
            <div className = 'todo-container'>
                <TodoForm input={input} setInput={setInput} handleSubmit={handleSubmit} />
                <div className="todo-container__render">
                    <TodoList
                        title='할 일'
                        todos={todos}
                        buttonLabel='완료'
                        backgroundColor= 'rgba(12, 49, 105, 1)'
                        color='white'
                        cursor='pointer'
                        borderRadius='5px'
                        padding='4px 8px'
                        onClick={handleComplete}
                    />
                    <TodoList
                        title='완료'
                        todos={donetodos}
                        buttonLabel='삭제'
                        backgroundColor='rgba(6, 21, 53, 1)'
                        color='white'
                        cursor='pointer'
                        borderRadius='5px'
                        padding='4px 8px'
                        onClick={handleDelete}
                    />
                </div>
            </div>
        </>
    )
}

export default Todo;

