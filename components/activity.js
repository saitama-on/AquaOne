import React from 'react';
import { View} from 'react-native'
import {Text} from 'react-native-paper'


function NoActivity(){

    return (

        <View style={{justifyContent:'center' , alignItems:'center'}}>
            <Text style={{fontSize:18 , opacity:0.5}}> No Activity</Text>
        </View>
    )
}
export default function ActivityArea(){
    const [activity , setActivity] = React.useState([])
    return (
        <View style={{width:'100%' , backgroundColor:'none' , height:'100%' , borderTopStartRadius:20, borderTopEndRadius:20}}>
            <Text style={{ fontWeight:700,fontSize:18 , padding:10 , paddingLeft:20}}>Activity</Text>
            {activity.length == 0 ? <NoActivity/> : <Acitvity activity={activity}/>}
        </View>
    )
}