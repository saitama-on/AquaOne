import React , {useState , useEffect , useContext} from 'react'
import {useNavigation} from '@react-navigation/native'
import {View , ImageBackground , Text , StyleSheet, Dimensions,TouchableOpacity
   , Keyboard , ToastAndroid
} from 'react-native'
import { IconButton, TextInput , Button} from 'react-native-paper';
import Slider from '../components/slider';
import {getAuth} from '@react-native-firebase/auth';
import { UserContext } from '../App.js';
// import { Slider } from '@rneui/themed';


export default function SetLimit(){

    const navigation = useNavigation();
    const {height} = Dimensions.get('window');
    const [dailyLimit , setDailyLimit] = useState('100');
    const [isFocused , setIsFocused] = useState(false);
    const [Token , setToken] = useState(null);
    const [DwellingId , setDwellingId] = useState(null);
    const {userInfo , setUserInfo , refreshUserInfo} = useContext(UserContext);
    // console.log("here")
    // console.log(userInfo)
    
    useEffect(()=>{
        const fetchLimit = async()=>{

            try{
                // console.log(User?.dwelling[0]?.dwelling_id);
                const user = await getAuth().currentUser;
                const token = await user.getIdToken();
                // setToken(token);
                setDwellingId(userInfo?.dwelling[0]?.dwelling_id);
                const response = await fetch(`https://api.aquesa.in/api/v1/dwelling/${userInfo?.dwelling[0]?.dwelling_id}/limit`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if(!response.ok){
                    console.log('Failed to fetch limit');
                    return;
                }
                const data = await response.json();
                console.log('response ' ,data)
                setDailyLimit(data.limit.toString());
            }catch(e){
                console.log(e);
            }
        }

        
        fetchLimit();
        
    },[]);

    Keyboard.addListener('keyboardDidShow' , ()=>{
        setIsFocused(true);
    })

    Keyboard.addListener('keyboardDidHide' , ()=>{
        setIsFocused(false);
    })


    const handleClose =()=>{
        navigation.goBack();
    }

    const handleLimit = async() =>{
        // console.log(DwellingId);
        const user = await getAuth().currentUser;
        // console.log(user);
        const token = await user?.getIdToken();
        // console.log("hell")

        try {
            const response = await fetch(`https://api.aquesa.in/api/v1/dwelling/${DwellingId}/limit`,{
                method:'PATCH',
                headers:{
                    'Authorization' : `Bearer ${token}`,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    limit:dailyLimit
                })
            });
            const data = await response.json();

            if(response.ok){
                console.log(data);
                await refreshUserInfo();
                showToast('Limit Updated Successfully!')
                navigation.goBack();
                // alert("Limit Set");
            }
            else{

                
                console.log("Limit Not set" , data);
            }


        }
        catch(e){
            console.log(e);
        }

        // setDailyLimit()
        // const higherValue = dailyLimit > sliderDailyLimit ? dailyLimit : sliderDailyLimit;
        // console.log("higer" , dailyLimit , sliderDailyLimit)
        // console.log(dailyLimit)
        // setDailyLimit(higherValue);
        // setSliderDailyLimit(higherValue);
        // alert(dailyLimit)
    }

    const showToast = (msg) =>{
        ToastAndroid.show(msg ,ToastAndroid.SHORT, ToastAndroid.TOP);
    }

    
    return (
        
        <View style={style.box} onTouchStart={handleClose}>
        
            <View style={ [style.container , {height:isFocused == true ? height*0.9 : height*0.5}]} onTouchStart={(e)=> e.stopPropagation()}>
                <View style={{display:'flex' , flexDirection:'row' , width:'100%' , alignItems:'center'}}>
                <Text style={{marginRight:'auto' , fontWeight:600,fontSize:30}}>Set Daily Limit</Text>
                <IconButton icon='close' size={25} onPress={handleClose} iconColor='#339ff8ff'></IconButton>
                </View>

                <View style={{width:'100%' , padding:10 , marginTop:10}}>
                    <View style={{display:'flex' , flexDirection:'row'}}>
                        <View style={{marginBottom:10 , width:'100%'}}> 
                            <TextInput
                            value={dailyLimit.toString()}
                            keyboardType='numeric'
                            backgroundColor='white'
                            textColor='black'
                            underlineColor='transparent'
                            right={<TextInput.Affix text='Liters' textStyle={{color:'black'}}/>}
                            onChangeText={(t)=>setDailyLimit(t)}
                        
                            ></TextInput>
                        </View>
                    </View>
                    {/* or */}
                    <Text style={{marginTop:20 ,alignSelf:'center' , fontSize:20 , fontWeight:600}}>Or</Text>
                    {/* slidable input */}
                    <View style={{maxHeight:'100%' , backgroundColor:'none' , alignItems:'center' , justifyContent:'flex-start'}}>
                        {/* slide component  */}
                        <Slider dailyLimit={dailyLimit} setDailyLimit={setDailyLimit}/>
                    </View>


                    {/* set daily limit button  */}
                    <TouchableOpacity onPress={handleLimit} style={{justifyContent:'center' , marginTop:10 , backgroundColor:'#91c8f5ff' , height:50 , borderRadius:15}}>
                        <Text style={{alignSelf:'center' , color:'white' , fontSize:20}}>Set daily Limit</Text>
                        </TouchableOpacity>
                </View>
            </View>
            
        </View>
    )
}

const style = StyleSheet.create({
    box:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.4)',
        justifyContent:'flex-end'
    }
,
    container:{
        backgroundColor:'white',
        width:'100%',
        padding:15,
        borderTopRightRadius:20,
        borderTopLeftRadius:20
        
        
    }
})