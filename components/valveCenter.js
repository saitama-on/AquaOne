import {View , Text , Dimensions} from "react-native"
import React from "react"
import {Button , Icon , IconButton} from "react-native-paper"
// import { SafeAreaView } from "react-native-safe-area-context"

const { width , height} = Dimensions.get("window");



export default function ValveCenter({power , setPower, currItem , locations}){

    const handlePress = () =>{
        // alert("press")
        setPower((prev)=>{
            return !prev;
        })
    }

    return (

        <View style={{padding:20,height:"80%" , backgroundColor:'white' ,width:"100%", borderBottomEndRadius:"50%" , borderBottomStartRadius:"50%"}}>
            <View style={{justifyContent:'center', alignItems:'center' ,marginBottom:40}}>
                <View style={{justifyContent:'center' , alignItems:'center' ,borderWidth:3 , borderColor:power? '#339ff8ff':'#7a99b3ff' ,borderRadius:"50%" , height:`${width*0.65}` , width:`${width*0.65}` , backgroundColor:"white"}}>
                    <Text style={{fontSize:30 , fontWeight:600}}>{locations[currItem].loc}</Text>
                    <Text>Last Closed</Text>
                    <Text>{locations[currItem].lc}</Text>
                </View>
            </View>
            <View style={{borderWidth:12, borderColor:'#e6ecf2ff' ,top:"1%" ,alignSelf:'center' , justifyContent:'center',borderRadius:"50%" ,height:110, backgroundColor:'white' , width:110}}>
                <IconButton icon="power" size={50} onPress={handlePress} iconColor={power?'black':'grey'} style={{alignSelf:'center'}}>
                </IconButton>
            </View>
            <View style={{marginTop:10 ,justifyContent:'center' , alignItems:'center'}}>
                <Text style={{opacity:0.5}}>Tap to turn {power ? 'off'  : 'on'}</Text>
            </View>

            
        </View>
    )
}