import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import AuthTextInput from '../../components/authTextInput';
import {fs, hp, wp} from '../../helpers/ResponsiveFonts';
import {Colors} from '../../helpers/colors';
import AppleIcon from '../../assets/SVGs/AppleIcon.svg';
import FacebookIcon from '../../assets/SVGs/FacebookIcon.svg';
import GoogleIcon from '../../assets/SVGs/GoogleIcon.svg';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Images} from '../../helpers/images';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';

const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [G_userInfo, setG_userInfo] = useState(null);
  const navigation = useNavigation();

  const handleCreateAccount = () => {
    let emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let passRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (email.match(emailRegex)) {
      if (password.match(passRegex)) {
        if (password == confirmPassword) {
          auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              navigation.navigate('Home');
            })
            .catch(error => {
              Alert.alert('Invalid Email or Password');
            });
        } else {
          console.log('----------------------Password Not Matched');
          alert('Password Not Matched');
        }
      } else {
        console.log('----------------------Invalid Password');
        alert('Invalid Password');
      }
    } else {
      console.log('--------------------------Invalid Email');
      alert('Invalid Email');
    }
  };
  const GoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const G_UserInfo = await GoogleSignin.signIn();
      setG_userInfo(G_UserInfo);
      navigation.navigate('Home', {G_UserInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const FBSignIn = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  };
  const PhoneSignup = () => {
    navigation.navigate('PhoneSignUp');
  };

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <View style={styles.WelcomeView}>
        <Text style={styles.title}>Create an account</Text>
      </View>

      <AuthTextInput
        placeholder={'Username or Email'}
        UserIcon={true}
        onChangeText={text => setEmail(text)}
      />
      <AuthTextInput
        placeholder={'Password'}
        PasswordIcon={true}
        style={{marginTop: hp(31)}}
        onChangeText={text => setPassword(text)}
      />
      <AuthTextInput
        placeholder={'Confirm Password'}
        PasswordIcon={true}
        onChangeText={text => setconfirmPassword(text)}
        style={{marginTop: hp(31)}}
      />

      <View style={styles.ByclickingTextView}>
        <Text style={styles.ByclickingText}>
          By clicking the{' '}
          <Text style={{color: Colors.RegisterText}}>Register</Text> button, you
          agree to the public offer
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <Text style={styles.ContinueWith}>- OR Continue with -</Text>

      <View style={styles.loginIconView}>
        <TouchableOpacity
          style={styles.SignBtn}
          onPress={() => {
            GoogleSignIn();
          }}>
          <GoogleIcon />
        </TouchableOpacity>

        <TouchableOpacity style={styles.SignBtn} onPress={PhoneSignup}>
          {/* <AppleIcon /> */}
          <Image
            source={Images.smartphone}
            style={{height: hp(28), width: wp(28)}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            FBSignIn();
          }}>
          <FacebookIcon />
        </TouchableOpacity>
      </View>

      <Text style={styles.CreateAccount}>
        I Already Have an Account <Text style={styles.Signup}>Login</Text>
      </Text>
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
    width: wp(215),
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
    backgroundColor: Colors.CreateAccountButton,
    width: wp(317),
    height: hp(55),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: hp(52),
  },
  buttonText: {
    color: 'white',
    fontSize: fs(20),
    fontWeight: '600',
    fontFamily: 'Montserrat-Regular',
  },
  ByclickingTextView: {
    marginTop: hp(19),
    width: wp(317),
  },
  ByclickingText: {
    color: Colors.ByclickingText,
    alignSelf: 'flex-start',
    fontWeight: '400',
    fontSize: fs(12),
    width: wp(258),
  },
  ContinueWith: {
    fontSize: fs(12),
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
    marginTop: hp(75),
  },
  CreateAccountIconView: {
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
  loginIconView: {
    flexDirection: 'row',
    width: wp(185),
    // borderWidth: 1,
    justifyContent: 'space-between',
    marginTop: hp(20),
  },
  SignBtn: {
    width: wp(54),
    height: hp(54),
    borderWidth: 1,
    borderColor: Colors.SigninBorder,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.signinback,
  },
});

export default CreateAccount;
