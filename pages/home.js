import React , {useState  , useEffect, useContext} from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Dashboard from './dashboard.js';
import Profile from './profile.js';
import Valve from './valve.js';
import { getAuth } from '@react-native-firebase/auth';
import { UserContext } from '../App.js';
import { ConsumptionContext } from '../App.js';
// alert(auth);
// console.log(auth);






const HomePage = () => {
  const [index, setIndex] = useState(1);
  const {userInfo , setUserInfo , setValveInfo} = useContext(UserContext);
  const {setConsumptionInfo} = useContext(ConsumptionContext);
  const [routes] = useState([
    { key: 'valve', title: 'Valve', focusedIcon: 'valve' },
    { key: 'home', title: 'Home', focusedIcon: 'home' },
    { key: 'profile', title: 'Profile', focusedIcon: 'account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    valve: Valve,
    home: Dashboard,
    profile: Profile,
  });

  useEffect(()=>{
    const fetchInfo= async()=>{

            try{
                const user = await getAuth().currentUser;
                const token = await user.getIdToken();

                const response = await fetch('https://api.aquesa.in/api/v1/user',{
                    method:'GET',
                    headers:{
                        'Authorization' : `Bearer ${token}`
                        
                    }
                });

                const data = await response.json();
                // console.log(data)
                setUserInfo(data);

                const valveResponse = await fetch(`https://api.aquesa.in/api/v1/dwelling/${data?.dwelling[0]?.dwelling_id}`,{
                  method:'GET',
                  headers:{
                    'Authorization' : `Bearer ${token}`
                  }
                });

                const valveData = await valveResponse.json();
                setValveInfo(valveData);


                const consumptionInfo = await fetch(`https://api.aquesa.in/api/v1/consumption`,{
                  method:'POST',
                  headers:{
                    'Authorization' : `Bearer ${token}`,
                    'Content-Type':'application/json'
                  },
                  body:JSON.stringify({
                    dwelling_id : data?.dwelling[0]?.dwelling_id,
                    start_date : "2025-01-01",
                    end_date : "2025-12-28",
                    aggregation: "day"
                  })
                });

                const consumptionData = await consumptionInfo.json();
                console.log('consumption data' , consumptionData); 
                setConsumptionInfo(consumptionData);
            }catch(e){
                console.log(e);
            }
      }

    fetchInfo();    
  },[]);


  return (


    <BottomNavigation
      
      barStyle={{backgroundColor:'white' , height:90}}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeColor='#7cb2d9'
      inactiveColor='black'
      activeIndicatorStyle={{backgroundColor:'white'}}
      sceneAnimationEnabled={true}
      
    
    />
  );
};

export default HomePage;