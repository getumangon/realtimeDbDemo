/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import _rootRoute from './application/routes/_rootRoute';
 

class App extends React.Component {
  render() {
      return (
          < _rootRoute />
      );
  }
}

export default App;
