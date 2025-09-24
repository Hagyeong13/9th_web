import { type FormEvent } from "react";

interface TodoFormProps {
    input: string;
    setInput: (input: string) => void;
    handleSubmit: (e:FormEvent<HTMLFormElement>)=>void;
}

const TodoForm = ({input, setInput, handleSubmit}:TodoFormProps) => {
    return (
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
    )
}

export default TodoForm;