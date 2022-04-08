import Box from '@mui/material/Box';
import { HistoryItem } from '../interface'

interface props {
    historyList: HistoryItem[];
}
function History(props: props) {
    
  return (
    <div className="App">
      <Box sx={{ height: 400, bgcolor: 'background.paper' }}>
        {props.historyList.map((hist: HistoryItem)=>{
            return(
                <>
                <span>{hist.expression}</span>
                <span>=</span>
                <span>{hist.value}</span>
                </>
            )
        })}
      </Box>
    </div>
  );
}

export default History;
