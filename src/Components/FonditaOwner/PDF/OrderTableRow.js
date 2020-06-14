import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    fontStyle: 'bold',
    fontSize: 8,
    margin: 0,
  },
  totalOrdered: {
    width: '5%',
  },
  productName: {
    width: '60%',
    textAlign: 'center',
  },
  productCategory: {
    width: '23%',
    textAlign: 'center',
  },
});

const OrderTableRow = ({ products }) => {
  const rows = products.map((product) => (
    <View style={styles.row} key={product.productID}>
      <Text style={styles.totalOrdered}>{product.totalOrdered}</Text>
      <Text style={styles.productName}>{product.productName}</Text>
      <Text style={styles.productCategory}>{product.productCategory}</Text>
    </View>
  ));

  return <>{rows}</>;
};

export default OrderTableRow;
