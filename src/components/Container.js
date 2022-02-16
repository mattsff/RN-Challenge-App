import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {theme} from '../styles/themes';

export const Container = ({ children, style }) => {
    return (
        <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        flex: 1,
    },
});
