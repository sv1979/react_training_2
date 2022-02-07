import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'

function TodoCreateForm({ addTodo, preset = "" }) {

    const [value, setValue] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue("");
      };
    
    return (
        <form onSubmit={handleSubmit}>
            <fieldset className="formFieldset">
                <legend>Add item</legend>
                <div className="formPiece">
                    <input
                        type="text"
                        className="input"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button type="submit" className="styledButton submitButton">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </fieldset>
        </form>
    );
}

export default TodoCreateForm;
