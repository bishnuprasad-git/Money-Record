import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, FlatList, SafeAreaView, TouchableOpacity, Dimensions, Share } from 'react-native';
import * as Contacts from 'expo-contacts';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { render } from 'react-dom';
import * as firebase from 'firebase';
import { firebaseConfig } from '../config';
import { Feather, FontAwesome,Entypo } from '@expo/vector-icons';



if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}


export default class Info extends Component{


    render(){


        return(

            <Text>ij</Text>
        )
    }
}