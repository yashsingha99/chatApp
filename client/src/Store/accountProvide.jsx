import {useEffect, useRef} from React
import { io } from 'socket.io-client'
function accountProvide() {
    const socket = useRef();
useEffect(() => {
    socket.current = io('ws://localhost:9000');
}, [])

  return (
    <>
    </>
  )
}

export default accountProvide
