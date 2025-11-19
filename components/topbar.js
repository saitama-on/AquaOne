import React  from "react";
import {Text , View} from 'react-native'
import {IconButton ,Icon} from 'react-native-paper'
import {useNavigation} from '@react-navigation/native'
export default function TopBar({iconName , textContent}){

    const navigation = useNavigation();
    const handleNotificationButtonPress = ()=>{
        navigation.navigate('Notifications')
    }

    return (

        <View style={{ width:"100%" , display:"flex" , flexDirection:'row',padding:10 , paddingLeft:20, paddingRight:20 , backgroundColor:'#e6ecf2' , height:'80%'}}>
            
            {/* this should be a drawer */ }
            <View style={{elevation:5,marginRight:10 , borderRadius:15 , paddingLeft:10 , paddingRight:10 , alignItems:'center' ,display:'flex' , flexDirection:'row',elevated:2 , backgroundColor:'white' , width:"80%"}}>
                <Text style={{marginRight:'auto' , fontSize:20}}>{textContent}</Text>
                <Icon source="chevron-down" color="#339ff8ff" size={30}/>
            </View>
            <View style={{elevation:5 , justifyContent:'center' , alignItems:'center' ,backgroundColor:'white', marginLeft:'auto' , minWidth:50 , minHeight:50, borderRadius:20}}>
                <IconButton iconColor="#339ff8ff" onPress={handleNotificationButtonPress}icon={iconName} size={25}/>
                {/* <Text>y</Text> */}
            </View>
        </View>
    )
}