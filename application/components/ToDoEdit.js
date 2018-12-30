'use strict';
import styles from '../styles/styles';
import t  from 'tcomb-form-native';
import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
var Form = t.form.Form;
var uuid = require('uuid');
const tempId = uuid.v1();
const tempDate = new Date();

var ToDo = t.struct({txt: t.Str, complete: t.Bool, id: t.maybe(t.String), createdAt: t.maybe(t.Date)});

var options = {
    fields: {
        txt: {
            label: 'To-Do Item',
            placeholder: 'enter a to do item here',
            autoFocus: true
        },
        id: {
            hidden: true
        },
        createdAt: {
            hidden: true
            // defaultValueText: tempDate
        }
    }
};

class ToDoEdit extends React.Component {
    constructor() {
        super();
        this.onUpdate = this.onUpdate.bind(this);
        this.state = {
            rowValues: {
                id: tempId, 
                createdAt: tempDate
            }
        }
    }

    onUpdate() {
        var value = this.refs.form.getValue();
        const { navigation } = this.props;
        // let tempObj = value
        // tempObj['index'] = Math.random()
        // console.log('====================================');
        // console.log("VLUE: " ,navigation.state);
        // console.log('====================================');
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
