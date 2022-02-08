import React, { Component } from 'react';
import Todo from './Todo';
import TodoCreateForm from './TodoCreateForm';
import TodoUpdateForm from './TodoUpdateForm';

const uuidv4 = require('uuid/v4');

class Todolist extends Component {

    state = {
        todos: [],
        editingTodoId: null,
        active: 0,
        view_size: 7
    }

    setTodos = todos => this.setState({ todos });
    setEditingTodoId = id => this.setState({ editingTodoId: id });

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

    getData = () => {
        if (this.state.todos.length < 1) return [];
        return this.getCentralView(this.state.todos)
    }

    getCentralView = (data) => {
        let view_size = this.state.todos.length ? this.state.todos.length : 1;

        if (view_size % 2 === 0) {
            view_size += 1;
        }

        let arr = [...Array(view_size)];
        const active_index = this.state.active;

        const central_point = (view_size - 1) / 2;
        arr[central_point] = data[active_index];
        if (view_size > 1) {
            for (var i = 1; i < central_point + 1; i++) {
                arr[central_point + i] = this.getNextItem(data, active_index, i)
                arr[central_point - i] = this.getPrevItem(data, active_index, i)
            }
        }
        return arr
    }

    getPrevItem = (data, index, iteration) => {
        const data_length = data.length;
        let getIndexFromData = index - iteration;
        while (getIndexFromData < 0) {
            getIndexFromData += data_length;
        }
        return data[getIndexFromData]
    }

    getNextItem = (data, index, iteration) => {
        const data_length = data.length;
        let getIndexFromData = index + iteration;
        while (getIndexFromData >= data_length) {
            getIndexFromData -= data_length;
        }
        return data[getIndexFromData]
    }

    goDown = () => {
        let active = 0
        if (this.state.active < this.state.todos.length - 1) {
            active = this.state.active + 1;
        }
        this.setState({ active });
    }

    goUp = () => {
        let active = this.state.todos.length - 1
        if (this.state.active > 0) {
            active = this.state.active - 1;
        }
        this.setState({ active });
    }

    wheelOnBox = (event) => {
        if (event.nativeEvent.wheelDelta > 0) {
            this.goUp()
        } else {
            this.goDown()
        }
    }

    getIndex = (str) => {
        return "button_class_" + this.state.todos.find(el => el.id === str)
    }

    render() {
        const { todos, editingTodoId } = this.state;
        const editingTodo = todos.find((el) => el.id === editingTodoId);

        return (
            <div className="todoBox">
                <span className="introText">
                    We have {todos ? todos.length : '--'} items to do.
                </span>

                {/* <ol className="todoList">
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
                </ol> */}

                <div className="function_box">
                    <ol onWheel={(e) => this.wheelOnBox(e)}>
                        {this.getData().map((data_item) => (
                            <li key={uuidv4()} data-key={uuidv4()}>
                                {/* <button className={this.getIndex(data_item.id)}>{data_item.text}</button> */}
                                <Todo
                                    index={data_item.id}
                                    todo={data_item}
                                    removeTodo={this.removeTodo}
                                    updateTodo={this.updateTodo}
                                    callUpdateForm={this.callUpdateForm}
                                />
                            </li>
                        ))}
                    </ol>
                    {todos.length > 1 &&
                        <>
                            <button onClick={() => this.goUp()}>Up</button>
                            <button onClick={() => this.goDown()}>Down</button>
                        </>
                    }

                </div>

                {editingTodoId ?
                    <TodoUpdateForm updateTodo={this.updateTodo} todo={editingTodo} />
                    :
                    <TodoCreateForm addTodo={this.addTodo} />
                }
                <hr />
            </div>
        );
    }
}

export default Todolist;
