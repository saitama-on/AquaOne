import React ,{useState}from "react";
import {View , Text , StyleSheet } from 'react-native'
import { IconButton } from "react-native-paper";
import {useNavigation} from '@react-navigation/native'
import {RadioButton} from 'react-native-paper';



export default function ManageAccount(){

    const navigation = useNavigation();
    const handleClose = ()=>{
        navigation.goBack();
    }

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
                        <View style={style.radio}>
                            <Text style={style.radioText}>
                                Account 1 - Yash
                            </Text>
                            <RadioButton value={0} color="#7bbbf0ff"></RadioButton>
                        </View>

                        <View style={style.radio}>
                            <Text style={style.radioText}>
                                Account 2 - Raj
                            </Text>
                            <RadioButton value={1} color="#7bbbf0ff"></RadioButton>
                        </View>

                        <View style={style.radio}>
                            <Text style={style.radioText}>
                                Account 3 - Om
                            </Text>
                            <RadioButton value={2} color="#7bbbf0ff"></RadioButton>
                        </View>
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