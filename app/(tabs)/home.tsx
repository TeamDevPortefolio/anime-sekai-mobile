import CardList from '@/components/CardList';
import SwiperComponent from '@/components/Swiper';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ImageSliders1, ImagesSwiper } from './data/data';


export default function HomeScreen() {
  return (
    <ScrollView>
    <View style={styles.container} className='bg-[#0E0E0E] h-full w-full'>
      <View className='h-[300px] mb-4' >
        <SwiperComponent Images={ImagesSwiper} />
      </View>

     
      <View>
        <Text className=' text-white text-xl font-bold'>populaire</Text>
      <CardList  Images={ImageSliders1} />

      </View>
      <View>
      <Text className=' text-white text-xl font-bold'>Recommender</Text>
        <CardList Images={ImageSliders1}/>
      </View>



    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  }

});
