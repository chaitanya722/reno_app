import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Images from '../../../constants/Images';
import Colors from '../../../constants/colors';

const AboutUs = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleWebViewLoad = () => {
    setIsLoading(false);
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={Images.marketplace_recommended}
        style={{height: 200, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 22, color: Colors.White, fontWeight: 'bold'}}>
          About Us
        </Text>
      </ImageBackground>
      <ScrollView>
        <View style={{margin: 10}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Who we are ?</Text>
          <Text>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the
            middle of text. All the Lorem Ipsum generators on the Internet tend
            to repeat predefined chunks as necessary, making this the first true
            generator on the Internet.
          </Text>
        </View>
        <View style={{margin: 10}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Our Approache</Text>
          <Text>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
            amet..", comes from a line in section 1.10.32.
          </Text>
        </View>
        <View style={{margin: 10}}>
          <Image
            source={Images.personProfile}
            style={{
              height: 200,

              width: '100%',
              resizeMode: 'contain',
            }}
          />
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Our Mission</Text>
          <Text>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
            amet..", comes from a line in section 1.10.32. The standard chunk of
            Lorem Ipsum used since the 1500s is reproduced below for those
            interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
            Malorum" by Cicero are also reproduced in their exact original form,
            accompanied by English versions from the 1914 translation by H.
            Rackham.It is a long established fact that a reader will be
            distracted by the readable content of a page when looking at its
            layout. The point of using Lorem Ipsum.
          </Text>
        </View>
        <View style={{margin: 10}}>
          <Image
            source={Images.home_Carosule}
            style={{
              height: 200,

              width: '100%',
              resizeMode: 'contain',
            }}
          />
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Our Vission</Text>
          <Text>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutUs;
