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
import {CountryPicker} from 'react-native-country-codes-picker';
import Modal from 'react-native-modal';
import OtpInputs from 'react-native-otp-inputs';

var OTP: string;
const PhoneSignUp = () => {
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [G_userInfo, setG_userInfo] = useState(null);
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');

  const toggleModal = () => {
    // handlePhoneSignUp();
    let phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneNo.match(phoneRegex)) {
      alert('Invalid Phone Number');
    } else {
      setModalVisible(!isModalVisible);
      // setCode(OTP);
      let f_val = phoneNo.replace(/\D[^\.]/g, '');
      f_val =
        f_val.slice(0, 3) + '-' + f_val.slice(3, 6) + '-' + f_val.slice(6);
      signInWithPhoneNumber(`${countryCode} ${f_val}`);
    }
  };
  const signInWithPhoneNumber = async (phoneNumber: string) => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  };
  const confirmCode = async () => {
    try {
      (await confirm.confirm(code)) ? navigation.navigate('Home') : null;
    } catch (error) {
      console.log('Invalid code.');
    }
  };

  const handleOTPChange = (code: string) => {
    OTP = code;
    setCode(OTP);
    console.log('OTP:', OTP);
  };

  const handlePhoneSignUp = () => {
    let emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let passRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    let phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if (phoneNo.match(phoneRegex)) {
    } else console.log('--------------------------Invalid Email');
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

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <View style={styles.WelcomeView}>
        <Text style={styles.title}>Sign Up with Phone Number</Text>
      </View>

      <AuthTextInput
        placeholder={'Phone Number'}
        // UserIcon={true}
        CountryCode={countryCode}
        onChangeText={text => setPhoneNo(text)}
        CountryPress={() => setShow(true)}
      />

      {/* <View style={styles.ByclickingTextView}>
        <Text style={styles.ByclickingText}>
          By clicking the{' '}
          <Text style={{color: Colors.RegisterText}}>Register</Text> button, you
          agree to the public offer
        </Text>
      </View> */}

      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Text style={styles.buttonText}>Sign Up</Text>
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

        <TouchableOpacity
          style={styles.SignBtn}
          onPress={() => navigation.navigate('CreateAccount')}>
          {/* <AppleIcon /> */}
          <Image
            source={Images.email}
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

      <Text style={styles.PhoneSignUp}>
        I Already Have an Account{' '}
        <Text
          style={styles.Signup}
          onPress={() => navigation.navigate('Login')}>
          Login
        </Text>
      </Text>
      <CountryPicker
        show={show}
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={item => {
          setCountryCode(item.dial_code);
          setShow(false);
        }}
        lang="en"
      />
      <Modal
        isVisible={isModalVisible}
        swipeDirection={['down']}
        onSwipeComplete={toggleModal}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <View style={{backgroundColor: Colors.white, padding: 16}}>
          <View style={{alignSelf: 'center'}}>
            <Text style={styles.Ingresa}>Verification code</Text>
            <Text style={styles.Escribe}>
              Write the code sent to your cell phone number {countryCode}{' '}
              {phoneNo}
            </Text>
            <View style={styles.OTPContainor}>
              <View style={styles.OTPView}>
                <OtpInputs
                  handleChange={handleOTPChange}
                  numberOfInputs={6}
                  autofillFromClipboard={false}
                  inputStyles={styles.OTPInputStyles}
                  textContentType="oneTimeCode"
                  textAlign="center"
                  inputContainerStyles={{marginBottom: hp(30)}}
                />

                <View style={styles.ContinuarViewModel}>
                  <TouchableOpacity
                    onPress={confirmCode}
                    style={[styles.ToucahbleContinue, {width: '100%'}]}>
                    <Text style={styles.BaseTextContinuar}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* <View style={styles.SegReenviar}>
                <BaseText style={styles.Seg}>00:59 Seg</BaseText>
                <BaseText style={styles.Reenviar}>Reenviar código</BaseText>
              </View> */}
            </View>
          </View>
        </View>
      </Modal>
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
    width: wp(345),
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
    backgroundColor: Colors.PhoneSignUpButton,
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
  PhoneSignUpIconView: {
    flexDirection: 'row',
    width: wp(185),
    // borderWidth: 1,
    justifyContent: 'space-between',
    marginTop: hp(20),
  },
  PhoneSignUp: {
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
  OTPContainor: {
    width: wp(352),
    height: hp(120),
    // flexDirection: 'row',
    marginBottom: hp(48),
    marginTop: hp(22),
    // alignSelf:'center'
    // borderWidth: 1,
  },
  OTPView: {
    width: '100%',
    height: '100%',
    // paddingRight: wp(14),
    justifyContent: 'center',
  },
  OTPInputStyles: {
    borderWidth: 1,
    height: hp(40),
    width: wp(40),
    // marginRight: wp(18),
    borderRadius: 12,
    fontSize: 14,
  },
  ContinuarViewModel: {
    width: wp(352),
    height: hp(56),
    borderRadius: 10,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: hp(15),
  },
  ToucahbleContinue: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: Colors.ForgetPass,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BaseTextContinuar: {
    color: Colors.white,
    fontSize: fs(20),
    fontFamily: 'Montserrat-Regular',
    fontWeight: '700',
  },
  Ingresa: {
    // color: Colors.iBienvenido,
    fontSize: fs(20),
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    marginBottom: fs(19),
  },
  Escribe: {
    // color: Colors.TextInicia,
    fontSize: fs(14),
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    lineHeight: 16,
    marginBottom: hp(23),
  },
});

export default PhoneSignUp;
