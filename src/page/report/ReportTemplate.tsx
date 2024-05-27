import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import RadarChart from '../chart/RadarChart';
import { AnalyzeDetailedInfo, ChartType, ChartsDataUrl, PatientPdfReportData } from '../../types/CommonTypes';
import { ReportDTO } from '../../services/ReportService';
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
  }, 
  chart: {
    width: 500,
    height: 500
  }
});

interface Props {
  reportData: ReportDTO;
}


function PatientReport({ reportData }: Props) {

  useEffect(() => {
    console.log("PatientReport mounted");
  }, []);


  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text>Отчет об обследовании за {reportData.currentTestDate}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.propertyLabel}>ФИО: </Text>
            <Text>{reportData.patient.name} {reportData.patient.lastname} {reportData.patient.patronymic}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.propertyLabel}>Дата рождения: </Text>
            <Text>{reportData.patient.birthdate}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.propertyLabel}>Диагноз: </Text>
            <Text>TODO, T-{reportData.patient.t}, N-{reportData.patient.n}, M-{reportData.patient.m}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.propertyLabel}>Комментарий о диагнозе: </Text>
            <Text>{reportData.patient.diagnosisComments}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.propertyLabel}>Комментарий об операции: </Text>
            <Text>{reportData.patient.operationComments}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.propertyLabel}>Комментарий о курсах химеотерапии: </Text>
            <Text>{reportData.patient.chemotherapyComments}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.propertyLabel}>Возраст на момент сдачи анализа: </Text>
            <Text>TODO</Text>
          </View>

          {/* {reportData.chartData?.regenerationChartData ?
            <View style={styles.header}>
              <Text>Расчет вида регенерации</Text>
              <Image style={styles.chart} source={reportData.chartData.regenerationChartData} />
            </View>
            : null
          }

          {reportData.chartData?.bTypeData ?
            <View style={styles.header}>
              <Text>Относительные параметры B - клеточного звена иммунитета</Text>
              <Image source={reportData.chartData.bTypeData} />
            </View>
            : null
          }

          {reportData.chartData?.tTypeData ?
            <View style={styles.header}>
              <Text>Относительные параметры T - клеточного звена иммунитета</Text>
              <Image source={reportData.chartData.tTypeData} />
            </View>
            : null
          }

          {reportData.chartData?.cytokineTypeData ?
            <View style={styles.header}>
              <Text>Цитокиновые пары</Text>
              <Image source={reportData.chartData.cytokineTypeData} />
            </View>
            : null
          } */}
        </Page>
      </Document>
    </>

  )

}

export default PatientReport;