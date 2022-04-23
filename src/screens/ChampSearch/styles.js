import { StyleSheet } from "react-native";
import { theme } from "../../theme";

const styles = StyleSheet.create({
    mainContainer: {
        height: "100%",
        width: "100%",
        backgroundColor: theme.darkBlue,
        alignItems: "center"
    },
    topContainer: {
        width: "100%",
        height: 100,
        alignItems: "center",
        borderColor: "white"
    },
    inputContainer: {
        width: "80%",
        height: 40,
        backgroundColor: "white",
        marginTop: 40,
        flexDirection: "row",
        borderRadius: 5
    },
    searchField: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16
    },
    searchImage: {
        height: 30,
        width: 30,
    },
    dividerView: {
        width: 1,
        backgroundColor: "lightgray",
        height: "80%",
        alignSelf: "center"
    },
    magGlass: {
        alignSelf: "center",
        marginHorizontal: 10
    },
    botContainer: {
        flexDirection: "row",
        marginHorizontal: "auto",
        width: "90%",
        paddingLeft: 15,
        marginTop: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    loadingTrue: {
        alignItems: "center",
        justifyContent: 'center',
        height: 70, width: 70,
        alignSelf: "center",
        marginTop: 30
    },
    renderItemImage: {
        height: 70,
        width: 70,
        backgroundColor: "gray",
        borderWidth: 1,
        borderColor: "white"
    },
    renderItemName: {
        color: "white",
        textAlign: "center"
    },
    renderItemButton: {
        alignItems: "center",
        justifyContent: "center",
    }
})

export default styles