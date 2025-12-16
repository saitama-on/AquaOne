import {View ,  Text ,FlatList , Dimensions, StyleSheet} from 'react-native'
import {useState} from 'react'

export default function Slider({dailyLimit , setDailyLimit}){
    const [currValue , setCurrValue] = useState(dailyLimit);
    const SCREEN_WIDTH = Dimensions.get('window').width;
    const ITEM_WIDTH = 120;
    const ITEM_MARGIN = 5;
    const EFFECTIVE_ITEM_WIDTH = ITEM_WIDTH + (2 * ITEM_MARGIN); // 100 + 10 = 110

    let data =[];
    for(let i=0 ; i<4000 ; i+=5){
        data.push(i);
    }

    // Find index of current value
    let index = 0; // Initialize to 0, not 1
    for(let i=0 ; i<data.length ; i++){
        if(currValue == data[i]){
            index = i;
            break;
        }
    }
    
    // console.log(curr);
    // console.log(index)
    
    // CALCULATE PADDING
    // This padding pushes the first/last item to the center of the screen
    const CENTER_PADDING = (SCREEN_WIDTH / 2) - (EFFECTIVE_ITEM_WIDTH/1.5);

    return (
        <View style={{height:'40%' , margin:0 , padding:0 , backgroundColor:'none' ,alignItems:'center'}}>
            <FlatList style={{minHeight:115 , margin:'none' , padding:'none'}}
                data={data}
                horizontal
                initialScrollIndex={index}
                contentContainerStyle={{
                    paddingHorizontal : CENTER_PADDING
                }}
                snapToInterval={EFFECTIVE_ITEM_WIDTH} 
                decelerationRate="fast" // Highly recommended for snapping effect
                getItemLayout={(_, index) => ({
                    length: EFFECTIVE_ITEM_WIDTH,
                    offset: EFFECTIVE_ITEM_WIDTH * index,
                    index,
                })}

                onMomentumScrollEnd={(e)=>{
                    const offset = e.nativeEvent.contentOffset.x;
                    const ind = Math.round(offset / EFFECTIVE_ITEM_WIDTH);
                    
                    
                    setCurrValue(data[ind]);
                    // console.log(data[ind]);
                    setDailyLimit(data[ind].toString());
                    
                }}

                renderItem={({ item }) => (
                    // Apply margin here
                    <View style={{
                        width: ITEM_WIDTH, 
                        margin: ITEM_MARGIN, // 5 on each side
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center', 
                        backgroundColor:'none',
                        height:'100%'
                    }}>
                        <Text style={{fontSize: item == currValue ? 70 : 20}}>{item}</Text>
                       
                    </View>
                )}
            />
             <Text>Litres</Text>
        </View>
    )
}
