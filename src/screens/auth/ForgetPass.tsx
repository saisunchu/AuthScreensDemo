import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import AuthTextInput from '../../components/authTextInput';
import {fs, hp, wp} from '../../helpers/ResponsiveFonts';
import {Colors} from '../../helpers/colors';
import AppleIcon from '../../assets/SVGs/AppleIcon.svg';
import FacebookIcon from '../../assets/SVGs/FacebookIcon.svg';
import GoogleIcon from '../../assets/SVGs/GoogleIcon.svg';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const ForgetPass = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleForgetPass = () => {
    // navigation.navigate('CreateAccount');
    let emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(emailRegex)) {
      alert('Invalid Email');
    } else {
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          navigation.navigate('Login');
        })
        .catch(error => {
          alert('Unsucessful');
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.WelcomeView}>
        <Text style={styles.title}>Forgot password?</Text>
      </View>

      <AuthTextInput
        placeholder={'Enter your email address'}
        EmailIcon={true}
        style={{marginTop: hp(31)}}
        onChangeText={text => setEmail(text)}
      />

      <View style={styles.ForgetPassView}>
        <Text style={styles.ForgetPass}>
          <Text style={{color: Colors.ForgetPass}}>*</Text> We will send you a
          message to set or reset your new password
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleForgetPass}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  WelcomeView: {
    width: wp(317),
    marginBottom: hp(36),
  },
  title: {
    fontSize: fs(36),
    fontWeight: '700',
    width: wp(255),
    height: hp(103),
    marginTop: hp(63),
    // borderWidth: 1,
    fontFamily: 'Montserrat-Regular',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.ForgetPassButton,
    width: wp(317),
    height: hp(55),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: hp(26),
  },
  buttonText: {
    color: 'white',
    fontSize: fs(20),
    fontWeight: '600',
    fontFamily: 'Montserrat-Regular',
  },
  ForgetPassView: {
    marginTop: hp(26),
    width: wp(317),
  },
  ForgetPass: {
    color: Colors.setresetColor,
    alignSelf: 'flex-start',
    fontWeight: '400',
  },
  ContinueWith: {
    fontSize: fs(12),
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
    marginTop: hp(75),
  },
  ForgetPassIconView: {
    flexDirection: 'row',
    width: wp(185),
    // borderWidth: 1,
    justifyContent: 'space-between',
    marginTop: hp(20),
  },
  CreateAccount: {
    fontSize: fs(14),
    fontWeight: '400',
    fontFamily: 'Montserrat-Regular',
    marginTop: hp(75),
  },
  Signup: {
    fontSize: fs(14),
    fontWeight: '600',
    fontFamily: 'Montserrat-Regular',
    color: Colors.signup,
    marginLeft: wp(5),
    textDecorationLine: 'underline',
  },
});

export default ForgetPass;
