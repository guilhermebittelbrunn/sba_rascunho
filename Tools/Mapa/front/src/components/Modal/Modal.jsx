import React, { useContext} from 'react';
import { MapaContext } from '../../contexts/MapaContext';
import { Modal as ModalAntd} from 'antd';
import ExportPDFModal from './ExportPDFModal';
import ReportModal from './ReportModal';

export default function Modal(){

    const {isModalOpen, setIsModalOpen} = useContext(MapaContext);
    
    function handleCancel(){
        setIsModalOpen({status: false, type: ''});
    };

    return (
            <ModalAntd 
                title={isModalOpen.type === 'export' ? 'Gerar PDF' : 'Gerar Relatório'} width={350} 
                centered={true} open={isModalOpen.status} okButtonProps={{hidden: true}} 
                cancelButtonProps={{hidden: true}} onCancel={handleCancel} handleCancel={handleCancel}
            >
                {isModalOpen.type === 'export' ? 
                    <ExportPDFModal handleCancel={handleCancel}/>
                     : 
                    <ReportModal  handleCancel={handleCancel}/>
                }
            </ModalAntd>
    );
};


