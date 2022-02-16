import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Alert, View, TouchableOpacity, Text } from 'react-native';
import { Container } from '../components/Container';
import { theme } from '../styles/themes';
import CasesByDayListItem from '../components/CasesByDayListItem'
import EmptyListView from '../components/EmptyListView'
import { getCasesByCountry, getCountries } from '../services/CovidDataService'
import { useSort } from '../utils/useSort';

const CasesByCountryScreen = ({ navigation, route }) => {
  const country = route.params.country

  const [isLoading, setLoading] = useState(false);
  const [cases, setCases] = useState([]);
  const [orderBy, setOrderBy] = useState('Cases');
  const [desc, setDesc] = useState(true);
  const sortedData = useSort(cases, orderBy, desc)

  useEffect(() => {
    navigation.setOptions({
      title: country.Country
    });

    updateData();

  }, []);


  const updateData = async () => {
    setLoading(true)
    try {
      const { data } = await getCasesByCountry(country.Slug)
      setCases(data)
    } catch (error) {
      if (error) console.log(error)
      handleError(error)
    }
    setLoading(false)
  }


  const handleError = (error) => {
    Alert.alert(
      'Error',
      'There was an error trying to get the information. Please, try again',
      [
        { text: 'Accept', onPress: () => { } },
      ],
      {
        cancelable: true
      }
    );
  }

  const onSwitchDes = () => {
    setDesc(!desc);
  };

  const onSwitchOrder = () => {
    const order = orderBy === 'Date' ? 'Cases' : 'Date';
    setOrderBy(order);
  };

  const renderItem = useCallback(({ item }) => {
    return <CasesByDayListItem item={item} />;
  }, []);

  const renderSeparator = useCallback(() => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: theme.colors.divider
        }}
      />
    );
  });

  if (isLoading) {
    return (
      <Container style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={theme.colors.primary} />
      </Container>
    );
  }

  return (
    <Container style={styles.container}>

      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={onSwitchOrder}>
          <Text style={styles.text}>
            Sort by{' '}
            <Text style={styles.textButton}>
              {orderBy === 'Date' ? 'Date' : 'Cases'}
            </Text>
          </Text>
        </TouchableOpacity>
        <Text style={styles.text}> - </Text>
        <TouchableOpacity
          onPress={onSwitchDes}>
          <Text style={[styles.textButton]}>
            {desc ? 'Descending' : 'Ascending'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={sortedData}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        disableVirtualization={true}
        ListEmptyComponent={<EmptyListView />}
      />


    </Container>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    paddingStart: 10,
    paddingEnd: 10
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: theme.colors.divider,
    borderBottomWidth: 1
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  textButton: {
    color: theme.colors.primary,
    fontWeight: 'bold'
  }
});


export default CasesByCountryScreen;
