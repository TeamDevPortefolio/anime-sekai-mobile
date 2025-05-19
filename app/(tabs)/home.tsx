import { StyleSheet, TextInput, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container} className='bg-[#0E0E0E] h-full w-full'>
      <View>
      <TextInput className='bg-black rounded-md placeholder:text-white  text-2xl' placeholder='search'  style={{ width: "100%", height: 50, backgroundColor: "blue" }} />
      </View>
   

  
</View>
  );
}

const styles = StyleSheet.create({
container:{
  padding:10,
}
  
});
