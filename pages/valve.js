import React from 'react'
import {View , Text} from 'react-native';
import {Button} from 'react-native-paper'
import TopBar from '../components/topbar';
import ValveCenter from '../components/valveCenter';
import ActivityArea from '../components/activity';
import { SafeAreaView } from 'react-native-safe-area-context';

function TextBox({content}){

    return (
        <View style={{elevation:5 ,backgroundColor:'white' , borderRadius:10}}>
            <Button textColor='black' compact style={{ borderRadius:20}}>{content}</Button>
        </View>
    )
}
export default function Valve(){


    return (

        <SafeAreaView style={{flex:1,justifyContent:'flex-start' , alignItems:'center'}}>
            <View style={{paddingLeft:10 , paddingRight:10 ,width:"100%" , backgroundColor:'#e6ecf2' , height:"12%" ,justifyContent:'center', alignItems:'center'}}>
                <TopBar iconName="bell-outline" textContent="testing"/>
            </View>


            <View style={{marginTop:20, width:"90%" , paddingLeft:10 , paddingRight:10}}>
            <View style={{backgroundColor:'white' ,display:'flex' , flexDirection:'row' , justifyContent:'space-between',marginBottom:20}}>
                <TextBox content="kitchen"/>
                <TextBox content="3rd-floor"/>
                <TextBox content="bathroom"/>
                <TextBox content="kitchen"/>
            </View>
            </View>


            <View style={{height:"65%" ,paddingLeft:10 , paddingRight:10 ,width:"100%" , backgroundColor:'#e6ecf2ff', marginBottom:1}}>
                <ValveCenter/>
            </View>
            {/*This area is for activity */}
            <View style={{paddingRight:10 ,paddingLeft:10, width:'100%' , maxHeight:"16%" , backgroundColor:'#e6ecf2ff'}}>
                <ActivityArea/>
            </View>
        </SafeAreaView>
    )
}