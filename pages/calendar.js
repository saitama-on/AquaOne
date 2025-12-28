import {View , Text , StyleSheet, TouchableOpacity} from 'react-native'
import { Calendar } from 'react-native-calendars'
import { useNavigation } from '@react-navigation/native';
import { useState , useContext} from 'react';
import { Menu, TextInput , Icon} from 'react-native-paper';
import { ConsumptionContext } from '../App.js';


export default function CalendarComp({setShowCalendar}){
    const navigation = useNavigation();
    const today = new Date();
    
    const [startDate , setStartDate] = useState('');
    const [errorText , setErrorText] = useState();
    const [endDate , setEndDate] = useState(today.toISOString().split('T')[0]);
    const {setConsumptionInfo} = useContext(ConsumptionContext);

    const handleSubmit = () =>{
        if(startDate.trim().length ==0 || endDate.trim().length ==0){
            setErrorText('Please enter both dates');
            return;
        }

        if(new Date(startDate) > new Date(endDate)){
            setErrorText('Start date cannot be after End date');
            return;
        }

        setErrorText('Fetching Data...');
        setConsumptionInfo({
            start_date: startDate,
            end_date: endDate
        });

        navigation.goBack();
    
    
    
    }



    return (
        <View style={style.main} onTouchStart={()=> navigation.goBack()}>
            <View style={style.centerBox} onTouchStart={(e)=> e.stopPropagation()}>
                <View style={style.header}>
                    <Text style={{fontSize:25 , fontWeight:600}}>Choose Date Range</Text>
                    <TouchableOpacity onPress={()=> navigation.goBack()}>
                        <Icon source='close' size={20} color='black'></Icon>
                    </TouchableOpacity>
                </View>


                <View style={style.inputBox}>

                    <View style={style.inputDates}>
                        <TextInput style={style.input} label={'YYYY-MM-DD'}
                         textColor='black' mode='outlined' activeOutlineColor='#85c6fcff'
                         value={startDate}
                         onChangeText={(t)=> setStartDate(t)}
                         />
                        <Text>To</Text>
                        <TextInput style={style.input} label={'YYYY-MM-DD'} textColor='black'
                         mode='outlined' activeOutlineColor='#85c6fcff'
                            value={endDate} 
                            onChangeText={(t)=> setEndDate(t)}
                         />
                    </View>

                </View>
                <View style={{alignItems:'left' , marginBottom:2 , justifyContent:'center' , paddingLeft:20}}>
                    <Text style={{color:errorText == 'Fetching Data...' ? '#85c6fcff' : '#f84545ff'}}>{errorText}</Text>
                </View>
                <View style={{padding:10}}>
                    <TouchableOpacity style={style.show} onPress={handleSubmit}>
                        <Text style={{color:'white' , fontSize:18}}>Show Data</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.6)'
    },

    centerBox:{
        width:'80%',
        height:350,
        backgroundColor:'white',
        padding:10,
        borderRadius:10,
        
    },

    calendar:{
        height:'100%',
        borderRadius:10
    },

    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:10,
        borderBottomWidth:1,
        borderBottomColor:'lightgrey'
    },

    input:{
        backgroundColor:'white',
        marginBottom:5,
        width:'100%',
        
    },

    inputBox:{
        padding:5,
        backgroundColor:'none',
    },

    inputDates:{
        alignItems:'center',
        marginBottom:10,
        padding:10,
    },

    show:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        backgroundColor:'#c2daffff',
        borderRadius:10,
    }
})