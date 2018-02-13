import 'react-native';
import React from 'react';
import TopicListItem from '../../src/components/TopicListItem';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <TopicListItem
      topic={{ id: 1, title: 'test', score: 1 }}
      onUpPressed={() => {}}
      onDownPressed={() => {}}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
