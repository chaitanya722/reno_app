import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const Button = ({ text }) => {
  return (
    <TouchableOpacity>
      <View style={styles.btn}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontFamily: "Poppins-SemiBold",
  },
  btn: {
    backgroundColor: "#8FC743",
    paddingVertical: 10,
    paddingHorizontal: 50,
  },
});

export default Button;
