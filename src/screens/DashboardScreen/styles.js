import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        flexDirection: "column",
        paddingHorizontal: 15,
        paddingVertical: 22,
        fontFamily: 'monospace'
    },

    title: {
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingVertical: 10,
        alignItems: 'center'
    },
    titleLabel: {
        color: '#0047AB',
        fontWeight: 'bold',
        fontSize: 16,
    },
    titleValue: {
        fontWeight: 'bold',
        fontSize: 17,
        color: "#581845"
    },
    scheduleWrapper: {
        // backgroundColor: '#89CFF0',
        borderRadius: 8,
        height: 200,
    },
    imgBg: {
        flex: 1,
        width: null,
        height: null,
    }
});

export default styles;
