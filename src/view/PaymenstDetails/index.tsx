import { Box } from '@mui/material'
import { useParams } from 'react-router-dom' 
import TableLotesView from '../../components/TablePayments'
import useSWR from 'swr'

function PaymentsDetails () {
  const { id, title } = useParams()
  const { data } = useSWR(id && `/v2/payments/${id}`, { suspense: true })
  return (
    <Box sx={{
      width: 'calc(100vw - 240px)',
      display: 'flex',
      flexDirection: 'column',
      padding: '0 2rem',
    }}
    >
      <TableLotesView data={data} title={title ?? ""} />
    </Box>
  )
}

export default PaymentsDetails
