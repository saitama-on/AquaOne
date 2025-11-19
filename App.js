import * as React from 'react';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { PaperProvider , IconButton} from 'react-native-paper';
import { Text, View, Button } from 'react-native';
import WelcomePage from './pages/welcome.js'
import HomePage from './pages/home.js'
import ValvePage from './pages/valve.js'
import Notifications from './pages/notification.js'
import SetLimit from './pages/setLimit.js'

// Define the stack statically

const RootStack = createNativeStackNavigator({
  screens: {
    Welcome :{
      screen: WelcomePage,
      options:{headerShown:false}  
    },
    Home:{
      screen:HomePage,
      options:{headerShown:false}
    },
    Notifications:{
      screen:Notifications,
      options:{
        headerStyle:{
          backgroundColor:'#e6ecf2'
        },
        statusBarAnimation:'fade',
        animation:'fade',
        headerTitleAlign:'center'
      }
    },
    SetLimit :{
      screen :SetLimit,
      options:{
        headerShown:false,
        animation:'slide_from_bottom',
        presentation:'transparentModal'
        
        
      },
    }
  },
});

// Create static navigation
const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
  <PaperProvider>
    <Navigation />
  </PaperProvider>
  )
}
