import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './Components/Home'



export default function App() {
  return (
    
<>
    <View style={{flex:1}}>
      <StatusBar style="auto"/>
      <Home/>
    </View>
    </>
  )
}



const styles = StyleSheet.create({
  
})