import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface HomeProps {}

const Home = (props: HomeProps) => {
  const route = useRoute();
  const G_UserInfo = route?.params?.G_UserInfo;

  // console.log('-----------------------userInfo', userInfo.user);

  return (
    <View style={styles.container}>
      {/* <Text style={{color: 'red'}}>{G_UserInfo.user.name}</Text>
      <Text>{G_UserInfo.user.email}</Text> */}

      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
});
