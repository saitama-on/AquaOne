import React from 'react'
import {View , Text , ScrollView, SafeAreaViewBase} from 'react-native'
import {Icon} from 'react-native-paper'
import { SafeAreaProvider , SafeAreaView } from 'react-native-safe-area-context'

function ValveComp({props}){

    // alert(props);
    return (
        <View style={{elevation:5 ,padding:10 ,borderRadius:10 , width:'100%' , display:'flex' , flexDirection:'row' , marginBottom:10 , backgroundColor:'white' , alignItems:'center'}}>
            <View style={{marginRight:10 , width:'20%', justifyContent:'center', alignItems:'center'}}>
                <Icon source={props.open ? 'water' : 'water-off'} color='#7cb2d9' size={40}></Icon>
            </View>
            <View>
                <Text style={{fontSize:18 , fontWeight:600}}>Valve {props.open ? 'open' : 'close'}</Text>
                <Text>-- On {props.location}</Text>
                <Text>-- By {props.person}</Text>
            </View>
            <View style={{marginLeft:'auto' ,paddingRight:10}}>
                <Text style={{opacity:0.5}}>{props.time}</Text>
            </View>
        </View>
    )
}

export default function Notifications(){


    const valveMap = [
        {
            date:'19 Dec 2024',
            notifications: [
                {
                    open:false,
                    location:'office',
                    person:'PG',
                    time:'11:34PM'
                }
            ]
        }
        ,
        {
            date:'17 Dec 2024',
            notifications: [
                {
                    open:false,
                    location:'3rd-floor',
                    person:'PG',
                    time:'1:30PM'
                },
                {
                    open:true,
                    location:'3rd-floor',
                    person:'PG',
                    time:'1:30PM'
                }
            ]
        },
        {
            date:'16 Dec 2024',
            notifications: [
                {
                    open:false,
                    location:'3rd-floor',
                    person:'PG',
                    time:'1:30PM'
                },
                {
                    open:true,
                    location:'3rd-floor',
                    person:'PG',
                    time:'1:30PM'
                }
            ]
        },
        {
            date:'10 Dec 2024',
            notifications: [
                {
                    open:false,
                    location:'3rd-floor',
                    person:'PG',
                    time:'1:30PM'
                },
                {
                    open:true,
                    location:'3rd-floor',
                    person:'PG',
                    time:'1:30PM'
                }
            ]
        }
    ]

    return (
        <SafeAreaProvider>
        <SafeAreaView>
        <ScrollView  style={{height:'100%'  , padding:20 , backgroundColor:'#e6ecf2'}}>
            <View style={{width:'100%', backgroundColor:'none'}}>
                {valveMap.map((item, key)=>{
                    return (
                        <View key={key} style={{padding:10 , marginBottom:5}}> 
                            <Text style={{fontSize:15, fontWeight:600 ,marginBottom:7}}>{item.date}</Text>
                            {item.notifications.map((notif , key)=>{
                                
                                return <ValveComp props={notif}/>
                            })}
                        </View>
                    )
                })}
            </View>
        </ScrollView>
        </SafeAreaView>
        </SafeAreaProvider>
    )
}