import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  customerContainer: {
    marginTop: 8,
    fontSize: 8,
    width: 140,
  },
});

const InfoCustomer = ({ order }) => (
  <View style={styles.customerContainer}>
    <Text>Customer</Text>
    <Text> Name: {order.infoCustomer.customerName}</Text>
    <Text> Phone number: {order.infoCustomer.customerPhoneNumber}</Text>
    {order.infoCustomer.customerAddress ? (
      <>
        <Text>Address: {order.infoCustomer.customerAddress}</Text>
        <Text>Apt: {order.infoCustomer.customerApt}</Text>
      </>
    ) : (
      <Text>Pickup</Text>
    )}
  </View>
);

export default InfoCustomer;
