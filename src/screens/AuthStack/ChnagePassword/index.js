import React, {useEffect,useState} from 'react';
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

import Colors from '../../../constants/colors';
import {UPDATED_PASS} from '../../../services/ApiUrls';
import {useSelector} from 'react-redux';
import {
  Request_UpdatePassword,
  Request_params,
} from '../../../services/postApi';
import Loader from '../../../components/Loader';
import {showSnack, showSnackError, showSnackSuccess} from '../../../util/snack';

const ChnagePassword = ({navigation}) => {
  const [current_Pass, setCurrent_Pass] = useState('');
  const [new_Pass, setNew_Pass] = useState('');
  const [confirm_Pass, setConfirm_Pass] = useState('');
  const [loading, setLoading] = useState(false);

  const {User_mid} = useSelector(state => state?.auth);

  const handleLogin = async () => {
    if (
      current_Pass?.length == 0 ||
      confirm_Pass?.length == 0 ||
      new_Pass.length == 0
    ) {
      showSnackError('Please enter All field');
    } else if (confirm_Pass != new_Pass) {
      showSnackError('New Password and Confirm password not match', 2000);
    } else {
      setLoading(true);
      let formdata = new FormData();
      formdata.append('mid', User_mid);
      formdata.append('current_pwd', current_Pass);
      formdata.append('update_pwd', new_Pass);
      formdata.append('cfm_updated_pwd', confirm_Pass);

      await Request_UpdatePassword(UPDATED_PASS, formdata)
        .then(result => {
          console.log(result, 'hfhe');
          setLoading(false);
          if (result.success) {
            showSnackSuccess(result?.msg);
            setCurrent_Pass('')
            setNew_Pass('')
            setConfirm_Pass('')
          } else {
            showSnackError(result?.msg);
          }
        })
        .catch(error => {
          console.log(error.message, 'error 343');
          setLoading(false);
        });
    }
  };

  return (
    <View style={styles.container}>
      {loading ? <Loader /> : null}

      <ScrollView>
        <Text style={styles.label}>Current Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          onChangeText={setCurrent_Pass}
          value={current_Pass}
        />
        <Text style={styles.label}>New Password</Text>

        <TextInput
          style={styles.input}
          placeholder="New Password"
          onChangeText={setNew_Pass}
          value={new_Pass}
        />
        <Text style={styles.label}>Confirm Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          onChangeText={setConfirm_Pass}
          value={confirm_Pass}
        />
        <TouchableOpacity
          style={[styles.loginButton, {backgroundColor: '#8fc743'}]}
          onPress={handleLogin}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
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

    padding: 14,
    alignItems: 'center',
    marginTop: 10,
    width: 150,
    alignSelf: 'center',
  },

  label: {color: Colors.Gray, marginTop: 15},

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
  },
});

export default ChnagePassword;
