import { Button, Spin, Tooltip, Modal as ModalAntd, message} from 'antd';
import { QuestionCircleOutlined, FilePdfOutlined, FileOutlined } from '@ant-design/icons'
import { useForm, Controller } from 'react-hook-form';
import { useContext, useState } from 'react';
import { MapaContext } from '../../contexts/MapaContext';
import { jsPDF } from 'jspdf'
import RadioInput from '../Form/RadioInput';
import html2canvas from 'html2canvas';


function Teste(){
    return(
        <>
            <h3>Teste</h3>
        </>
    )
}

const sizeDataSet = [
    {
        type: 'pdf',
        name: 'A2',
        icon: ()=>{
            return <FilePdfOutlined/>
        }
        
    },
    {
        type: 'pdf',
        name: 'A3',
        icon: ()=>{
            return <FilePdfOutlined />
        }
    },
    {
        type: 'pdf',
        name: 'A4',
        icon: ()=>{
            return <FilePdfOutlined />
        }
    },
    {
        type: 'pdf',
        name: 'A5',
        icon: ()=>{
            return <FilePdfOutlined />
        }
    },
];
const dpiValueSet = [
    {
        type: 'dpi',
        name: 150,
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

const overflowOptions = [
    {
        type: 'overflow',
        name: 'on',
    },
    {
        type: 'overflow',
        name: 'off',
    },
]

const orientationOptions = [
    {
        type: 'orientation',
        name: 'Retrato',
        icon: ()=>{
            return <FileOutlined/>
        }
    },
    {
        type: 'orientation',
        name: 'Paisagem',
        icon: ()=>{
            return <FileOutlined className='rotate-[270deg]'/>
        }
    },
]

const dims = {
    A2: [594,420],
    A3: [420,297],
    A4: [297,210],
    A5: [210,148],
}


export default function ExportPDFModal({ handleCancel, isModalOpen}){
    
    const [isLoading, setIsLoading] = useState(false);
    const { handleSubmit, control } = useForm({defaultValues:{paperSize: 'A3', dpiValue: 300, overflow: 'off', orientation: 'Paisagem'}});
    const { map, rc } = useContext(MapaContext)

    const sendForm = (data)=>{
        console.log(dims[data.paperSize]);
        const dim = data.orientation === 'Paisagem' ? [...dims[data.paperSize]] : [...dims[data.paperSize].sort((a,b)=>b-a)];
        console.log(data.orientation, dim)
        const width = Math.round((dim[0] * data.dpiValue) / 25.4);
        const height = Math.round((dim[1] * data.dpiValue) / 25.4);
        const size = map.getSize();
        const viewResolution = map.getView().getResolution();
        const pdf = new jsPDF('landscape', 'mm', dim);
        setIsLoading(true);


       
        map.once('rendercomplete', async function () {
            
            try{
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
    
                const status = subtitle.getAttribute('status');
                const elementsSubtitle = document.querySelectorAll('.text-subtitle');

                elementsSubtitle.forEach(element=>{
                    element.style.marginBottom = '18px'
                })
                
                pdf.addImage(
                    mapCanvas.toDataURL('image/jpeg'),
                    'JPEG',
                    0,
                    0,
                    dim[0],
                    dim[1]
                );
                
                if (status > 0){
                    const subtitle = document.getElementById('subtitle');
                    const table = document.getElementById('subtitle-table');
                    
                    const canvas = await html2canvas(subtitle);
                    const canvasWidth = ((dim[1] * (table.offsetHeight * 100) / 2480) / 100) * 2;   
                    const canvasHeight = ((dim[0] * (table.offsetWidth * 100) / 3508) / 100) * 2;
                    const padding = 2
                    
        
                    let posX,posY
                    switch(parseInt(status)){
                        case 1:
                            posX = padding;
                            posY = dim[1] - (canvasWidth  * 1.02);
                            break
                        case 2:
                            posX = dim[0] - (canvasHeight  * 1.05);
                            posY = dim[1] - (canvasWidth  * 1.02);
                            break
                        case 3:
                            posX = dim[0] - (canvasHeight  + padding)
                            posY = padding;
                            break
                        case 4:
                            posX = padding;
                            posY = padding;
                            break
                    }
                    
                    console.log(status, posX, posY);
                    pdf.addImage(
                        canvas.toDataURL('image/jpeg'),
                        'JPEG',
                        posX,
                        posY,
                        canvasHeight,
                        canvasWidth,
                    );
                    
                    
                }
                
                elementsSubtitle.forEach(element=>{
                    element.style.marginBottom = '0px'
                })

                // pdf.output('save', {filename: `map_${rc}_${data.paperSize}_${data.dpiValue}`});
                map.setSize(size);
                map.getView().setResolution(viewResolution);

                
            }catch(err){
                message.error('Ocorreu um erro durante a exportação do arquivo');
                throw err
            }finally{
                setIsLoading(false);
            }
            
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
                                        field={field} dataset={sizeDataSet} 
                                        cardStyle={`hover:cursor-pointer w-full h-16 border-[1px] rounded-sm relative 
                                        flex flex-col justify-center items-center`}
                                    />
                                )
                            }}/>
                        </div>

                        <div className='flex flex-col'>
                            <div className='flex items-center justify-between gap-2 mt-2'>
                                <h3 className='font-semibold'>Resolução</h3>
                                <Tooltip title='Quanto maior a resolução, maior a qualidade e tamanho do arquivo gerado'>
                                    <QuestionCircleOutlined/>
                                </Tooltip>
                            </div>
                            <Controller name='dpiValue' control={control} render={({field})=>{
                                return (
                                    <RadioInput 
                                        field={field} dataset={dpiValueSet} 
                                        cardStyle={`hover:cursor-pointer w-full h-16 border-[1px] rounded-sm relative
                                        flex flex-col justify-center items-center`}
                                    />
                                )
                            }}/>
                        </div>

                        <div className='flex  gap-6 mb-12'>
                            <div className='w-2/4'>
                                <div className='flex items-center justify-between gap-2 mt-2'>
                                    <h3 className='font-semibold'>Overflow</h3>
                                    <Tooltip title='Faz com que o nome de todas as cidades sejam mostrados, mesmo que fique um por cima do outro'>
                                        <QuestionCircleOutlined/>
                                    </Tooltip>
                                </div>
                                <Controller name='overflow' control={control} render={({field})=>{
                                    return (
                                        <RadioInput 
                                            field={field} dataset={overflowOptions} 
                                            cardStyle={`hover:cursor-pointer w-full h-16 border-[1px] rounded-sm relative
                                            flex flex-col justify-center items-center`}
                                        />
                                    )
                                }}/>
                            </div>

                            <div className='w-2/4'>
                                <div className='flex items-center justify-between gap-2 mt-2'>
                                    <h3 className='font-semibold'>Orientação</h3>
                                    <Tooltip title='Define o formato da página'>
                                        <QuestionCircleOutlined/>
                                    </Tooltip>
                                </div>
                                <Controller name='orientation' control={control} render={({field})=>{
                                    return (
                                        <RadioInput 
                                            field={field} dataset={orientationOptions} 
                                            cardStyle={`hover:cursor-pointer w-full h-16 border-[1px] rounded-sm relative
                                            flex flex-col justify-center items-center`}
                                        />
                                    )
                                }}/>
                            </div>
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

