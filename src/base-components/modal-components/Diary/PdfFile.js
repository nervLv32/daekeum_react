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

const fontSize = StyleSheet.create({
  fs_5: {
    fontSize: 5
  },
  fs_6: {
    fontSize: 6
  },
  fs_7: {
    fontSize: 7
  },
  fs_10: {
    fontSize: 10
  },
  fs_12: {
    fontSize: 12
  },
  fs_15: {
    fontSize: 15
  },
  fs_20: {
    fontSize: 20
  },
  fs_22: {
    fontSize: 22
  },
  fs_25: {
    fontSize: 25
  },
  fs_30: {
    fontSize: 30
  },
  fs_40: {
    fontSize: 40
  },
  fs_50: {
    fontSize: 50
  },
  fs_60: {
    fontSize: 60
  },
})

const fontWeight = StyleSheet.create({
  fw_100: {
    fontWeight: 100
  },
  fw_200: {
    fontWeight: 200
  },
  fw_300: {
    fontWeight: 300
  },
  fw_400: {
    fontWeight: 400
  },
  fw_500: {
    fontWeight: 500
  },
  fw_600: {
    fontWeight: 600
  },
  fw_700: {
    fontWeight: 700
  },
  fw_800: {
    fontWeight: 800
  },
  fw_900: {
    fontWeight: 900
  },
  fw_b: {
    fontWeight: 'bold'
  },
  fw_bd: {
    fontWeight: 'bolder'
  },
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
