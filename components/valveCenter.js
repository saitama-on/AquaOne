import {View , Text , Dimensions} from "react-native"
import React from "react"
import {Button , Icon , IconButton} from "react-native-paper"
// import { SafeAreaView } from "react-native-safe-area-context"
import {useState , useEffect , useContext} from 'react';
import { getAuth } from "@react-native-firebase/auth";
import { UserContext } from "../App.js";
const { width , height} = Dimensions.get("window");



export default function ValveCenter({currItem , devicesInfo}){


    const [power , setPower] = useState(false);
    const {userInfo , refreshValveInfo} = useContext(UserContext);

    useEffect(()=>{
        const status = devicesInfo[currItem].valve_status == 'close' ? false : true;
        console.log(status)
        setPower(status);
    },[currItem])


    const handlePress = async() =>{
        // alert("press")

        try{
            const action = power ? 'close' : 'open';
            const user = await getAuth().currentUser;
            const token = await user.getIdToken();
            const response = await fetch(`https://api.aquesa.in/api/v1/dwelling/${userInfo?.dwelling[0]?.dwelling_id}/valve`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization' :`Bearer ${token}`
                },
                body : JSON.stringify({
                    device_id : devicesInfo[currItem].device_id,
                    action : action
                })
            });

            const data = await response.json();

            console.log(data);
            if(response.ok){
                setPower((prev)=>{
                    return !prev;
                })

                await refreshValveInfo(userInfo?.dwelling[0].dwelling_id)
            }
            
        }catch(e){
            console.log(e)
        }
    }


    return (

        <View style={{padding:20,height:400 , backgroundColor:'white' ,width:"100%", borderBottomEndRadius:"50%" , borderBottomStartRadius:"50%"}}>
            <View style={{justifyContent:'center', alignItems:'center' ,marginBottom:40}}>
                <View style={{justifyContent:'center' , alignItems:'center' ,borderWidth:3 , borderColor:power? '#339ff8ff':'#7a99b3ff' ,borderRadius:"50%" , height:`${width*0.65}` , width:`${width*0.65}` , backgroundColor:"white"}}>
                    <Text style={{fontSize:30 , fontWeight:600}}>{devicesInfo[currItem].custom_tag}</Text>
                    <Text>Last Closed</Text>
                    <Text>{}</Text>
                </View>
            </View>
            <View style={{borderWidth:12, borderColor:'#e6ecf2ff' ,alignSelf:'center' , justifyContent:'center',borderRadius:"50%" ,height:110, backgroundColor:'white' , width:110}}>
                <IconButton icon="power" size={50} onPress={handlePress} iconColor={power?'#339ff8ff':'grey'} style={{alignSelf:'center'}}>
                </IconButton>
            </View>
            <View style={{marginTop:10 ,justifyContent:'center' , alignItems:'center'}}>
                <Text style={{opacity:0.5}}>Tap to turn {power ? 'off'  : 'on'}</Text>
            </View>

            
        </View>
    )
}