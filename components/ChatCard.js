import {
    View,
    Text,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
  
  export const ChatCard = ({userId, userName,lastMessage,createdAt,image}) => {
    const navigation = useNavigation();
  
    function sliceTextToFourWords(text) {
    
  if (typeof text !== 'string' || !text.trim()) {
      return ''; 
    }
  
    const slicedText = text.split(' ').slice(0, 4).join(' ');
    return slicedText;
  }
  
  const slicedText = sliceTextToFourWords(lastMessage);
  
    return (
      <TouchableOpacity
      onPress ={()=>{
        navigation.navigate('Messages', {userId: userId, UserName: userName, image: image || ""})
      }
      }
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          borderWidth: 0.7,
          borderColor: '#D0D0D0',
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          padding: 15,
        }}>
        <Image
          style={{ width: 50, height: 50, borderRadius: 25, resizeMode: 'cover' }}
          source={image}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: '500' }}>{userName}</Text>
          <Text style={{ marginTop: 3, color: 'gray', fontWeight: '500' }}>
            {slicedText}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 11, fontWeight: '400', color: '#585858' }}>
            {createdAt}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  