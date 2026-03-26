import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from '@react-pdf/renderer'

import logoUrl from '../../../assets/images/ai/logo.jpeg'
import robotoRegular from '../../../assets/fonts/Roboto-Regular.ttf'
import robotoBold from '../../../assets/fonts/Roboto-Bold.ttf'

// Регистрируем шрифт для поддержки кириллицы (обязательно!)
Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: robotoRegular,
      fontWeight: 'normal',
    },
    {
      src: robotoBold,
      fontWeight: 'bold',
    },
  ],
})

// const multipliers = {
//   stage: {
//     build: 'Период: подготовительный',
//     base: 'Период: базовый',
//     peak: 'Период: пиковый',
//     taper: 'Период: разгрузочный',
//   },
// }

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Roboto',
    fontSize: 10,
    lineHeight: 1.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottom: '2pt solid #1976D2',
    paddingBottom: 10,
  },
  logo: { width: 60, height: 60 },
  titleBlock: { textAlign: 'right' },
  mainTitle: {
    fontSize: 18,
    color: '#1976D2',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mainSubtitle: {
    marginBottom: 5,
  },

  // Стили для таблицы темпа
  paceTable: {
    display: 'table',
    width: 'auto',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1pt solid #eee',
    padding: 5,
  },
  tableHeader: { fontWeight: 'bold', backgroundColor: '#eee' },
  col: { width: '33.3%', textAlign: 'center' },

  // Стили недель
  weekBox: {
    marginBottom: 50,
    padding: 8,
    borderLeft: '3pt solid #1976D2',
    backgroundColor: '#fff',
  },
  weekTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  session: {
    flexDirection: 'row',
    borderBottom: '0.5pt solid #f0f0f0',
    padding: 3,
  },
  day: { width: 30, color: '#666', fontWeight: 'bold' },
  sessionText: { flex: 1 },
  sessionTitle: { fontWeight: 'bold' },
})

const ReadyPdfDocument = ({ planWeeks, pacePlan, titlePlan }) => {
  // Простая группировка по месяцам для таблицы итогов
  // const monthlySummary = []
  // for (let i = 0; i < planWeeks.length; i += 4) {
  //   const monthWeeks = planWeeks.slice(i, i + 4)
  //   const totalKm = monthWeeks.reduce((sum, w) => sum + w.weeklyKm, 0)
  //   monthlySummary.push({
  //     month: Math.floor(i / 4) + 1,
  //     km: totalKm,
  //     weeks: `${monthWeeks[0].weekNumber}-${monthWeeks[monthWeeks.length - 1].weekNumber}`,
  //   })
  // }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Хедер с логотипом */}
        <View style={styles.header}>
          {logoUrl ? (
            <Image src={logoUrl} style={styles.logo} />
          ) : (
            <View style={styles.logo} />
          )}
          <View style={styles.titleBlock}>
            <Text style={styles.mainTitle}>Формула бега</Text>
            <Text style={styles.mainSubtitle}>{titlePlan}</Text>
            <Text style={styles.mainSubtitle}>
              Приложение: https://vk.com/app53406141
            </Text>
          </View>
        </View>

        {/* Таблица бегового темпа*/}
        <Text
          style={{
            fontSize: 12,
            marginBottom: 5,
            fontWeight: 'bold',
          }}
        >
          Темп бега:
        </Text>

        <View style={styles.paceTable}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.col}>Название</Text>
            <Text style={styles.col}>Значение</Text>
            <Text style={styles.col}>Описание</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.col}>P1</Text>
            <Text style={styles.col}>{pacePlan.paceSlow}</Text>
            <Text style={styles.col}>восстановительный темп</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.col}>P2</Text>
            <Text style={styles.col}>{pacePlan.paceLong}</Text>
            <Text style={styles.col}>длительный бег</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.col}>P3</Text>
            <Text style={styles.col}>{pacePlan.paceMarathon}</Text>
            <Text style={styles.col}>марафонский темп</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.col}>P4</Text>
            <Text style={styles.col}>
              {pacePlan.paceHalfmarathon}
            </Text>
            <Text style={styles.col}>темповый бег, ПАНО</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.col}>P5</Text>
            <Text style={styles.col}>{pacePlan.pace10}</Text>
            <Text style={styles.col}>
              темп длинных (МПК) интервалов
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.col}>P6</Text>
            <Text style={styles.col}>{pacePlan.pace5}</Text>
            <Text style={styles.col}>
              темп для коротких интервалов
            </Text>
          </View>
        </View>

        {/* Таблица итогов по месяцам */}
        {/* <Text
          style={{
            fontSize: 12,
            marginBottom: 5,
            fontWeight: 'bold',
          }}
        > */}
        {/* Сводка по месяцам:
        </Text>
        <View style={styles.paceTable}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.col}>Месяц</Text>
            <Text style={styles.col}>Недели</Text>
            <Text style={styles.col}>Всего км</Text>
          </View>
          {monthlySummary.map((m) => (
            <View key={m.month} style={styles.tableRow}>
              <Text style={styles.col}>{m.month}</Text>
              <Text style={styles.col}>{m.weeks}</Text>
              <Text style={styles.col}>{m.km} км</Text>
            </View>
          ))}
        </View> */}

        {/* Детальный план */}
        {planWeeks.map((week) => (
          <View
            key={week.weekNumber}
            style={styles.weekBox}
            wrap={false}
          >
            <Text style={styles.weekTitle}>
              Неделя {week.weekNumber}
            </Text>
            {week.sessions.map((s, idx) => (
              <View key={idx} style={styles.session}>
                <Text style={styles.day}>{s.day}</Text>
                <Text style={styles.sessionText}>
                  <Text style={styles.sessionTitle}>{s.title}: </Text>
                  {s.descr}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  )
}

export default ReadyPdfDocument
