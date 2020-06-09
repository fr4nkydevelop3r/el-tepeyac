import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  customerContainer: {
    marginTop: 12,
    marginLeft: 8,
    fontSize: 11,
    width: 230,
  },
});

const OtherInfoOrder = ({ order }) => (
  <View style={styles.customerContainer}>
    <Text>Other Info</Text>
    {order.specialInstructions ? (
      <Text> Special Instructions: {order.specialInstructions}</Text>
    ) : null}
    <Text> Delivery Tip: ${order.deliveryTip}</Text>
    <Text> Time Order: {order.timeOrder} </Text>
  </View>
);

export default OtherInfoOrder;
