import CustomButton from "@/components/CustomButton";
import { API_TOKEN_AUTH } from '@env';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { Image } from "expo-image";
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,

  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";


const { width, height } = Dimensions.get('window');

import { useAuth } from "./context/AuthContext";

export default function Index() {
  const [logForm, setLogForm] = useState(false);
  const [subscribeForm, setSubscribe] = useState(false);

  const router = useRouter();
  const { login, user } = useAuth();
  const fadeAn = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-30)).current;

  const handleLogin = () => {
    axios
      .post('http://192.168.2.141:1337/api/auth/local', {
        identifier: "jonathan",
        password: "azerty123",
      }, {
        headers: {
          Authorization: `Bearer ${API_TOKEN_AUTH}`,
        }
      })
      .then(data => login(data.data))
      .catch(e => console.log(e));
  };

  const handleForm = () => setLogForm(!logForm);
  const handleSubcribe = () => setSubscribe(!subscribeForm);
  const resetState = () => {
    setLogForm(false);
    setSubscribe(false);
  };

  useEffect(() => {
    if (logForm || subscribeForm) {
      Animated.timing(fadeAn, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();

      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [subscribeForm, logForm]);

  useEffect(() => {
    if (user) {
      router.replace('/home');
    }
  }, [user]);

  return (

        <ImageBackground
          source={require('../assets/images/Image-home.jpg')}
          style={{ flex: 1 }}
          resizeMode="cover"
        >
          <SafeAreaView style={{ flex: 1 }}>
      
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1, justifyContent: 'space-between', paddingTop: 50, paddingBottom: 30 }}>
              {(logForm || subscribeForm) && (
                <Ionicons
                  name='arrow-back'
                  color="#fff"
                  size={25}
                  style={{ position: 'absolute', top: 30, left: 20, opacity: 1 }}
                  onPress={resetState}
                />
              )}
    
              <View style={{ alignItems: 'center' }}>
                <Image source={require('../assets/svg/default-monochrome-white.svg')} style={{ width: 300, height: 200 }} resizeMode="contain" />
                <Text style={{ color: 'white', fontSize: 24, textAlign: 'center', marginBottom: 20 }}>
                  Visionnez dès maintenant
                </Text>
              </View>
    
              {!logForm && !subscribeForm && (
                <View style={{ alignItems: 'center' }}>
                  <CustomButton
                    title="Connection"
                    isLoading={false}
                    containerStyle="mb-2 bg-[#1659DC] opacity-[.90]"
                    textStyle="text-white"
                    onPress={handleForm}
                  />
                  <CustomButton
                    title="S'enregister"
                    isLoading={false}
                    containerStyle="bg-[#ECEBFC] opacity-[.90]"
                    onPress={handleSubcribe}
                  />
                </View>
              )}
    
              {logForm && (
                <Animated.View
                  style={{
                    opacity: fadeAn,
                    transform: [{ translateY }],
                    paddingHorizontal: 20,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.label}>Username</Text>
                  <TextInput placeholder="Username" style={styles.input} />
                  <Text style={styles.label}>Mot de passe</Text>
                  <TextInput placeholder="Mot de passe" secureTextEntry style={styles.input} />
                  <CustomButton
                    title="Submit"
                    isLoading={false}
                    containerStyle="bg-[#1659DC] w-full mt-5"
                    textStyle="text-white"
                    onPress={handleLogin}
                  />
                </Animated.View>
              )}
    
              {subscribeForm && (
                <Animated.View
                  style={{
                    opacity: fadeAn,
                    transform: [{ translateY }],
                    paddingHorizontal: 20,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.label}>Username</Text>
                  <TextInput placeholder="Username" style={styles.input} />
                  <Text style={styles.label}>Email</Text>
                  <TextInput placeholder="Email" style={styles.input} />
                  <Text style={styles.label}>Mot de passe</Text>
                  <TextInput placeholder="Mot de passe" secureTextEntry style={styles.input} />
                  <Text style={styles.label}>Confirmation mot de passe</Text>
                  <TextInput placeholder="Confirmation" secureTextEntry style={styles.input} />
                  <CustomButton
                    title="Submit"
                    isLoading={false}
                    containerStyle="bg-[#1659DC] w-full mt-5"
                    textStyle="text-white"
                  />
                </Animated.View>
              )}
            </View>
          </ScrollView>
     
      </SafeAreaView>  
       </ImageBackground>

    
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  label: {
    color: "white",
    alignSelf: "flex-start",
    marginBottom: 5,
    marginTop: 10,
  },
});
