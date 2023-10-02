import { Button, Spin, Tooltip, Modal as ModalAntd} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useForm, Controller } from 'react-hook-form';
import { useContext, useState } from 'react';
import { MapaContext } from '../../contexts/MapaContext';
import RadioInput from '../Form/RadioInput';
import { jsPDF } from 'jspdf'

const sizeDataSet = [
    {
        type: 'pdf',
        name: 'A2'
    },
    {
        type: 'pdf',
        name: 'A3'
    },
    {
        type: 'pdf',
        name: 'A4'
    },
    {
        type: 'pdf',
        name: 'A5'
    },
];
const dpiValueSet = [
    {
        type: 'dpi',
        name: 150
    },
    {
        type: 'dpi',
        name: 300
    },
    {
        type: 'dpi',
        name: 450
    },
    {
        type: 'dpi',
        name: 600
    },
];

const dims = {
    A2: [594,420],
    A3: [420,297],
    A4: [297,210],
    A5: [210, 148],
}

const sizeDefaultValue = 'A3'
const dpiDefaultValue = 300

export default function ExportPDFModal({ handleCancel, isModalOpen}){
    
    const [isLoading, setIsLoading] = useState(false);
    const { handleSubmit, control } = useForm({defaultValues:{paperSize: sizeDefaultValue, dpiValue: dpiDefaultValue}});
    const { map, rc } = useContext(MapaContext)

    const sendForm = (data)=>{
        
        const dim = dims[data.paperSize];
        const width = Math.round((dim[0] * data.dpiValue) / 25.4);
        const height = Math.round((dim[1] * data.dpiValue) / 25.4);
        const size = map.getSize();
        const viewResolution = map.getView().getResolution();
        const pdf = new jsPDF('landscape', 'mm', dim);

        setIsLoading(true);

        map.once('rendercomplete', function () {
            
            const mapCanvas = document.createElement('canvas');
            const mapContext = mapCanvas.getContext('2d');
            mapCanvas.width = width;
            mapCanvas.height = height;
            mapContext.fillStyle = 'white'; 
            mapContext.fillRect(0, 0, mapCanvas.width, mapCanvas.height);
            Array.prototype.forEach.call(
                document.querySelectorAll('.ol-layers canvas'),
                function (canvas) {
                    if (canvas.width > 0) {
                        const opacity = canvas.parentNode.style.opacity;
                        mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
                        const transform = canvas.style.transform;
                        const matrix = transform.match(/^matrix\(([^\(]*)\)$/)[1].split(',').map(Number);
                        CanvasRenderingContext2D.prototype.setTransform.apply(mapContext,matrix);
                        mapContext.drawImage(canvas, 0, 0);
                    }
                }
            );

            mapContext.globalAlpha = 1;
            mapContext.setTransform(1, 0, 0, 1, 0, 0);
            pdf.addImage(
                mapCanvas.toDataURL('image/jpeg'),
                'JPEG',
                0,
                0,
                dim[0],
                dim[1]
            );
            pdf.output('save', {filename: `map_${rc}_${data.paperSize}_${data.dpiValue}`});
            map.setSize(size);
            map.getView().setResolution(viewResolution);
            setIsLoading(false)
            
        });

        const printSize = [width, height];
        const scaling = Math.min(width / size[0], height / size[1]);
        
        map.setSize(printSize);
        map.getView().setResolution(viewResolution / scaling);
    }

    return(

        <ModalAntd 
                title={'Gerar PDF'} width={350} 
                centered={true} open={isModalOpen} okButtonProps={{hidden: true}} 
                cancelButtonProps={{hidden: true}} onCancel={handleCancel} handleCancel={handleCancel}
        >
        
            <form className='flex flex-col gap-2 justify-center ml-2' onSubmit={handleSubmit(sendForm)}>

                        <div className='flex flex-col'>
                            <div className='flex items-center justify-between  gap-2 mt-2'>
                                <h3 className='font-semibold'>Tamanho da folha</h3>
                                <Tooltip title='Dimensões da impressão, utilizar tamanho A4 para impressoras convencionais'>
                                    <QuestionCircleOutlined/>
                                </Tooltip>
                            </div>
                            <Controller name='paperSize' control={control} render={({field})=>{
                                return (
                                    <RadioInput 
                                        field={field} dataset={sizeDataSet} defaultValue={sizeDefaultValue} 
                                        cardStyle={`hover:cursor-pointer w-full h-16 border-[1px] rounded-sm relative 
                                        flex flex-col justify-center items-center`}
                                    />
                                )
                            }}/>
                        </div>

                        <div className='flex flex-col mb-12'>
                            <div className='flex items-center justify-between gap-2 mt-2'>
                                <h3 className='font-semibold'>Resolução</h3>
                                <Tooltip title='Quanto maior a resolução, maior a qualidade e tamanho do arquivo gerado'>
                                    <QuestionCircleOutlined/>
                                </Tooltip>
                            </div>
                            <Controller name='dpiValue' control={control} render={({field})=>{
                                return (
                                    <RadioInput 
                                        field={field} dataset={dpiValueSet} defaultValue={dpiDefaultValue} 
                                        cardStyle={`hover:cursor-pointer w-full h-16 border-[1px] rounded-sm relative
                                        flex flex-col justify-center items-center`}
                                    />
                                )
                            }}/>
                        </div>
                    
                        <div className='absolute right-4 bottom-4 flex gap-2'>
                            {isLoading ? 
                                <Spin/> 
                                : 
                                <>
                                    <Button onClick={handleCancel}>Cancelar</Button>
                                    <Button htmlType='submit' type='primary' className='bg-blue-500'>Exportar</Button>
                                </>
                            }
                        </div>
            </form>

         </ModalAntd>
    )
}

