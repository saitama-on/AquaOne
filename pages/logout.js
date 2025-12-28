import {View , Text , StyleSheet , TouchableOpacity} from 'react-native';
import {useNavigation , CommonActions} from '@react-navigation/native'
import { getAuth , signOut } from '@react-native-firebase/auth';

export default function LogoutModal(){

    const navigation = useNavigation();
    const handleClose = ()=>{
        navigation.goBack();
    }

        const handleLogOut = async()=>{
        try {
           await signOut(getAuth());
            navigation?.dispatch(
                CommonActions?.reset({
                    index:0,
                    routes:[{name:'Welcome'}]
                })
            )
        }
        catch(e){
            alert(e);
        }

    }

    return(
        <View style={styles.mainModal} onTouchStart={handleClose}>
            <View style={styles.modalContent} onTouchStart={(e)=> e.stopPropagation()}>
                <View>
                    <Text style={styles.BigText}>Log Out?</Text>
                    <Text>Are you sure you want to log out?</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.Logout} onPress={handleLogOut}>
                        <Text style={{color:'white'}} >Yes, logout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Cancel} onPress={handleClose}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainModal:{
        backgroundColor:'rgba(0,0,0,0.5)',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:30
    }
    ,
    modalContent:{
        backgroundColor:'white',
        width:'100%',
        padding:20,
        borderRadius:20
    },
    BigText:{
        fontSize:30,
        fontWeight:'600',
        marginBottom:10
    },
    buttonContainer:{
        display:'flex',
        flexDirection:'row',
        marginTop:20,
        justifyContent:'flex-end'
    
    },
    Logout:{
        backgroundColor:'#FF4842',
        borderRadius:10,
        padding:10,
        margin:5

    },
    Cancel:{
        backgroundColor:'#919EAB52',
        borderRadius:10,
        padding:10,
        margin:5
    }
}
)