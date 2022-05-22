import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { theme } from '../theme'

const LoginButton = ({ onPress }) => {
    return (
        <View>
            <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }} onPress={onPress}>
                <Image
                    source={require("../assets/buttons/login_button.png")}
                    style={{ width: 200, height: 70 }}
                />
                <Text style={{ color: theme.white, fontSize: 20, position: "absolute", paddingBottom: 5 }}>Login</Text>
            </TouchableOpacity>

        </View>
    )
}

export default LoginButton