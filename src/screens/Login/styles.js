import { StyleSheet } from "react-native";
import { theme } from "../../theme";

const styles = StyleSheet.create({
    titleContainer: {
        flex: 0.7,
        alignItems: "center",
        justifyContent: "center",
    },
    loginContainer: {
        flex: 1.5,
        alignItems: "center",
        width: "80%",
        alignSelf: "center"
    },
    inputContainer: {
        backgroundColor: "white",
        height: 40,
        width: "100%",
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center"
    },
    nameInput: {
    },
    loginButton: {
        backgroundColor: theme.orange,
        width: 100,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginTop: 30
    }
})

export default styles