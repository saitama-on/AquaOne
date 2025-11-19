import React , {useState} from 'react'
import {useNavigation} from '@react-navigation/native'
import {View , KeyboardAvoidingView , Text , StyleSheet, Dimensions,TouchableOpacity} from 'react-native'
import { IconButton, TextInput , Button} from 'react-native-paper';
import Slider from '@react-native-community/slider';


export default function SetLimit(){

    const navigation = useNavigation();
    const {height} = Dimensions.get('window');
    const [dailyLimit , setDailyLimit] = useState(0);
    const handleClose =()=>{
        navigation.goBack();
    }
    return (
        
        <View style={style.box}>
            <View style={ [style.container , {height:height*0.5}]}>
                <View style={{display:'flex' , flexDirection:'row' , width:'100%' , alignItems:'center'}}>
                <Text style={{marginRight:'auto' , fontWeight:600,fontSize:30}}>Set Daily Limit</Text>
                <IconButton icon='close' size={25} onPress={handleClose} iconColor='#339ff8ff'></IconButton>
                </View>

                <View style={{width:'100%' , padding:10}}>
                    <View style={{display:'flex' , flexDirection:'row'}}>
                        <Text>Current Daily Limit: </Text>
                        <Text>{dailyLimit}</Text>
                    </View>
                    <View>
                        <Slider 
                        value={dailyLimit} 
                        onValueChange={setDailyLimit}
                        minimumValue={0}
                        maximumValue={1000}
                        step={1}
                        tapToSeek
                        style={{height:70}}
                        ></Slider>
                    </View>
                    <Text>Or</Text>
                    <View>
                        <TextInput
                        placeholder='Enter the value you want to set'
                        keyboardType='numeric'
                        ></TextInput>
                    </View>
                    <TouchableOpacity ><Text>Set daily Limit</Text></TouchableOpacity>
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
        padding:10
    }
})