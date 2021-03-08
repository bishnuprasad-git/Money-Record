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
import { Feather, FontAwesome,Entypo } from '@expo/vector-icons';
// import * as Print from 'expo-print';

// import * as MediaLibrary from "expo-media-library";
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';



if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}


export default class Indivisual extends Component {

    constructor(props) {
        super(props)
        this.state = {
            c_name: '',
            p: 0,
            d: [],
            total_receivable: 0,
            sh: null,
            user_email: '', user_uid: ''
        }
    }


    componentDidMount() {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user_email: user.email, user_uid: user.uid })
                this.setState({ c_name: this.props.route.params.cust_name })
                //   alert(this.state.user_uid)
                const rec = firebase.database().ref("datas/" + user.uid + "/people/" + this.props.route.params.cust_name)

                rec.on("value", datasnap => {
                    if (datasnap.val()) {
                        // console.log(datasnap.val())
                        // console.log("--------------")
                        this.setState({ d: Object.values(datasnap.val()) })

                    }
                })

                const rec1 = firebase.database().ref("datas/"+ user.uid + "/people/" + this.props.route.params.cust_name+"/detail_amounts/")
                
                rec1.on("value",datasnap=>{
                    if(datasnap.val())
                    {
                        this.setState({total_receivable:Object.values(datasnap.val())})
                        let k=Object.values(datasnap.val())
                        
                    }
                })
               
            }
        });

    }

    u123 = () => {
        alert('to be delete')
        const y = firebase.database().ref("datas/" + this.state.user_uid + "/people/" + this.props.route.params.cust_name).remove();
        this.setState({ d: [], total_receivable: 0 })
    }

    render() {

        const text = this.props.route.params.cust_name
        const bh =
            this.state.d.map((x, index) => {
                if (index != this.state.d.length - 1) {

                    return (

                        <View style={{ margin: 10, borderWidth: 1, padding: 10, borderRadius: 9, flexDirection: 'row', justifyContent: 'space-between' }}>

                            <View>
                                <Text>{new Date(x.time).toLocaleDateString()}</Text>
                                <Text style={{color:'gray',fontSize:12}}> {new Date(x.time).toLocaleTimeString()}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: 220 }}>
                            
                            {
                                x.give_price!=null ?
                            
                               
                               
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <View>
                                        <Text style={{ fontSize: 15, color: 'red' }}> {x.give_price}</Text>
                                    </View>
                                </View>
                            :
                            <Text></Text>
                }
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                
                                {
                                    x.receive_price!=null?

                                
                                    
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{ fontSize: 15, color: '#37e019' }}> {x.receive_price}</Text>
                                    </View>
                                    :
                                    null}
                                </View>
                            </View>
                           
                                    {
                                        x.receive_price==null ? 
                                    
                            <View style={{justifyContent:'center'}}>
                            <TouchableOpacity style={{marginRight:10}} onPress={() => {
                                const title = "*Payment Reminder*\n"
                                const message = `${title}Invoiced date - ${new Date(x.time).toLocaleString()}\nPlease pay ${x.give_price}\n[Message send by Money Record App]`
                                return Share.share(
                                    { title, message },
                                    { dialogTitle: `Share ${title}` })
                            }} >


                                <FontAwesome name="share" size={15} color="#6e1ec9" />
                            </TouchableOpacity>
                            </View>
                            :null
                        
                            
                        }

                            {/* {this.state.sh} */}

                        </View>


                    )
                }
                {/* {console.log(x.price)} */ }

            })


        return (
            <View style={{ flex: 1 }}>
                {/* <View style={{flexDirection:'row'}}>
                    <View style={{marginLeft:0}}>
                            <Text>MM/DD/YY</Text>
                    </View>
                
                
                </View> */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                    <View>
                        <Text style={{fontSize:20}}>Balance =   </Text>
                    </View>
                    <View>
                        <Text style={{fontSize:20}}>
                            <FontAwesome name="rupee" size={15} color="37e019" style={{fontSize:20}}/>
                            {parseFloat(this.state.total_receivable).toFixed(2)}
                        </Text>
                    </View>
                </View>
                <View style={{ height: 30,borderWidth:1,borderColor:'gray',borderRadius:3, justifyContent:'center',alignContent:'center',}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginLeft: 51 }}>
                        <View style={{backgroundColor:'black',height:30,shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 20,alignItems:'center',alignContent:'center',width:70,borderRadius:10}}>
                            <Text style={{fontSize:19,color:'red'}}>Debit</Text>
                        </View>
                        <View style={{backgroundColor:'black',height:30,shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 20,alignItems:'center',alignContent:'center',width:70,borderRadius:10,borderWidth:1,borderColor:'#372019'}}>
                            <Text style={{fontSize:19,color:'#37e019'}}>Credit</Text>
                        </View>
                    </View>
                </View>
                <ScrollView>
                    <View>
                        {bh}
                    </View>
                </ScrollView>

                <View style={{ height: 50, backgroundColor: 'white', justifyContent: 'center', alignItems: "center", shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 20, }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>


                        <TouchableOpacity style={{ backgroundColor: 'red', width: 120, height: 35, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 20, borderBottomLeftRadius: 20, marginLeft: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 10, elevation: 10 }} onPress={() => { this.props.navigation.navigate('Indivisual_give', { cust_name: this.state.c_name }) }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <View style={{ marginRight: 20 }}>
                                    <Text style={{ color: 'white' }}>Give</Text>
                                </View>
                                <View>
                                    <Feather name="upload" size={20} color="white" />
                                </View>

                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: '#11d11e', width: 120, height: 35, alignItems: 'center', justifyContent: 'center', borderTopRightRadius: 20, borderBottomRightRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 10, elevation: 10,marginLeft:10 }} onPress={() => { this.props.navigation.navigate('Indivisual_receive', { cust_name: this.state.c_name }) }}>

                            <View>

                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <View>
                                        <Feather name="download" size={20} color="white" />
                                    </View>
                                    <View style={{ marginLeft: 15 }}>
                                        <Text style={{ color: 'white' }}>Receive</Text>
                                    </View>
                                </View>


                            </View>

                        </TouchableOpacity>
                        
                    </View>
                </View>
            </View>

        )
    }
}
