import {View , Text , StyleSheet} from 'react-native'
import { Calendar } from 'react-native-calendars'
import { useNavigation } from '@react-navigation/native'


export default function CalendarComp({setShowCalendar}){
    const navigation = useNavigation();

    return (
        <View style={style.main} onTouchStart={()=> navigation.goBack()}>
            <View style={style.centerBox} onTouchStart={(e)=> e.stopPropagation()}>
                <Calendar style={style.calendar}
                enableSwipeMonths/>
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
        height:'40%'
        
    },

    calendar:{
        height:'100%',
        borderRadius:10
    }
})