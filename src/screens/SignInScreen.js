
import React, { useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet, Platform } from 'react-native';
import Logo from '../assets/logo.png';
import { Container } from '../components/Container';
import { commonStyles } from '../styles/styles';
import { setUser } from '../stores/auth/actions';
import { useDispatch, useSelector } from 'react-redux';

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';

const isAndroid = Platform.OS === 'android';

const SignInScreen = () => {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['email']
        });
        signOut();
    }, []);

    const signIn = async () => {
        try {
            setLoading(true)
            await signOut();
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            await signOut();

            dispatch(setUser(userInfo.user));
        } catch (error) {
            if (error) console.log(error)
            setLoading(false)
            dispatch({ type: 'logout' });
            if (error.code != statusCodes.SIGN_IN_CANCELLED && error.code != statusCodes.IN_PROGRESS)
                handleError(error)
        }
    }

    const signOut = async () => {
        try {
            GoogleSignin.signOut();
        } catch (error) {
            if (error) console.log(error)
        }
    }


    const handleError = (error) => {
        Alert.alert(
            "Error",
            "There was an error trying to access with your account. Please, try again.",
            [
                {
                    text: "Accept",
                    onPress: () => {
                    }
                }
            ]
        );
    }

    return (
        <Container style={styles.container}>
            <View>
                <Image source={Logo} style={styles.logo} resizeMode="contain" />
            </View>
            <View style={styles.titleContainer}>
                <Text style={commonStyles.title_h1}>Covid RN Challenge App</Text>
            </View>
            <GoogleSigninButton
                style={styles.loginButton}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                disabled={isLoading}
                onPress={signIn}
            />
        </Container>
    );
};


const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleContainer: {
        flexGrow: 1,
        marginTop: 15,
    },
    logo: {
        height: 150
    },
    loginButton: {
        marginBottom: 40
    }
});


export default SignInScreen;

