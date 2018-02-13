import React, { Component } from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Add from './Add';
import { createNewTopic } from '../actions/topics';

/**
 * The NewScreen component is a smart component that wraps around the Add
 * component to link it to the redux store and also to interface with
 * react-navigation's options.
 */
class NewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: 'New Topic',
      headerRight: (
        <Button
          title='Save'
          onPress={() => params.save()}
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  _save() {
    if (this.state.text.length > 255) {
      alert('Sorry, only titles of fewer than 255 characters are allowed.')
    } else {
      this.props.actions.createNewTopic(this.state.text);
      this.props.navigation.goBack();
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({ save: this._save.bind(this) });
  }

  render() {
    return (
      <Add onChangeText={(text) => this.setState({ text })} />
    );
  }
}

NewScreen.propTypes = {
  actions: PropTypes.shape({
    createNewTopic: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ createNewTopic }, dispatch),
});

/**
 * Export format as defined by react-navigation
 */
export default {
  screen: connect(mapStateToProps, mapDispatchToProps)(NewScreen),
};