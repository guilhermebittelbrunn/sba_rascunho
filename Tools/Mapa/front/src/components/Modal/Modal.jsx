import React, { useContext} from 'react';
import { MapaContext } from '../../contexts/MapaContext';
import { Modal as ModalAntd} from 'antd';
import ExportForm from './ExportForm';
import ReportForm from './ReportForm';

export default function Modal(){
    // const [isModalOpen, setIsModalOpen] = useState(false);

    const {isModalOpen,setIsModalOpen} = useContext(MapaContext);
    
    const handleOk = () => {
        setIsModalOpen({status: false, type: ''});
    };
    const handleCancel = () => {
        setIsModalOpen({status: false, type: ''});
    };


    return (
        <div>
            {/* <Button type="primary" onClick={showModal}>
                Open Modal
            </Button> */}
            <ModalAntd title={isModalOpen.type === 'export' ? 'Gerar PDF' : 'Gerar Relatório'} width={350} centered={true} open={isModalOpen.status} okButtonProps={{hidden: true}} cancelButtonProps={{hidden: true}} onCancel={handleCancel} handleCancel={handleCancel}>
                {isModalOpen.type === 'export' ? <ExportForm handleCancel={handleCancel}/> : <ReportForm  handleCancel={handleCancel}/>}
                
            </ModalAntd>
        </div>
    );
};


