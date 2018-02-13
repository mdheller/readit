import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';

/**
 * Add component consists of the textinput field and a character counter text
 * component that is rendered in the NewScreen component.
 */
class Add extends Component {
  static defaultProps = {
    onChangeText: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  _onChangeText(text) {
    this.setState({ text });
    this.props.onChangeText(text);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={this._onChangeText.bind(this)}
          value={this.state.text}
          autoFocus
          multiline
        />
        <Text
          style={this.state.text.length > 255 ? styles.errorCharCounter : styles.normalCharCounter}
        >
          {this.state.text.length}/255
        </Text>
      </View>
    );
  }
}

Add.propTypes = {
  onChangeText: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  normalCharCounter: {
    color: 'black',
  },
  errorCharCounter: {
    color: 'red',
  },
});

export default Add;
