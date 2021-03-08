import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, FlatList, SafeAreaView, TouchableOpacity, TextInput, Alert,ActivityIndicator } from 'react-native';
import * as Contacts from 'expo-contacts';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase';
import { firebaseConfig } from '../config';
import { Feather, FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}


export default class LoadingSignin extends Component{

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            // const all=firebase.database().ref("all_users/"+user.uid)
            
        
              this.props.navigation.navigate("Test")
            
          });
          
    }

    render(){

        return(

            <ActivityIndicator color='red' />
            
        )
    }
}