import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, FlatList, SafeAreaView, TouchableOpacity, Dimensions} from 'react-native';
import * as Contacts from 'expo-contacts';
import 'react-native-gesture-handler';
import * as firebase from 'firebase';
import { firebaseConfig } from '../config';
import { Feather, FontAwesome, Ionicons, MaterialIcons,Entypo } from '@expo/vector-icons';



if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}


export default class ShowCustomers extends Component{


    constructor(){
        super()
        this.state={
            d:[],user_email:'',user_uid:'',count:0
        }
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
            //   var uid = user.uid;
              // ...
              this.setState({user_email:user.email,user_uid:user.uid})
                const rec = firebase.database().ref("datas/"+user.uid+"/list/")
                rec.on("value",datasnap=>{
                    if(datasnap.val())
                    {
                        // alert(Object.values(datasnap.val() )[0].text  )
                        this.setState({d:Object.values(datasnap.val()),count:Object.values(datasnap.val()).length   })
                    }
                })

               
                const rec1 = firebase.database().ref("datas/"+ user.uid + "/people/" + this.props.route.params.cust_name+"/detail_amounts/")
                rec1.on("value",datasnap=>{
                    if(datasnap.val())
                    {
                        this.setState({total_receivable:Object.values(datasnap.val())})
                    }
                })


            } else {
              // User is signed out
              // ...
            }
          });
    }

    render(){
        const bh = 
        this.state.d.map(x => {
            return (
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Indivisual', {
                    cust_name: x.text
                })}>
                    <View style={{ margin: 10, borderWidth: 1, padding: 10, borderRadius: 9, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{flexDirection:'row',justifyContent:'center'}}>
                            <View style={{ width: 40 }}>
                                <Ionicons name="ios-person" size={24} color="black" />
                            </View>
                            <View>
                                <Text>{x.text}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Entypo name="chevron-small-right" size={24} color="black" />
                        </View>
                        
                        
                    </View>
                </TouchableOpacity>

            )


        })
        return(
            <ScrollView>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                <Text>No. Of Customers you have added is {this.state.count}</Text>
                </View>
                {bh}
            </ScrollView>
        )
    }
}