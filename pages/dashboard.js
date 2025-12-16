import React , {useState , useEffect} from 'react';
import {View , Text , TouchableOpacity , ScrollView} from 'react-native';
import { List , Button , IconButton, Icon} from 'react-native-paper';
import { SafeAreaView , SafeAreaProvider } from 'react-native-safe-area-context';
import TopBar from '../components/topbar';
import { useNavigation } from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';
import { BarChart, LineChart, PieChart, PopulationPyramid, RadarChart } from "react-native-gifted-charts";
const bgcolor='#e6ecf2'
const data_day=[ {label:'5AM' , value:30}, {label:'9AM',value:40}, {label:'1PM',value:90}, {label:'5PM',value:50} , {label:'9PM' , value:10},{label:'1AM' , value:10}]
const data_week=[ {label:'Mon' , value:200}, {label:'Tue',value:180}, {label:'Wed',value:190}, {label:'Thurs',value:170} , {label:'Fri',value:170} , {label:'Sat',value:140} , {label:'Sun',value:200}]

const data_month=[ {label:'Week-1' , value:1500}, {label:'Week-2',value:1800}, {label:'Week-3',value:1900}, {label:'Week-4',value:1600}]


function Dwm({textCont , setCurrentChoice , id , currentChoice}){

    const handlePress = ()=>{
        setCurrentChoice(id);
    }
    return (
        <TouchableOpacity onPress={handlePress} style={{borderRadius:10,width:'25%' 
        ,backgroundColor: id==currentChoice ? 'white' : bgcolor ,
        alignItems:'center' , justifyContent:'center' , height:40,
        opacity: currentChoice==id ? 1 : 0.5}}>
            <Text style={{padding:'none' , fontSize:18 , fontWeight:500}}>
                {textCont}
            </Text>
        </TouchableOpacity>
    )
}

export default function Dashboard(){

    const navigation = useNavigation();
    const [currentChoice , setCurrentChoice] = useState(0);
    const [chartWidth , setChartWidth] = useState(0);
    const [chartHeight , setChartHeight] = useState(0);
    const [showConsumption , setShowConsumption] = useState(false);
    const handleDailyLimit = () =>{
        navigation.navigate('SetLimit')
    }

    const map = ["day","week","month",'calendar'] ;

    const hanldeChartDims = (event)=>{
        const {width , height} = event.nativeEvent.layout;
        setChartWidth(width);
        setChartHeight(height)
    }

    const handleToggleConsumption = ()=>{
        setShowConsumption(prev =>!prev)
    }
    return(
        
        <SafeAreaView edges={['top']} style={{ flex:1, backgroundColor:bgcolor}}>
        <ScrollView 
        contentContainerStyle={{paddingBottom:20 , flexGrow:1}}>

            <View style={{paddingLeft:10 , paddingRight:10 ,width:"100%" , backgroundColor:bgcolor  ,justifyContent:'center', alignItems:'center' , paddingTop:10}}>
                <TopBar iconName="bell-outline" textContent="502-SS Aquesa"/>
            </View>

            <View style={{paddingBottom:10 ,display:'flex' , flexDirection:'row' , width:'100%' , backgroundColor:bgcolor}}>
                <Text style={{fontSize:30 , fontWeight:700 ,padding:10 , paddingLeft:30}}>
                    Hey Yash!
                </Text>
            </View>

            <View style={{width:'100%' , backgroundColor:bgcolor , alignItems:'center' , paddingBottom:10}}>
                <View style={{borderRadius:10 , elevation:5 , width:'90%' , padding:5 , backgroundColor:bgcolor, display:'flex' , flexDirection:'row', justifyContent:'center'}}>
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
            <View style={{ width:'100%' , backgroundColor:bgcolor , alignItems:'center' , padding:20}}>
                {showConsumption ? <View style={{ height:chartHeight ,padding:5, paddingTop:10 , paddingBottom:10 , elevation:1 ,borderRadius:10, width:'100%', backgroundColor:'white' , justifyContent:'center' , alignItems:'center'}} ><Text>Consumption</Text></View> :
 
                <View onLayout={hanldeChartDims} style={{ padding:5, paddingTop:10 , paddingBottom:10 , elevation:1 ,borderRadius:10, width:'100%', backgroundColor:'white' , justifyContent:'center' , alignItems:'center'}}>
                    <BarChart stepValue={currentChoice==0 ? 10 : currentChoice==1 ? 30 : 200} 
                     backgroundColor='white' 
                     data={currentChoice==0 ? data_day : currentChoice==1 ? data_week : data_month} 
                     width={chartWidth/1.3} 
                     frontColor={'#90c3ecff'}
                     xAxisColor={'#90c3ecff'}
                     yAxisColor={'#90c3ecff'}
                    rulesColor={'#90c3ecff'}
                    xAxisLabelTextStyle={{opacity:0.5}}
                    yAxisTextStyle={{opacity:0.5}}
                     />
                </View>
}
                <View style={{width:'100%' , marginTop:20 , backgroundColor:bgcolor}}>
                    <TouchableOpacity onPress={handleToggleConsumption} style={{display:'flex' , flexDirection:'row' , marginLeft:'auto' , backgroundColor:'white', padding:10 , borderRadius:10}}>
                        <Icon source="chart-donut" color='#339ff8ff' size={20}></Icon>
                        <Text style={{marginLeft:5 ,color:'#339ff8ff' , fontSize:15}}>Show {showConsumption ?'Chart':'Consumption'}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* set daily limit area */}
            <View style={{width:'100%' , backgroundColor: bgcolor ,alignItems:'center',padding:15}}>
                <View style={{width:'100%' , backgroundColor:'white' , borderRadius:10}}>
                    <TouchableOpacity onPress={handleDailyLimit} style={{display:'flex' , flexDirection:'row' ,width:'100%' , padding:10 , alignItems:'center'}}>
                        <View style={{width:'80%' , marginRight:'auto'}}>
                        <Text style={{fontSize:25 , fontWeight:600 , marginRight:'auto' , opacity:0.7}}>Set Daily Limit</Text>
                        <Text style={{fontSize:14 ,opacity:0.7}}>Get started on saving water by setting up a daily limit</Text>
                        </View>
                        <Icon source='chevron-right' size={30} color="grey"></Icon>
                    </TouchableOpacity>
                    

                </View>
            </View>
            
            
            
            
            
        </ScrollView>
        </SafeAreaView>
        

    )
}