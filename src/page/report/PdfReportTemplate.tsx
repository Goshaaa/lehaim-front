import { Font } from "@react-pdf/renderer";
import { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { ChartsDataUrl, AnalyzeDetailedInfo, RecommendationData, PatientAllGenesDto, ReportAverageType } from '../../types/CommonTypes';
import { ReportDTO } from '../../services/ReportService';
import { DiagnosisDTO } from '../../services/DiagnosisService';
import * as dateUtils from '../../components/DateUtils';

Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf", fontWeight: 300 },
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf", fontWeight: 400 },
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf", fontWeight: 500 },
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf", fontWeight: 600 },

  ],
})

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontSize: 10,
    padding: 10,
    paddingBottom: 20,
    marginHorizontal: 5
  },
  colontitul: {
    position: "absolute",
    left: '2%',
    bottom: 10
  },
  pagination: {
    position: "absolute",
    left: '85%',
    bottom: 10
  },
  header: {
    textAlign: "center",
    fontSize: 14,
    margin: 15
  },
  propertyLabel: {
    color: 'black',
    fontWeight: 600
  },
  propertyValue: {
    fontWeight: 200,
    maxWidth: '85%',
    marginLeft: 5
  },
  blockSection: {
    marginBottom: 15
  },
  shiftSection: {
    marginLeft: 10,
    flexDirection: 'row',
    fontWeight: 200
  },
  section: {
    flexDirection: 'row',
    padding: 0,
    marginHorizontal: 5,
    marginBottom: 3
  },
  sectionTitle: {
    textAlign: "center",
    margin: 10,
    fontSize: 12,
    fontWeight: 400
  },
  chartSection: {
    marginBottom: 15
  },
  chartTitle: {
    textAlign: "center",
    fontSize: 14,
    margin: 10,
    fontWeight: 600
  },
  chart: {
    left: '25%',
    width: 300,
    height: 300
  },
  remark: {
    marginTop: 25
  },
  table: {
    paddingLeft: 5,
    paddingRight: 5,
    width: '100%',
    border: '1px solid #EEE',
    margin: 0,
    padding: 0
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    borderTop: '1px solid #EEE'
    // paddingTop: 3,
    // paddingBottom: 3,
  },
  tableHeader: {
    borderTop: 'none',
    textAlign: "center",
  },
  bold: {
    fontWeight: 'bold',
  },
  col1: {
    width: '5%',
    textAlign: "center",
    padding: 0
  },
  col2: {
    width: '50%',
    borderLeft: '1px solid #EEE',
    borderRight: '1px solid #EEE',
    paddingLeft: 5
  },
  col3: {
    width: '15%',
    textAlign: "center",
    borderLeft: '1px solid #EEE',
    borderRight: '1px solid #EEE'
  },
  col4: {
    width: '15%',
    textAlign: "center",
    borderLeft: '1px solid #EEE',
    borderRight: '1px solid #EEE'
  },
  col5: {
    width: '15%',
    textAlign: "center"
  },

});

interface Props {
  reportData: ReportDTO,
  chartData?: ChartsDataUrl | null,
  diagnosisCatalog?: DiagnosisDTO[] | null,
  recommendationData?: RecommendationData | null
  patientGenes?: PatientAllGenesDto | null
}

interface ResultDataHolder {
  [key: number]: ResultData;
}

interface ResultData {
  current?: AnalyzeDetailedInfo | null,
  prev?: AnalyzeDetailedInfo | null
}

function PatientReport({ reportData, chartData, diagnosisCatalog, recommendationData, patientGenes }: Props) {
  const [resultMap, setResultMap] = useState<ResultData | null>(null);

  useEffect(() => {
    var mapData: ResultDataHolder = {};

    reportData.currentResults?.forEach((item => {
      if (item?.parameter?.id) {
        mapData[item.parameter.id] = { current: item };
      }
    }));
    reportData.previousResults?.forEach((item => {
      if (item?.parameter?.id) {
        mapData[item.parameter.id] = {
          current: mapData[item.parameter.id]?.current ?? null,
          prev: item
        };
      }
    }));
    setResultMap(mapData);
  }, [reportData]);

  const calcDiff = (prev?: number, current?: number): string => {
    if (prev && current) {
      return (((current - prev) / prev) * 100).toFixed(2) + "%";
    } else {
      return "-";
    }
  }

  const getDiagnosisName = (diagnosisId?: number,): string => {
    if (diagnosisCatalog && diagnosisId) {
      let selected = diagnosisCatalog?.find((catalogItem) => {
        return catalogItem.id === diagnosisId
      });
      if (selected) {
        return selected.code + " - " + selected.description
      } else {
        return "-"
      }
    } else {
      return "-"
    }
  }

  const getGenes = (diagnosisId?: number): string => {
    if (diagnosisCatalog && patientGenes && diagnosisId) {
      const diagnosisGene = diagnosisCatalog?.find((catalogItem) => {
        return catalogItem.id === diagnosisId
      })?.genes;
      if (diagnosisGene && diagnosisGene.length > 0) {
        return diagnosisGene.map(genItem => {
          const gene = patientGenes[diagnosisId]?.find(gen => gen.geneId === genItem.id);
          return {
            name: genItem.geneName,
            value: gene?.geneValue ? gene?.geneValue : "N/A"
          }
        })
          .map(item => item.name + ": " + item.value)
          .join("; ");
      }
    }
    return "-";
  }

  const getParamName = (result: ResultData): string => {
    const actualData = result.current ?? result.prev;

    if (actualData) {
      return actualData.parameter!!.name + " (" + actualData.parameter!!.additionalName + ")";
    } else {
      return "-"
    }
  }

  const getAverageTypeLabel = (reportAverageType: ReportAverageType): string => {
    if (reportAverageType === ReportAverageType.RADIATION_THERAPY) return "\n(за период ЛТ)"
    else if (reportAverageType === ReportAverageType.OPERATION) return "\n(за операционный период)"
    else return ""
  }

  return (
    <>
      <Document title={"Отчет " + reportData.patient.lastname + " " + reportData.patient.name + " от " + reportData.currentTestDate}>
        <Page size="A4" style={styles.page}>

          <View style={styles.header}>
            <Text>Отчет об обследовании за {dateUtils.formatDate(reportData.currentTestDate)}</Text>
          </View>

          <View style={styles.blockSection}>
            <View style={styles.section}>
              <Text style={styles.propertyLabel}>ФИО: </Text>
              <Text style={styles.propertyValue}>{reportData.patient.lastname} {reportData.patient.name} {reportData.patient.patronymic ?? ""}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.propertyLabel}>Дата рождения: </Text>
              <Text style={styles.propertyValue}>{dateUtils.formatDate(reportData.patient.birthdate)}</Text>
            </View>
          </View>

          <View style={styles.blockSection}>
            <Text style={styles.propertyLabel}>Информация о диагнозе:</Text>
            <View style={styles.shiftSection}>
              <Text>Код: </Text>
              <Text>{getDiagnosisName(reportData.patient.diagnosisId)};</Text>
            </View>
            <View style={styles.shiftSection}>
              <Text>Классификация: </Text>
              <Text>T: {reportData.patient.t?.replaceAll(", ", " ")}; </Text>
              <Text>N: {reportData.patient.n?.replaceAll(", ", " ")}; </Text>
              <Text>M: {reportData.patient.m?.replaceAll(", ", " ")}; </Text>
              <Text>G: {reportData.patient.g?.replaceAll(", ", " ")}; </Text>
            </View>

            {reportData.patient.diagnosisId !== 45 ?
              <View style={styles.shiftSection}>
                <Text>Гены: </Text>
                <Text>{getGenes(reportData.patient.diagnosisId)}</Text>
              </View>
              :
              <View style={styles.shiftSection}>
                <Text>Биологический подтип: </Text>
                <Text>{reportData.patient.additionalDiagnosis}</Text>
              </View>
            }

            <View style={styles.shiftSection}>
              <Text>Комментарий: </Text>
              <Text>{reportData.patient.diagnosisComments}</Text>
            </View>
          </View>

          <View style={styles.blockSection}>
            <Text style={styles.propertyLabel}>Информация об операции:</Text>
            <View style={styles.shiftSection}>
              <Text>Дата операции: </Text>
              <Text>{dateUtils.formatDate(reportData.patient.operationDate)};</Text>
            </View>
            <View style={styles.shiftSection}>
              <Text>Комментарий: </Text>
              <Text>{reportData.patient.operationComments}</Text>
            </View>
          </View>

          <View style={styles.blockSection}>
            <Text style={styles.propertyLabel}>Информация о химиотерапии:</Text>
            <View style={styles.shiftSection}>
              <Text>Комментарий: </Text>
              <Text>{reportData.patient.chemotherapyComments}</Text>
            </View>
          </View>

          <View style={styles.blockSection}>
            <Text style={styles.propertyLabel}>Информация о лучевой терапии:</Text>
            <View style={styles.shiftSection}>
              <Text>Период лучевой терапии: </Text>
              <Text>{dateUtils.formatDate(reportData.patient.radiationTherapy?.startTherapy)} - {dateUtils.formatDate(reportData.patient.radiationTherapy?.endTherapy)}</Text>
            </View>
            <View style={styles.shiftSection}>
              <Text>Комментарий: </Text>
              <Text>{reportData.patient.radiationTherapy?.comment}</Text>
            </View>
          </View>

          <View style={styles.blockSection}>
            <Text style={styles.propertyLabel}>Комментарий к обследованию:</Text>
            <View style={styles.shiftSection}>
              <Text>{reportData.currentTestNote}</Text>
            </View>
          </View>

          {chartData?.regenerationChartData ?
            <View style={styles.chartSection}>
              <View>
                <Text style={styles.chartTitle}>Расчет вида регенерации</Text>
                <Image
                  style={styles.chart}
                  source={chartData.regenerationChartData} />
              </View>
              {recommendationData?.REGENERATION ?
                <View>
                  <View style={styles.section}>
                    <Text style={styles.propertyLabel}>Заключение: </Text>
                    <Text style={styles.propertyValue}>
                      {recommendationData.REGENERATION.conclusion ?? '-'}
                    </Text>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.propertyLabel}>Рекомендация: </Text>
                    <Text style={styles.propertyValue}>{recommendationData.REGENERATION.recommendation ?? '-'}</Text>
                  </View>
                </View>
                : null
              }
            </View>
            : null
          }


          {chartData?.inflammationTypeData ?
            <View style={styles.chartSection} wrap={false}>
              <View>
                <Text style={styles.chartTitle}>Индексы системного воспаления</Text>
                <Image
                  style={styles.chart}
                  source={chartData.inflammationTypeData} />
              </View>
              {recommendationData?.SYSTEMIC_INFLAMMATION ?
                <View>
                  <View style={styles.section}>
                    <Text style={styles.propertyLabel}>Заключение: </Text>
                    <Text style={styles.propertyValue}>{recommendationData.SYSTEMIC_INFLAMMATION.conclusion ?? '-'}</Text>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.propertyLabel}>Рекомендация: </Text>
                    <Text style={styles.propertyValue}>{recommendationData.SYSTEMIC_INFLAMMATION.recommendation ?? '-'}</Text>
                  </View>
                </View>
                : null
              }
            </View>
            : null
          }


          {chartData?.bTypeData ?
            <View style={styles.chartSection} wrap={false}>
              <View>
                <Text style={styles.chartTitle}>Относительные параметры B - клеточного звена иммунитета</Text>
                <Image
                  style={styles.chart}
                  source={chartData.bTypeData} />
              </View>
              {recommendationData?.B_CELL ?
                <View>
                  <View style={styles.section}>
                    <Text style={styles.propertyLabel}>Заключение: </Text>
                    <Text style={styles.propertyValue}>{recommendationData.B_CELL.conclusion ?? '-'}</Text>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.propertyLabel}>Рекомендация: </Text>
                    <Text style={styles.propertyValue}>{recommendationData.B_CELL.recommendation ?? '-'}</Text>
                  </View>
                </View>
                : null
              }

            </View>
            : null
          }



          {chartData?.tTypeData ?
            <View style={styles.chartSection} wrap={false}>
              <View>
                <Text style={styles.chartTitle}>Относительные параметры T - клеточного звена иммунитета</Text>
                <Image
                  style={styles.chart}
                  source={chartData.tTypeData} />
              </View>
              {recommendationData?.T_CELL ?
                <View>
                  <View style={styles.section}>
                    <Text style={styles.propertyLabel}>Заключение: </Text>
                    <Text style={styles.propertyValue}>{recommendationData.T_CELL.conclusion ?? '-'}</Text>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.propertyLabel}>Рекомендация: </Text>
                    <Text style={styles.propertyValue}>{recommendationData.T_CELL.recommendation ?? '-'}</Text>
                  </View>
                </View>
                : null
              }
            </View>
            : null
          }



          {chartData?.cytokineTypeData ?
            <View style={styles.chartSection} wrap={false}>
              <View>
                <Text style={styles.chartTitle}>Цитокиновые пары</Text>
                <Image
                  style={styles.chart}
                  source={chartData.cytokineTypeData} />
              </View>
              {recommendationData?.CYTOKINE_PAIRS ?
                <View>
                  <View style={styles.section}>
                    <Text style={styles.propertyLabel}>Заключение: </Text>
                    <Text style={styles.propertyValue}>{recommendationData.CYTOKINE_PAIRS.conclusion ?? '-'}</Text>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.propertyLabel}>Рекомендация: </Text>
                    <Text style={styles.propertyValue}>{recommendationData.CYTOKINE_PAIRS.recommendation ?? '-'}</Text>
                  </View>
                </View>
                : null
              }
            </View>
            : null
          }



          {resultMap &&
            <View wrap={false}>
              <Text style={styles.sectionTitle}>Сравнение показателей</Text>
              <View style={styles.table}>
                <View style={[styles.row, styles.bold, styles.tableHeader]}>
                  <Text style={styles.col1}>№</Text>
                  <Text style={styles.col2}>Наименование показателя</Text>
                  <Text style={styles.col3}>Среднее значение* {getAverageTypeLabel(reportData.reportAverageTableType)}</Text>
                  <Text style={styles.col4}>Текущие значения</Text>
                  <Text style={styles.col5}>Изменение</Text>
                </View>
                {Object.entries(resultMap)
                  .map(([key, value], index) =>
                    <View style={[styles.row]} wrap={false} key={index}>
                      <Text style={styles.col1}>{index + 1}</Text>
                      <Text style={styles.col2}>{getParamName(value)}</Text>
                      <Text style={styles.col3}>{value.prev?.value.toFixed(2) ?? "-"}</Text>
                      <Text style={styles.col4}>{value.current?.value.toFixed(2) ?? "-"}</Text>
                      <Text style={styles.col5}>{calcDiff(value?.prev?.value, value?.current?.value)}</Text>
                    </View>
                  )}
              </View>

              <Text style={styles.remark}>*рассчитывается на основе показателей из предыдущих анализов</Text>
            </View>
          }

          <Text style={styles.pagination} render={({ pageNumber, totalPages }) => (
            `Страница ${pageNumber} из ${totalPages}`

          )} fixed />
          <Text style={styles.colontitul} fixed>
            Le Ha Im
          </Text>

        </Page>
      </Document >
    </>
  )
}

export default PatientReport;