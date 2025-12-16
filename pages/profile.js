import React , {useState} from 'react';
import {View , Text, TouchableOpacity,ScrollView , Modal} from 'react-native';
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
export default function Profile(){

    const [modalon , setModalOn] = useState(false)

    const navigation = useNavigation();
    const handleLogOut = async()=>{
        try {
            await signOut(getAuth());
            navigation.dispatch(
                CommonActions.reset({
                    index:0,
                    routes:[{name:'Welcome'}]
                })
            )
        }
        catch(e){
            alert(e);
        }

    }

    const handleManageAccounts = ()=>{
        setModalOn(true)
        navigation.navigate('ManageAccount')
    }
    return (
    
        <SafeAreaView edges={['top']} style={{flex:1 , backgroundColor:'#ebebebff'}}>
        <ScrollView style={{backgroundColor:'white'}}>
            <View style={{ marginTop:120 ,backgroundColor:'#ebebebff' , height:"100%" , alignItems:'center' , borderTopLeftRadius:100 , borderTopRightRadius:100 , paddingBottom:30}}>
                <View style={{top:-50 ,backgroundColor:'#ffffff' ,borderRadius:10, width:100 , height:100
                }}>
                    <Text style={{fontSize:60 , textAlign:'center'}}>P</Text>
                </View>
                <View style={{ elevation:1 ,marginBottom:50 , display:'flex', flexDirection:'row' ,backgroundColor:'white' , width:"85%" , padding:10 , paddingLeft:15, borderRadius:10}}>
                    <View>
                        <Text style={{fontSize:25 , fontWeight:600}}>PG</Text>
                        <Text style={{color:'grey'}}>Owner</Text>
                    </View>
                    <View style={{marginLeft:'auto' ,backgroundColor:'none' , width:"20%" , alignSelf:'center',justifyContent:'center'}}>
                        <Button icon="chevron-right" style={{right:-25}}></Button>
                    </View>
                </View>
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