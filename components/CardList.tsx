import { ImageType } from "@/types/types";
import { View } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import SliderItem from "./SliderItem";

type Props ={

    Images:ImageType[]
    itemList?:ImageType[]
}




export default function CardList({Images}:Props){
    const scrollX = useSharedValue(0);
    const onScrollHandle = useAnimatedScrollHandler({
        onScroll:(e)=>{
          scrollX.value = e.contentOffset.x
        }
    })
return(
    <View>
        <Animated.FlatList
         horizontal 
         data={Images} 
         scrollEventThrottle={16}
         onScroll={onScrollHandle}
         renderItem={({item,index})=>(<SliderItem item={item} index={index}  scrollX={scrollX} />)


        }>

        </Animated.FlatList>
    </View>
)


}