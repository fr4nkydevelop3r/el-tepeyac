import React from 'react';

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import ProductsTable from './ProductsTable';
import InfoCustomer from './InfoCustomer';
import OtherInfoOrder from './OtherInfoOrder';
import logo from '../../../img/logo2.png';
// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 8,
    paddingTop: 30,
    lineHeight: 1.5,
    flexDirection: 'column',
    paddingLeft: 15,
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: 20,
  },
  numOrder: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  site: {
    fontSize: 8,
    marginLeft: 15,
  },
});

// Create Document Component
const PDFOrder = ({ order, products }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image style={styles.logo} src={logo} />
      <View style={styles.site}>
        <Text>www.eltepeyacfood.com</Text>
      </View>
      <View style={styles.numOrder}>
        <Text># {order.infoCustomer.customerName}</Text>
      </View>
      <ProductsTable products={products} />
      <InfoCustomer order={order} />
      <OtherInfoOrder order={order} />
    </Page>
  </Document>
);

export default PDFOrder;
