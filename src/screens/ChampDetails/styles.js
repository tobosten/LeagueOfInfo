import { StyleSheet } from "react-native";
import { theme } from "../../theme";

const styles = StyleSheet.create({
    mainAbilityContainer: {
        backgroundColor: theme.mediumBlue,
        borderRadius: 5,
        padding: 10
    },
    abilitiesContainer: {
        borderWidth: 1,
        backgroundColor: theme.lighterBlue,
        width: "90%",
        borderColor: theme.orange,
        alignSelf: "center",
        padding: 5
    },
    abilityView: {
        width: 70,
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 3
    },
    abilityText: {
        color: "white",
        fontSize: 12,
        textAlign: "center",
    },
    abilityImage: {
        height: 70,
        width: 70,
        backgroundColor: "gray"
    },
    renderItemImage: {
        height: 60,
        width: 60
    }
})

export default styles;