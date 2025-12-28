import {View, Text , StyleSheet , TouchableOpacity,   KeyboardAvoidingView,
    Keyboard
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon , TextInput} from 'react-native-paper'
import {useState} from'react';
import {getAuth} from '@react-native-firebase/auth';
import { launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';



export default function ChangeImage(){

    const navigation = useNavigation();
    const [image , setImage]  = useState(null);
    

    
    const handleClose = ()=>{
        navigation.goBack();
    }



    const handleUploadFromGallery = async() =>{

        const options = {
            media : 'photo',
            quality:0.5,
            includeBase64:true
        }

        const result = await launchImageLibrary(options);
        
        if(result.didCancel){
            return;
        }
        else if( result.errorCode){
            console.log('Image Picker Error: ' , result.errorMessage);
            return;
        }
        else{
            const selectedImage = result.assets[0];
            console.log('Selected Image: ' , selectedImage);
            setImage(selectedImage);
        }
    }

    const handleImageUpload = async() =>{
        try{
            const user = await getAuth().currentUser;
            const token = await user.getIdToken();


            if(image == null){
                const response = await fetch('https://api.aquesa.in/api/v1/user/picture',{
                    method:'DELETE',
                    headers:{
                        'Authorization': `Bearer ${token}`,

                    }
                });

                if(response.ok){
                    console.log('Image removed successfully');
                    navigation.pop(2);
                }
            }


            else{
                const formData = new FormData();
                formData.append('file',{
                    uri:image.uri,
                    type:image.type,
                    name:image.fileName
                });

                const response = await fetch('https://api.aquesa.in/api/v1/user/picture',{
                    method:'POST',
                    headers:{
                        'Authorization': `Bearer ${token}`,

                    },
                    body:formData
                });

                if(response.ok){
                    console.log('Image uploaded successfully');
                    navigation.pop(2);
                }
                else{
                    const data = await response.text();
                    console.log(data)
                }
            }

        }catch(e){
            console.log(e);
        }
    }

    return (
        <View style={styles.backgroundContainer} onTouchStart={handleClose}>
            
            <View style={styles.mainContainer} onTouchStart={(e)=> e.stopPropagation()}>
                <View style={styles.headerContainer }>
                    <Text style={{fontSize:25}}>Change Profile Photo</Text>
                    <TouchableOpacity onPress={handleClose}>
                        <Icon source='close' size={20}></Icon>
                    </TouchableOpacity>
                </View>
                <Text>Please select your picture.</Text>
                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.ImageButtons} onPress={handleUploadFromGallery}>
                        <Icon source="image-plus" size={30} color='rgba(80, 160, 223, 1)'>
                        </Icon>
                        <Text style={styles.ImageText}>Gallery</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.ImageButtons} onPress={()=> setImage(null)}>
                        <Icon source="image-off" size={30} color='rgba(80, 160, 223, 1)'>
                        </Icon>
                        <Text style={styles.ImageText}>No image</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row' , alignItems:'center' , marginTop:10}}>
                    <Icon source={image ? "check-decagram" : "close-circle-outline"}
                    color={image ? "green" : 'red'} ></Icon>
                    <Text style={{marginLeft:10}}>{image ? 'Image selected' : 'No image selected' }</Text>
                </View>
                <TouchableOpacity style={styles.UpdateButton} onPress={handleImageUpload}>
                    <LinearGradient
                    colors={['#6ca3f5ff', '#60EFFF']}
                    start={{ x: 0, y: 0.9 }} 
                    end={{ x: 1, y: 0.4 }}
                    width={'100%'}
                    style={{alignItems:'center' , borderRadius:15}}
                    >
                    <Text style={{fontSize:20 , padding:10 , color:'white'}}>Update</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}



const styles = StyleSheet.create({


    backgroundContainer:{
        backgroundColor:'rgba(0,0,0,0.5)',
        flex:1,
        height:500,
        // backgroundColor:
        alignItems:'center',
        justifyContent:'flex-end',
        padding:0
    },

    mainContainer:{
        backgroundColor:'white',
        width:'100%',
        
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        padding:20,
    }
    , 
    headerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:10
    },

    inputContainer:{
        marginTop:20,
        flexDirection:'row',

    },

    UpdateButton:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        backgroundColor:'pink',
        // backgroundColor:'Gradient/New Grade v2',
        marginTop:10,
        borderRadius:15,
    },

    ImageButtons:{
        alignItems:'center',
        justifyContent:'center',
        margin:10
    },

    ImageText:{
        color:'rgba(188, 203, 216, 1)'
    }

})