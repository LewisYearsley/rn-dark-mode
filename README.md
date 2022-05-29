<p align="center">
A tiny and simple helper set to make it easy to switch your styles in React Native when switching between "light" and "dark" mode. 🌟
</p>

<h1 align="center">rn-dark-mode</h1>
<br>

<img src="./demo/screen.gif" width="300"></img>

Maintains typesafety and code completion on par with the normal `StyleSheet.create`.

Creating a dark mode stylesheet simply generates two static react native stylesheets and switches between the two with the complimentary hook.

## Useage

### Create a stylesheet

```javascript
import { createStyleSheet, DarkModeValue } from 'rn-dark-mode'

export default createStyleSheet({
  appContainer: {
    flex: 1,
    backgroundColor: new DarkModeValue(
      '#ffffff', // light
      '#2a2a2a', // dark
    ),
  },
})
```

### Use a stylesheet

```javascript
import React from 'react'
import { Text, SafeAreaView } from 'react-native'
import { useDarkModeStyleSheet } from 'rn-dark-mode'

import stylesheet from './App.styles'

function App(): React.ReactElement {
  const styles = useDarkModeStyleSheet(stylesheet)

  return (
    <SafeAreaView style={styles.appContainer}>
      <Text>Hello</Text>
    </SafeAreaView>
  )
}

export default App
```

### Check if dark mode or not

```javascript
import React from 'react'
import { Text, SafeAreaView } from 'react-native'
import { useIsDarkMode } from 'rn-dark-mode'

function App(): React.ReactElement {
  const isDarkMode = useIsDarkMode()

  return (
    <SafeAreaView>
      <Text>{isDarkMode ? 'It sure is dark in here' : 'Rise and shine'}</Text>
    </SafeAreaView>
  )
}

export default App
```

### Switch between two arbitrary values

```javascript
import React from 'react'
import { Text, SafeAreaView } from 'react-native'
import { useDarkModeSwitch } from 'rn-dark-mode'

function App(): React.ReactElement {
  const text = useDarkModeSwitch(
    'Rise and shine', // light
    'It sure is dark in here', // dark
  )

  return (
    <SafeAreaView>
      <Text>{text}</Text>
    </SafeAreaView>
  )
}

export default App
```

### Use a dark mode value to switch values

```javascript
import React from 'react'
import { Text, SafeAreaView } from 'react-native'
import { useDarkModeValue, DarkModeValue } from 'rn-dark-mode'

const BACKGROUND_COLOR = new DarkModeValue(
  '#ffffff', // light
  '#000000', // dark
)

function App(): React.ReactElement {
  const backgroundColor = useDarkModeValue(BACKGROUND_COLOR)

  return (
    <SafeAreaView style={{ backgroundColor }}>
      <Text>Hello</Text>
    </SafeAreaView>
  )
}

export default App
```

## Requirements

---

React Native >= 0.62.0
