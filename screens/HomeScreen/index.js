import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import styled from 'styled-components';
import { t } from 'react-native-tailwindcss';
import { FontAwesome } from '@expo/vector-icons';

import data from '../../data';

const StyledView = styled(View)`
  ${[t.flex1]}
`;

const CardContainer = styled(TouchableOpacity)`
  ${[t.roundedLg, t.flex1, t.shadowLg, t.bgWhite]}
`;

const TextContainer = styled(View)`
  ${[t.p3]}
`;

const TitleText = styled(Text)`
  ${[t.textBlue800, t.fontBold, t.leadingTight, t.trackingWide]}
`;

const DateText = styled(Text)`
  ${[t.textGray600, t.fontLight, t.mT1, t.textSm]}
`;

const RatingText = styled(Text)`
  ${[t.textGray800, t.mT2]}
`;

const RatingStar = styled(FontAwesome)`
  ${[t.textRed600, t.mR1]}
`;

export const Ratings = ({ rating, large }) => {
  const filledStarArray = [...Array(Math.floor(rating)).keys()];
  const emptyStarArray = [...Array(5 - Math.ceil(rating)).keys()];
  return (
    <>
      <View style={[t.flexRow, t.mT2]}>
        {filledStarArray.map((i) => (
          <RatingStar
            key={i}
            name="star"
            style={large ? [t.textXl, t.mR2] : []}
          />
        ))}
        {!!(rating - Math.floor(rating)) && (
          <RatingStar
            name="star-half-o"
            style={large ? [t.textXl, t.mR2] : []}
          />
        )}
        {emptyStarArray.map((i) => (
          <RatingStar
            key={i}
            name="star-o"
            style={large ? [t.textXl, t.mR2] : []}
          />
        ))}
      </View>
    </>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <StyledView>
      <FlatList
        data={data}
        contentContainerStyle={[t.p4]}
        style={[t.bgGray300]}
        numColumns={2}
        renderItem={({ item, index }) => (
          <CardContainer
            activeOpacity={0.8}
            style={[index % 2 !== 0 ? [t.mL4] : {}, index > 1 ? [t.mT4] : {}]}
            onPress={() => navigation.navigate('Details', { item })}
          >
            <SharedElement id={item.title}>
              <Image
                style={[t.roundedTLg, { height: 220, width: '100%' }]}
                resizeMode="cover"
                source={{ uri: item.hero, cache: 'default' }}
              />
            </SharedElement>
            <TextContainer>
              <TitleText numberOfLines={2}>{item.title}</TitleText>
              <Ratings rating={item.rating} />
              <DateText>{item.date}</DateText>
            </TextContainer>
          </CardContainer>
        )}
        keyExtractor={(item) => item.id}
      />
    </StyledView>
  );
};

export default HomeScreen;
