// import { StatusBar } from 'expo-status-bar';
// import React, { Component } from 'react';
// import { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, ScrollView, Button, FlatList, SafeAreaView, TouchableOpacity, Dimensions,BackHandler } from 'react-native';
// import * as Contacts from 'expo-contacts';
// import 'react-native-gesture-handler';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import * as firebase from 'firebase';
// import { firebaseConfig } from '../config';
// import Add_cus from './Add_cus';
// import Indivisual from "./Indivisual";
// import { Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
// // import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';



// // firebase.initializeApp(firebaseConfig);


// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// } else {
//     firebase.app(); // if already initialized, use that one
// }


// export default class Test extends Component {

//     state = {
//         d: [],
//         receive: 0,
//         give: 0,
//         user_email: '',
//         user_uid: ''
//     }


//     componentDidMount() {
//         firebase.auth().onAuthStateChanged((user) => {
//             if (user) {
//                 //   alert(`You have logged in ${user.email}`)
//                 this.setState({ user_email: user.email, user_uid: user.uid })

//                 // alert(this.state.user_email)
//                 //         // const myitems = firebase.database().ref('cust/people/obj/bishnu')

//                 // this.update(user.uid)
//                 const u2 = firebase.database().ref("datas/"+user.uid+"/people/payment/")
//                 u2.on("value",datasnap=>{
//                     if(datasnap.val())
//                     {
//                         this.setState({d:Object.values(datasnap.val())})
//                         // alert(Object.values(datasnap.val()))
//                     }
//                 })
//                 // alert(this.state.d)

//             }
//         });
//         // BackHandler.addEventListener('backPress');
//     }

    



//     render() {
        
//         const bh =

//             this.state.d.map(x => {
                
//                 return (
                    
//                     <TouchableOpacity onPress={() => this.props.navigation.navigate('Indivisual', {
//                         cust_name: x.text
//                     })}>
//                         <View style={{ margin: 10, borderWidth: 1, padding: 10, borderRadius: 9, flexDirection: 'row', justifyContent: 'flex-start' }}>
//                             <View style={{ width: 40 }}>
//                                 <Ionicons name="ios-person" size={24} color="black" />
//                             </View>
//                             <View>
//                                 <Text>{x.text}</Text>
//                             </View>
//                         </View>
//                     </TouchableOpacity>

//                 )
//                 {/* {console.log(x.price)} */ }

//             })


//         return (
//             <View style={{ flex: 1, margin: 10 }}>
//                 <View style={{ height: 100, borderRadius: 10, backgroundColor: '#03246b', flexDirection: 'row', alignItems: 'center' }}>
//                     <MaterialIcons name="account-box" size={40} color="white" />
//                     <Text style={{ color: 'white', fontSize: 20 }}>Hii, {this.state.user_email}</Text>
//                 </View>
//                 <ScrollView>
//                     <View>
//                         {bh}
//                     </View>
//                 </ScrollView>
//                 <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 }}>
//                     <View>
//                         <TouchableOpacity style={{ width: 52, height: 50, borderRadius: 60, backgroundColor: 'aqua', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#ddd', borderBottomWidth: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 10, elevation: 10, marginEnd: 10 }} onPress={() => { this.props.navigation.navigate('ShowCustomers') }}>
//                             <Ionicons name="ios-people" size={24} color="black" />
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 }}>
//                     <View>
//                         <TouchableOpacity style={{ width: 52, height: 50, borderRadius: 60, backgroundColor: 'aqua', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#ddd', borderBottomWidth: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 10, elevation: 10, marginEnd: 10 }} onPress={() => { this.props.navigation.navigate('Add_cus') }}>
//                             <Ionicons name="md-person-add" size={30} color="black" />
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//             </View>
//         )
//     }
// }

