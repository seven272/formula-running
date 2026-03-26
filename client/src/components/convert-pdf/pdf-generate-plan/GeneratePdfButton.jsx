import { PDFDownloadLink } from '@react-pdf/renderer'
import { FaRegFilePdf } from 'react-icons/fa6'
import { LiaSpinnerSolid } from 'react-icons/lia'
import GeneratePdfDocument from './GeneratePdfDocument'

const GeneratePdfButton = ({ planWeeks, pacePlan, titlePlan }) => (
  <PDFDownloadLink
    document={
      <GeneratePdfDocument
        planWeeks={planWeeks}
        pacePlan={pacePlan}
        titlePlan={titlePlan}
      />
    }
    fileName="my-running-plan.pdf"
    style={{
      textDecoration: 'none',
      padding: '8px 25px',
      color: '#fff',
      backgroundColor: '#014bde',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      columnGap: '5px',
      cursor: 'pointer',
    }}
  >
    {({ loading }) =>
      loading ? (
        <>
          <span>Готовим</span>
          <LiaSpinnerSolid size={15} />
        </>
      ) : (
        <>
          <span>Скачать </span>
          <FaRegFilePdf size={15} />
        </>
      )
    }
  </PDFDownloadLink>
)

export default GeneratePdfButton
