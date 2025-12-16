import React , {useState} from 'react'
import {View , Text , ScrollView} from 'react-native';
import {Button} from 'react-native-paper'
import TopBar from '../components/topbar';
import ValveCenter from '../components/valveCenter';
import ActivityArea from '../components/activity';
import { SafeAreaView ,SafeAreaProvider } from 'react-native-safe-area-context';


const locations = [
    {
     loc:'kitchen',
     lc:'Wed 8 Jan , 12:11 AM'
    } , 

    {
     loc:'3rd Floor',
     lc:'Wed 9 Jan , 2:11 AM'
    } ,

    {
     loc:'Bathroom',
     lc:'Thurs 10 Jan , 2:11 AM'
    } ,

    {
     loc:'Bedroom',
     lc:'Thurs 10 Jan , 5:20 PM'
    }]
function TextBox({content , index ,currItem , setCurrItem}){

    const handlePress= ()=>{
        // console.log(index)
        setCurrItem(index);
    }
    return (
        <View style={{elevation:5 ,backgroundColor:currItem == index ? '#e6ecf2':'white' , borderRadius:10}}>
            <Button onPress={handlePress} textColor='black' compact style={{ borderRadius:20}}>{content}</Button>
        </View>
    )
}
export default function Valve(){

    const [power , setPower] = useState(false);
    const [currItem , setCurrItem] = useState(0);
    return (
        <SafeAreaView edges={['top']} style={{flex:1 , backgroundColor:'#e6ecf2'}}>
        <ScrollView>
            <View style={{paddingLeft:10 , paddingRight:10 ,width:"100%" , backgroundColor:'#e6ecf2' , height:90 ,justifyContent:'center', alignItems:'center'}}>
                <TopBar iconName="bell-outline" textContent="502-SS Aquesa"/>
            </View>


            <View style={{paddingTop:20, width:"100%" , paddingLeft:10 , paddingRight:10 , backgroundColor:'white' }}>
            <View style={{backgroundColor:'white' ,display:'flex' , flexDirection:'row' ,justifyContent:'space-around',paddingBottom:20}}>
                {locations.map((item , key)=>{
                    return <TextBox content={item.loc} key={key} index={key} currItem={currItem} setCurrItem={setCurrItem}/>
                })}
            </View>
            </View>


            <View style={{height:500 ,paddingLeft:10 , paddingRight:10 ,width:"100%" , backgroundColor:'#e6ecf2ff'}}>
                <ValveCenter power={power} setPower={setPower} locations={locations} currItem={currItem}/>
            </View>
            {/*This area is for activity */}
            <View style={{paddingRight:10 ,paddingLeft:10, width:'100%' , backgroundColor:'#e6ecf2ff'}}>
                <ActivityArea/>
                <ActivityArea/>
                
                
                

            </View>
        </ScrollView>
        </SafeAreaView>
        
    )
}