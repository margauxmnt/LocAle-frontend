import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native'
import { Input } from 'react-native-elements'



export default function Log(props) {

    /*Log*/
    const [display, setDisplay] = useState('flex')
    const [displayTwo, setDisplayTwo] = useState('flex')

    const toogle = () => {
        console.log('clic1')
        display === 'flex' ? setDisplay('none') : setDisplay('flex')
    }

    const toogleTwo = () => {
        console.log('clic2')
        displayTwo === 'flex' ? setDisplayTwo('none') : setDisplayTwo('flex')
    }


    

    /*SignUp*/
    const [signUpPseudo, setSignUpPseudo] = useState('')
    const [signUpEmail, setSignUpEmail] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')

    const [listErrorsSignup, setErrorsSignup] = useState([])


    var handleSubmitSignup = async () => {


        const data = await fetch('http://192.168.1.111:3000/users/sign-up', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `pseudo=${signUpPseudo}&email=${signUpEmail}&password=${signUpPassword}`
        })

        const body = await data.json()

        if (body.result == true) {
            props.addToken(body.token)
            setUserExists(true)

        } else {
            setErrorsSignup(body.error)
        }
    }

    /*Sign In*/
    const [signInEmail, setSignInEmail] = useState('')
    const [signInPassword, setSignInPassword] = useState('')

    const [listErrorsSignin, setErrorsSignin] = useState([])


    let handleSubmitSignin = async () => {
 
        const data = await fetch('http://192.168.1.111:3000/users/sign-in', {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: `email=${signInEmail}&password=${signInPassword}`
        })
    
        const body = await data.json()
    
        if(body.result == true){
          props.addToken(body.token)
          setUserExists(true)
          
        }  else {
          setErrorsSignin(body.error)
        }
      }
    
      let tabErrorsSignin = listErrorsSignin.map((error,i) => {
        return(<Text>{error}</Text>)
      })



    return (
        <>

            <View style={{ display: display, height: '100%', justifyContent: 'center', alignItems: 'center' }}>

                <View>
                    <Image source={require('../assets/logo_matth_transparent.png')} style={styles.logo} />
                </View>


                <View>

                    <View style={styles.backgroundTexte}>
                        <Button onPress={() => toogle()} style={styles.email} color="#fff" title="Adresse mail"></Button>
                    </View>

                    <View style={styles.backgroundTexte}>
                        <Text style={styles.email}>Facebook</Text>
                    </View>

                    <View style={styles.backgroundTexte}>
                        <Text style={styles.email}>Google</Text>
                    </View>

                </View>

            </View>



            <View style={{ display: displayTwo, height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#194454' }}>

                <View>
                    <Image source={require('../assets/logo_matth_transparent.png')} style={styles.logo} />
                </View>


                <View>

                    <View style={styles.backgroundColorInput}>
                        <Input style={styles.input} onChangeText={(value) => setSignUpPseudo(value)} value={signUpPseudo} placeholder='Pseudo'></Input>
                        <Input style={styles.input} onChangeText={(value) => setSignUpEmail(value)} value={signUpEmail} placeholder='Email'></Input>
                        <Input style={styles.input} onChangeText={(value) => setSignUpPassword(value)} value={signUpPassword} placeholder='Mot de passe'></Input>
                    </View>



                    <View style={styles.button}>
                        <Button color="#fff" title="Valider" onPress={() => handleSubmitSignup()}></Button>
                    </View>

                    <View style={styles.compte}>
                        <Button color="#fff" title='Déjà un compte ?' textAlign='left' onPress={() => toogleTwo()}></Button>
                    </View>

                </View>

            </View>



            <View style={{ display: 'flex', height:'100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#194454' }}>

                <View>
                    <Image source={require('../assets/logo_matth_transparent.png')} style={styles.logo} />
                </View>


                <View style={styles.containerButton}>

                    <View>
                        <View style={styles.backgroundColorInput}>
                            <Input style={styles.input} onChangeText={(value) => setSignInEmail(value)} value={signInEmail} placeholder='Email'></Input>
                            <Input style={styles.input} onChangeText={(value) => setSignInPassword(value)} value={signInPassword} placeholder='Mot de passe'></Input>
                        </View>



                        <View style={styles.button}>
                            <Button color="#fff" title="Valider" onPress={() => handleSubmitSignin()}></Button>
                        </View>


                    </View>

                </View>

            </View>

        </>
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
    }

})



