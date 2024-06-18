/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import styled, {ThemeProvider} from 'styled-components/native';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const SectionContainer = styled.View`
  margin-top: 32px;
  padding-left: 24px;
  padding-right: 24px;
`;
const SectionTitle = styled.Text`
  font-size: 24em;
  font-weight: 600;
  color: ${props => props.theme.color.text.title};
`;
const SectionDescription = styled.Text`
  margin-top: 8px;
  font-size: 18em;
  font-weight: 400;
  color: ${props => props.theme.color.text.body};
`;

const lightTheme = {
  color: {
    text: {
      title: Colors.black,
      body: Colors.dark,
    },
  },
};
const darkTheme = {
  color: {
    text: {
      title: Colors.white,
      body: Colors.light,
    },
  },
};

function Section({children, title}: SectionProps): React.JSX.Element {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={theme}>
      <SectionContainer>
        <SectionTitle>{title}</SectionTitle>
        <SectionDescription>{children}</SectionDescription>
      </SectionContainer>
    </ThemeProvider>
  );
}

const HighlightText = styled.Text`
  font-weight: 700;
`;

function Sample(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <HighlightText>App.tsx</HighlightText> to change this screen
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Sample;
