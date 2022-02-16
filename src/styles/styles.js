import { StyleSheet } from 'react-native';
import { theme } from './themes';

export const commonStyles = StyleSheet.create({
  title_h1: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.colors.onBackground,
  },
  title_h2: {
    fontSize: 16,
    color: theme.colors.onBackground,
  },
  body: {
    fontSize: 16,
    color: theme.colors.onBackgroundSecondary,
  },
  button: {
    minHeight: 48,
    padding: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 5
  },
  bold: {
    fontWeight: 'bold',
  }
});
