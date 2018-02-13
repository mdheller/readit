import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import TopicListItem from './TopicListItem';
import { upvoteTopic, downvoteTopic } from '../actions/topics';

/**
 * TopicList component consists a FlatList of TopicListItem components. It is
 * a smart component that is linked to the redux store.
 */
class TopicList extends Component {
  static defaultProps = {
    actions: {
      upvoteTopic: () => {},
      downvoteTopic: () => {},
    },
  };

  _keyExtractor = (topic, index) => {
    return topic.id;
  };

  _renderItem = ({item}) => {
    return (
      <TopicListItem
        topic={item}
        onUpPressed={() => this.props.actions.upvoteTopic(item.id)}
        onDownPressed={() => this.props.actions.downvoteTopic(item.id)}
      />
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.topics}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem.bind(this)}
      />
    );
  }
}

TopicList.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
  topics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  topics: state.topics.topics,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ upvoteTopic, downvoteTopic }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopicList);
