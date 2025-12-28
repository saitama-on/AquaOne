import {View , Text , StyleSheet
    , TouchableOpacity , Image , Keyboard 
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { IconButton  , Icon } from 'react-native-paper';
import { useCallback, useState , useContext } from 'react';
import { UserContext } from '../App.js';



function InfoItem({label , value}){
    return (
        <View style={styles.InfoRow}>
            <View style={styles.labelContainer}>
                <Text style={styles.textView}>{label}</Text>
            </View>

            <View style={styles.valueContainer}>
                <Text style={styles.textView}>{value}</Text>
            </View>
        </View>
    )
}

export default function EditProfile(){
    const navigation = useNavigation();
    // const {userInfo } = route.params;
    const {userInfo} = useContext(UserContext)


    // console.log(userInfo);
    const handleClose = ()=>{
        navigation.goBack();
    }


    const handleEditName = () =>{
        navigation.navigate('ChangeName' );
    }

    const handleImageUpload = () =>{
        navigation.navigate('ChangeImage' );
    }
    return (
        <View style={styles.backgroundContainer} onTouchStart={handleClose}>
            <View style={styles.mainContainer} onTouchStart={(e)=> e.stopPropagation()}>

                
                <View style={styles.imageSection}>
                    <TouchableOpacity style={{width:100, height:100 , borderRadius:10 , justifyContent:'center' , alignItems:'center'}} onPress={handleImageUpload}>
                        <Image source={require("../assets/edit-2.png")} style={{width:'100%', height:'100%'}}></Image>
                        <View style={{ position:'absolute' , bottom:-12 , backgroundColor:'white' , borderRadius:5 , padding:2}}>
                        <Icon source="plus"  color="rgb(51, 102, 255)" size={20}></Icon>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.nameSection}>
                    <View style={styles.nameSectionName}>
                        <Text style={{fontSize:40 , fontWeight:'600' }}>{userInfo?.name}</Text>
                        <TouchableOpacity style={{justifyContent:'center'}} onPress={handleEditName}>
                            <Icon size={20} color='#3366FF' source={require("../assets/edit-2.png")}></Icon>
                        </TouchableOpacity>
                    </View>
                    <Text>{userInfo?.dwelling[0]?.role}</Text>
                </View>
                {/*useruserInfo Section */}
                <View>
                    
                    <InfoItem label="Email" value={userInfo?.email}></InfoItem>
                    <InfoItem label="Phone" value={userInfo?.mobile}></InfoItem>
                    <InfoItem label="D.O.B" value={userInfo?.birth_date}></InfoItem>
                    <InfoItem label="Community" value={userInfo?.dwelling[0]?.community_name}></InfoItem>
                    <InfoItem label="Villa Block" value={userInfo?.dwelling[0]?.block}></InfoItem>
                    <InfoItem label="Floor" value={userInfo?.dwelling[0]?.floor_no}></InfoItem>
                    <InfoItem label="Flat no" value={userInfo?.dwelling[0]?.flat_no}></InfoItem>
                    <InfoItem label="Member Since" value="N/A"></InfoItem>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({


    backgroundContainer:{
        backgroundColor:'rgba(0,0,0,0.5)',
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
        padding:0
    },

    mainContainer:{
        backgroundColor:'white',
        width:'100%',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        padding:20,
        paddingBottom:40,
        paddingTop:30
    },

    InfoRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        margin:12
    },

    labelContainer:{
        width:'40%',
        // justifyContent:'',
        alignItems:'left',

        
        // backgroundColor:'red'
    },
    valueContainer:{
        width:'70%',
        justifyContent:'center',
        alignItems:'left',
    }
    ,
    textView:{
        fontSize:15,
        opacity:0.5
    },

    nameSection:{
        justifyContent:'center',
        alignItems:'center',
        margin:20
       
        
    },

    nameSectionName:{
        flexDirection:'row',
        justifyContent:'center',
        padding:5
    },

    imageSection:{
        justifyContent:'center',
        alignItems:'center',
    }
})