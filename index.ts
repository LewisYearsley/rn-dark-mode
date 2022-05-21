import {
  StyleSheet,
  useColorScheme,
  type ViewStyle,
  type TextStyle,
  type ImageStyle,
} from 'react-native'

type DarkModed<TStyles> = {
  [P in keyof TStyles]: TStyles[P] | DarkModeValue<TStyles[P]>
}

type DarkModeStyleDefinition =
  | DarkModed<ViewStyle>
  | DarkModed<TextStyle>
  | DarkModed<ImageStyle>
type StandardStyleDefinition = ViewStyle | TextStyle | ImageStyle
type DarkModeNamedStyles<T> = {
  [P in keyof T]: DarkModeStyleDefinition
}

type StandardStyleSheetParams<T> =
  | StyleSheet.NamedStyles<T>
  | StyleSheet.NamedStyles<any>

type DarkModeStyleSheetParams<T> =
  | DarkModeNamedStyles<T>
  | DarkModeNamedStyles<any>

export class DarkModeValue<TValue> {
  readonly light: TValue
  readonly dark: TValue

  constructor(light: TValue, dark: TValue) {
    this.light = light
    this.dark = dark
  }
}

export type DarkModeStyleSheet<T> = {
  light: StandardStyleSheetParams<T>
  dark: StandardStyleSheetParams<T>
}

export function useIsDarkMode(): boolean {
  return useColorScheme() === 'dark'
}

export function useDarkModeValue<T>(value: DarkModeValue<T>): T {
  return useIsDarkMode() ? value.dark : value.light
}

export function useDarkModeSwitch<TValue>(
  valueLight: TValue,
  valueDark: TValue,
): TValue {
  return useIsDarkMode() ? valueDark : valueLight
}

export function useDarkModeStyleSheet<TDefinition>(
  styles: DarkModeStyleSheet<TDefinition>,
): StandardStyleSheetParams<TDefinition> {
  const isDarkMode = useIsDarkMode()

  return isDarkMode ? styles.dark : styles.light
}

function createStyle(
  values: DarkModeStyleDefinition,
  isDarkMode: boolean,
): StandardStyleDefinition {
  return Object.entries(values).reduce((result, [property, value]) => {
    if (value instanceof DarkModeValue) {
      result[property] = isDarkMode ? value.dark : value.light
    } else {
      result[property] = value
    }

    return result
  }, {} as Record<string, any>)
}

export function createStyleSheet<T extends DarkModeStyleSheetParams<T>>(
  styles: T | DarkModeStyleSheetParams<T>,
): DarkModeStyleSheet<T> {
  const { light, dark } = Object.entries(styles).reduce(
    (sheets, [styleName, values]) => {
      sheets.light[styleName as keyof typeof sheets.light] = createStyle(
        values,
        false,
      )
      sheets.dark[styleName as keyof typeof sheets.dark] = createStyle(
        values,
        true,
      )

      return sheets
    },
    {
      light: {} as StandardStyleSheetParams<T>,
      dark: {} as StandardStyleSheetParams<T>,
    },
  )

  return {
    dark: StyleSheet.create(dark),
    light: StyleSheet.create(light),
  }
}
