import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { Text, TouchableOpacity, View } from 'react-native';


export default function CardThumnail() {
    return (
        <View className=' flex flex-row border-2 items-center  border-indigo-600 mt-4 p-3'>

            <Image source={{ uri: 'http://192.168.2.141:1337/uploads/stein_gate_b2570b9b96.png' }}  style={{width:118,height:79}}/>
            <View className="pl-5">


                <Text className='text-white'>Stein gate ep 1</Text>
                <Text className='text-white font-light'>Audio francais</Text>
                <Text className='text-white font-light mb-2'>runtime: 30 min</Text>
                <TouchableOpacity className='bg-blue-700 rounded p-2 w-[103px] flex flex-row items-center'><Text className='text-white font-semibold'>Watch</Text><Ionicons className='ml-2' name='play' size={20} color="#fff"></Ionicons></TouchableOpacity>
            </View>
        </View>
    )
}