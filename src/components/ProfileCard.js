import React, {useContext} from 'react';
import {

  Text,
  
  View,
} from 'react-native';
import Colors from '../constants/colors';


const ProfileCard = ({heading, title}) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 13,
          fontWeight: '600',
          marginTop: 10,
          color: Colors.Gray,
        }}>
       {heading}
      </Text>
      <Text style={{fontSize: 12, fontWeight: '500', marginTop: 5,color:Colors.Black}}>
        {title}
      </Text>
    </View>
  );
};



export default ProfileCard;
