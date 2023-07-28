import React from "react";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  infoWrap: {
    backgroundColor: '#00A1D4',
    paddingHorizontal: 30,
    paddingVertical: 50
  },
  smallFont: {
    fontSize: 14,
    fontWeight: 300,
    color: '#fff',
    marginBottom: 10
  },
  bigFont: {
    fontSize: 18,
    fontWeight: 400,
    color: '#fff'
  }
});

const PdfFile = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.infoWrap}>
          <Text style={styles.smallFont}>Innovation on the move</Text>
          <Text style={styles.bigFont}>세륜기·축중기·싸이클린·오탁수처리설비비점오염저감설·비터널식천막설비</Text>
        </View>
      </Page>
    </Document>
  )
}

export default PdfFile;