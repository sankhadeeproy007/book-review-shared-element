// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import { t } from 'react-native-tailwindcss';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';

const AppNavigator = createSharedElementStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Explore'
      }
    },
    Details: {
      screen: DetailsScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: [t.shadow],
      headerTitleStyle: [t.textBlue800, t.textLg, t.fontBold]
    }
  }
);

export default createAppContainer(AppNavigator);

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Explore"
//           component={HomeScreen}
//           options={{
//             headerStyle: [t.shadow],
//             headerTitleStyle: [t.textBlue800, t.textLg, t.fontBold]
//           }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;
