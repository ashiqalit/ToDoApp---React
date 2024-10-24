import { useEffect, useRef, useState } from "react"

function TODOList({ todos, setTodos }) {
    return (
        <ol className="todo_list">
            {todos && todos.length > 0 ? (
                todos?.map((item, index) => (
                    <Item key={index} item={item} todos={todos} setTodos={setTodos} />
                ))
            ) : (
                <p>Seems lonely in here, what are you up to?</p>
            )}
        </ol>
    )
}

function Item({ item, setTodos, todos }) {
    const [editing, setEditing] = useState(false)
    const inputRef = useRef(null)
    const completeTodo = () => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === item.id
                    ? { ...todo, is_completed: !todo.is_completed }
                    : todo
            ))
    }
    const updatedTodos = JSON.stringify(todos);
    localStorage.setItem("todos", updatedTodos)
    const handleEdit = () => {
        setEditing(true)
    }
    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();

            inputRef.current.setSelectionRange(
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
                todo.id === item.id ? {...todo, title: e.target.value} : todo
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
                        <svg fill={item.is_completed ? "#22C55E" : "#0d0d0d"}>
                            <circle cx="11.998" cy="11.998" fillRule="nonzero" r="9.998" />
                        </svg>
                        <p style={item.is_completed ? { textDecoration: "line-through" } : {}}>
                            {item?.title}
                        </p>
                    </button>
                    <div className="todo_items_right">
                        <button onClick={handleEdit}>
                            <span className="visually-hidden">Edit</span>
                        </button>
                        <button onClick={handleDelete}> 
                            <span className="visually-hidden">Delete</span>
                        </button>
                    </div>
                </>
            )}
        </li>
    )
}

export default TODOList

