import {View ,  Text ,FlatList , Dimensions, StyleSheet} from 'react-native'
import {useState} from 'react'

export default function Slider({dailyLimit , setDailyLimit}){
    const SCREEN_WIDTH = Dimensions.get('window').width;
    const ITEM_WIDTH = 120;
    const ITEM_MARGIN = 5;
    const EFFECTIVE_ITEM_WIDTH = ITEM_WIDTH + (2 * ITEM_MARGIN); // 100 + 10 = 110

    console.log(dailyLimit);
    let data =[];
    for(let i=0 ; i<4000 ; i+=5){
        data.push(i);
    }
    const initialIndex = data.indexOf(parseInt(dailyLimit) || 0);

    
    // CALCULATE PADDING
    // This padding pushes the first/last item to the center of the screen
    const CENTER_PADDING = (SCREEN_WIDTH / 2) - (EFFECTIVE_ITEM_WIDTH/1.5);

    return (
        <View style={{height:'40%' , margin:0 , padding:0 , backgroundColor:'none' ,alignItems:'center'}}>
            <FlatList style={{minHeight:115 , margin:'none' , padding:'none'}}
                data={data}
                horizontal
                initialScrollIndex={initialIndex}
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
                    
                    // console.log(ind)
                    // setCurrValue(data[ind]);
                    // console.log(data[ind]);
                    setDailyLimit(data[ind])
                    // console.log(data[ind]);
                    
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
                        <Text style={{fontSize: item == dailyLimit ? 70 : 20}}>{item}</Text>
                       
                    </View>
                )}
            />
             <Text>Litres</Text>
        </View>
    )
}
