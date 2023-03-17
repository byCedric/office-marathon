import { ActivityIndicator, createThemedComponent, DripsyProvider, makeTheme } from 'dripsy';
import Constants from 'expo-constants';
import { ComponentProps, PropsWithChildren } from 'react';
import { Pressable, Text, View } from 'react-native';

const theme = makeTheme({
  types: {
    strictVariants: true,
  },
  colors: {
    background: '#f8f8f8',
    text: 'rgba(0,0,0,0.7)',
    accent: '#333',
  },
  space: [0, 12, 14, 16, 32],
  radii: [1, 2, 4],
  fonts: {
    root: 'open-sans',
  },
  customFonts: {
    'open-sans': {
      bold: 'open-sans-semibold',
      normal: 'open-sans-regular',
      default: 'open-sans-regular',
    },
  },
  layout: {
    page: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: 'background',
      padding: 4,
    },
    box: {
      paddingY: 1,
    },
    center: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  text: {
    title: {
      fontSize: 24,
      lineHeight: 36,
      fontWeight: 'bold',
      color: 'black',
    },
    paragraph: {
      fontSize: 18,
      lineHeight: 26,
      color: 'text',
      paddingY: 6,
    },
  },
  buttons: {
    primary: {
      backgroundColor: 'black',
      borderRadius: 2,
      paddingX: 3,
      paddingY: 0
    },
    ['primary-text']: {
      color: 'white',
      fontFamily: 'open-sans',
      fontWeight: 'bold',
    },
  },
});

export function ThemeProvider(props: PropsWithChildren) {
  return (
    <DripsyProvider theme={theme}>
      {props.children}
    </DripsyProvider>
  );
}

export const Box = createThemedComponent(View, { themeKey: 'layout', defaultVariant: 'box' });
export const Title = createThemedComponent(Text, { themeKey: 'text', defaultVariant: 'title' });
export const Paragraph = createThemedComponent(Text, { themeKey: 'text', defaultVariant: 'paragraph' });

type ButtonProps = PropsWithChildren<{
  variant?: string;
  disabled?: boolean;
  onPress?: ComponentProps<typeof Pressable>['onPress'];
}>;

const ButtonPressable = createThemedComponent(Pressable, { themeKey: 'buttons', defaultVariant: 'primary' });
const ButtonText = createThemedComponent(Text, { themeKey: 'buttons', defaultVariant: 'primary-text' });

export function Button(props: ButtonProps) {
  return (
    <ButtonPressable
      disabled={props.disabled}
      onPress={props.onPress}
      accessibilityRole="button"
    >
      <Box variant="center">
        <ButtonText variant={`${props.variant}-text`}>
          {props.children}
        </ButtonText>
      </Box>
    </ButtonPressable>
  );
}

export function Spinner() {
  return <ActivityIndicator color="accent" />;
}
