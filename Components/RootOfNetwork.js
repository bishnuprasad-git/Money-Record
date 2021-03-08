import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import * as Contacts from 'expo-contacts';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Indivisual from './Indivisual';


export default function RootOfNetwork({navigation}) {

    const [text, setText] = useState([])

  
    useEffect(() => {
      (async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
          });
  
          if (data.length > 0) {
            setText(data.slice(43, 60))
            //  alert(JSON.stringify(data[5]))
          }
        }
      })();
    }, []);
  
    // const contact = data[99];
    // alert(JSON.stringify(contact.name))
  
    const display = ({ item }) => {
  
      let r1 =
        <TouchableOpacity onPress={()=>{navigation.navigate('Indivisual',{name:item.name,number:item.number})}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 50, borderBottomColor: 'blue', borderWidth: 2, alignItems: 'center' }}>
              <Text style={{ marginLeft: 5, width: "62%" }}>{item.name}</Text>
              <Text style={{ marginRight: 5 }}>{item.phoneNumbers[0].number}</Text>
          </View>
  
  
        </TouchableOpacity>
      return (r1)
    }
  
    return (
      <SafeAreaView>
        <Text>hii</Text>
        <FlatList data={text}
          renderItem={display}
          keyExtractor={item => item.phoneNumbers[0].number}
          style={{ backgroundColor: 'red' }} />
      </SafeAreaView>
  
    )
  }
  