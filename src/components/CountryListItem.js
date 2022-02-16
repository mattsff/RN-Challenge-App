import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from '../styles/styles';

const getFlagEmoji = countryCode => String.fromCodePoint(...[...countryCode.toUpperCase()].map(x => 0x1f1a5 + x.charCodeAt(0)))

const CountryListItem = ({ item }) => {
  const navigation = useNavigation();

  const onClickOnCountry = () => {
    navigation.navigate('CasesByCountry', {
      country: item
    });
  };

  return (
    <TouchableOpacity onPress={onClickOnCountry}>
      <View style={styles.container}>
        <Text style={styles.flag}>{getFlagEmoji(item.ISO2)}</Text>
        <Text style={commonStyles.title_h2}>{item.Country} <Text style={commonStyles.body}>- {item.ISO2}</Text></Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  flag: {
    marginEnd: 10
  }
});


export default CountryListItem;
