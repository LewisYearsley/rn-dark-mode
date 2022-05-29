import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import { createStyleSheet, DarkModeValue, useDarkModeStyleSheet } from 'rn-dark-mode'
import { LIGHT, DARK } from './src/constants/colors'

const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DarkModeValue(LIGHT, DARK),
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: new DarkModeValue(DARK, LIGHT),
    margin: 24,
    textAlign: 'center',
    fontSize: 18
  }
})

export default function App() {
  const styles = useDarkModeStyleSheet(stylesheet)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Go to the System Settings and toggle the Dark Appearence 💅🏻</Text>
      <StatusBar style="auto" />
    </View>
  )
}
