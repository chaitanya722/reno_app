import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import Colors from '../../../constants/colors';

const Inbox = ({navigation}) => {
  const [selectedindex, setselectedindex] = useState(0);

  const data = ['Inbox', 'Selling', 'Buying', 'Archieve', 'Unreads'];

  const handleWebViewLoad = () => {
    setIsLoading(false);
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        horizontal
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{margin: 15}}
              onPress={() => setselectedindex(index)}>
              <Text
                style={{
                  color: index == selectedindex ? Colors.Black : Colors.Gray,
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <Text>Services</Text>
    </View>
  );
};

export default Inbox;
