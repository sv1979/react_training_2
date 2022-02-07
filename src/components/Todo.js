import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons'

const Todo = ({ todo, removeTodo, callUpdateForm }) => (
    <div className="todoItem">
        <span className="todoText">{todo.text}</span>
        <button className="styledButton removeButton todoButton" onClick={() => removeTodo(todo.id)}>
            <FontAwesomeIcon icon={faTimes} />
        </button>
        <button className="styledButton editButton todoButton" onClick={() => callUpdateForm(todo)}>
            <FontAwesomeIcon icon={faEdit} />
        </button>
    </div>
);

export default Todo;