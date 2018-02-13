import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import PropTypes from 'prop-types';

/**
 * The TopicListItem component defines the layout for a single topic in
 * TopicList.
 */
class TopicListItem extends Component {
  render() {
    const {
      topic: {
        id, title, score
      },
      onUpPressed,
      onDownPressed,
    } = this.props;
    return (
      <View style={styles.cell}>
        <View style={styles.container}>
          <Text style={styles.title} >{title}</Text>
          <View style={styles.details}>
            <Text>{score} points</Text>
            <View style={styles.flexSpacing} />
            <Button
              title='Up'
              onPress={() => onUpPressed()}
            />
            <View style={styles.buttonSpacing} />
            <Button
              title='Dn'
              onPress={() => onDownPressed()}
            />
          </View>
        </View>
        <View style={styles.divider} />
      </View>
    );
  }
}

TopicListItem.propTypes = {
  topic: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }),
  onUpPressed: PropTypes.func.isRequired,
  onDownPressed: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  cell: {
    flexDirection: 'column',
  },
  container: {
    flexDirection: 'column',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 8,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexSpacing: {
    flex: 1,
  },
  buttonSpacing: {
    width: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#a9a9a944',
  },
});

export default TopicListItem;
