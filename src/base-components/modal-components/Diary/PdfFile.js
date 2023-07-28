import React from "react";
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

import thin from '../../../assets/fonts/SpoqaHanSansThin.ttf'
import light from '../../../assets/fonts/SpoqaHanSansLight.ttf'
import bold from '../../../assets/fonts/SpoqaHanSansBold.ttf'
import regular from '../../../assets/fonts/SpoqaHanSansRegular.ttf'

Font.register({
  family: 'SpoqaHanSans', fonts:[
    {
      fontWeight: 100,
      src: thin
    },
    {
      fontWeight: 200,
      src: light
    },
    {
      fontWeight: 300,
      src: regular
    },
    {
      fontWeight: 500,
      src: bold
    }]
})

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    fontFamily: 'SpoqaHanSans',
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
          <Text style={styles.font}>한글 한글한글</Text>
          <Text style={styles.smallFont}>Innovation on the move</Text>
          <Text style={styles.bigFont}>세륜기·축중기·싸이클린·오탁수처리설비비점오염저감설·비터널식천막설비</Text>
        </View>
      </Page>
    </Document>
  )
}

export default PdfFile;
