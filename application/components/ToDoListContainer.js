import styles from '../styles/styles'
import ToDoList from './ToDoList';
import ToDoEdit from './ToDoEdit';
import React from 'react';
import { Text, View, ListView, TouchableHighlight, AlertIOS } from 'react-native';
import * as firebase from 'firebase';
let _this = null;

var config = {
    apiKey: "apiKey",
    authDomain: "projectId.firebaseapp.com",
    databaseURL: "https://databaseName.firebaseio.com",
    storageBucket: "bucket.appspot.com"
};
firebase.initializeApp(config);

const databaseRef = (ref) => {
    if (ref) {
        return firebase.database().ref(ref)
    } else {
        return firebase.database().ref()
    }
}
// Get a reference to the database service

class ToDoContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            items: []
        };
        // this.databaseRef = firebase.database().ref();
        _this = this;
        this.alertMenu = this.alertMenu.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.openItem = this.openItem.bind(this);
        this.getItems = this.getItems.bind(this);
    }

    getItems() {
        databaseRef('notes').orderByChild('createdAt').once('value', (snap) => {
            this.setState({ items: snap.val() });
        });
    }

    componentWillMount() {
        this.getItems()
    }

    alertMenu(rowData, rowID) {
        AlertIOS.alert(
            'Quick Menu',
            null,
            [
                { text: 'Delete', onPress: () => this.deleteItem(rowData, rowID) },
                { text: 'Edit', onPress: () => this.openItem(rowData, rowID) },
                { text: 'Cancel' }
            ]
        )
    }

    deleteItem(data, index) {
        console.log("-___---->", data);

        databaseRef('notes').child(data.id).remove().then(function () {
            _this.getItems()
            alert("Remove succeeded.")
        })
            .catch(function (error) {
                alert("Remove failed: " + error.message)
            });
    }

    updateItem(item, index, instance) {
        databaseRef('notes/').child(item.id).set({
            txt: item.txt,
            id: item.id,
            createdAt: item.createdAt,
            complete: item.complete
        });
        this.getItems()
        instance.props.navigation.goBack();
    }

    openItem(rowData, rowID) {
        this.props.navigation.navigate('ToDoEdit', {
            item: rowData,
            id: rowID,
            update: this.updateItem
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {
                    (this.state.items.length <= 0) ?
                        <View style={styles.mainView}>
                            <Text style={styles.noDataText}>No Data Available</Text>
                        </View>
                        :
                        <ToDoList
                            items={this.state.items}
                            onPressItem={this.openItem}
                            onLongPressItem={this.alertMenu} />
                }

                <TouchableHighlight
                    style={[styles.button, styles.newButton]}
                    underlayColor='#99d9f4'
                    onPress={this.openItem}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default ToDoContainer;
