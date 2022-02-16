import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { commonStyles } from '../styles/styles';
import { theme } from '../styles/themes';

const CasesByDayListItem = ({ item }) => {
  const date = new Date(item.Date).toLocaleDateString('es-AR');
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.date}>{date} - </Text>
      </View>
      <Text style={styles.cases}>{item.Cases} casos </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    ...commonStyles.body,
    color: theme.colors.onBackground,
    width: 100
  },
  cases: {
    ...commonStyles.body,
    fontWeight: 'bold',
    color: theme.colors.onBackground,
  }
});


export default CasesByDayListItem;
