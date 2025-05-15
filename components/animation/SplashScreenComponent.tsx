import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import SafeView from '../../app/components/SafeView'
const SplashScreenComponent = () => {
  return (
    <SafeView>
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
    </SafeView>
  )
}

export default SplashScreenComponent