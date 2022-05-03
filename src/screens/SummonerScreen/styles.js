import { StyleSheet } from "react-native";
import { theme } from "../../theme";



export const styles = StyleSheet.create({

    topContentContainer: {
        borderColor: "white",
        width: "100%",
        height: 200,
        flexDirection: "row"
    },
    summonerIconContainer: {
        flex: 0.7,
        borderColor: "white",
        alignItems: "center",
        justifyContent: "center"
    },
    summonerIcon: {
        height: 100,
        width: 100,
        borderRadius: 5,
        marginBottom: 7,
        /* borderWidth: 1,
        borderColor: theme.orange */
    },
    summonerLevelText: {
        color: theme.orange,
        backgroundColor: theme.mediumBlue,
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 3,
    },
    summonerNameContainer: {
        flex: 1,
        borderColor: "white",
        alignItems: "center",
        justifyContent: "center"
    },
    summonerNameText: {
        color: theme.white,
        fontSize: 26,
        backgroundColor: theme.mediumBlue,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
        borderWidth: 1,
        marginRight: 10,
        borderColor: theme.orange
    },

    rankedSoloContainer: {
        backgroundColor: theme.mediumBlue,
        width: "90%",
        alignSelf: "center",
        marginVertical: 40,
        borderRadius: 5
    },
    rankedSoloText: {
        color: theme.white,
        margin: 10,
        fontSize: 20
    },
    rankViewContainer: {
        flexDirection: "row"
    },
    rankContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
    },
    rankTextContainer: {
        borderWidth: 1,
        borderColor: theme.orange,
        borderRadius: 5,
        backgroundColor: theme.lighterBlue, 
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 30
    },
    rankText: {
        color: theme.white,
        fontSize: 18,
        textAlign: "center"
    }
})