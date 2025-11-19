import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import {auth} from '../firebase/firebase.js'
import Dashboard from './dashboard.js';
import Profile from './profile.js';
import Valve from './valve.js';


// alert(auth);
// console.log(auth);

const valveRoute = () => <Valve/>;

const homeRoute = () => <Dashboard/>

const profileRoute = () => <Profile/>


const HomePage = () => {
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    { key: 'valve', title: 'Valve', focusedIcon: 'valve' },
    { key: 'home', title: 'Home', focusedIcon: 'home' },
    { key: 'profile', title: 'Profile', focusedIcon: 'account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    valve: valveRoute,
    home: homeRoute,
    profile: profileRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeColor='#7cb2d9'
    
    />
  );
};

export default HomePage;