import {View, Text , StyleSheet , TouchableOpacity,   KeyboardAvoidingView,
    Keyboard , ToastAndroid
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon , TextInput} from 'react-native-paper'
import {useState , useContext} from'react';
import {getAuth} from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import { UserContext } from '../App.js';

export default function ChangeValveName({route}){

    const navigation = useNavigation();
    const [newname , setNewName]  = useState('');
    const [isFocused , setIsFocused] = useState(false);
    const {refreshValveInfo , valveInfo , userInfo} = useContext(UserContext);
    const valveIndex= route?.params?.valveIndex
    
    Keyboard.addListener('keyboardDidShow' , ()=>{
        setIsFocused(true);
    })

    Keyboard.addListener('keyboardDidHide' , ()=>{
        setIsFocused(false);
    })
    
    const handleClose = ()=>{
        navigation.goBack();
    }

    const showToast = (msg) =>{
        ToastAndroid.show(msg , ToastAndroid.SHORT);
    }
    const handleChangeName = async()=>{

        if(newname.trim().length ==0){
            return;
        }

        try{
            const user = await getAuth().currentUser;
            const token = await user.getIdToken();
            const response = await fetch(`https://api.aquesa.in/api/v1/dwelling/${userInfo?.dwelling[0]?.dwelling_id}/valve`,{
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body:JSON.stringify({
                    device_id : valveInfo?.devices[valveIndex]?.device_id,
                    custom_tag : newname
                })
            });

            
            if(response.ok){
                const data = await response.json();
                await refreshValveInfo(userInfo?.dwelling[0]?.dwelling_id);
                showToast('Valve Name updated Successfully!')
                navigation.goBack();
                
            }
        }catch(e){
            console.log(e);
            alert('Error updating name');
        }

    }

    return (
        <View style={styles.backgroundContainer} onTouchStart={handleClose}>
            
            <View style={[styles.mainContainer , {height: isFocused == true ? '60%' : 'auto'}]} onTouchStart={(e)=> e.stopPropagation()}>
                <View style={styles.headerContainer }>
                    <Text style={{fontSize:25}}>Change Valve Name</Text>
                    <TouchableOpacity onPress={handleClose}>
                        <Icon source='close' size={20}></Icon>
                    </TouchableOpacity>
                </View>
                <Text>Please type the Valve name you want it to be changed to</Text>
                <View style={styles.inputContainer}>
                    <TextInput underlineColor='white'
                        value={newname}
                        
                        onChangeText={setNewName}
                        mode='outlined'
                        outlineColor='#85c6fcff'
                        activeOutlineColor='#85c6fcff'
                        style={{backgroundColor:'white'}}
                        label={"Write your name"}
                    ></TextInput>
                </View>

                <TouchableOpacity style={styles.UpdateButton} onPress={handleChangeName}>
                    <LinearGradient
                    colors={['#6ca3f5ff', '#60EFFF']}
                    start={{ x: 0, y: 0.9 }} 
                    end={{ x: 1, y: 0.4 }}
                    width={'100%'}
                    style={{alignItems:'center' , borderRadius:15}}
                    >
                    <Text style={{fontSize:20 , padding:10 , color:'white'}}>Update</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}



const styles = StyleSheet.create({


    backgroundContainer:{
        backgroundColor:'rgba(0,0,0,0.5)',
        flex:1,
        height:500,
        // backgroundColor:
        alignItems:'center',
        justifyContent:'flex-end',
        padding:0
    },

    mainContainer:{
        backgroundColor:'white',
        width:'100%',
        
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        padding:20,
    }
    , 
    headerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:10
    },

    inputContainer:{
        marginTop:20
    },

    UpdateButton:{
        justifyContent:'center',
        alignItems:'center',
        
        // backgroundColor:'Gradient/New Grade v2',
        marginTop:10,
        borderRadius:15,
    }

})