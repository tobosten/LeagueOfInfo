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
        width: "90%",
        borderColor: theme.orange,
        alignSelf: "center",
        padding: 5,
        marginBottom: 10
    },
    abilityView: {
        width: 70,
        alignItems: "center",
        justifyContent: 'center',
        marginHorizontal: 10,
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
    },

    //base stats
    baseStatsContainer: {
        width: "100%",
        backgroundColor: theme.mediumBlue,
        marginTop: 20,
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
    }
})

export default styles;