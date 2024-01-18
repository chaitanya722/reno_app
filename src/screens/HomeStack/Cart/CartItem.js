import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../../constants/colors';


const CartItem = ({ item, onDelete }) => {
  const [quantity, setQuantity] = useState(item.count);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <View style={styles.container}>
       <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => addToCart()}
            underlayColor={Colors.Green}>
            <Text style={{ color: Colors.White }}>Add To Cart</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.button}
            onPress={() => navigation.navigate(RoutePaths.BookingHsm, { pid: data?.pid })}
            underlayColor={Colors.Green}>
            <Text style={{ color: Colors.White }}>Buy Now</Text>
          </TouchableHighlight>
        </View>

      <Image source={{ uri: item.thumbnail_image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.product_name}</Text>
        {item.unit_price && (
          <Text style={[styles.subtitle, styles.oldPrice]}>
            ${item.unit_price}
          </Text>
        )}
        {item.selling_price && (
          <Text style={[styles.subtitle, styles.discountedPrice]}>
            ${item.selling_price}
          </Text>
        )}
        <View style={styles.discountIconContainer}>
          <Ionicons name="pricetags" size={14} color="green" />
          <Text style={[styles.subtitle, styles.discountPercentage]}>
            {item.discount}% Discount
          </Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={decrementQuantity}>
            <Ionicons name="remove" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={incrementQuantity}>
            <Ionicons name="add" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => onDelete(item.pid)}>
        <Ionicons name="wrong" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.Black,
  },

  subtitleContainer: {
    flexDirection: 'column', 
    alignItems: 'flex-start', 
    marginTop: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    marginLeft: 5,
    color: '#aaa',
  },
  discountedPrice: {
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#488C20',
    padding: 10,
    margin: 10,
    borderRadius: 23,
    alignSelf: 'center',
    textDecorationLine: 'underline',
    width: '40%',
  },
  
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
    color:Colors.Black,

  },
  discountIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  discountPercentage: {
    marginLeft: 3,
    color: 'skyblue',
  },
});

export default CartItem;
