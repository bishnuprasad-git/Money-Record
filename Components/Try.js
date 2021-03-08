import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView,Image, TextInput, Button, FlatList, SafeAreaView, TouchableOpacity, Dimensions, Share, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { render } from 'react-dom';
import * as firebase from 'firebase';
import { firebaseConfig } from '../config';
import { Feather, FontAwesome, Entypo, Ionicons } from '@expo/vector-icons';



export default class Try extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user_email: '', user_uid: '', d: [],count:0
        }
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {

                this.setState({ user_email: user.email, user_uid: user.uid })

                const u2 = firebase.database().ref("datas/" + user.uid + "/people/payment/")
                u2.on("value", datasnap => {
                    if (datasnap.val()) {
                        this.setState({ d: Object.values(datasnap.val()),count:Object.values(datasnap.val()).length })

                    }
                })

            }
        });

    }

    render() {
        const bh =

            this.state.d.map(x => {

                return (
                    
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Indivisual', {
                        cust_name: x.text
                    })}>
                        <View style={{ margin: 10, borderWidth: 1, padding: 10, borderRadius: 9, flexDirection: 'row', justifyContent:'space-between' }}>

                            <View style={{flexDirection:'row',justifyContent:'center'}}>
                                <View style={{width:40}}>
                                    <Ionicons name="ios-person" size={24} color="black" />
                                </View>
                                <View>
                                    <Text>{x.text}</Text>
                                </View>
                            </View>
                                <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center'}}>
                                    <View style={{marginRight:3}}>
                                        <FontAwesome name="rupee" size={15} color="37e019" />
                                    </View>
                                    <View style={{marginRight:10}}>
                                        <Text>{parseFloat(x.amount).toFixed(2)}</Text>
                                    </View>
                                    <View>
                                        <Entypo name="chevron-small-right" size={24} color="black" />
                                    </View>
                                    
                                </View>
                            {/* </View> */}


                        </View>
                    </TouchableOpacity>

                )
                {/* {console.log(x.price)} */ }

            })

        return (
            <ScrollView>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <Text>No. of Customers is {this.state.count}</Text>
                </View>
                {bh}
                
                </ScrollView>
           
        )
    }
}