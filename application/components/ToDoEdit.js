'use strict';
import styles from '../styles/styles';
import t  from 'tcomb-form-native';
import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
var Form = t.form.Form;
var uuid = require('uuid');

var ToDo = t.struct({txt: t.Str, complete: t.Bool, id: t.maybe(t.String), createdAt: t.maybe(t.Str)});

var options = {
    fields: {
        txt: {
            label: 'To-Do Item',
            placeholder: 'enter a to do item here',
            autoFocus: true
        },
        id: {
            hidden: false,
            editable: false
        },
        createdAt: {
            hidden: false,
            editable: false
        }
    }
};

class ToDoEdit extends React.Component {
    constructor() {
        super();
        this.onUpdate = this.onUpdate.bind(this);
        this.state = {
            rowValues: {
                txt: '',
                id: uuid.v1(), 
                createdAt: new Date().valueOf().toString()
            }
        }
    }

    componentDidMount(){
        let { item } = this.props.navigation.state.params;
        console.log('====================================');
        console.log("VaLUE: " ,item);
        console.log('====================================');
        this.setState({
            rowValues: {
                txt: (item.txt) ? item.txt : '',
                id: (item.id) ? item.id : uuid.v1(), 
                createdAt: (item.createdAt) ? item.createdAt : new Date().valueOf().toString()
            }
        })
    }

    onUpdate() {
        var value = this.refs.form.getValue();
        const { navigation } = this.props;
        if (value) {
            navigation.state.params.update(value, navigation.state.params.id, this);
        }
    }

    render() {
        return (
            <View style={styles.todo}>
                <Form
                    ref="form"
                    type={ToDo}
                    onChange={this._onChange}
                    options={options}
                    value={this.state.rowValues}/>
                <TouchableHighlight
                    style={[styles.button, styles.saveButton]}
                    onPress={this.onUpdate}
                    underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
            </View>
        )
    }
}


export default ToDoEdit;
