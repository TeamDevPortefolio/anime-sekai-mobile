
import { ImageType } from '@/types/types'
import { Image } from 'expo-image'
import React from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'
import Swiper from 'react-native-swiper'
type Props = {

    Images:ImageType[]
}

export default function SwiperComponent({Images}:Props) {
    
      return (
        <Swiper style={styles.wrapper} showsButtons={false} autoplay   >
            {Images.map((item)=>(
                <View style={styles.slide1} key={item.id}>
                <Image source={{uri:item.url}} style={{width:"100%",height:300}} />
                <View className='absolute top-50 left-10 w-10/12'>
                <Text className='text-white text-xl font-bold'> {item.name} </Text>
                <Text className='text-white text-xs font-medium '>{item.text}</Text>
                </View>
                </View>
            ))}
     
        </Swiper>
      )
    
  }



  AppRegistry.registerComponent('myproject', () => SwiperComponent)

  const styles = StyleSheet.create({
    wrapper: { },
    slide1: {
    display:'flex',
      height:300,
      justifyContent: 'center',
      alignItems: 'center',
      position:"relative"
    },
    slide2: {
        height:300,
      justifyContent: 'center',
      alignItems: 'center',
  
    },
    slide3: {
    height:300,
      justifyContent: 'center',
      alignItems: 'center',
     
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    }
  })