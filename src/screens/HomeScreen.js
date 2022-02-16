import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Alert, Text, View, TouchableOpacity } from 'react-native';
import { Container } from '../components/Container';
import { theme } from '../styles/themes';
import CountryListItem from '../components/CountryListItem'
import EmptyListView from '../components/EmptyListView'
import { getCountries } from '../services/CovidDataService'
import { useSort } from '../utils/useSort';
import { commonStyles } from '../styles/styles';
import { useNavigation } from '@react-navigation/native'
import { setLogout } from '../stores/auth/actions'
import { useDispatch } from 'react-redux';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);

  const sortedCountries = useSort(countries, "Country", false)

  useEffect(() => {
    updateData();

    navigation.setOptions({
      headerRight: () => renderLogout(),
    });
  }, []);

  const updateData = async () => {
    setLoading(true)
    try {
      const { data } = await getCountries()
      setCountries(data)
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

  const onLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Confirm",
          onPress: () => {
            dispatch(setLogout());
          }
        },
        {
          text: "Cancel",
          onPress: () => {
          }
        }
      ]
    );
  }

  const renderLogout = useCallback(() => {
    return <TouchableOpacity onPress={onLogout}>
      <Text style={styles.navButton}>Logout</Text>
    </TouchableOpacity>;
  }, []);

  const renderItem = useCallback(({ item }) => {
    return <CountryListItem item={item} />;
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
      <FlatList
        data={sortedCountries}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        disableVirtualization={true}
        ListEmptyComponent={<EmptyListView />} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    paddingStart: 10,
    paddingEnd: 10
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButton: {
    ...commonStyles.title_h2,
    marginEnd: 10
  }
});

export default HomeScreen;
