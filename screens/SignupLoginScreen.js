import React from 'react'
import { View, Text, Alert, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import firebase from 'firebase'
import db from '../config'

export default class SignupLoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            isModalVisible: false,
            firstName: "",
            lastName: "",
            contact: "",
            address: "",
            emailId: "",
            confirmPassword: "",
        }
    }
    showModal = () => {
        return (
            <Modal animationType="fade" transparent={true}
                visible={this.state.isModalVisible}>
                <View style={styles.modalContainer}>
                    <Text
                        style={styles.modalTitle}
                    >Registration</Text>
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"First Name"}
                        maxLength={8}
                        onChangeText={(text) => {
                            this.setState({
                                firstName: text
                            })
                        }} />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"Last Name"}
                        maxLength={8}
                        onChangeText={(text) => {
                            this.setState({
                                lastName: text
                            })
                        }}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"Contact"}
                        maxLength={10}
                        keyboardType={'numeric'}
                        onChangeText={(text) => {
                            this.setState({
                                contact: text
                            })
                        }}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"Address"}
                        multiline={true}
                        onChangeText={(text) => {
                            this.setState({
                                address: text
                            })
                        }}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"Email"}
                        keyboardType={'email-address'}
                        onChangeText={(text) => {
                            this.setState({
                                emailId: text
                            })
                        }}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"Password"}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({
                                password: text
                            })
                        }}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"Confrim Password"}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({
                                confirmPassword: text
                            })
                        }}
                    />
                    <View style={styles.modalBackButton}>
                        <TouchableOpacity
                            style={styles.registerButton}
                            onPress={() =>
                                this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                            }
                        >
                            <Text style={styles.registerButtonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalBackButton}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => this.setState({ "isModalVisible": false })}
                        >
                            <Text style={{ color: '#ff5722' }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
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
    userSignUp = (username, password, confirmPassword) => {
        if (password !== confirmPassword) {
            return alert("Password doesn't match\nCheck Your Password")
        } else {
            firebase.auth().createUserWithEmailAndPassword(username, password)
                .then((response) => {
                    db.collection('users').add({
                        first_name: this.state.firstName,
                        last_name: this.state.lastName,
                        mobile_number: this.state.contact,
                        username: this.state.username,
                        address: this.state.address
                    })
                    return alert(
                        'User Added Successfully', '',
                        [
                            {
                                text: 'Ok', onPress: () => this.setState({
                                    "isModalVisible": false
                                })
                            }
                        ]
                    )
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    return Alert.alert(errorMessage)
                })

        }
    }
    render() {
        return (
            <View style={styles.container}>
                {
                    this.showModal()
                }
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
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity style={[styles.button, { marginBottom: 20, marginTop: 20 }]}
                        onPress={() => {
                            this.userLogin(this.state.username, this.state.password)
                        }}>
                        <Text style={{ color: "#ff5722", fontSize: 18, fontWeight: 'bold' }}>
                            Login
                                </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            this.userSignUp(this.state.username, this.state.password)
                            this.showModal()
                        }}>
                        <Text style={{ color: "#ff5722", fontSize: 18, fontWeight: 'bold' }}>
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
    title: {
        fontSize: 65,
        fontWeight: '300',
        paddingBottom: 30,
        color: '#ff3d00'
    },
    container: {
        flex: 1,
        backgroundColor: '#F8BE85',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: "#ff9800",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
    },
    modalContainer: {
        flex: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffff",
        marginRight: 30,
        marginLeft: 30,
        marginTop: 80,
        marginBottom: 80,
    },
    formTextInput: {
        width: "75%",
        height: 35,
        alignSelf: 'center',
        borderColor: '#ffab91',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 20,
        padding: 10
    },
    modalTitle: {
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 30,
        color: '#ff5722',
        margin: 50
    },
    registerButton: {
        width: 200,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 30
    },
    registerButtonText: {
        color: '#ff5722',
        fontSize: 15,
        fontWeight: 'bold'
    },
    cancelButton: {
        width: 200,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
})


