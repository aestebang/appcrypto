import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
const SplashScreenComponent = () => {
  return (
    <SafeAreaView>
      <LottieView source={require('../../assets/animations/animationBitcoin.json')} 
      autoPlay 
      loop={false}
      resizeMode='cover'
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
      }}
      />
    </SafeAreaView>
  )
}

export default SplashScreenComponent