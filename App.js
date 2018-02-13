import React from 'react';
import { Provider } from 'react-redux';
import store from './src/config/store';
import RootNavigator from './src/components/RootNavigator';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}
