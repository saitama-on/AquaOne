import React , {useState , useEffect} from 'react';
import {View , Text , TouchableOpacity} from 'react-native';
import { List , Button , IconButton, Icon} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '../components/topbar';
import { useNavigation } from '@react-navigation/native';
import {Calendar} from 'react-native-calendars'
const bgcolor='#e6ecf2'

function Dwm({textCont , setCurrentChoice , id , currentChoice}){

    const handlePress = ()=>{
        setCurrentChoice(id);
    }
    return (
        <TouchableOpacity onPress={handlePress} style={{borderRadius:10,width:'25%' ,backgroundColor: id==currentChoice ? 'white' : bgcolor , alignItems:'center' , justifyContent:'center' , height:40}}>
            <Text style={{padding:'none' , fontSize:18}}>
                {textCont}
            </Text>
        </TouchableOpacity>
    )
}

export default function Dashboard(){

    const navigation = useNavigation();
    const [currentChoice , setCurrentChoice] = useState(0);
    const handleDailyLimit = () =>{
        navigation.navigate('SetLimit')
    }

    const map = ["day","week","month",'calendar'] 
    return(
        <SafeAreaView style={{height:'100%' , flex:1 , justifyContent:"flex-start" , alignItems:'center' , backgroundColor:bgcolor}}>
        
            <View style={{paddingLeft:10 , paddingRight:10 ,width:"100%" , backgroundColor:bgcolor , height:"12%" ,justifyContent:'center', alignItems:'center'}}>
                <TopBar iconName="bell-outline" textContent="testing"/>
            </View>

            <View style={{display:'flex' , flexDirection:'row' , width:'100%'}}>
                <Text style={{fontSize:30 , fontWeight:700 ,padding:10 , paddingLeft:30}}>
                    Hey P
                </Text>
            </View>

            <View style={{width:'100%' , backgroundColor:'none' , alignItems:'center'}}>
                <View style={{borderRadius:10 , elevation:5 , width:'90%' , padding:10 , backgroundColor:bgcolor, display:'flex' , flexDirection:'row', justifyContent:'center'}}>
                    <Dwm textCont="Day" currentChoice={currentChoice} setCurrentChoice={setCurrentChoice}  id={0} />
                    <Dwm textCont="Week" currentChoice={currentChoice} setCurrentChoice={setCurrentChoice} id={1}/>
                    <Dwm textCont="Month" currentChoice={currentChoice} setCurrentChoice={setCurrentChoice} id={2}/>
                    <TouchableOpacity onPress={
                       ()=> setCurrentChoice(3)
                    } style={{borderRadius:10 , width:'25%',backgroundColor: currentChoice==3 ? 'white' : bgcolor, height:40 , alignItems:'center',justifyContent:'center'}}>
                    <IconButton icon='calendar' >

                    </IconButton>
                    </TouchableOpacity> 
                </View>
            </View>

            {/* Chart Area */}
            <View style={{ width:'100%' , backgroundColor:'none' ,height:"60%", alignItems:'center' , padding:20}}>
                <View style={{elevation:1 ,borderRadius:10,width:'100%',height:'80%', backgroundColor:'white' , justifyContent:'center' , alignItems:'center'}}>
                    {currentChoice ==3 ? <Calendar style={{width:'100%'}}/> :<Text style={{fontSize:40 , opacity:0.5}}>Chart for {map[currentChoice]}</Text>}
                </View>
                <View style={{width:'100%' , marginTop:20}}>
                    <TouchableOpacity style={{display:'flex' , flexDirection:'row' , marginLeft:'auto' , backgroundColor:'white', padding:10 , borderRadius:10}}>
                        <Icon source="chart-donut" color='#339ff8ff' size={20}></Icon>
                        <Text style={{marginLeft:5 ,color:'#339ff8ff' , fontSize:15}}>Show Consumption</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* set daily limit area */}
            <View style={{width:'100%' , padding:20}}>
                <View style={{width:'100%' , backgroundColor:'white' , borderRadius:10}}>
                    <TouchableOpacity onPress={handleDailyLimit} style={{display:'flex' , flexDirection:'row' ,width:'100%' , padding:10 , alignItems:'center'}}>
                        <Text style={{fontSize:25 , fontWeight:600 , marginRight:'auto' , opacity:0.7}}>Set Daily Limit</Text>
                        <Icon source='chevron-right' size={30} color="grey"></Icon>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}