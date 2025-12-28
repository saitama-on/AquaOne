import React , {useState , useContext} from 'react'
import {View , Text , ScrollView , ToastAndroid} from 'react-native';
import {Button} from 'react-native-paper'
import TopBar from '../components/topbar';
import ValveCenter from '../components/valveCenter';
import ActivityArea from '../components/activity';
import { SafeAreaView ,SafeAreaProvider } from 'react-native-safe-area-context';
import { UserContext } from '../App.js';
import { useNavigation } from '@react-navigation/native';


function TextBox({content , index ,currItem , setCurrItem}){
    const navigation = useNavigation();
    const handlePress= ()=>{
        // console.log(index)
        setCurrItem(index);
    }


    const handleLongPress = () =>{
        // alert('long press');
        navigation.navigate('ChangeValveName' , {valveIndex : index})

    }

    const showToast = (msg) =>{
        ToastAndroid.show(msg , ToastAndroid.short);
    }
    return (
        <View style={{elevation:2, marginRight:15 ,backgroundColor:currItem == index ? '#e6ecf2':'white' , borderRadius:10}}>
            <Button onPress={handlePress} onLongPress={handleLongPress} textColor={currItem == index ? 'black' : 'grey'} compact style={{ borderRadius:20}}>{content}</Button>
        </View>
    )
}
export default function Valve(){

    const [currItem , setCurrItem] = useState(0);
    const {valveInfo} = useContext(UserContext);

    // console.log(valveInfo)
    return (
        <SafeAreaView edges={['top']} style={{flex:1 , backgroundColor:'#e6ecf2'}}>
        <ScrollView>
            <View style={{paddingLeft:10 , paddingRight:10 ,width:"100%" , backgroundColor:'#e6ecf2' , height:90 ,justifyContent:'center', alignItems:'center'}}>
                <TopBar iconName="bell-outline" textContent="502-SS Aquesa"/>
            </View>


            <View style={{paddingTop:20, width:"100%" , paddingLeft:10 , paddingRight:10 , backgroundColor:'white' }}>
            <ScrollView 
            horizontal
            contentContainerStyle={{backgroundColor:'white' ,display:'flex' , flexDirection:'row' ,justifyContent:'space-around',paddingBottom:20}}>
                {valveInfo?.devices?.map((item , key)=>{
                    return <TextBox content={item?.custom_tag} key={key} index={key} currItem={currItem} setCurrItem={setCurrItem}/>
                })}
            </ScrollView>
            </View>


            <View style={{height:500 ,paddingLeft:10 , paddingRight:10 ,width:"100%" , backgroundColor:'#e6ecf2ff'}}>
                <ValveCenter devicesInfo = {valveInfo?.devices} currItem={currItem}/>
            </View>
            {/*This area is for activity */}
            <View style={{paddingRight:10 ,paddingLeft:10, width:'100%' , backgroundColor:'#e6ecf2ff'}}>
                <ActivityArea activityInfo={valveInfo?.devices[currItem]?.activity} />
                

            </View>
        </ScrollView>
        </SafeAreaView>
        
    )
}