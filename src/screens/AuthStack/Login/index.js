import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Images from '../../../constants/Images';
import RoutePaths from '../../../Navigations/RoutePaths';
import {normalize} from '../../../util/dimenstions';
import {useDispatch} from 'react-redux';
import {_dologin} from '../../../store/auth/auth.actions';
import {Formik} from 'formik';
import {loginValidationSchema} from '../../../helper/Schema';
import Input from '../../../components/Input';

const Login = ({navigation}) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = values => {
    let formdata = new FormData();
    formdata.append('uname', values.Email);
    formdata.append('pwd', values.Password);

    dispatch(_dologin(formdata));
  };

  const handleFacebookLogin = () => {
    console.log('Facebook Login');
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={Images.backgroundImage} style={styles.image}>
        <ScrollView>
          <Image source={Images.logo} style={styles.logo} />

          <View style={styles.form}>
            <Text style={styles.text}>LOGIN</Text>

            <Formik
              initialValues={{
                Email: email,
                Password: password,
              }}
              validationSchema={loginValidationSchema}
              onSubmit={values => {
                handleLogin(values);
              }}>
              {({handleChange, handleSubmit, values, errors, touched}) => (
                <>
                  <Input
                    placeholder="Email"
                    value={values.Email}
                    onChangeText={handleChange('Email')}
                    error={errors.Email && touched.Email && errors.Email}
                  />

                  <Input
                    placeholder="Password"
                    value={values.Password}
                    onChangeText={handleChange('Password')}
                    error={
                      errors.Password && touched.Password && errors.Password
                    }
                  />

                  <TouchableOpacity
                    style={[styles.loginButton, {backgroundColor: '#8fc743'}]}
                    onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Login</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>

            <View style={styles.checkAndForgotContainer}>
            <TouchableOpacity
  style={styles.checkboxContainer}
  onPress={() => setRememberMe(!rememberMe)}>
  <View
    style={[
      styles.checkbox,
      rememberMe ? styles.checkboxChecked : null,
    ]}>
    {rememberMe && (
      <Ionicons name="checkmark-outline" size={16} color="#fff" />
    )}
  </View>
  <Text style={styles.label}>Remember Me</Text>
</TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate(RoutePaths.forgotpassword)}>
                <Text style={styles.forgotPwd}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.orContainer}>
              <View style={styles.line} />

              <Text style={styles.font12gray}>OR</Text>

              <View
                style={{flex: 0.6, height: 1, backgroundColor: '#dfdfdf'}}
              />
            </View>
            <TouchableOpacity
              style={[styles.loginButtonFacebook, {backgroundColor: '#3A589B'}]}
              onPress={() => handleFacebookLogin()}>
              <Text style={styles.buttonText}>Login with Facebook</Text>
            </TouchableOpacity>
            <View style={styles.alreadAccount}>
  <Text style={styles.signinText}>
    Don't have an account?
  </Text>
  <TouchableOpacity onPress={() => navigation.navigate(RoutePaths.signUp)}>
    <Text style={styles.clickableText}> Sign up</Text>
  </TouchableOpacity>
</View>

          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  logo: {
    zIndex: 1,
    marginTop: 68,
    alignSelf: 'center',
    height:154,
    width:294,
  },
  form: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  text: {
    color: '#2b2b2b',
    textAlign: 'center',
    fontSize: normalize(18),
    fontWeight: '800',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e2e2',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  checkAndForgotContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#8FC743', 
    borderWidth: 0,
    
  },
  label: {
    color: 'black',

    fontSize: 16,
  },
  forgotPwd: {
    color: '#0D99FF',
  },
  loginButtonFacebook: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  line: {flex: 0.6, height: 1, backgroundColor: '#dfdfdf'},
  orText: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,
    fontWeight: 'bold',
  },
  alreadAccount: {
    flexDirection: 'row', // Align children in a row
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'center', // Center the content vertically
    marginTop: 10,
  },
  signinText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#000',
  },
  clickableText: {
    color: '#8FC743',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
  },
  buildings: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: '75%',
    alignSelf: 'center',
  },
  font12gray: {
    fontSize: 12,
    color: '#aaa',
    margin: 10,
  },
});

export default Login;
