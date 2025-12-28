import React , {useState , useEffect , useContext, use} from 'react';
import {View , Text , TouchableOpacity , ScrollView , ImageBackground , StyleSheet} from 'react-native';
import { List , Button , IconButton, Icon} from 'react-native-paper';
import { SafeAreaView , SafeAreaProvider } from 'react-native-safe-area-context';
import TopBar from '../components/topbar';
import { useNavigation } from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';
import bgImage from '../assets/waterbg.png';
import { BarChart, LineChart, PieChart, PopulationPyramid, RadarChart } from "react-native-gifted-charts";
import { UserContext } from '../App.js';
import { ConsumptionContext } from '../App.js';
import { getAuth } from '@react-native-firebase/auth';

const bgcolor='#e6ecf2'
const data_day=[ {label:'5AM' , value:30}, {label:'9AM',value:20}, {label:'1PM',value:70}, {label:'5PM',value:40} , {label:'9PM' , value:90},{label:'1AM' , value:50}]
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
    const [showCalender  , setShowCalender] = useState(false);
    const [showConsumption , setShowConsumption] = useState(false);
    const [consumptionLimit , setConsumptionLimit] = useState({
        curr:null,
        limit:null
    });
    const {userInfo , setUserInfo} = useContext(UserContext);
    const {consumptionInfo} = useContext(ConsumptionContext);

    const [dataToShow , setDataToShow] = useState(null);
    const map = ['Daily' , 'Weekly' , 'Monthly'];

    const formatChartData = (apiData) => {
    if (!apiData || !apiData.data || apiData.data.length === 0) return [];

    // Get the most recent day (last item in the array)
    const lastDayEntry = apiData.data[apiData.data.length - 1];
    
    // Map the consumption array (assuming it's 24 hours)
    return lastDayEntry.consumption.map((val, index) => {
        // Show labels only for certain hours to keep it clean
        const label = `${index}:00`; 
        return {
            value: val,
            label: label,
            frontColor: '#7cb2d9', // Matches your theme
        };
    });
};


const formatChartDataYear = (apiData) => {
    if (!apiData || !apiData.data || apiData.data.length === 0) return [];

    // 1. Initialize an array for 12 months with 0 value
    const months = [
        {value: 0, label: 'Jan'}, {value: 0, label: 'Feb'}, {value: 0, label: 'Mar'},
        {value: 0, label: 'Apr'}, {value: 0, label: 'May'}, {value: 0, label: 'Jun'},
        {value: 0, label: 'Jul'}, {value: 0, label: 'Aug'}, {value: 0, label: 'Sep'},
        {value: 0, label: 'Oct'}, {value: 0, label: 'Nov'}, {value: 0, label: 'Dec'},
    ];

    // 2. Iterate through all daily records
    apiData.data.forEach((dayEntry) => {
        // Month from API is 1-12, so we use month - 1 for array index
        const monthIndex = dayEntry.month - 1;
        
        // Sum the 24 hours of that day
        const dayTotal = dayEntry.consumption.reduce((acc, curr) => acc + curr, 0);
        
        // Add it to the correct month bucket
        if (months[monthIndex]) {
            months[monthIndex].value += dayTotal;
        }
    });

    // 3. Add formatting for the chart
    return months.map(month => ({
        ...month,
        frontColor: '#7cb2d9',
        labelTextStyle: {color: 'gray', fontSize: 10},
    }));
};

const formatChartDataWeek = (apiData) => {
    if (!apiData || !apiData.data || apiData.data.length === 0) return [];

    // Map through the daily entries (usually 7-8 days)
    return apiData.data.map((item) => {
        // 1. Calculate total consumption for this specific day
        // This sums all 24 hourly values in the consumption array
        const dayTotal = item.consumption.reduce((acc, curr) => acc + curr, 0);

        // 2. Create a label (e.g., "28/12")
        const label = `${item.date}/${item.month}`;

        return {
            value: dayTotal,
            label: label,
            frontColor: '#7cb2d9',
            };
    });
};

    
    const handleDailyLimit = () =>{
        navigation.navigate('SetLimit')
    }

    useEffect(() => {
        console.log('Fetching data for choice: ', currentChoice);
        if (currentChoice == 0) {
            const fetchTodaysData = async()=>{

                try{
                const user = await getAuth().currentUser;
                const token = await user.getIdToken();
    
                const response = await fetch(`https://api.aquesa.in/api/v1/consumption`,{
                    method:'POST',
                    headers:{
                        'Authorization' : `Bearer ${token}`,
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        dwelling_id : userInfo?.dwelling[0]?.dwelling_id,
                        start_date : new Date().toISOString().split('T')[0],
                        end_date : new Date().toISOString().split('T')[0],
                        aggregation: "hour"
                    })
                });
    
                const data = await response.json();
                const formatted = formatChartData(data);
                setConsumptionLimit({
                    curr: data.total_consumption,
                    limit:data.total_consumption_limit
                })
                console.log('formatted data' , formatted);
                setDataToShow(formatted);
            }catch(e){
                console.log(e);
            }
        }
        fetchTodaysData();
            
        }

        else if (currentChoice == 1) {
            const fetchWeekData = async()=>{

                try{
                const user = await getAuth().currentUser;
                const token = await user.getIdToken();

                const today = new Date();
                const priorDate = new Date().setDate(today.getDate() - 7);
                const priorDateStr = new Date(priorDate).toISOString().split('T')[0];
    
                const response = await fetch(`https://api.aquesa.in/api/v1/consumption`,{
                    method:'POST',
                    headers:{
                        'Authorization' : `Bearer ${token}`,
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        dwelling_id : userInfo?.dwelling[0]?.dwelling_id,
                        start_date : priorDateStr,
                        end_date : new Date().toISOString().split('T')[0],
                        aggregation: "day"
                    })
                });
    
                const data = await response.json();
                // console.log(data);
                const formatted = formatChartDataWeek(data);
                setConsumptionLimit({
                    curr: data.total_consumption,
                    limit:data.total_consumption_limit
                })
                // console.log('formatted data' , formatted);
                setDataToShow(formatted);
            }catch(e){
                console.log(e);
            }
        }
       
        fetchWeekData();  
        }

        else if (currentChoice == 2){
            console.log('Fetching month data');
            const fetchYearData = async()=>{

                try{
                const user = await getAuth().currentUser;
                const token = await user.getIdToken();
                const currentYear = new Date().getFullYear();
                const startDate = `${currentYear}-01-01`;
                const endDate = new Date().toISOString().split('T')[0];
                // console.log('start date' , startDate);
                // console.log('end date' , endDate);
    
                const response = await fetch(`https://api.aquesa.in/api/v1/consumption`,{
                    method:'POST',
                    headers:{
                        'Authorization' : `Bearer ${token}`,
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        dwelling_id : userInfo?.dwelling[0]?.dwelling_id,
                        start_date : startDate,
                        end_date : endDate,
                        aggregation: "month"
                    })
                });
    
                const data = await response.json();
                // console.log(data);
                const formatted = formatChartDataYear(data);
                setConsumptionLimit({
                    curr: data.total_consumption,
                    limit:data.total_consumption_limit
                })
                // console.log('formatted data' , formatted);
                setDataToShow(formatted);
            }catch(e){
                console.log(e);
            }

            }
            fetchYearData();
        }

        else if(currentChoice == 3){
            const fetchCustomData = async()=>{

                try{
                const user = await getAuth().currentUser;
                const token = await user.getIdToken();
    
                const response = await fetch(`https://api.aquesa.in/api/v1/consumption`,{
                    method:'POST',
                    headers:{
                        'Authorization' : `Bearer ${token}`,
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        dwelling_id : userInfo?.dwelling[0]?.dwelling_id,
                        start_date : consumptionInfo?.start_date,
                        end_date : consumptionInfo?.end_date,
                        aggregation: "day"
                    })
                });
    
                const data = await response.json();
                const formatted = formatChartDataWeek(data);
                setConsumptionLimit({
                    curr: data.total_consumption,
                    limit:data.total_consumption_limit
                })
                console.log('formatted data' , formatted);
                setDataToShow(formatted);
            }catch(e){
                console.log(e);
            }
        }
        fetchCustomData();
        }
    }, [ currentChoice , consumptionInfo]);

    useEffect(()=>{
        console.log('Dashboard Mounted');
        const fetchTodaysData = async()=>{

            try{
            const user = await getAuth().currentUser;
            const token = await user.getIdToken();

            const response = await fetch(`https://api.aquesa.in/api/v1/consumption`,{
                method:'POST',
                headers:{
                    'Authorization' : `Bearer ${token}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    dwelling_id : userInfo?.dwelling[0]?.dwelling_id,
                    start_date : new Date().toISOString().split('T')[0],
                    end_date : new Date().toISOString().split('T')[0],
                    aggregation: "hour"
                })
            });

            const data = await response.json();
            const formatted = formatChartData(data);
            setConsumptionLimit({
                    curr: data.total_consumption,
                    limit:data.total_consumption_limit
            })
            // console.log('formatted data' , formatted);
            setDataToShow(formatted);
        }catch(e){
            console.log(e);
        }
    }
    fetchTodaysData();
            
            
    },[userInfo]);

    const hanldeChartDims = (event)=>{
        const {width , height} = event.nativeEvent.layout;
        setChartWidth(width);
        setChartHeight(height)
    }

    const handleToggleConsumption = ()=>{
        setShowConsumption(prev =>!prev)
    }


    // useEffect(()=>{
    //     console.log(currentChoice)
    // },[currentChoice])

    // useEffect(()=>{
    //     if(currentChoice == 3){
    //         //show calender
    //         // alert('show Cal')
    //         // setShowCalender(true);
    //         navigation.navigate('CalendarPage');
    //         // setCurrentChoice(0)
    //     }
    //     else{
    //         setShowCalender(false)
    //     }
    // }, [currentChoice])

    const handleCalendar = ()=>{
        console.log(showCalender)
        
        navigation.navigate('CalendarPage');
        
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
                    Hey {userInfo?.name}!
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
                    <IconButton icon='calendar' iconColor='black' style={{opacity: currentChoice ==3 ? 1 : 0.5}} onTouchStart={handleCalendar} >

                    </IconButton>
                    </TouchableOpacity> 
                </View>
            </View>

            {/* Chart Area */}
            <View style={{ width:'100%' , backgroundColor:bgcolor , alignItems:'center' , padding:20}}>
                {
                showConsumption ? 
                
                    <View style={{ height:chartHeight ,
                        padding:0, paddingTop:0 , paddingBottom:0 
                        , elevation:1 ,borderRadius:0, width:'100%'
                        , backgroundColor:'white' }} >
                        <ImageBackground source={bgImage} style={{width:'100%' , justifyContent:'flex-start' 
                        , alignItems:'center' ,height:'100%'}}>

                            <View>
                                <Text>Navigation Section</Text>
                            </View>

                            <View style={styles.consumptionTexts}>
                                <Text style={{fontSize:10 , opacity:0.5}}>{map[currentChoice]} Consumption</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontSize:45 , color:'rgba(80, 160, 223, 1)' , fontWeight:600}}>{consumptionLimit.curr}L </Text>
                                    <Text style={{fontSize:45 , color:'rgba(0, 0, 0, 0.12)' , fontWeight:600}}>/ {consumptionLimit.limit}L</Text>
                                </View>
                            </View>
                        </ImageBackground> 
                    </View>
                    :
 
                    <View onLayout={hanldeChartDims} style={{ padding:5, paddingTop:10 , paddingBottom:10 , elevation:1 ,borderRadius:10, width:'100%', backgroundColor:'white' , justifyContent:'center' , alignItems:'center'}}>
                        <LineChart stepValue={currentChoice==0 ? 10 : currentChoice==1 ? 30 : 200} 
                        backgroundColor='white' 
                        data={dataToShow} 
                        width={chartWidth/1.3} 
                        frontColor={'#90c3ecff'}
                        xAxisColor={'#90c3ecff'}
                        yAxisColor={'#90c3ecff'}
                        rulesColor={'#90c3ecff'}
                        xAxisLabelTextStyle={{opacity:0.5}}
                        yAxisTextStyle={{opacity:0.5}}
                        height={250}
                        color={'#90c3ecff'}
                        hideDataPoints
                        curved
                        isAnimated
                        thickness={3}
                        showArrows
                        arrowConfig={{
                            length:5,
                            width:5,
                            
                            strokeColor:'#51a4e9ff'
                        }}
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
                <ImageBackground source={bgImage} style={{flex:1 , borderRadius:10}}>
                <View style={{width:'100%' }}>
                    <TouchableOpacity onPress={handleDailyLimit} style={{display:'flex' , flexDirection:'row' ,width:'100%' , padding:10 , alignItems:'center'}}>
                        <View style={{width:'80%' , marginRight:'auto'}}>
                        <Text style={{fontSize:25 , fontWeight:600 , marginRight:'auto' , opacity:0.7}}>Set Daily Limit</Text>
                        <Text style={{fontSize:14 ,opacity:0.7}}>Get started on saving water by setting up a daily limit</Text>
                        </View>
                        <Icon source='chevron-right' size={30} color="grey"></Icon>
                    </TouchableOpacity>
                    

                </View>
                </ImageBackground>
            </View>
            
            
            
            
            
        </ScrollView>
        </SafeAreaView>
        

    )
}


const styles = StyleSheet.create({

    consumptionTexts:{
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
        marginTop:25
    }
})