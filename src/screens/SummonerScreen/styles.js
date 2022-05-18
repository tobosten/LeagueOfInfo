import { StyleSheet } from "react-native";
import { theme } from "../../theme";



export const styles = StyleSheet.create({

    topContentContainer: {
        borderColor: "white",
        width: "100%"
    },
    summonerIconContainer: {
        flex: 0.7,
        borderColor: "white",
        alignItems: "center",
        justifyContent: "center"
    },
    summonerIcon: {
        

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
    },
    mostPlayedContainer: {
        backgroundColor: theme.mediumBlue,
        width: "90%",
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 5
    },
    highestMasteryText: {
        marginRight: "auto",
        margin: 10,
        color: theme.white,
        fontSize: 20
    }
    
    
    ,
    shadow: {
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})