import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle as faRegularCircle, faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faCircle as faSolidCircle } from '@fortawesome/free-solid-svg-icons'

function Item({ item, setTodos, todos }) {
    const [editing, setEditing] = useState(false) 
    const inputRef = useRef(null)
    const completeTodo = () => { //Toggling between task completed or not
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === item.id
                    ? { ...todo, is_completed: !todo.is_completed }
                    : todo
            ))
    }
    const updatedTodos = JSON.stringify(todos); //Storing to local storage
    localStorage.setItem("todos", updatedTodos)

    const handleEdit = () => { //Editing the title
        setEditing(true)
    }
    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();

            inputRef.current.setSelectionRange( //Set curson at end of the text
                inputRef.current.value.length,
                inputRef.current.value.length
            )
        }
    }, [editing],)
    
    const handleInpuSubmit = (event) => {
        event.preventDefault();
        const updatedTodos = JSON.stringify(todos);
        localStorage.setItem("todos", updatedTodos)
        setEditing(false);
    };
    const handleInputBlur = () => {
        const updatedTodos = JSON.stringify(todos);
        localStorage.setItem("todos", updatedTodos);
        setEditing(false)
    }
    const handleInputChange = (e) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === item.id ? { ...todo, title: e.target.value } : todo
            )
        )
    }
    const handleDelete = () => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== item.id));
        const updatedTodos = JSON.stringify(
            todos.filter((todo) => todo.id !== item.id)
        );
        localStorage.setItem("todos", updatedTodos)
    }
    return (
        <li id={item?.id} className="todo_item">
            {editing ? (
                <form className="edit-form" onSubmit={handleInpuSubmit}>
                    <label htmlFor="edit-todo">
                        <input
                            ref={inputRef}
                            type="text"
                            name="edit-todo"
                            id="edit-todo"
                            defaultValue={item?.title}
                            onBlur={handleInputBlur}
                            onChange={handleInputChange}
                        />
                    </label>
                </form>
            ) : (
                <>
                    <button className="todo_items_left" onClick={completeTodo}>
                        <FontAwesomeIcon
                            icon={item.is_completed ? faSolidCircle : faRegularCircle}
                            style={{ color: item.is_completed ? "#22C55E" : '#22C55E' }}
                        />
                        <p style={item.is_completed ? { textDecoration: "line-through" } : {}}>
                            {item?.title}
                        </p>
                    </button>
                    <div className="todo_items_right">
                        <button onClick={handleEdit}>
                            <span className="visually-hidden">Edit</span>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button onClick={handleDelete}>
                            <span className="visually-hidden">Delete</span>
                            <FontAwesomeIcon icon={faTrashCan} id='delete-btn' />
                        </button>
                    </div>
                </>
            )}
        </li>
    )
}

export default Item