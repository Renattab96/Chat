
import './App.css';
import io from 'socket.io-client'
import{useState,useEffect} from 'react'

const socket = io('http://localhost:4000')

function App() {
  const [message , setmessage] =useState('')
  const [messages , setmessages] =useState([])
  const handlesubmit=(e)=>{
    e.preventDefault();
    socket.emit('message', message)
    const nuevomensaje = {
      body:  message ,
      from: "Me"
    }
    setmessages([nuevomensaje,...messages]);
    setmessage('');
  }

  useEffect(()=>{
    const recibemensaje =(message)=>{
      setmessages ([message,...messages])
    }
    socket.on('message',recibemensaje)
    return()=>{
      socket.off('message',recibemensaje);
      
    }
  },[messages])


  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center ">
      <form  onSubmit={handlesubmit} className="bg-zinc-900 first-letter m-6 p-5">
      {/* <p className='text-xl font-bold my-4 justify-center'> Atencion 24/7</p>  */}
      <h3 className='text-2xl font-bold my-2 justify-center'> Soporte Online</h3>
      
      <br/>
       <input 
       type="text" 
       onChange={e=>setmessage(e.target.value)}
       value={message} placeholder="Ingrese su mensaje"
       className='border-2 border-zinc-500 p-2 text-black w-full'/>
        {/* <button className='bg-500' >Enviar</button> */}
        <ul className='h-80 overflow-y-auto'>
        {messages.map((message,index) =>(
            <li key={index} 
            className={`my-2 p-2 table text-sm rounded-md ${message.from === "Me" ? "bg-sky-700 ml-auto ":"bg-black"}`}>
              <p>{message.from} :{message.body}</p>
             
            </li>
          ))}

        </ul>
         
    </form>
    </div>
  );
}

export default App;
