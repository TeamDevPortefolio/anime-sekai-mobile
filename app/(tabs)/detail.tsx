
import CardThumnail from '@/components/CardThumnail';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaskedView from '@react-native-masked-view/masked-view';
import { Audio, AVPlaybackStatusSuccess, Video } from 'expo-av';
import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, G, Path } from 'react-native-svg';
const { width: screenWidth } = Dimensions.get('window');



const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  container: {
    display: 'flex',
    backgroundColor: "#000"

  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  image: {
    width: 402,
    height: 438,
  },
  webview: {
    flex: 1,
  },
})

export default function DetailScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [gifReady, setGifReady] = useState(false);

  const [paused, setPaused] = useState(false);
  const [ismute, setisMute] = useState(false)
  const soundRef = useRef<Audio.Sound | null>(null)
  const videoRef = useRef<Video | null>(null)
  const animationRef = useRef<LottieView>(null);


  useEffect(() => {
    const time = setTimeout(() => {


      setIsLoading(false)

    }, 2000)
  }, []);


  async function playSound() {
    if (!soundRef.current) {
      const { sound } = await Audio.Sound.createAsync({
        uri: 'http://192.168.2.141:1337/uploads/stein_mp3_926fe5e093.MP3',
      }, { shouldPlay: true, isLooping: true });

      soundRef.current = sound
    }
    else {
      const status = await soundRef.current.getStatusAsync();
      if (status.isLoaded) {
        const successStatus = status as AVPlaybackStatusSuccess;
        if (!successStatus.isPlaying) {
          await soundRef.current.playAsync();
        }
      }
    }

  }


  const togglePlayPause = async () => {
    if (!videoRef.current) return;

    const status = await videoRef.current.getStatusAsync();

    if (status.isLoaded) {
      if (status.isPlaying) {
        await videoRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await videoRef.current.playAsync();
        setIsPlaying(true);
      }
    }
  };
  const toggleMute = async () => {
    if (!videoRef.current) return;

    const status = await videoRef.current.getStatusAsync();

    if (status.isLoaded) {
      if (status.isMuted) {
        await videoRef.current.setIsMutedAsync(false)
        setisMute(false);

      } else {

        await videoRef.current.setIsMutedAsync(true)
        setisMute(true);
      }
    }

  }
  async function stopVideo() {


    if (soundRef.current)
      await soundRef.current.pauseAsync();
  }

  if (!isLoading) {
    return (   
    <ScrollView >
      <View className='w-full h-full pb-28' style={styles.container}>
        <View className=' z-10 relative mb-8 opacity-75' style={{ width: '100%' }} >


          <MaskedView style={{ width: '100%', height: 'auto' }}

            maskElement={
              <Svg width="100%" height={438} viewBox="0 0 402 438">
                <Defs>
                  {/* Ajoute ici des filters ou clipPaths si nécessaires */}
                </Defs>
                <G transform={`scale(-1,1) translate(-402,0)`}>
                  <Path
                    d="M-11 62.9999C-11 29.3968 -11 12.5953 -4.46039 -0.239431C1.29201 -11.5292 10.4708 -20.708 21.7606 -26.4604C34.5953 -33 51.3968 -33 85 -33H315C348.603 -33 365.405 -33 378.239 -26.4604C389.529 -20.708 398.708 -11.5292 404.46 -0.239431C411 12.5953 411 29.3968 411 63V296.546C411 297.961 411 298.669 410.988 299.267C410.345 331.467 384.397 357.415 352.197 358.058C351.599 358.07 350.891 358.07 349.476 358.07H326.916C305.396 358.07 287.951 375.515 287.951 397.035V397.035C287.951 418.555 270.506 436 248.986 436H155.969C134.449 436 117.004 418.555 117.004 397.035V397.035C117.004 375.515 99.5587 358.07 78.0389 358.07H53.002C49.286 358.07 47.4281 358.07 45.8583 357.988C15.1925 356.38 -9.30978 331.877 -10.9177 301.212C-11 299.642 -11 297.784 -11 294.068V62.9999Z"
                    fill="#D9D9D9"
                  />
                </G>
              </Svg>
            }
          >
            {/* {showVideo ? (
        gifReady ? (
          <Image source={{ uri: gifUri}} style={{ width: screenWidth, height: 438 }} />
        ) : (
          <ActivityIndicator size="large" />
        )
      ) : (
        <Image source={{ uri:staticUri }} style={{ width: screenWidth, height: 438 }} />
      )} */}
            <Video
              ref={videoRef}
              source={require('../../assets/video/kurisu-amadeus.mp4')}
              style={{ width: '100%', height: 438 }}
              resizeMode='cover'
              isLooping

              onPlaybackStatusUpdate={(status) => {

              }}

              onLoad={() => setIsLoading(false)}

            />


          </MaskedView>
          <Text className='text-white absolute  top-16 left-4 text-xl  font-bold opacity-75 '>Aperçus</Text>
          <Ionicons className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' size={100} name={isPlaying ? "pause" : 'play'} color="#AFA4DA" onPress={togglePlayPause} ></Ionicons>

          <Ionicons className='absolute top-[40px] right-8' size={50} name={ismute ? 'volume-mute-outline' : 'volume-medium-outline'} color="#AFA4DA" onPress={toggleMute}></Ionicons>
          <View className='w-full flex flex-row justify-between px-3 absolute bottom-0'><Ionicons name="share-social-outline" size={50} color="#fff"></Ionicons><Ionicons name="heart-outline" size={50} color="#fff"></Ionicons></View>

        </View>
     
          <View>
            <Text className='text-3xl text-white mt-5'>Stein gate</Text>
            <View className='bg-purple-600 w-20 rounded-md'><Text>Action</Text></View>
          </View>
          <View>
            <Text className='text-3xl text-white mt-5'>Synopsie</Text>
            <Text className='text-sm text-white mt-5'>Un jeune épéiste combat des démons pour venger sa famille massacrée et sauver sa sœur transformée en démon, dans un Japon féodal rempli d'action, émotions et pouvoirs surnaturels.</Text>
          </View>
          <View>
            <Text className=' text-3xl text-white mt-5'>Episodes</Text>
            <CardThumnail />
            <CardThumnail />
            <CardThumnail />
          </View>
       

      </View> 
      </ScrollView>
    )


  }


  return (
    <View className='w-full h-full flex justify-center items-center bg-black'>
      <ActivityIndicator size="large" color="#0880ff" />
    </View>
  )


};

