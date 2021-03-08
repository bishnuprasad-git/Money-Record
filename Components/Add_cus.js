import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, FlatList, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
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



export default class Add_cus extends Component {

    constructor() {
        super()
        this.state = {
            inp: '',user_email:'',user_uid:''
        }
    }


    componentDidMount() {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
            //   var uid = user.uid;
              // ...
              this.setState({user_email:user.email,user_uid:user.uid})

            } else {
              // User is signed out
              // ...
            }
          });
    }

    saveItem = () => {
        let r=false
        alert(typeof(this.state.inp))
        if (this.state.inp == "") {
            alert('please enter valid name')
        }
        else if(this.state.inp.includes(".@#$%^[]"))
        {
            alert("Name should not contain these '.@#$%^[]")
        }
        else {
            const check = firebase.database().ref("datas/"+this.state.user_uid+"/list/")
            let boss = false;
            let t = []
            check.on("value", datasnap => {
                if (datasnap.val()) {
                    boss = true;
                    t = Object.values(datasnap.val())
                }
            })
            if (boss == true) {

                let flag = false;
                t.map((x, index) => {
                    if (x.text == this.state.inp) {
                        flag = true;
                    }

                })
                if (flag == false) {
                    check.push().set({ text: this.state.inp })
                    Alert.alert('Message from Bishnu' ,`customer added to your list for the first time`,[{text:'ok',onPress:()=>{this.props.navigation.goBack()}}])
                }
                else {
                    alert('already present in the list')
                }
            }
            else 
            {   
                    const yyyy = firebase.database().ref("datas/"+this.state.user_uid+"/list/")
                    yyyy.push().set({ text: this.state.inp })
                    Alert.alert('Message from Bishnu' ,`customer added to your list for the first time`,[{text:'ok',onPress:()=>{this.props.navigation.goBack()}}])
            }

        }
        // if(r==true)
        // {
        //     alert('added')
        // }


    }

    render() {


        return (
            <View style={{ flex: 1, margin: 10 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
                    <View style={{ width: 40 }}>
                        <Ionicons name="md-person-add" size={40} color="#5a62f2" />
                    </View>
                    <View>
                        <TextInput style={{ backgroundColor: 'white', borderRadius: 3, borderWidth:1,paddingLeft:5,borderColor:'blue',marginLeft: 20, width: 270, height: 40 }} placeholder='Name' value={this.state.inp} onChangeText={(e) => { this.setState({ inp: e }) }} />
                    </View>
                </View>

                <View style={{ alignContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ backgroundColor: '#5a62f2', marginTop: 250, height: 40, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 9, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 10, elevation: 10 }}
                        onPress={this.saveItem}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View>
                                <Text style={{ fontSize: 19, color: 'white', marginRight: 16 }}>save</Text>
                            </View>
                            <View>
                                <Feather name="save" size={19} color="white" />
                            </View>
                        </View>

                    </TouchableOpacity>
                </View>


            </View>
        )
    }
}

