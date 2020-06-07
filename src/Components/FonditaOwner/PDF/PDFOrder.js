import React from 'react';

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ProductsTable from './ProductsTable';
import InfoCustomer from './InfoCustomer';
// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 30,
    lineHeight: 1.5,
    flexDirection: 'column',
    paddingLeft: 24,
  },
  numOrder: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// Create Document Component
const PDFOrder = ({ order, products }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.numOrder}>
        <Text># {order.infoCustomer.customerName}</Text>
      </View>
      <ProductsTable products={products} />
      <InfoCustomer order={order} />
    </Page>
  </Document>
);

export default PDFOrder;
