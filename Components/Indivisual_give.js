import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, FlatList, SafeAreaView, TouchableOpacity,Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { render } from 'react-dom';
import * as firebase from 'firebase';
import { firebaseConfig } from '../config';
import { Feather,FontAwesome } from '@expo/vector-icons';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}


export default class Indivisual_give extends Component{


    constructor() {
        super()
        this.state = {
            c_name: '',
            p: 0,
            user_email:'',user_uid:''
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

        this.setState({ c_name: this.props.route.params.cust_name })
    }


    SaveItem = () => {
        if (this.state.p == 0) {
            alert('please enter valid amount')
        }
        else {
            try {
                const u = firebase.database().ref("datas/"+this.state.user_uid+"/people/"+this.props.route.params.cust_name)
                u.push().set({ text: this.state.c_name, give_price: parseFloat(this.state.p).toFixed(2), time:Date.now() })


                const u2 = firebase.database().ref("datas/"+this.state.user_uid+"/people/payment/"+this.props.route.params.cust_name)
                let willadd=false
                u2.on("value",datasnap=>{
                    if(datasnap.val())
                    {
                        willadd=true
                    }
                })
                // if(willadd==false)
                // {
                //     u2.set({text:this.props.route.params.cust_name})
                // }

                
                const u1 = firebase.database().ref("datas/"+this.state.user_uid+"/people/"+this.state.c_name+"/detail_amounts/")
                let found=false;
                let receivable=0;
                u1.on("value",datasnap=>{
                    if(datasnap.val())
                    {
                        found=true;
                        receivable=Object.values(datasnap.val())
                        // alert(Object.values(datasnap.val()))
                    }
                })
                let ok=false
                if(found==false)
                {
                    u1.set({total_receivable:parseFloat(this.state.p).toFixed(2)})
                    u2.set({text:this.props.route.params.cust_name,amount:parseFloat(this.state.p).toFixed(2)})

                }
                else
                {
                    let t=parseFloat(receivable)+parseFloat(this.state.p)
                    u1.set({total_receivable:t.toFixed(2)})
                    u2.set({text:this.props.route.params.cust_name,amount:t.toFixed(2)})
                    if(t==0)
                    {
                        ok=true
                        Alert.alert('Transaction Details' ,`You gave Rs.${this.state.p} to ${this.state.c_name} and all transaction between you and ${this.state.c_name} has been cleared...so transaction related data are going to be delete. Press Ok to Go to the home screen`,[{text:'ok',onPress:()=>{
                            const y = firebase.database().ref("datas/" + this.state.user_uid + "/people/" + this.props.route.params.cust_name).remove();
                            const y1 = firebase.database().ref("datas/" + this.state.user_uid + "/people/payment/" + this.props.route.params.cust_name).remove();
                            this.props.navigation.navigate("Money Record")}}])
                    }
                
                }
                if(ok==false)
                {
                Alert.alert('Transaction Details' ,`You gave Rs.${this.state.p} to ${this.state.c_name}`,[{text:'ok',onPress:()=>{this.props.navigation.goBack()}}])
                }

            }
            catch (err) {
                // alert(err)
            }

        }

    }



    render(){


        return(
            
            <View style={{marginTop:20}}>
                <View style={{alignItems:'center'}}>
                    <Text style={{marginBottom:10}}>Enter Price Here </Text>
                    <TextInput style={{backgroundColor:'white',width:200,height:75,fontSize:40}} placeholder='0' keyboardType='numeric' textAlign='center' onChangeText={(e)=>{this.setState({p:e})}} />
                    <TouchableOpacity style={{backgroundColor:'red',marginTop:250,height:40,width:100,justifyContent:'center',alignItems:'center',borderRadius:9}}
                    onPress={this.SaveItem}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <View>
                                <Text style={{fontSize:19,color:'white',marginRight:16}}>Save</Text>
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