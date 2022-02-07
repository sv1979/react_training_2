import React, { Component } from 'react';

const uuidv4 = require('uuid/v4');

export class FunctionBox extends Component {
    state = {
        mock_data: [
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday'
        ],
        active: 0
    }

    getData = () => {
        return this.getCentralView(this.state.mock_data, 7)
    }

    getCentralView = (data, view_size) => {
        if (!view_size || view_size < 0) {
            return [];
        }

        if (view_size % 2 === 0) {
            view_size+=1;
        }

        let arr = [...Array(view_size)];
        const active_index = this.state.active;
        
        const central_point = (view_size - 1) / 2;
        arr[central_point] = data[active_index];
        if (view_size > 1) {
            for (var i = 1; i < central_point + 1 ; i++) {
                arr[central_point + i] = this.getNextItem(data, active_index, i)
                arr[central_point - i] = this.getPrevItem(data, active_index, i)
            }
        }
        return arr
    }

    getPrevItem = (data, index, iteration) => {
        const data_length = data.length;
        let getIndexFromData = index-iteration;
        while(getIndexFromData < 0) {
            getIndexFromData += data_length;
        }
        return data[getIndexFromData]
    }

    getNextItem = (data, index, iteration) => {
        const data_length = data.length;
        let getIndexFromData = index+iteration;
        while(getIndexFromData >= data_length) {
            getIndexFromData -= data_length;
        }
        return data[getIndexFromData]
    }

    goDown = () => {
        let active = 0
        if (this.state.active < this.state.mock_data.length - 1) {
            active = this.state.active + 1;
        }
        this.setState({active});
    }

    goUp = () => {
        let active = this.state.mock_data.length - 1
        if (this.state.active > 0) {
            active = this.state.active - 1;
        }
        this.setState({active});
    }

    selectItem = (str) => {
        let active = this.state.mock_data.indexOf(str)
        this.setState({active});
    }

    getIndex = (str) => {
        return "button_class_" + this.state.mock_data.indexOf(str)
    }

    render(){
        return (
            <div className="function_box">
                <ol>
                    {this.getData().map((data_item) => (
                        <li key={uuidv4()} data-key={uuidv4()}>
                            <button className={this.getIndex(data_item)} onClick={() => this.selectItem(data_item)}>{data_item}</button>
                        </li>
                    ))}
                </ol>
                <button onClick={() => this.goUp()}>Up</button>
                <button onClick={() => this.goDown()}>Down</button>
            </div>
        );        
    } 
}

export default FunctionBox;