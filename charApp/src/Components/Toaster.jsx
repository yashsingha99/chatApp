import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
function Toaster({msg}, {beauty}) {
    const[showA, setShowA] = useState(true)
    const toggleShowA = () => setShowA(!showA);

    useEffect(() => {
        const intervalId = setInterval(() => {
          toggleShowA ()
        }, 7000); 
    
        return () => clearInterval(intervalId);
      }, [msg]);

    if(showA)
      return (
    <Row className={ `absolute top-2 right-8 ${beauty == "true" ?"bg-red-300" : "bg-green-500"} w-1/5  rounded-lg` }>
    <Col  md={6} className="mb-2 bordercls  flex justify-between items-center  py-3 px-2">
    <Toast show={showA} onClose={toggleShowA}>
         <Toast.Header>{ beauty ? <ErrorIcon /> : <CheckCircleIcon />}
         </Toast.Header>
        <Toast.Body className='text-lg font-medium' >{msg}</Toast.Body>
      </Toast>
     { <Button onClick={toggleShowA} className="mb-2 ">
      <CloseIcon />
      </Button>}
    </Col>
  </Row>
  )
}

export default Toaster