import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Preview from './screens/Preview/Preview';
import {AppProps} from './helpers/interface';
import MainNavigation from './navigation/MainNavigation';

const App = (props: AppProps) => {
  return <MainNavigation />;
};

export default App;

const styles = StyleSheet.create({
  container: {flex: 1},
});
