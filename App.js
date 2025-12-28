import * as React from 'react';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { PaperProvider , IconButton} from 'react-native-paper';
import { Text, View, Button } from 'react-native';
import WelcomePage from './pages/welcome.js'
import HomePage from './pages/home.js'
import ValvePage from './pages/valve.js';
import LogoutModal from './pages/logout.js';
import CalendarComp from './pages/calendar.js';
import Notifications from './pages/notification.js'
import SetLimit from './pages/setLimit.js'
import ManageAccountPage from './pages/manageAccounts.js';
import EditProfile from './pages/editProfile.js';
import ChangeName from './pages/changeName.js';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ChangeImage from './pages/changeImage.js';
import { createContext , useState} from 'react';
import {getAuth} from "@react-native-firebase/auth"
import ChangeValveName from './pages/changeValveName.js';
// Define the stack statically

const RootStack = createNativeStackNavigator({
  screens: {
    Welcome :{
      screen: WelcomePage,
      options:{
        headerShown:false,
        animation:'fade',
      }  
    },
    Home:{
      screen:HomePage,
      options:{
        headerShown:false,
        animation:'fade',
      }
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
    },
    ManageAccount:{
      screen:ManageAccountPage,
      options:{
        headerShown:false,
        animation:'simple_push',
        presentation:'transparentModal'
      }
    },
    CalendarPage:{
      screen:CalendarComp,
      options:{
        headerShown:false,
        animation:'slide_from_right',
        presentation:'transparentModal'
      }
    },
    Logout:{
      screen:LogoutModal,
      options:{
        headerShown:false,
        animation:'fade',
        presentation:'transparentModal',
        animationDuration:500
      }
    },
    EditProfile:{
      screen:EditProfile,
      options:{
        headerShown:false,
        animation:'slide_from_bottom',
        presentation:'transparentModal'
      }
    },

    ChangeName:{
      screen:ChangeName,
      options:{
        headerShown:false,
        animation:'slide_from_bottom',
        presentation:'transparentModal'
      }
    },

    ChangeImage:{
      screen:ChangeImage,
      options:{
        headerShown:false,
        animation:'slide_from_bottom',
        presentation:'transparentModal'
      }
    },

    ChangeValveName:{
      screen : ChangeValveName,
      options:{
        headerShown:false,
        animation:'slide_from_bottom',
        presentation:'transparentModal'
      }
    }
  },
});

// Create static navigation
const Navigation = createStaticNavigation(RootStack);
export const UserContext = createContext();
export const ConsumptionContext = createContext();



  
        

export default function App() {

  const [userInfo , setUserInfo] = useState(null);
  const [valveInfo , setValveInfo] = useState(null);
  const [consumptionInfo , setConsumptionInfo] = useState(null);
  const refreshUserInfo = async() => {
  
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
        }catch(e){
            console.log(e);
        }
    }

  const refreshValveInfo = async(dwelling_id) =>{
           try{
            const user = await getAuth().currentUser;
            const token = await user.getIdToken();

            const response = await fetch(`https://api.aquesa.in/api/v1/dwelling/${dwelling_id}`,{
                method:'GET',
                headers:{
                    'Authorization' : `Bearer ${token}`
                    
                }
            });

            const data = await response.json();
            // console.log(data)
            setValveInfo(data);
        }catch(e){
            console.log(e);
        }
  }
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <UserContext.Provider value={{userInfo , setUserInfo , refreshUserInfo , valveInfo , setValveInfo , refreshValveInfo}} >
          <ConsumptionContext.Provider value={{consumptionInfo , setConsumptionInfo}}>
            <Navigation />
        </ConsumptionContext.Provider>
        </UserContext.Provider>
      </PaperProvider>
      
  </SafeAreaProvider>
  )
}
