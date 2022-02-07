import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

function TodoUpdateForm({ updateTodo, todo = {} }) {

    const [value, setValue] = useState(todo.text);

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        updateTodo(value);
        setValue("");
      };
    
    return (
        <form onSubmit={handleSubmit}>
            <fieldset className="formFieldset">
                <legend>Edit item</legend>
                <div className="formPiece">
                    <input
                        type="text"
                        className="input"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button type="submit" className="styledButton submitButton">
                        <FontAwesomeIcon icon={faSave} />
                    </button>
                </div>
            </fieldset>
        </form>
    );
}

export default TodoUpdateForm;
