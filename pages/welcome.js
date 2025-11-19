import React , {useState , useRef} from 'react';
import { Text, View , KeyboardAvoidingView , ScrollView, TouchableOpacity} from 'react-native';
import { TextInput , Button} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
// import {app , auth} from '../firebase/firebase.js';
// import {firebase} from '@react-native-firebase/app'
import {getAuth,onAuthStateChanged, signInWithPhoneNumber } from '@react-native-firebase/auth';


// const app = firebase.initializeApp();
function EnterNumber({setOtpSent ,setConfirm}){

    const [number , setNumber] = useState('');
    const handleValidation = async()=>{

        if(number.length >10){
            setNumber('');
            alert("Invalid Number!");
            return;
        }

        try {
            // alert(auth)
            const confirmation = await signInWithPhoneNumber(getAuth(), '+91'+number);
            // alert(confirmation)
            setConfirm(confirmation)
            // setVerId(vId);
            setOtpSent(true);
            ("OTP sent!");
        } catch (e) {
        alert(e.message);
        };
        // alert(`OTP sent to : ${number}` );
    }



    return (

    <View style={{padding:10}}>
        <Text style={{fontSize:30, fontWeight:600 , marginBottom:15}}>Welcome To Aquesa!</Text>
        <Text style={{fontSize:18 , fontWeight:400 , marginBottom:20 , lineHeight:28}}>Please enter your mobile number , We will send you OTP to get you verified!</Text>
        <TextInput 
            mode="outlined" 
            left={<TextInput.Affix text="+91"/>} 
            value={number} 
            onChangeText={setNumber} 
            style={{backgroundColor:"white" , marginBottom:20}} inputMode='numeric' 
            label={"Mobile Number"}
            >
            
        </TextInput>
        <Button mode='contained' buttonColor="#7cb2d9" onPress={handleValidation}>Get OTP</Button>
    </View>
    );
}
function EnterOtp({setOtpSent , navigation , confirm}){

    const [otp , setOtp] = useState(null);

    const handleValidation = async() =>{
        //verify otp in backend
        try {
            await confirm.confirm(otp);

            // alert("Logged In!");
            // alert("Welcome!");
            // setOtpSent(false);
            // setVerId(null);
            // setOtp('');

            navigation.replace('Home');
        } catch (e) {
            alert(e);
        }
    }

    const handleChangeNumber = ()=>{
        setOtpSent(false);
        // setNumber('');
    }
    return(
    <View style={{padding:10}}>
        <Text style={{fontSize:30, fontWeight:600 , marginBottom:15}}>Welcome To Aquesa!</Text>
        <Text style={{fontSize:18 , fontWeight:400 , marginBottom:20 , lineHeight:28}}>Please enter Otp sent to your number.</Text>
        <TextInput 
            mode="outlined" 
            value={otp} 
            onChangeText={setOtp} 
            style={{backgroundColor:"white" , marginBottom:20}} inputMode='numeric' 
            >
            
        </TextInput>
        <TouchableOpacity onPress={handleChangeNumber} style={{marginBottom:10}}>
            <Text style={{color:'#85c6fcff' , fontSize:15 , fontStyle:'italic'}}>Change Number?</Text>
        </TouchableOpacity>
        <Button mode='contained' buttonColor="#7cb2d9" onPress={handleValidation}>Verify</Button>
    </View>
    )
}
export default function WelcomePage(){

    // const otpRef = React.useRef(null);
    const navigation = useNavigation();
    const [confirm , setConfirm] = useState(null);
    const [otpSent , setOtpSent] = useState(false);


    return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={'height'}
    >
    

      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around', alignItems: 'center' }}>

        <View style={{flex:1 , justifyContent:"space-around" , alignItems:"center"}}>
            <View style={{width:"90%", backgroundColor:"none",height:"40%",justifyContent:"flex-start"}}>
                <View style={{padding:10}}>
                    <Text style={{fontSize:70 , marginTop:50 , marginBottom:20 , textAlign:"center" , color:'#559db3ff'}}>aquesa</Text>
                    <Text style={{fontSize:20 ,textAlign:"center", alignSelf:"center" , color:'#7cb2d9' , lineHeight:28}}>Water Flow Management and Control System Manager</Text>
                </View>
            </View>
            <View style={{width:"90%" , backgroundColor:"none" , height:"30%"}}>
            {otpSent ? 
            <EnterOtp 
                setOtpSent={setOtpSent}
                navigation={navigation}
                confirm={confirm}
                /> : 
            <EnterNumber 
                setConfirm={setConfirm} 
                setOtpSent={setOtpSent}
                />}
            </View>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}