import { Text, SafeAreaView, StyleSheet } from 'react-native';
import {useEffect} from 'react'
import Navigation from './Navigation'
import socket from "./socket.js";


export default function App() {
  useEffect(()=>{
    socket.auth = { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzFiZTY5MjhhOTA0Y2M3NTVlZTcwZSIsImVtYWlsIjoiYWJkdWxoYWRpMTIzQGdtYWlsLmNvbSIsImF1dGhTdHJhdGVneSI6ImxvY2FsIiwiaWF0IjoxNzAxMTU5MTc0LCJleHAiOjE3MDEyMTMxNzR9.BcBEfp1uDXBOSpgCBo80X2pMwZ0g3ELT4qurEqcKTA0" };
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
