import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, AsyncStorage, Platform, NativeModules, ScrollView } from 'react-native';
import FormInput from '../components/FormInput';
import { signUp } from '../utils/api';
import Header from '../components/Header';
import Button from '../components/Button';

const { StatusBarManager } = NativeModules;

export default class SignUp extends React.Component {

    state = {
      firstName : '',
      lastName : '',
      phoneNumber : '',
      email : '',
      password : '',
    }

    onSubmitFormInput = (name, value) => {

        if( name === 'confirmPassword') {
            let { password } = this.state;
            if (value !== password) {
                console.log('Passwords do not match!');
                return;
            }
        } 
        this.setState({
            [name]: value
        })
    }

    addUser = async() => {
      const data = this.state;

      const res = await signUp(data);

      if(res.status == 200) {
        await AsyncStorage.setItem('userToken', res.body.token);
        await AsyncStorage.setItem('userName', res.body.userName);
        await AsyncStorage.setItem('userId', JSON.stringify(res.body.userId));
      this.props.navigation.navigate('DrawerNavigator');
      }else if (res.status == 400) {
        console.log(res.message);
      }else {
        console.log('Error while registering new user');
      }

    }

    navigateBack = () => {
      const { navigate } = this.props.navigation;
      navigate('Login')
    }

    render() {
      return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View>
            <Header iconName='ios-arrow-round-back' headerText='Sign Up' navigateFunction={this.navigateBack} />
          </View>
          <View style={styles.form}>
            <FormInput label='First Name' secureInput={false} onSubmitFormInput = {this.onSubmitFormInput} name='firstName'/>
            <FormInput label='Last Name' secureInput={false} onSubmitFormInput = {this.onSubmitFormInput} name='lastName'/>
            <FormInput label='Phone Number' secureInput={false} onSubmitFormInput = {this.onSubmitFormInput} name='phoneNumber'/>
            <FormInput label='Email Address' secureInput={false} onSubmitFormInput = {this.onSubmitFormInput} name='email'/>
            <FormInput label='Password' secureInput={true} onSubmitFormInput = {this.onSubmitFormInput} name='password'/>
            <FormInput label='Confirm Password' secureInput={true} onSubmitFormInput = {this.onSubmitFormInput} name='confirmPassword'/>
            <View style={styles.button}>
            <Button text='Sign up' onPressButton = {this.addUser} />
          </View> 
          </View>
          </ScrollView>
          </KeyboardAvoidingView>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      marginTop : Platform.OS === 'android' ? StatusBarManager.HEIGHT : 20,
    },
    scroll: {
      flex: 1,
    },
    form: {
      justifyContent: 'space-around',
    }, 
    button: {
      marginHorizontal: 80,
    }
  });