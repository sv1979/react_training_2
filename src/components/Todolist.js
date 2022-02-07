import React, { Component } from 'react';
import Todo from './Todo';
import TodoCreateForm from './TodoCreateForm';
import TodoUpdateForm from './TodoUpdateForm';

const uuidv4 = require('uuid/v4');

class Todolist extends Component {

    state = {
        todos: [],
        editingTodoId: null
    }
   
    setTodos = todos => this.setState({todos});
    setEditingTodoId = id => this.setState({editingTodoId: id});

    addTodo = (text) => {
        const newTodos = [...this.state.todos, { id: uuidv4(), text }];
        this.setTodos(newTodos)
    };

    updateTodo = (todotext) => {
        const indexForEditing = this.state.todos.findIndex((el) => {
            return el.id === this.state.editingTodoId;
        });
        if (indexForEditing > -1) {
            const alteredTodos = this.state.todos;
            alteredTodos[indexForEditing].text = todotext;
            this.setTodos(alteredTodos);
        }
        this.setEditingTodoId(null);
    };

    callUpdateForm = (todo) => {
        this.setEditingTodoId(todo.id);
    };

    removeTodo = (id) => {
        const newTodos = this.state.todos.filter((el) => {
            return el.id !== id;
        });
        this.setTodos(newTodos)
    };

    render() {
        const { todos, editingTodoId } = this.state;
        const editingTodo = todos.find((el) => el.id === editingTodoId);

        return (
            <div className="todoBox">
                <span className="introText">
                    We have {todos ? todos.length : '--'} items to do.
                </span>
            
                <ol className="todoList">
                    {todos.map((todo) => (
                    <li key={todo.id}>
                        <Todo                        
                            index={todo.id}
                            todo={todo}
                            removeTodo={this.removeTodo}
                            updateTodo={this.updateTodo}
                            callUpdateForm={this.callUpdateForm}
                        />
                    </li>
                    ))}
                </ol>
                {editingTodoId ?                 
                    <TodoUpdateForm updateTodo={this.updateTodo} todo={editingTodo}/>  
                    : 
                    <TodoCreateForm addTodo={this.addTodo}/> 
                }                       
                <hr/>
            </div>
        ); 
    }
}

export default Todolist;
