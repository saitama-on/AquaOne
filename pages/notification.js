import React , {useState , useEffect} from 'react'
import { getAuth } from '@react-native-firebase/auth'
import {View , Text , ScrollView, SafeAreaViewBase} from 'react-native'
import {Icon} from 'react-native-paper'
import { SafeAreaProvider , SafeAreaView } from 'react-native-safe-area-context'

export function ValveComp({props}){

    // alert(props);
    return (
        <View style={{elevation:0 ,padding:10 ,borderRadius:10 , width:'100%' , 
        display:'flex' , flexDirection:'row' , marginBottom:10 , backgroundColor:'white' ,
         alignItems:'center' , justifyContent:'space-around'}}>
            <View style={{marginRight:10,width:'15%', alignItems:'center'}}>
                
                <Icon source={require('../assets/waterLeak.png')} color='#95d0faff' size={30}></Icon>
            </View>
            <View style={{width:'60%'}}>
                <Text style={{fontSize:16 , fontWeight:600}}>{props.title}</Text>
                <Text style={{opacity:0.8}}> {props.body}</Text>
                
            </View>
            <View style={{marginLeft:'auto' ,paddingRight:10}}>
                <Text style={{opacity:0.5}}>{props.timestamp}</Text>
            </View>
        </View>
    )
}

export default function Notifications(){

    const [info , setInfo] = useState(null);
    const [valveData , setValveData] = useState(null);
    // const [token , setToken] = useState(null);
    useEffect(()=>{

        console.log('Fetching info and valve data');
        const fetchInfo = async()=>{
            try{
                const user = await getAuth().currentUser;
                // console.log('User Info' , user);
                const token = await user.getIdToken();
                
                // console.log('token is :' , token);
                const response = await fetch('https://api.aquesa.in/api/v1/user',{
                    method:'GET',
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                    const responseValve = await fetch(`https://api.aquesa.in/api/v1/activity/${data?.dwelling[0]?.dwelling_id}`,{
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`

                    }
                });

                const dataValve = await responseValve.json();
                // console.log('Valve Data' , dataValve);
                if(dataValve.logs == null){
                    setValveData([]);
                    return;
                }
                setValveData(dataValve);


                // console.log(data);
                // setInfo(data);
                // console.log(data);
            }
            catch(e){
                console.log(e);
            }
        };

        fetchInfo();
    },[]);

    useEffect(()=>{
        console.log('Valve Data Updated' , valveData);
    } , [valveData])

   


    const valveMap = [
        {
            date:'19 Dec 2024',
            notifications: [
                {
                    open:false,
                    location:'office',
                    person:'PG',
                    time:'11:34PM',
                    message:'Leak Detected',
                    description:'If you are not using any tabs, tap here to turn off the tab.'

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
                    time:'1:30PM',
                    message:'Tap opened for 45 mins',
                    description:'Admin turned off the valve at 2:32pm'
                },
                {
                    open:true,
                    location:'3rd-floor',
                    person:'PG',
                    time:'1:30PM',
                    message:'Leak Detected',
                    description:'If you are not using any tabs, tap here to turn off the tab.'
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
                    time:'1:30PM',
                    message:'Tap opened for 45 mins',
                    description:'Admin turned off the valve at 2:32pm'
                },
                {
                    open:true,
                    location:'3rd-floor',
                    person:'PG',
                    time:'1:30PM',
                    message:'Leak Detected',
                    description:'If you are not using any tabs, tap here to turn off the tab.'
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
                    time:'1:30PM',
                    message:'Leak Detected',
                    description:'If you are not using any tabs, tap here to turn off the tab.'
                },
                {
                    open:true,
                    location:'3rd-floor',
                    person:'PG',
                    time:'1:30PM',
                    message:'Tap opened for 45 mins',
                    description:'Admin turned off the valve at 2:32pm'
                }
            ]
        }
    ]

    return (
        <SafeAreaProvider>
        <SafeAreaView>
        <ScrollView  style={{height:'100%'  , padding:10 , backgroundColor:'#e6ecf2'}}>
            <View style={{width:'100%', backgroundColor:'none'}}>
                {/* {valveMap.map((item, key)=>{
                    return (
                        <View key={key} style={{padding:10 , marginBottom:5}}> 
                            <Text style={{fontSize:15, fontWeight:600 ,marginBottom:7}}>{item.date}</Text>
                            {item.notifications.map((notif , key)=>{
                                
                                return <ValveComp props={notif} key={key}/>
                            })}
                        </View>
                    )
                })} */}
                {valveData?.map((item , key)=>{
                    return (
                        <View key={key} style={{padding:10 , marginBottom:5}}> 
                            <ValveComp props={item} key={key}/>
                        </View>
                    );
                })}
            </View>
        </ScrollView>
        </SafeAreaView>
        </SafeAreaProvider>
    )
}