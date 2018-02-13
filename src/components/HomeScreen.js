import React, { Component } from 'react';
import { Button } from 'react-native';
import TopicList from './TopicList';

/**
 * The HomeScreen component is a wrapper component around the TopicList
 * component that interfaces with react-navigation options.
 */
class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: 'ReadIt',
      headerRight: (
        <Button
          title='Add'
          onPress={() => params.goToNewScreen()}
        />
      ),
    };
  };

  _goToNewScreen() {
    this.props.navigation.navigate('New');
  }

  componentWillMount() {
    this.props.navigation.setParams({ goToNewScreen: this._goToNewScreen.bind(this) });
  }

  render() {
    return (
      <TopicList />
    );
  }
}

/**
 * Export format as defined by react-navigation
 */
export default {
  screen: HomeScreen,
};
