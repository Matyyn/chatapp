import { Text, SafeAreaView, StyleSheet } from 'react-native';
import {useEffect} from 'react'
import Navigation from './Navigation'
import socket from "./socket.js";


export default function App() {
  useEffect(()=>{
    socket.auth = { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmMzNmUzZGRkM2JjZmFjY2VkNzZiOSIsImVtYWlsIjoiQWJiaWdhaWxfQmFydG9sZXR0aUBnbWFpbC5jb20iLCJhdXRoU3RyYXRlZ3kiOiJsb2NhbCIsImlhdCI6MTcwMTIzMjY2NCwiZXhwIjoxNzAxMjg2NjY0fQ.KaMSNRzYRsQd2BkaDySHpVpV7opmhoPTOhcI7tNyJu8"}
    try{
      console.log(socket.connect())
    }
    catch(error){
      console.log(error);
    }
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1'
  }
});
