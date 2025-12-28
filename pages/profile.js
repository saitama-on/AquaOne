import React , {useState , useEffect} from 'react';
import {View , Text, TouchableOpacity,ScrollView , Modal , Image} from 'react-native';
import { List , Button , Icon } from 'react-native-paper';

import { signOut  , getAuth} from '@react-native-firebase/auth';
import { useNavigation , CommonActions } from '@react-navigation/native';
import {  SafeAreaView } from 'react-native-safe-area-context'



function Comp1({iconName , CompName , onPress}){
    // alert(onPress);
    return (
    <TouchableOpacity onPress={onPress} style={{ elevation:1 ,alignItems:'center' , marginBottom:20 , display:'flex', flexDirection:'row' ,backgroundColor:'white' , width:"85%" , padding:10 , paddingLeft:15, borderRadius:10}}>
        {/* <TouchableOpacity> */}
        <Icon source={iconName} size={25} color={'#2681ccff'}/>
        <Text style={{fontSize:20 , marginLeft:10}}>{CompName}</Text>
        <Button style={{marginLeft:'auto' , right:-25}} icon="chevron-right"></Button>
        {/* </TouchableOpacity> */}
    </TouchableOpacity>
    )
}
export default function Profile({route}){

    const [modalon , setModalOn] = useState(false);
    
    const [info , setInfo] = useState(null);
    const navigation = useNavigation();

    useEffect(()=>{
        const fetchInfo = async()=>{
            try{
                const user = await getAuth().currentUser;
                console.log('User Info' , user);
                const token = await user.getIdToken();
                // console.log('token is :' , token);
                const response = await fetch('https://api.aquesa.in/api/v1/user',{
                    method:'GET',
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();
                // console.log(data);
                setInfo(data);
                // console.log(data);
            }
            catch(e){
                console.log(e);
            }
        };

        fetchInfo();
    },[]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
                const fetchInfo = async()=>{
            try{
                const user = await getAuth().currentUser;
                console.log('User Info' , user);
                const token = await user.getIdToken();
                // console.log('token is :' , token);
                const response = await fetch('https://api.aquesa.in/api/v1/user',{
                    method:'GET',
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();
                console.log(data);
                setInfo(data);
                console.log(data);
            }
            catch(e){
                console.log(e);
            }
        };

        fetchInfo();
        });

        return unsubscribe; // Always clean up the listener on unmount
    }, [navigation]);

    
    const handleLogOut = async()=>{
        try {
            navigation.navigate('Logout');
            // await signOut(getAuth());
            // navigation.dispatch(
            //     CommonActions.reset({
            //         index:0,
            //         routes:[{name:'Welcome'}]
            //     })
            // )
        }
        catch(e){
            alert(e);
        }

    }

    const handleManageAccounts = ()=>{
        setModalOn(true)
        navigation.navigate('ManageAccount')
    }


    const handleProfilePress = ()=>{
        navigation.navigate('EditProfile' , {info:info });
    }


    useEffect(() => {
        if (route?.params?.updatedUser) {
            setInfo(route?.params?.updatedUser);
        }
    }, [route?.params?.updatedUser]);
    return (
    
        <SafeAreaView edges={['top']} style={{flex:1 , backgroundColor:'#ebebebff'}}>
        <ScrollView style={{backgroundColor:'white'}}>
            <View style={{ marginTop:120 ,backgroundColor:'#ebebebff' , height:"100%" , alignItems:'center' , borderTopLeftRadius:100 , borderTopRightRadius:100 , paddingBottom:30}}>
                <View style={{top:-50 ,backgroundColor:'#ffffff' ,borderRadius:10, width:100 , height:100
                }}>
                    {info?.profile_picture ?  <Image style={{fontSize:60 , textAlign:'center'}} source={info?.profile_picture}></Image> : <Text style={{fontSize:60 , textAlign:'center'}}>{info?.name?.charAt(0)}</Text>}
                </View>
                <TouchableOpacity 
                onPress={handleProfilePress}
                style={{ elevation:1 ,marginBottom:50 , display:'flex', flexDirection:'row' ,backgroundColor:'white' , width:"85%" , padding:10 , paddingLeft:15, borderRadius:10}}>
                    <View>
                        <Text style={{fontSize:25 , fontWeight:600}}>{info?.name}</Text>
                        <Text style={{color:'grey'}}>{info?.dwelling[0]?.role}</Text>
                    </View>
                    <View style={{marginLeft:'auto' ,backgroundColor:'none' , width:"20%" , alignSelf:'center',justifyContent:'center'}}>
                        <Button icon="chevron-right" style={{right:-25}}></Button>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleManageAccounts} style={{ elevation:1 , backgroundColor:'white', alignItems:'center' ,minHeight:60, marginBottom:50 , display:'flex', flexDirection:'row'  , width:"85%" , padding:10 , paddingLeft:15, borderRadius:10}}>
                    <Text style={{fontWeight:500 ,fontSize:20 , marginRight:'auto' , opacity:0.7}}>Manage Accounts</Text>
                    <Icon source="shape" size={20}></Icon>
                </TouchableOpacity>

                <Comp1 iconName="update" CompName="App Update"></Comp1>
                <Comp1 iconName="help" CompName="Help & Support"></Comp1>
                <Comp1 iconName="sheild-check" CompName="Legal"></Comp1>
                <Comp1 iconName="logout" CompName="Logout" onPress={handleLogOut}></Comp1>

                
            </View>
        </ScrollView>
        </SafeAreaView>
        
    )
}