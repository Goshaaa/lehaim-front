import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import RadarChart from '../chart/RadarChart';
import { AnalyzeDetailedInfo, ChartType } from '../../types/CommonTypes';
import { Font } from "@react-pdf/renderer";
import { useEffect } from 'react';


Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf", fontWeight: 300 },
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf", fontWeight: 400 },
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf", fontWeight: 500 },
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf", fontWeight: 600 },
  ],
})

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontSize: 12,
    padding: 10
    // flexDirection: 'row',
    //backgroundColor: '#E4E4E4'
  },
  header: {
    textAlign: "center",
    fontSize: 20,
    margin: 15
  },
  propertyLabel: {
    fontWeight: 800
  },
  section: {
    flexDirection: 'row',
    padding: 3
  }
});

interface Props {
  chartDataUrl?: string | null;
}


function PatientReport({ chartDataUrl }: Props) {
  useEffect(() => {
    console.log("chartDataUrl changed for  PatientReport ")
  }, [chartDataUrl])
  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text>Отчет об обследовании за 27-05-2024</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.propertyLabel}>ФИО: </Text>
            <Text>Бупкина Ирина Андреевна</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.propertyLabel}>Дата рождения: </Text>
            <Text>25-10-1950</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.propertyLabel}>Диагноз: </Text>
            <Text>C50, T-1, N-1, M-1</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.propertyLabel}>Комментарий о диагнозе: </Text>
            <Text>Лб хт бусерелин лучи</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.propertyLabel}>Комментарий об операции: </Text>
            <Text>Подкожная мэ</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.propertyLabel}>Комментарий о курсах химеотерапии: </Text>
            <Text>-</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.propertyLabel}>Дата анализа: </Text>
            <Text>27-05-2024</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.propertyLabel}>Возраст на момент сдачи анализа: </Text>
            <Text>21</Text>
          </View>

          <View style={styles.header}>
            <Text>Расчет вида регенерации</Text>
          </View>
          {chartDataUrl
            ? <Image source={chartDataUrl!!}/>
            : <Text>Empty</Text>
          }
        </Page>
      </Document>
    </>

  )

}

export default PatientReport;