import { useState, type FormEvent } from "react";
import type {TTodo} from '../types/todo';

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
                <form onSubmit={handleSubmit} className = 'todo-container__form' id='todo-form'>
                    <h4 className = 'todo-container__form_title'>할 일 추가하기</h4>
                    <div className = 'todo-container__form_button'>
                        <input
                            value={input}
                            onChange={(e)=>setInput(e.target.value)}
                            type="text"
                            id="todo-input"
                            className="todo-container__form_input"
                            required
                        />
                        <button type="submit" className="todo-container__form_submit">추가</button>
                    </div>
                </form>
                <div className="todo-container__render">
                    <div className="todo-container__render_section">
                        <h4 className="todo-container__render_title">할 일</h4>
                        <ul id="todo-list" className="todo-container__render_list">
                            {todos.map((todo)=>(
                                <li key={todo.id} className="todo-container__render_item">
                                    <p className="todo-container__render_item_text">
                                        {todo.text}
                                    </p>
                                    <button onClick={()=>handleComplete(todo)}
                                        style={{
                                            backgroundColor: 'rgba(12, 49, 105, 1)',
                                            color: 'white',
                                            cursor: 'pointer',
                                            borderRadius: '5px',
                                            padding: '4px 8px',
                                        }} 
                                        className="todo-container__render_item_button">완료</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="todo-container__render_section">
                        <h4 className="todo-container__render_title">완료</h4>
                        <ul id="done-list" className="todo-container__render_list">
                            {donetodos.map((todo)=>(
                                <li key={todo.id} className="todo-container__render_item">
                                    <p className="todo-container__render_item_text">
                                        {todo.text}
                                    </p>
                                    <button onClick={()=>handleDelete(todo)}
                                        style={{
                                            backgroundColor: 'rgba(6, 21, 53, 1)',
                                            color: 'white',
                                            cursor: 'pointer',
                                            borderRadius: '5px',
                                            padding: '4px 8px',
                                        }}
                                        className="todo-container__render_item_button">삭제</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo;

