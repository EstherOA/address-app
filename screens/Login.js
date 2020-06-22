import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, AsyncStorage, Platform, NativeModules, Dimensions } from 'react-native';
import FormInput from '../components/FormInput';
import { signIn } from '../utils/api';
import Header from '../components/Header';
import Button from '../components/Button';

const { StatusBarManager } = NativeModules;

export default class Login extends React.Component {

    state = {
      email : '',
      password : '',
    }

    onSubmitFormInput = (name, value) => {

        this.setState({
            [name]: value
        })
    }

    loginUser = async() => {
      const data = this.state;
      const res = await signIn(data);

      if(res.status == 200) {
        await AsyncStorage.setItem('userToken', res.body.token);
        await AsyncStorage.setItem('userName', res.body.userName);
        await AsyncStorage.setItem('userId', JSON.stringify(res.body.userId));
        this.props.navigation.navigate('DrawerNavigator', { 'hasNew' : false});
      }else if (res.status == 400) {
        console.log(res.message);
      }else {
        console.log('Error while registering new user');
      }

    }

    navigateSignUp = () => {
        const { navigate } = this.props.navigation;
        navigate('SignUp');
    }

    render() {
      return (
        <View behavior="padding" style={styles.container} >
          <View style={styles.header}>
            <Text style={styles.headerText}>Login</Text>
          </View>
          <View style={styles.form}>
            <FormInput label='Email Address' secureInput={false} onSubmitFormInput = {this.onSubmitFormInput} name='email' />
            <FormInput label='Password' secureInput={true} onSubmitFormInput = {this.onSubmitFormInput} name='password'/>
          </View>
            <View style={styles.forgotPassword}>
                <TouchableOpacity >
                  <Text style={styles.linkText}>Forgot password?</Text>
                </TouchableOpacity>
            </View>
          <View style={styles.button}>
            <Button text='Login' onPressButton = {this.loginUser} />
          </View>  
          <View style={styles.signUp}>
                <TouchableOpacity onPress={this.navigateSignUp}>
                  <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop : Platform.OS === 'android' ? StatusBarManager.HEIGHT : 20,
        flexDirection: 'column',
    },
    header: {
        marginTop: 30,
        marginBottom: 50,
        marginHorizontal: 100,
    },
    headerText: {
        fontSize: 20,
        color: '#ba000d',
        alignSelf: 'center',
    },
    form: {
        flex: 1/2,
        alignSelf: 'center',
        justifyContent: 'space-around'
    },
    linkText: {
        color: 'deeppink',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        margin: 15,
    },
    signUp: {
        alignSelf: 'center',
        margin: 15,
    }, 
    button: {
        marginHorizontal: 80,
    }
  });