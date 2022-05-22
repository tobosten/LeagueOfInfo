import { StyleSheet } from "react-native";
import { theme } from "../../theme";

const styles = StyleSheet.create({

    //lore
    loreMainContainer: {
        width: "90%",
        alignSelf: "center",
        marginTop: 40
    },
    loreContainer: {
        backgroundColor: theme.mediumBlue,
        borderRadius: 5,
        padding: 15,
        alignItems: "center"
    },
    loreTitle: {
        color: "white",
        fontSize: 24,
        marginBottom: 10,
        alignSelf: "flex-start"
    },

    //abilites
    mainAbilityContainer: {
        backgroundColor: theme.mediumBlue,
        borderRadius: 5,
        padding: 10
    },
    abilitiesContainer: {
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: theme.lighterBlue,
        width: "95%",
        borderColor: theme.orange,
        alignSelf: "center",
        padding: 5,
        marginBottom: 8,
        alignItems: "center"
    },
    abilityView: {
        width: 70,
        alignItems: "center",
        justifyContent: 'center',
        marginHorizontal: 15,
        marginVertical: 10
    },
    abilityText: {
        color: "white",
        textAlign: "center",
        height: 30,
        fontSize: 12,
    },
    abilityImage: {
        height: 70,
        width: 70,
        backgroundColor: "gray",
        borderRadius: 10,
    },

    //base stats
    baseStatsContainer: {
        width: "90%",
        alignSelf: "center",
        backgroundColor: theme.mediumBlue,
        marginBottom: 20,
        borderRadius: 5,
        padding: 15
    },
    baseStatsTitle: {
        color: "white",
        fontSize: 24,
    },
    baseStatsText: {
        color: "white",
        marginVertical: 1,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})

export default styles;