import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

const EmptyListView = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>There is no information to show</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 60
    },
    text: {
        textAlign: "center",
        fontSize: 16,
        color: "black"
    }
});
export default EmptyListView;
