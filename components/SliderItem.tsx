import { ImageType } from '@/types/types'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Image } from 'expo-image'
import { useEffect } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedReaction, useAnimatedStyle } from 'react-native-reanimated'

type Props = {
    item:ImageType
    index:number
    scrollX:SharedValue<number>

}
const {width} = Dimensions.get('window')

 const SliderItem=({item,index,scrollX}:Props)=>{

    useAnimatedReaction(
        () => scrollX.value,
        (value, prev) => {
          // Code déclenché à chaque changement de scrollX
          console.log('scrollX changed: ', value)
        }
      )
      
    useEffect(()=>{


    },[scrollX])
    const itemWidth = width / 2
    const rnAnimated =  useAnimatedStyle(()=>{
        return{

transform:[{


    translateX:interpolate(scrollX.value,[
        (index-1) * itemWidth,index* itemWidth,(index+1)*itemWidth],[-itemWidth *0.25, 0, itemWidth * 0.25],
        Extrapolation.CLAMP


    )
},{
scale:interpolate(
    scrollX.value,[
    (index-1) * itemWidth,index* itemWidth,(index+1)*itemWidth],
    [0.9,1,0.9],
    Extrapolation.CLAMP
)



}]

        }





    })
return(
    <Animated.View key={index} className="" style={[styles.itemContainer,rnAnimated]}>
      
        <Image  source={{uri:item.url}} style={styles.image} />
        <TouchableOpacity style={styles.playButton} >
            <Ionicons name='play' size={30} color={"red"}> </Ionicons>
        </TouchableOpacity>
        <Text>Slider text</Text>
    </Animated.View>)

}

export default SliderItem


const styles = StyleSheet.create({

itemContainer:{
    paddingTop:20,
  marginHorizontal:30,

  
 
    width:(width/2)
 
},
playButton: {
    position: 'absolute',
    top: "50%", // moitié de la hauteur - moitié taille icône
    left: '50%',
    marginLeft: -20, // moitié de l’icône
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 50,
paddingVertical:10,
   paddingLeft:10,
    display:'flex',
    alignItems:"center",
    justifyContent:"center",
},
image:{
    borderRadius:20,
    width:"100%",
    height:300
}

})
