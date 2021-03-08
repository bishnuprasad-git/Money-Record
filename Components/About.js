import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, FlatList, SafeAreaView, TouchableOpacity, Dimensions, Share, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { render } from 'react-dom';
import * as firebase from 'firebase';
import { firebaseConfig } from '../config';
import { Feather, FontAwesome, Entypo, Ionicons, Fontisto, MaterialIcons } from '@expo/vector-icons';


export default class About extends Component {

    constructor() {
        super()
        this.state = {
            no_of_cust: 0, d: []
        }
    }

    componentDidMount() {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {

                this.setState({ user_email: user.email, user_uid: user.uid })

                const u2 = firebase.database().ref("datas/" + user.uid + "/people/payment/")
                u2.on("value", datasnap => {
                    if (datasnap.val()) {
                        this.setState({ no_of_cust: Object.values(datasnap.val()).length, d: Object.values(datasnap.val()) })

                    }
                })

            }
        });

    }

    render() {
        let get = 0.0
        let give = 0.0
        const bh =

            this.state.d.map(x => {
                // return (


                    // (parseFloat(x.amount)>0):(get=get+parseFloat(x.amount))?(receive=receive+parseFloat(x.amount)
                    if(parseFloat(x.amount)>0)
                    {
                        get = get + parseFloat(x.amount)
                    }
                     else
                     {
                         give = give + parseFloat(x.amount)
                     }   

                // )
            })

        return (
            <View style={{ flex: 1, margin: 10 }}>
                <View style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 10, padding: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <View style={{ width: 40 }}>
                                <Fontisto name="persons" size={30} color="#6d6f7d" />
                            </View>
                            <View>
                                <Text style={{ fontSize: 19, marginLeft: 10 }}>Customers</Text>
                            </View>
                        </View>
                        <View style={{ marginRight: 10 }}>
                            <Text style={{ fontSize: 18 }}>{this.state.no_of_cust}</Text>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, alignContent: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <View style={{ width: 40 }}>
                                <MaterialIcons name="account-balance-wallet" size={24} color="#6d6f7d" />
                            </View>
                            <View>
                                <Text style={{ fontSize: 19, marginLeft: 10 }}>You will Receive</Text>
                            </View>
                        </View>
                        <View style={{ marginRight: 10, justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
                                <View style={{ marginRight: 5 }}>
                                    <FontAwesome name="rupee" size={15} color="37e019" />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 18 }}>{parseFloat(get).toFixed(2)}</Text>
                                </View>
                            </View>

                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, alignContent: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <View style={{ width: 40 }}>
                                <MaterialIcons name="account-balance-wallet" size={24} color="#6d6f7d" />
                            </View>
                            <View>
                                <Text style={{ fontSize: 19, marginLeft: 10 }}>You will Give</Text>
                            </View>
                        </View>
                        <View style={{ marginRight: 10, justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
                                <View style={{ marginRight: 5 }}>
                                    <FontAwesome name="rupee" size={15} color="37e019" />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 18 }}>{parseFloat(give).toFixed(2)}</Text>
                                </View>
                            </View>

                        </View>

                    </View>


                </View>
                <View style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 10, padding: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <View style={{ width: 40 }}>
                                <MaterialIcons name="settings-backup-restore" size={24} color="#6d6f7d" />
                            </View>
                            <View>
                                <Text style={{ fontSize: 19, marginLeft: 10 }}>Auto Backup to cloud</Text>
                            </View>
                        </View>
                        <View style={{ marginRight: 10 }}>
                            <Text style={{ fontSize: 18 }}></Text>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <View style={{ width: 40 }}>
                                <MaterialIcons name="security" size={24} color="#27ab27" />
                            </View>
                            <View>
                                <Text style={{ fontSize: 19, marginLeft: 10 }}>Security</Text>
                            </View>
                        </View>
                        <View style={{ marginRight: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                                <View style={{ marginRight: 5 }}>
                                    {/* <FontAwesome name="rupee" size={15} color="37e019" /> */}
                                </View>
                                <View>
                                    <Text style={{ fontSize: 18 }}></Text>
                                </View>
                            </View>

                        </View>

                    </View>
                    

                </View>

                <View style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 10, padding: 10 }}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{width:40}}>
                            <MaterialIcons name="developer-mode" size={24} color="#0338ff" />
                        </View>
                        <View>
                            <Text style={{fontSize:18,marginLeft:10}}>Developed By Bishnu</Text>
                        </View>
                    </View>
                </View>
            </View>


        )
    }
}