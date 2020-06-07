import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomColor: '#bff0fd',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 40,
    fontStyle: 'bold',
  },
  totalOrdered: {
    width: '10%',
    textAlign: 'left',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  productName: {
    width: '50%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: 'center',
    paddingRight: 8,
  },
  productCategory: {
    width: '30%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: 'center',
    paddingRight: 8,
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
