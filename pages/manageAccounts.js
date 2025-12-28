import React ,{useState , useEffect}from "react";
import { getAuth } from "@react-native-firebase/auth";
import {View , Text , StyleSheet } from 'react-native'
import { IconButton } from "react-native-paper";
import {useNavigation} from '@react-navigation/native'
import {RadioButton} from 'react-native-paper';



export default function ManageAccount(){

    const navigation = useNavigation();
    const [membersInfo , setMemebersInfo] = useState(null);
    const [info , setInfo] = useState(null);
    const handleClose = ()=>{
        navigation.goBack();
    }

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
                        setInfo(data);
                        console.log(data);
                    }
                    catch(e){
                        console.log(e);
                    }
        };
        
                
        const fetchMembersInfo = async()=>{
            try{
                const response = await fetch(`https://api.aquesa.in/api/v1/member?dwelling_id=${user?.dwelling[0].dwelling_id}`,{
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                setMemebersInfo(data);
            }
            catch(e){
                console.log(e);
            }
        };

        fetchInfo();
        fetchMembersInfo();
            
    },[]);

    const [account , setAccount] = useState(0);
    
    return (
        <View style={style.fullScreen}>
            <View style={style.modal}>

                <View style={style.topBar}>
                    <Text style={{fontSize:20 , opacity:0.7 , marginBottom:10}}>Change Account</Text>
                    <IconButton icon={'close'} onPress={handleClose}></IconButton>
                </View>
                <View style={style.mainContent}>
                    
                    <RadioButton.Group value={account} onValueChange={newValue => setAccount(newValue)}>
                        {membersInfo?.members.map((item , id) =>
                        <View style={style.radio}>
                            <Text style={style.radioText}>
                                Account {id+1} - {item.name}
                            </Text>
                            <RadioButton value={0} color="#7bbbf0ff"></RadioButton>
                        </View>
                        )}

                    
                    </RadioButton.Group>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    fullScreen:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.5)',
        justifyContent:'center',
        alignItems:'center',
        padding:50
    }

    ,
    modal:{
        
        backgroundColor:'white',
        width:'100%',
        borderRadius:20,
        padding:10
        

    },

    topBar:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:20
    },

    radio:{
        display:'flex',
        flexDirection:'row',
        padding:10,
        justifyContent:'space-between',
        alignItems:'center',
        borderTopWidth:1,
        borderTopColor:'rgba(0,0,0,0.1)'
    },

    radioText:{
        fontSize:15,
        fontStyle:'italic'
    }
})