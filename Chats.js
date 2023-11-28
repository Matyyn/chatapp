import { View, Text, FlatList, ScrollView } from 'react-native';
import React from 'react';
import {Data} from './Data'
import {ChatCard} from './components/ChatCard'
import { getContactsHistory } from './services';

export default function Chats() {
  const [contacts, setContacts] = React.useState([])
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmIxYWMxZjk4NTYxMzcwODE2MGU3NiIsImVtYWlsIjoiYWxpaHVzc2FpbnBpZEBnbWFpbC5jb20iLCJhdXRoU3RyYXRlZ3kiOiJsb2NhbCIsIm5nbyI6eyJpZCI6IjY0ZmZjMmZmNDRmZGY3OGExODFlNTkzNCJ9LCJpYXQiOjE3MDExNjc5NDUsImV4cCI6MTcwMTIyMTk0NX0.xZQe7FrimnJ2IKhxSzQpOqtRCO27eDx-bgW5EE4qihc"
  React.useEffect(() => {
    getContactsHistory(token)
    .then((res)=>{
      console.log(res.data.data.contactsHistory[0])
      setContacts(res.data.data.contactsHistory);
    })
    .catch((err)=>{
      console.log(err)
    })
  }, [])



const renderItem = ({ item }) => {
    return (
      <ChatCard userId={item._id} userName={item.user.name} lastMessage={item.latestMessage.message} createdAt={item.latestMessage.createdAt} image={null} />
    );
  };


  return (
      <FlatList
        data={contacts}
        renderItem={renderItem}
      />
  );
}
