import * as React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {fs, hp, wp} from '../helpers/ResponsiveFonts';
import {AuthTextInputProps} from '../helpers/interface';
import {Image} from 'react-native-svg';
import {Images} from '../helpers/images';
import UserIcon from '../assets/SVGs/UserIcon.svg';
import PasswordIcon from '../assets/SVGs/PasswordIcon.svg';
import PasswordEye from '../assets/SVGs/PasswordEye.svg';
import EmailIcon from '../assets/SVGs/EmailIcon.svg';

const AuthTextInput = (props: AuthTextInputProps) => {
  return (
    <View style={[styles.container, props.style]}>
      {/* <Image source={Images.user_icon} height={50} width={50} /> */}
      {props.UserIcon ? (
        <UserIcon width={wp(24)} height={hp(24)} />
      ) : props.PasswordIcon ? (
        <PasswordIcon width={wp(24)} height={hp(24)} />
      ) : props.EmailIcon ? (
        <EmailIcon width={wp(24)} height={hp(24)} />
      ) : null}

      {props.CountryCode ? (
        <Text onPress={props.CountryPress} style={styles.CountyCode}>
          {props.CountryCode}
        </Text>
      ) : null}

      <TextInput
        style={styles.TextInput}
        placeholder={props.placeholder}
        // onChangeText={text => setEmail(text)}
        // value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={props.onChangeText}
        // secureTextEntry={true}
        multiline={false}
        keyboardAppearance="default"

        // passwordRules={}
        // value="abc"
      />
      {props.PasswordIcon ? (
        <PasswordEye width={wp(24)} height={hp(24)} />
      ) : null}
    </View>
  );
};

export default AuthTextInput;

const styles = StyleSheet.create({
  container: {
    height: hp(55),
    width: wp(317),
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: wp(10),
    // justifyContent: 'center',
  },
  TextInput: {
    fontFamily: 'Montserrat-Regular',
    fontSize: fs(12),
    fontWeight: '500',
    marginLeft: wp(10),
    marginRight: wp(15),
    // borderWidth: 1,
    width: '70%',
  },
  CountyCode: {
    fontFamily: 'Montserrat-Regular',
    fontSize: fs(14),
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
    bottom: hp(1),
  },
});
