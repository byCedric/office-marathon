import { ActivityIndicator, createThemedComponent, DripsyProvider, Theme, useDripsyTheme } from 'dripsy';
import Constants from 'expo-constants';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

const theme: Theme = {
  colors: {
    background: '#f8f8f8',
    text: 'rgba(0,0,0,0.7)',
    accent: '#333',
  },
  fonts: {
    root: 'open-sans',
  },
  space: [0, 12, 14, 16, 32],
  radii: [1, 2, 4],
};

const fonts = {
  customFonts: {
    'open-sans': {
      bold: 'open-sans-semibold',
      normal: 'open-sans-regular',
      default: 'open-sans-regular',
    },
  },
};

const components: Theme = {
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
    button: {
      primary: {
        color: 'white',
        fontFamily: 'open-sans',
        fontWeight: 'bold',
      },
    },
  },
  buttons: {
    primary: {
      backgroundColor: 'black',
      borderRadius: 2,
      paddingX: 3,
      paddingY: 2
    },
  },
};

export const ThemeProvider: React.FC = (props) => (
  <DripsyProvider theme={{ ...theme, ...fonts, ...components }}>
    {props.children}
  </DripsyProvider>
);

export const Box = createThemedComponent(View, { themeKey: 'layout', defaultVariant: 'box' });
export const Title = createThemedComponent(Text, { themeKey: 'text', defaultVariant: 'title' });
export const Paragraph = createThemedComponent(Text, { themeKey: 'text', defaultVariant: 'paragraph' });

interface ButtonProps {
  children?: string;
  variant?: string;
  disabled?: boolean;
  onPress?: React.ComponentProps<typeof Pressable>['onPress'];
}

const ButtonPressable = createThemedComponent(Pressable, { themeKey: 'buttons', defaultVariant: 'primary' });
const ButtonText = createThemedComponent(Text, { themeKey: 'text.button', defaultVariant: 'primary' });

export const Button: React.FC<ButtonProps> = (props) => (
  <ButtonPressable
    disabled={props.disabled}
    onPress={props.onPress}
    accessibilityRole="button"
  >
    <Box variant='center'>
      <ButtonText variant={props.variant}>
        {props.children}
      </ButtonText>
    </Box>
  </ButtonPressable>
);

export const Spinner: React.FC = (props) => {
  const { theme } = useDripsyTheme();

  return (
    <ActivityIndicator color={theme.colors?.accent} />
  );
};
