import React from "react";
import { PDFViewer, Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { Table, TableHeader, TableCell, TableBody, DataTableCell } from '@david.kucsai/react-pdf-table';

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
      fontWeight: 300,
      src: light
    },
    {
      fontWeight: 400,
      src: regular
    },
    {
      fontWeight: 500,
      src: bold
    }]
})

const styles = StyleSheet.create({
  page: {
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontFamily: 'SpoqaHanSans',
    lineHeight: 1,
  },
  infoWrap: {
    backgroundColor: '#00A1D4',
    paddingHorizontal: 15,
    paddingVertical: 20
  },
  smallFont: {
    fontSize: 8,
    fontWeight: 300,
    color: '#fff',
    marginBottom: 10
  },
  bigFont: {
    fontSize: 10,
    fontWeight: 400,
    color: '#fff'
  },
  pdfWrap: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  pdfHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleWrap: {

  },
  title: {
    fontSize: 30,
    color: '#222'
  },
  span: {
    fontSize: 10,
    marginTop: 10
  },
  approvalWrap: {

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
        <View style={styles.pdfWrap}>
          <View style={styles.pdfHeader}>
            <View style={styles.titleWrap}>
              <Text style={styles.title}>대금세륜기 CS REPORT</Text>
              <Text style={styles.span}>『대금지오웰』은 더 좋은 세상을 만들기 위해 노력합니다.</Text>
            </View>
            <View style={styles.approvalWrap}>
              
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default PdfFile;
