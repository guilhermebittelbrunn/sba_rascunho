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
    cnpj.length != 14 ? 
    toast.error('Cnpj inválido') 
    :
    setText('');
    setModal({status: !modal.status, cnpj})
  }

  return (
    <>
      <main className="flex flex-col bg-slate-100 w-screen h-screen justify-center items-center text-center font-sans">
        <ToastContainer autoClose={2500}/>
        <form className='flex flex-col gap-4 p-4 bg-white shadow-md shadow-gray-700' onSubmit={searchCNPJ}>
          <h2 className='font-semibold uppercase text-gray-800'>Informe o CNPJ</h2>
          <div className='border-2 border-gray-100 p-1'>
            <input type="text" maxLength={18} name="cnpj" id="cnpj" placeholder="00.000.000/0000-00" value={text} onChange={handleChange} className='border-2 border-white rounded-sm p-1 outline-none text-gray-700 
            focus:border-xl mx-2'/>
            <Button type="primary" className='bg-blue-600' onClick={searchCNPJ}>Buscar</Button>
          </div>
        </form>
        {modal.status && <Modal cnpj={modal.cnpj} setModal={setModal}/>}
      </main>
    </>
  )

}