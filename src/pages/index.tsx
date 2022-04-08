import React, { useState, useCallback } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import History from '../components/history'

export const Calculator: React.FC = () => {
  const [history, setHistory] = useState({});
  const [expression, setExpression] = useState("");
  const [operations, setOperations] = useState<Array<string>>([]);
  const [currentNumber, setCurrentNumber] = useState('');
  const [totalCalc, setTotalCalc] = useState(0);


  const btnsLineOne = ["/", "*", "-", "+"]
  const btnsLineTwo = ["1", "2", "3", "="]
  const btnsLineThree = ["4", "5", "6", ","]
  const btnsLineFour = ["7", "8", "9", "0"]
  const historyList = [{ expression: "23+89+12", value: "2000" }]

  

  const editExpression = (value: string) => {
    setExpression(expression + value)
  }

  const onChangeValue = useCallback((
    value: string,
    isTypedByKeyboard: boolean = false,
  ) => {
    const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ','];

    const operationAdded = addOperations(value);

    const validValue = buttons.includes(value);
    
    if (validValue && !operationAdded) {
      if (isTypedByKeyboard) {
        setCurrentNumber(value);
        
        return;
      };

      setCurrentNumber((oldValue: string) => {
        return `${oldValue}${value}`;
      });
    }

    if (operationAdded) {
      
      setOperations([...operations, currentNumber, operationAdded]);
      setCurrentNumber('');
    }

    setExpression(`${expression} ${value}`);
  }, [operations, currentNumber, expression]);

  const addOperations = useCallback((operation: string) => {

    const allowedOperations = ['-', '*', '/', '+'];

    if (allowedOperations.includes(operation)) {
      return operation;
    }
  }, []);


  const calculateExpression = useCallback(() => {

    let arrayOperations = operations;

    if (currentNumber !== '') {
      setOperations([...operations, currentNumber]);
      arrayOperations = [...operations, currentNumber];
    }

    let total = 0;


    let indexesSum: Array<number> = [];
    let indexesSub: Array<number> = [];
    let indexesDivision: Array<number> = [];
    let indexesMult: Array<number> = [];


    arrayOperations.forEach((digit, index) => {
      if (digit === "+") {
        indexesSum.push(index);
      } else if (digit === "-") {
        indexesSub.push(index);
      }else if (digit === "/") {
        indexesDivision.push(index);
      } else if (digit === "*"){
        indexesMult.push(index);
      }
    });

    indexesMult.forEach(index => {
      total += +arrayOperations[index - 1] * +arrayOperations[index + 1];
    });

    indexesDivision.forEach(index => {
      total += +arrayOperations[index - 1] / +arrayOperations[index + 1]
    });

    indexesSum.forEach(index => {
      total += +arrayOperations[index - 1] + +arrayOperations[index + 1]

    });

    indexesSub.forEach(index => {
      total += +arrayOperations[index - 1] - +arrayOperations[index + 1]
    });


    console.log(total);

    setOperations([]);
    setCurrentNumber(`${total}`);
    setTotalCalc(total);
    setExpression(`${total}`);
  }, [currentNumber, operations, expression]);

  return (
    <div className="App">
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': {
            m: 1,
          },
        }}
      >
        <div>
          <History historyList={historyList} />
          {totalCalc}
          <input value={expression} />
        </div>
        <div className="bts">
          <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{
            marginBottom: '5px',
          }}>
            {btnsLineOne.map((bt) => {
              return (
                <Button key={`bt-${bt}`} onClick={()=>onChangeValue(bt)}>{bt}</Button>
              )
            })}
          </ButtonGroup>
          <br />
          <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{
            marginBottom: '5px',
          }}>
            {btnsLineTwo.map((bt) => {
              return (
                <Button key={`bt-${bt}`} onClick={()=> {
                  if (bt === '='){
                    calculateExpression()
                  } else {
                    onChangeValue(bt)
                  }
                }}>{bt}</Button>
              )
            })}
          </ButtonGroup>
          <br />
          <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{
            marginBottom: '5px',
          }}>
            {btnsLineThree.map((bt) => {
                return <Button key={`bt-${bt}`} onClick={()=>onChangeValue(bt)}>{bt}</Button>
            })}
          </ButtonGroup>
          <br />
          <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{
            marginBottom: '5px',
          }}>
            {btnsLineFour.map((bt) => {
              return (
                <Button key={`bt-${bt}`} onClick={()=>onChangeValue(bt)}>{bt}</Button>
              )
            })}
          </ButtonGroup>
        </div>
      </Box>
    </div>
  );
};
