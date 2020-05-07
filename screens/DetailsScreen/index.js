import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Platform,
  Animated
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import styled from 'styled-components';
import { SharedElement } from 'react-navigation-shared-element';
import { t } from 'react-native-tailwindcss';
import { Entypo, Octicons } from '@expo/vector-icons';

import { Ratings } from '../HomeScreen';

const StyledView = styled(View)`
  ${[t.flex1, t.bgWhite]}
`;

const ContentView = styled(View)`
  ${[t.p4]}
`;

const AnimatedContentView = Animated.createAnimatedComponent(ContentView);

const TitleText = styled(Text)`
  ${[
    t.textBlue800,
    t.fontBold,
    t.leadingLoose,
    t.trackingWide,
    t.text2xl,
    t.mB1
  ]}
`;

const Row = styled(View)`
  ${[t.flexRow]}
`;

const DateText = styled(Text)`
  ${[t.textGray700, t.fontLight, t.mT1, t.textBase, t.italic, t.trackingWide]}
`;

const ParagraphText = styled(Text)`
  ${[t.textGray900, t.textXl, t.leadingRelaxed, t.trackingWide, t.mB3]}
`;

const HandleText = styled(Text)`
  ${[t.textBlue900, t.textXl, t.fontBold, t.trackingWider, t.mB1]}
`;

const IntroText = styled(Text)`
  ${[t.textGray700, t.textBase, t.trackingWider]}
`;

const Quote = styled(Text)`
  ${[
    t.textBlue900,
    t.text2xl,
    t.leadingLoose,
    t.fontBold,
    t.trackingWide,
    t.mX2
  ]}
`;

const BackButton = styled(TouchableOpacity)`
  ${[t.absolute, t.bgGray200, t.p2, t.roundedFull]}
`;

const Details = ({ navigation }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      delay: 300,
      useNativeDriver: true
    }).start();
  }, []);
  const { item } = navigation.state.params;
  const transform = [
    {
      translateX: fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [10, 0]
      })
    }
  ];
  return (
    <StyledView>
      <ScrollView bounces={false}>
        <SharedElement id={item.title}>
          <Image
            source={{ uri: item.hero, cache: 'default' }}
            style={[t.roundedTLg, { height: 300, width: '100%' }]}
            resizeMode="cover"
          />
        </SharedElement>

        <AnimatedContentView style={{ opacity: fadeAnim, transform }}>
          <TitleText>{item.title}</TitleText>
          <Ratings large rating={item.rating} />
          <Row style={[t.mT1]}>
            <DateText>Reviewed- </DateText>
            <DateText>{item.date}</DateText>
          </Row>
          <View style={[t.mT5]}>
            <ParagraphText>{item.content[0]}</ParagraphText>
            <View style={[t.mX2]}>
              <Octicons
                name="quote"
                style={[t.text3xl, t.textBlue800, t.mR4, t.mB2]}
              />
              <Quote
                style={{
                  fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif'
                }}
              >
                {item.quote}
              </Quote>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[t.flexRow, t.mB4, t.mT3, t.mX2]}
              onPress={() =>
                WebBrowser.openBrowserAsync(
                  'https://www.instagram.com/whatbonniereads/'
                )
              }
            >
              <Image
                source={{
                  uri:
                    'https://instagram.fblr11-1.fna.fbcdn.net/v/t51.2885-19/s320x320/94357967_1522454014591170_7674605502772281344_n.jpg?_nc_ht=instagram.fblr11-1.fna.fbcdn.net&_nc_ohc=PLUm3kLDeCkAX8Ay5Wd&oh=05b60bd288a7e4a4bd0403cf6413e7ee&oe=5ED8C896',
                  cache: 'default'
                }}
                style={[t.roundedFull, { height: 65, width: 65 }]}
                resizeMode="cover"
              />
              <View style={[t.justifyCenter, t.mL4]}>
                <HandleText>@whatbonniereads</HandleText>
                <IntroText>Book Reviewer</IntroText>
              </View>
            </TouchableOpacity>
            <ParagraphText>{item.content[1]}</ParagraphText>
          </View>
        </AnimatedContentView>
      </ScrollView>
      <BackButton
        onPress={() => navigation.goBack()}
        style={{ top: 30, left: 10, height: 40, width: 40 }}
      >
        <Entypo name="cross" style={[t.text2xl]} />
      </BackButton>
    </StyledView>
  );
};

Details.sharedElements = (navigation, otherNavigation, showing) => {
  const item = navigation.getParam('item');
  return [item.title];
};

export default Details;
