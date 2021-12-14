import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native'
import { Input, NativeBaseProvider } from "native-base"
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
/*Import pour la connexion FB*/
import * as Facebook from 'expo-facebook';






export default function Log({ navigation }) {

    const dispatch = useDispatch()

    /*Log*/
    const [display, setDisplay] = useState('flex')
    const [displayTwo, setDisplayTwo] = useState('flex')

    const toogle = () => {
        display === 'flex' ? setDisplay('none') : setDisplay('flex')
    }

    const toogleTwo = () => {
        displayTwo === 'flex' ? setDisplayTwo('none') : setDisplayTwo('flex')
    }




    /*SignUp*/
    const [signUpPseudo, setSignUpPseudo] = useState('')
    const [signUpEmail, setSignUpEmail] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')

    const [errorSignup, setErrorSignup] = useState('')


    var handleSubmitSignup = async () => {

        if (signUpPseudo !== '' || signUpEmail !== '' || signUpPassword !== '') {
            const request = await fetch('http://192.168.1.111:3000/users/sign-up', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `pseudo=${signUpPseudo}&email=${signUpEmail}&password=${signUpPassword}`
            })
            const result = await request.json()

            if (result.error === '') {
                AsyncStorage.setItem('userEmail', signUpEmail)
                AsyncStorage.setItem('userPassword', signUpPassword)
                dispatch({ type: 'addToken', token: result.token })
                navigation.navigate('Profile')
            } else if (result.error === 'Vous avez déjà un compte.') {
                setErrorSignin(result.error)
                setSignInEmail(signUpEmail)
                setSignUpEmail('')
                setSignUpPassword('')
                setSignUpPseudo('')
                toogleTwo()
            } else {
                setErrorSignup(result.error)
                setSignUpPseudo('')
            }

        } else setErrorSignup('Un des champs est manquant !')
    }

    /*Connexion Facebook*/
    async function handleFBLoginPress() {
        await Facebook.initializeAsync({
            appId: '1005835353329669',
        });
        const { type, token, expirationDate, permissions, declinedPermissions } =
            await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                let response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                response = await response.json()
                console.log(response)
            }
    }
    /*Connexion Google*/
    async function handleGLLoginPress() {

    }


    /*Sign In*/
    const [signInEmail, setSignInEmail] = useState('')
    const [signInPassword, setSignInPassword] = useState('')

    const [errorSignin, setErrorSignin] = useState('')


    let handleSubmitSignin = async () => {

        if (signInEmail !== '' || signInPassword !== '') {
            const request = await fetch('http://192.168.1.111:3000/users/sign-in', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `email=${signInEmail}&password=${signInPassword}`
            })
            const result = await request.json()

            if (result.error === '') {
                // on vérifie si c'est un nouvel appareil et si il y a quelque chose dans le cache
                // s'il n'y a rien on ajoute dans le cache
                // si ce n'est pas un nouvel appareil et que qu'il y a quelque chose, on l'ajoute seulement si 
                //    les identifiant de connexion sont différent
                AsyncStorage.getItem('userEmail', (err, data) => {
                    if (data !== signInEmail || data === null) {
                        AsyncStorage.setItem('userEmail', signInEmail)
                        AsyncStorage.setItem('userPassword', signInPassword)
                    }
                })
                dispatch({ type: 'addToken', token: result.token })
                dispatch({ type: 'updateWishlist', wishlist: result.wishlist })
                navigation.navigate('Profile')
            } else if (result.error === 'Mot de passe incorrect.') {
                setSignInPassword('')
                setErrorSignin(result.error)
            } else if (result.error === 'Pas de compte avec cette adresse.') {
                setErrorSignin('')
                setErrorSignup(result.error)
                setSignUpEmail(signInEmail)
                setSignInPassword('')
                setSignInEmail('')
                setSignUpPassword('')
                setSignUpPseudo('')
                toogleTwo()
            }
        } else setErrorSignin('Un des champs est manquant !')
    }



    return (
        <NativeBaseProvider style={{ flex: 1 }}>

            <View style={{ display: display, height: '100%', justifyContent: 'center', alignItems: 'center' }}>

                <View>
                    <Image source={require('../assets/logo_matth_transparent.png')} style={styles.logo} />
                </View>

                <View>

                    <View style={styles.backgroundTexte}>
                        <Button onPress={() => toogle()} style={styles.email} color="#fff" title="Adresse mail"></Button>
                    </View>

                    <View style={styles.backgroundTexteFB}>
                        {/*<Button title="Start" onPress={handleStartPress} />*/}
                        <View style={styles.socialButtonsView}>
                            <Button color="#fff" title="Se connecter avec Facebook" onPress={handleFBLoginPress} />
                        </View>
                    </View>


                    <View style={styles.backgroundTexteGL}>
                        <Button color="#fff" title="Se connecter avec Google" onPress={handleGLLoginPress} />
                    </View>

                </View>

            </View>


            {/* SIGN UP */}
            <View style={{ display: displayTwo, height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#194454' }}>

                <View>
                    <Image source={require('../assets/logo_matth_transparent.png')} style={styles.logo} />
                </View>

                <Text style={{ color: '#e63946' }}>{errorSignup}</Text>

                <View>

                    <View style={styles.backgroundColorInput}>
                        <Input style={styles.input} variant="underlined" onChangeText={(value) => setSignUpPseudo(value)} value={signUpPseudo} placeholder='Pseudo'></Input>
                        <Input style={styles.input} variant="underlined" onChangeText={(value) => setSignUpEmail(value)} value={signUpEmail} placeholder='Email'></Input>
                        <Input style={styles.input} variant="underlined" onChangeText={(value) => setSignUpPassword(value)} value={signUpPassword} secureTextEntry={true} placeholder='Mot de passe'></Input>
                    </View>

                    <View style={styles.button}>
                        <Button title="Valider" color="#194454" onPress={() => handleSubmitSignup()}></Button>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text onPress={() => toogleTwo()} style={styles.text}>Déjà un compte ?</Text>
                        <Text onPress={() => toogle()} style={styles.text}>Se connecter autrement.</Text>
                    </View>

                </View>

            </View>


            {/* SIGN IN */}
            <View style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#194454' }}>

                <View>
                    <Image source={require('../assets/logo_matth_transparent.png')} style={styles.logo} />
                </View>

                <Text style={{ color: '#e63946' }}>{errorSignin}</Text>

                <View style={styles.containerButton}>

                    <View>

                        <View style={styles.backgroundColorInput}>
                            <Input style={styles.input} variant="underlined" onChangeText={(value) => setSignInEmail(value)} value={signInEmail} placeholder='Email'></Input>
                            <Input style={styles.input} variant="underlined" onChangeText={(value) => setSignInPassword(value)} value={signInPassword} secureTextEntry={true} placeholder='Mot de passe'></Input>
                        </View>

                        <View style={styles.button}>
                            <Button title="Valider" color="#194454" onPress={() => handleSubmitSignin()}></Button>
                        </View>

                        <Text onPress={() => toogleTwo()} style={styles.text}>Pas encore de compte ?</Text>

                    </View>

                </View>

            </View>
        </NativeBaseProvider>
    )

}
/*Style Log*/
const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
        marginBottom: 50,
    },
    backgroundTexte: {
        backgroundColor: '#194454',
        width: 250,
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
    backgroundTexteFB: {
        backgroundColor: '#3b5998',
        width: 250,
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
    backgroundTexteGL: {
        backgroundColor: '#db4A39',
        width: 250,
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
    email: {
        color: '#fff',
        fontSize: 18,
    },
    /*Style SignUp*/
    backgroundColorInput: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        width: 300,
        marginBottom: 20,
    },
    input: {
        textAlign: 'center',
        width: 250,
        height: 50,
    },
    button: {
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#fff',
        padding: 10,
    },
    compte: {
        marginTop: 60,
    },
    /*Style SignIn*/
    containerButton: {
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
    },
    texteCompte: {
        color: 'white',
        fontSize: 15,
    },
    text: {
        color: 'lightblue',
        margin: 10,
    }

})



