import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, FlatList, SafeAreaView, TouchableOpacity, Dimensions, Share ,ActivityIndicator} from 'react-native';
import * as Contacts from 'expo-contacts';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { render } from 'react-dom';
import * as firebase from 'firebase';
import { firebaseConfig } from '../config';
import { Feather, FontAwesome } from '@expo/vector-icons';



if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}


export default class Signin extends Component {

    constructor() {
        super()
        this.state = {
            email: '', pass: '',indicate:false
        }
    }

    componentDidMount() {

    }

    userSignin = (email,password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.props.navigation.navigate('LoadingSignin')
                this.setState({indicate:true})
            })
            .catch((error) => {
                // var errorCode = error.code;
                // var errorMessage = error.message;
                alert(error.message)
            });
    }

    render() {



        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ marginBottom: 10, fontSize: 30 }}>Sign in</Text>
                <View style={{ width: 290, backgroundColor: 'white', height: 50, justifyContent: 'center', borderRadius: 5,borderWidth:1,borderColor:'#0556e3' }}>
                    <TextInput placeholder="Enter Gmail id" onChangeText={(e) => { this.setState({ email: e }) }} value={this.state.email} />
                </View>
                <View style={{ width: 290, backgroundColor: 'white', marginTop: 20, height: 50, justifyContent: 'center', borderRadius: 5,borderWidth:1,borderColor:'#0556e3' }}>
                    <TextInput placeholder="Enter Password" secureTextEntry onChangeText={(e) => { this.setState({ pass: e }) }} value={this.state.pass} />
                </View>
                <View>
                    <TouchableOpacity style={{ backgroundColor: '#0556e3', marginTop: 20, width: 250, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }} onPress={()=>{this.userSignin(this.state.email,this.state.pass)}}>
                        <Text style={{ color: 'white', fontSize: 16 }}>Sign in</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ marginTop: 10 }} onPress={() => { this.props.navigation.navigate("Signup") }}>
                    <Text style={{ color: 'red' }}>Don't have account ?</Text>
                </TouchableOpacity>
                { this.state.indicate==true?<ActivityIndicator />:null  }
            </View>
        )
    }
}