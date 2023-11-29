import { View, Text, FlatList, ScrollView } from 'react-native';
import React from 'react';
import {Data} from './Data'
import {ChatCard} from './components/ChatCard'
import { getContactsHistory } from './services';

export default function Chats() {
  const [contacts, setContacts] = React.useState([])
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmMzNmUzZGRkM2JjZmFjY2VkNzZiOSIsImVtYWlsIjoiQWJiaWdhaWxfQmFydG9sZXR0aUBnbWFpbC5jb20iLCJhdXRoU3RyYXRlZ3kiOiJsb2NhbCIsImlhdCI6MTcwMTIzMjY2NCwiZXhwIjoxNzAxMjg2NjY0fQ.KaMSNRzYRsQd2BkaDySHpVpV7opmhoPTOhcI7tNyJu8"
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
