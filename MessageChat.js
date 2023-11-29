import {
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
    ScrollView,
  } from 'react-native';
  import React, { useLayoutEffect, useState, useEffect, useRef } from 'react';
  import { useRoute, useNavigation } from '@react-navigation/native';
  import { Ionicons } from '@expo/vector-icons';
  import { Feather } from '@expo/vector-icons';
  import { Entypo } from '@expo/vector-icons';
  import { FontAwesome } from "@expo/vector-icons";
  import { MaterialIcons } from "@expo/vector-icons";
  import EmojiSelector from 'react-native-emoji-selector';
import { getChat } from './services';
import socket from './socket';
  
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmMzNmUzZGRkM2JjZmFjY2VkNzZiOSIsImVtYWlsIjoiQWJiaWdhaWxfQmFydG9sZXR0aUBnbWFpbC5jb20iLCJhdXRoU3RyYXRlZ3kiOiJsb2NhbCIsImlhdCI6MTcwMTIzMjY2NCwiZXhwIjoxNzAxMjg2NjY0fQ.KaMSNRzYRsQd2BkaDySHpVpV7opmhoPTOhcI7tNyJu8"
brearToken = "Bearer " + token

  export default function MessageChat() {
    
    const [showEmojiSelector, setShowEmojiSelector] = useState(false);
    const [messageList, setNewMessageList] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [selectedMessages, setSelectedMessages] = useState([]);
  
    
    const getCurrentTime = () => {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      return currentTime;
    };
  
    const scrollViewRef = useRef(null);
  
    useEffect(() => {
      scrollToBottom();
    }, []);
  
    const scrollToBottom = () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: false });
      }
    };
  
    const handleContentSizeChange = () => {
      scrollToBottom();
    };
  
    const handleEmojiPress = () => {
      setShowEmojiSelector(!showEmojiSelector);
    };
  
    const navigation = useNavigation();
    const route = useRoute();
  
    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: '',
        headerLeft: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={28} color="black" />
            </TouchableOpacity>
            {selectedMessages.length > 0 ? (
              <View>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  {selectedMessages.length}
                </Text>
              </View>
            ) : (
           <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    resizeMode: "cover",
                  }}
                  source={image}
                />
  
                <Text style={{ marginLeft: 5, fontSize: 15, fontWeight: "bold" }}>
                  {UserName}
                </Text>
              </View>
            )}
          </View>
        ),
        headerRight: () =>
          selectedMessages.length > 0 ? (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <MaterialIcons
                onPress={() => handleDeleteSelectedMessages(selectedMessages)}
                name="delete"
                size={24}
                color="black"
              />
            </View>
          ) : null,
      });
    });
  
    const { userId, UserName, image } = route?.params;
    
    const handleDeselect = (id) =>{
    if (selectedMessages.includes(id)) {
        setSelectedMessages(selectedMessages.filter((msgId) => msgId !== id));
      }
    }
  
  const handleLongPress = (id) => {
  
        setSelectedMessages([...selectedMessages, id]);
    };
  
    const handleDeleteSelectedMessages = () => {
      const updatedMessages = messageData.filter((msg) => !selectedMessages.includes(msg.id));
      setNewMessageList(updatedMessages);
      setSelectedMessages([]);
    };

    useEffect( ()=>{
      async function loadChat(){
       let messages = (await getChat(token, userId)).data.data.chat[0].messages;
       setNewMessageList(messages);
      }
      loadChat()
    }, [userId])
     /*Sockets Logic*/
     socket.on('receiveMessage', (message)=>{
      let receivedMessage = message;
      receivedMessage.status = "receive";
      setNewMessageList([...messageList, receivedMessage]);
    })

    socket.on('sentMessage', (message)=>{
      console.log('message has been sent')
      let sentMessage = message;
      sentMessage.status = "send";
      setNewMessageList([...messageList, sentMessage]);
    })
    socket.on('test', (d)=>{
      console.log(d)
    })
    const handleSend = () => {
      if (newMessage.trim() !== '') {
        socket.emit('sendMessage', userId, newMessage)
      }
    };

    return (
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#F0F0F0' }}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{ flexGrow: 1 }}
          onContentSizeChange={handleContentSizeChange}>
          {messageList.map((item, index) => {
             const isSelected = selectedMessages.includes(item.id);
            return (
              <Pressable
               onLongPress={() => handleLongPress(item.id)}
               onPressIn ={()=> handleDeselect(item.id)}
                key={index}
                style={[
                  item?.status === 'send'
                    ? {
                        alignSelf: 'flex-end',
                        backgroundColor: '#DCF8C6',
                        padding: 8,
                        maxWidth: '60%',
                        borderRadius: 7,
                        margin: 10,
                      }
                    : {
                        alignSelf: 'flex-start',
                        backgroundColor: 'white',
                        padding: 8,
                        margin: 10,
                        borderRadius: 7,
                        maxWidth: '60%',
                      },
                      isSelected && { backgroundColor: "grey" },
                ]}>
                <Text
                  style={{
                    fontSize: 13,
                    textAlign: 'left',
                  }}>
                  {item?.message}
                </Text>
                <Text
                  style={{
                    textAlign: 'right',
                    fontSize: 9,
                    color: 'gray',
                    marginTop: 5,
                  }}>
                  {item.createdAt}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderTopWidth: 1,
            borderTopColor: '#dddddd',
            marginBottom: showEmojiSelector ? 0 : 25,
          }}>
          <Entypo
            onPress={handleEmojiPress}
            style={{ marginRight: 5 }}
            name="emoji-happy"
            size={24}
            color="gray"
          />
  
          <TextInput
            value={newMessage}
            onChangeText={(text) => setNewMessage(text)}
            style={{
              flex: 1,
              height: 40,
              borderWidth: 1,
              borderColor: '#dddddd',
              borderRadius: 20,
              paddingHorizontal: 10,
            }}
            placeholder="Type Your message..."
          />
  
          <Pressable
            onPress={handleSend}
            style={{
              backgroundColor: '#007bff',
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 20,
              marginLeft: 8
            }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Send</Text>
          </Pressable>
        </View>
  
        {showEmojiSelector && (
          <EmojiSelector
            onEmojiSelected={(emoji) => {
              setNewMessage((prevMessage) => prevMessage + emoji);
            }}
            style={{ height: 250 }}
          />
        )}
      </KeyboardAvoidingView>
    );
  }
  