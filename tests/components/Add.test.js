import 'react-native';
import React from 'react';
import Add from '../../src/components/Add';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Add />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
