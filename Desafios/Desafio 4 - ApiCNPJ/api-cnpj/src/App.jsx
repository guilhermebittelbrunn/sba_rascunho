import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react"
import { Button } from 'antd';
import Modal from './modal';

export default function App() {
  const [text,setText] = useState('');
  const [modal, setModal] = useState({status: false, cnpj: ''});

  const handleChange = (e)=>{
    setText(e.target.value);
  }

  const searchCNPJ = (e)=>{
    e.preventDefault();
    const cnpj = text.replace(/[^\d]+/g, '');
    if(cnpj.length != 14 || text == ''){
       toast.error('Cnpj inválido') 
        return
    }
    setText('');
    setModal({status: !modal.status, cnpj})
  }

  return (
    <>
      <main className={`flex flex-col ${!modal.status && 'h-screen'} justify-center z-10 text-center font-sans`}>
        <ToastContainer autoClose={2500}/>
        {!modal.status &&
          <form className='flex flex-col gap-4 p-4 bg-white shadow-md shadow-gray-700 w-11/12 m-auto max-w-sm' onSubmit={searchCNPJ}>
            <h2 className='font-semibold uppercase text-gray-800'>Informe o CNPJ</h2>
            <div className='border-2 flex justify-between items-center border-gray-100 p-1 max-[300px]:flex-col max-[300px]:gap-2'>
              <input type="text" maxLength={18} name="cnpj" id="cnpj" placeholder="00.000.000/0000-00" value={text} onChange={handleChange} className='border-2 border-white 
              rounded-sm p-1 w-4/5 outline-none text-gray-700 mx-2'/>
              <Button type="primary" className='bg-blue-600 mr-2 w-20' onClick={searchCNPJ}>Buscar</Button>
            </div>
        </form>
        }
        {modal.status && <Modal cnpj={modal.cnpj} setModal={setModal}/>}
      </main>
    </>
  )

}