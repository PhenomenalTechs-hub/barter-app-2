import React from 'react'
import { View, Text, Alert, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import firebase from 'firebase'
import db from '../config'

export default class SignupLoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
        }
    }
    userLogin = (username, password) => {
        firebase.auth().signInWithEmailAndPassword(username, password)
            .then(() => {
                return alert("Successfully Login")
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage)
            })
    }
    userSignUp = (username, password) => {
        firebase.auth().createUserWithEmailAndPassword(username, password)
            .then((response) => {
                return Alert.alert("User Added Successfully");
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage)
            })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ alignItems: "center" }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.title}>Barter App</Text>
                    </View>
                    <Text style={{ color: "#ff5722", fontSize: 18, fontWeight: "bold", marginLeft: 55 }}>Username</Text>
                    <View style={{ alignItems: "center" }}>
                        <TextInput
                            style={styles.loginBox}
                            keyboardType='email-address'
                            onChangeText={(text) => {
                                this.setState({
                                    username: text
                                })
                            }} />
                    </View>
                </View>
                <View style={{ alignItems: "center" }}>
                    <Text style={{ color: "#ff5722", fontSize: 18, fontWeight: "bold", marginLeft: 55 }}>Password</Text>
                    <View style={{ alignItems: "center" }}>
                        <TextInput
                            style={styles.loginBox}
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                this.setState({
                                    password: text
                                })
                            }} />
                    </View>
                </View>
                <View style={{alignItems:"center"}}>
                            <TouchableOpacity style={[styles.button, {marginBottom:20, marginTop:20}]}
                            onPress={()=>{
                                this.userLogin(this.state.username, this.state.password)
                            }}>
                                <Text style={{color:"#ff5722", fontSize:18, fontWeight:'bold'}}>
                                    Login
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}
                            onPress={()=>{
                                this.userSignUp(this.state.username, this.state.password)
                            }}>
                                <Text style={{color:"#ff5722", fontSize:18, fontWeight:'bold'}}>
                                    SignUp
                                </Text>

                            </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    loginBox: {
        width: 300,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor: '#ff8a65',
        fontSize: 20,
        margin: 10,
        paddingLeft: 10
    },
    title :{
        fontSize:65,
        fontWeight:'300',
        paddingBottom:30,
        color : '#ff3d00'
      },
      container:{
        flex:1,
        backgroundColor:'#F8BE85',
        alignItems: 'center',
        justifyContent: 'center'
      },
      button:{
        width:300,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:"#ff9800",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
         },
        },
})


