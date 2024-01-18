import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { BASE_URL } from '../../../services/environment';
const ChatScreenListing = ({ route }) => {
  const { mid, lid, seller_id } = route.params;
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollViewRef = useRef();

  const groupMessagesByDate = (messages) => {
    return messages.reduce((result, message) => {
      const messageDate = new Date(message.date);
      const formattedDate = messageDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      const messageTime = new Date(`${message.date} ${message.time}`);


      if (!result[formattedDate]) {
        result[formattedDate] = [];
      }
      result[formattedDate].push({ ...message, time: messageTime });      return result;
    }, {});
  };

  const fetchChatMessages = async () => {
    try {
      const response = await fetch(`${BASE_URL}get_chats_listing?mid=${mid}&lid=${lid}`, {
        headers: {
          'api-key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
        },
      });

      const result = await response.json();

      if (result.chat_messages) {
        setChatMessages(result.chat_messages);
        // Scroll to the bottom of the ScrollView when new messages are fetched
        scrollViewRef.current?.scrollToEnd({ animated: true });
      } else {
        console.error('Failed to fetch chat messages:', result.message);
      }
    } catch (error) {
      console.error('Error fetching chat messages:', error.message);
    }
  };

  const sendMessage = async () => {
    try {
      const formData = new FormData();
      formData.append('mid', mid);
      formData.append('lid', lid);
      formData.append('msg', newMessage);
      formData.append('sender_mid', seller_id);
  
      const response = await fetch('https://apis.devcorps.in/send_chat_listing', {
        method: 'POST',
        headers: {
          'api-key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
        },
        body: formData,
      });
  
      const result = await response.json();
  
      if (result.success) {
        // Clear the input field
        setNewMessage('');
        // Fetch the updated chat messages immediately after sending the message
        fetchChatMessages();
      } else {
        console.error('Failed to send message:', result.message);
      }
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };

  

  useEffect(() => {
    fetchChatMessages();
  }, [mid, lid]);

  const groupedMessages = groupMessagesByDate(chatMessages);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => {
          // Scroll to the bottom of the ScrollView when the content size changes
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }}
      >
        {Object.entries(groupedMessages).map(([date, messages]) => (
          <View key={date}>
            <View style={{ alignItems: 'center', margin: 10 }}>
              <Text style={{ fontSize: 14, fontWeight: '400', marginBottom: 10, color: '#000' }}>{date}</Text>
            </View>

            {messages.map((message) => (
              <View
                key={message.chat_id}
                style={{
                  marginBottom: 10,
                  alignSelf: message.mid === mid ? 'flex-end' : 'flex-start',
                }}
              >
                <View
                  style={{
                    backgroundColor: message.mid === mid ? '#EBEBEB' : '#EBEBEB',
                    borderRadius: 10,
                    padding: 10,
                    maxWidth: '80%',
                  }}
                >
                  <Text style={{ fontWeight: '400', color: '#000' }}>{message.msg}</Text>
                </View>
                <Text style={{ color: 'gray', marginTop: 5, textAlign: message.mid === mid ? 'right' : 'left' }}>
                {message.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}                </Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
        <TextInput
          style={{ flex: 1, borderColor: 'gray', color: '#000', borderWidth: 1, borderRadius: 10, padding: 8 }}
          placeholder="Type your message..."
          placeholderTextColor={'#000'}
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <TouchableOpacity style={{ marginLeft: 10, padding: 8, backgroundColor: '#000', borderRadius: 10 }} onPress={sendMessage}>
          <Text style={{ color: '#FFFFFF' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreenListing;
