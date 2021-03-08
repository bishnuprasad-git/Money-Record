import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, FlatList, SafeAreaView, TouchableOpacity, Dimensions, Share, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Contacts from 'expo-contacts';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Indivisual from './Components/Indivisual';
import RootOfNetwork from './Components/RootOfNetwork';
// import Test from './Components/Test';
import Add_cus from './Components/Add_cus';
import Indivisual_receive from './Components/Indivisual_receive';
import Indivisual_give from './Components/Indivisual_give';
import Signup from './Components/Signup';
// import Signin from './Components/Signin';
import Loading from './Components/Loading';
import LoadingSignin from './Components/LoadingSignin';
import ShowCustomers from './Components/ShowCustomers';
import Try from './Components/Try';
import About from './Components/About';
import * as firebase from 'firebase';
import { firebaseConfig } from './config';
import { Feather, FontAwesome, Ionicons, MaterialIcons ,Entypo} from '@expo/vector-icons';
import { set } from 'react-native-reanimated';



if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}


const AuthContext = React.createContext();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

// function HomeScreen() {
//   const { signOut } = React.useContext(AuthContext);

//   return (
//     <View>
//       <Text>Signed in!</Text>

//       <Button title="Sign out" onPress={signOut} />
//     </View>
//   );
// }



function HomeScreen({ navigation }) {

  const { signOut } = React.useContext(AuthContext);

  const [d, setD] = React.useState([])
  const [user_email, setEmail] = React.useState('')
  const [user_uid, setUid] = React.useState('')

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {

        setEmail(user.email)
        setUid(user.uid)

      }
    });
    // alert('hi')
  })

  return (
    <View style={{ flex: 1, margin: 10 }}>
      <View style={{ height: 100, borderRadius: 10, backgroundColor: '#03246b', flexDirection: 'row', alignItems: 'center',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginRight:7}}>
          <MaterialIcons name="account-box" size={40} color="white" />
          <TouchableOpacity onPress={()=>{navigation.navigate("About",{user_name:user_email})}}>
            <Entypo name="chevron-small-down" size={24} color="white" />
          </TouchableOpacity>
          
        </View>
        <View style={{justifyContent:'center',flexDirection:'row',alignContent:'center'}}>
          <View style={{marginRight:9}}>
            <Text style={{ color: 'white', fontSize: 20 }}>Hii, {user_email}</Text>
          </View>
          <View style={{marginRight:8}}>
            <TouchableOpacity onPress={signOut}>
              <FontAwesome name="sign-out" size={24} color="white" />
            </TouchableOpacity>
            
          </View>
          
        </View>
          
      </View>

      <ScrollView>
      <View style={{width:"100%",height:100,backgroundColor:'red',borderRadius:5,justifyContent:'center',paddingLeft:12,marginTop:19}}>
                    <Text style={{fontSize:20,color:'white',fontStyle:'italic'}}>Now Record Your Money Transactions Safe</Text>
                </View>
      </ScrollView>

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 }}>
        <View>
          <TouchableOpacity style={{ width: 52, height: 50, borderRadius: 60, backgroundColor: 'aqua', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#ddd', borderBottomWidth: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 10, elevation: 10, marginEnd: 10 }} onPress={() => { navigation.navigate('Your Customers') }}>
            <MaterialIcons name="payment" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 }}>
        <View>
          <TouchableOpacity style={{ width: 52, height: 50, borderRadius: 60, backgroundColor: 'aqua', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#ddd', borderBottomWidth: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 10, elevation: 10, marginEnd: 10 }} onPress={() => { navigation.navigate('All Customers') }}>
            <Ionicons name="ios-people" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 }}>
        <View>
          <TouchableOpacity style={{ width: 52, height: 50, borderRadius: 60, backgroundColor: 'aqua', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#ddd', borderBottomWidth: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 10, elevation: 10, marginEnd: 10 }} onPress={() => { navigation.navigate('Add Customer') }}>
            <Ionicons name="md-person-add" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )

}


function SignInScreen({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ marginBottom: 10, fontSize: 30 }}>Sign in</Text>
                <View style={{ width: 290, backgroundColor: 'white', height: 50, justifyContent: 'center', borderRadius: 5,borderWidth:1,borderColor:'#0556e3' }}>
                    <TextInput placeholder="Enter Gmail id" onChangeText={setUsername} value={username} style={{paddingLeft:10}} />
                </View>
                <View style={{ width: 290, backgroundColor: 'white', marginTop: 20, height: 50, justifyContent: 'center', borderRadius: 5,borderWidth:1,borderColor:'#0556e3' }}>
                    <TextInput placeholder="Enter Password" secureTextEntry onChangeText={setPassword} value={password} style={{paddingLeft:10}} />
                </View>
                <View>
                    <TouchableOpacity style={{ backgroundColor: '#0556e3', marginTop: 20, width: 250, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }} onPress={() => signIn({ username, password })}>
                        <Text style={{ color: 'white', fontSize: 16 }}>Sign in</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ marginTop: 10 }}onPress={() => { navigation.navigate("SignUp") }}  >
                    <Text style={{ color: 'red' }}>Don't have account ?</Text>
                </TouchableOpacity>
                
            </View>







    // <View>
    //   <TextInput
    //     placeholder="Username"
    //     value={username}
    //     onChangeText={setUsername}
    //   />
    //   <TextInput
    //     placeholder="Password"
    //     value={password}
    //     onChangeText={setPassword}
    //     secureTextEntry
    //   />

      // <Button title="Sign in" onPress={() => signIn({ username, password })} />
      // <Button title="don't" onPress={() => { navigation.navigate("SignUp") }}></Button>
    // </View>
  );
}

function SignUpScreen({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signUp } = React.useContext(AuthContext);

  return (

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ marginBottom: 10, fontSize: 30 }}>Sign up</Text>
    <View style={{ width: 290, backgroundColor: 'white', height: 50, justifyContent: 'center', borderRadius: 5,borderWidth:1,borderColor:'#0556e3' }}>
        <TextInput placeholder="Enter Gmail id" onChangeText={setUsername} value={username} style={{paddingLeft:10}}/>
    </View>
    <View style={{ width: 290, backgroundColor: 'white', marginTop: 20, height: 50, justifyContent: 'center', borderRadius: 5,borderWidth:1,borderColor:'#0556e3' }}>
        <TextInput placeholder="Enter Password" secureTextEntry onChangeText={setPassword} value={password} style={{paddingLeft:10}}/>
    </View>
    <View>
        <TouchableOpacity style={{ backgroundColor: '#0556e3', marginTop: 20, width: 250, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }} onPress={() => signUp({ username, password })} >
            <Text style={{ color: 'white', fontSize: 16 }}>Sign up</Text>
        </TouchableOpacity>
    </View>
    <TouchableOpacity style={{ marginTop: 10 }}onPress={() => { navigation.navigate("SignIn") }}  >
        <Text style={{ color: 'red' }}>Already Signin ? Go for signin </Text>
    </TouchableOpacity>
    
</View>





    // <View>
    //   <TextInput
    //     placeholder="Username"
    //     value={username}
    //     onChangeText={setUsername}
    //   />
    //   <TextInput
    //     placeholder="Password"
    //     value={password}
    //     onChangeText={setPassword}
    //     secureTextEntry
    //   />
      // <Button title="Sign up" onPress={() => signUp({ username, password })} />
    // </View>
  );
}

const Stack = createStackNavigator();

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);


  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        // alert(data.username)
        // if(data.username=='abc')
        // {
        //   dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        // }
        // else{
        //   alert('wrong')
        // }
        firebase.auth().signInWithEmailAndPassword(data.username, data.password)
          .then((user) => {
            // this.props.navigation.navigate('LoadingSignin')
            // this.setState({indicate:true})

            dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
          })
          .catch((error) => {
            // var errorCode = error.code;
            // var errorMessage = error.message;
            alert(error.message)
          });

      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        firebase.auth().createUserWithEmailAndPassword(data.username, data.password)
          .then((user) => {
            // const all=firebase.database().ref("all_users/"+user.uid)
            // all.push().set({user_email:user.email,create_date:new Date(Date.now()).toLocaleString()})
            // <Load />
            firebase.auth().onAuthStateChanged((user) => {
              const all = firebase.database().ref("all_users/" + user.uid)
              all.on("value", datasnap => {
                if (datasnap.val()) {

                }
                // else{alert('i')}
              })
              all.push().set({ user_email: user.email, create_date: new Date(Date.now()).toLocaleString() })


            });

            dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            // this.props.navigation.navigate('Loading')
          })
          .catch((error) => {
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // ..
            alert(error.message)
          });

      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <>
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  title: 'Sign in',
                  headerStyle: {
                    backgroundColor: '#0338ff',
                  },
                  headerTintColor: 'white',
                  // When logging out, a pop animation feels intuitive
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                  title: 'Sign Up',
                  headerStyle: {
                    backgroundColor: '#0338ff',
                  },
                  headerTintColor: 'white',
                  // When logging out, a pop animation feels intuitive
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
              {/* <Stack.Screen name="Signup" component={Signup} /> */}
            </>
          ) : (
                // User is signed in
                <>
                  <Stack.Screen name="Money Record" component={HomeScreen} />

                  <Stack.Screen name="All Customers" component={ShowCustomers} options={{
                  title: 'All Customers',
                  headerStyle: {
                    backgroundColor: '#0338ff',
                  },
                  headerTintColor: 'white',
                  
                }}/>

                  <Stack.Screen name="Indivisual" component={Indivisual} options={({ route }) => ({
                    title: route.params.cust_name,
                    headerStyle: {
                      backgroundColor: '#272A23',
                    },
                    headerTintColor: 'white',
                  })} />

                  <Stack.Screen name="Indivisual_receive" component={Indivisual_receive} options={({ route }) => ({
                    title: route.params.cust_name,
                    headerStyle: {
                      backgroundColor: '#11d11e',
                    },
                    headerTintColor: 'white',
                  })} />

                  <Stack.Screen name="Indivisual_give" component={Indivisual_give} options={({ route }) => ({
                    title: route.params.cust_name,
                    headerStyle: {
                      backgroundColor: 'red',
                    },
                    headerTintColor: 'white',
                  })} />
                  <Stack.Screen name="About" component={About} options={({ route }) => ({
                    title: route.params.user_name,
                    headerStyle: {
                      backgroundColor: '#0338ff',
                    },
                    headerTintColor: 'white',
                  })} />
                  <Stack.Screen name="Your Customers" component={Try} 
                  options={{
                    title: 'Your Customers',
                    headerStyle: {
                      backgroundColor: '#0338ff',
                    },
                    headerTintColor: 'white',
                    
                  }}
                  
                  />
                  <Stack.Screen name="Add Customer" component={Add_cus} 
                  options={{
                    title: 'Add Customer',
                    headerStyle: {
                      backgroundColor: '#0338ff',
                    },
                    headerTintColor: 'white',
                    
                  }}/>
                </>
              )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
