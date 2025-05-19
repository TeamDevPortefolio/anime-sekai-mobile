import { Text, TouchableOpacity } from "react-native"

type Props={

    title: string,
    isLoading:boolean,
    containerStyle?:string,
    textStyle?:string,
    onPress?:()=>void,


}

export default function CustomButton({title,isLoading,containerStyle,textStyle, onPress}:Props){

    return(
        <TouchableOpacity className={` ${containerStyle} rounded-md py-2 px-16`} onPress={onPress}>

            <Text className= {`text-lg text-center ${textStyle}`}> {title}</Text>

        </TouchableOpacity>
    )
}