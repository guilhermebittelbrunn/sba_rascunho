import { useEffect, useRef, useContext, useState } from 'react';
import { Spin,Button, Modal,Input, ColorPicker,  Divider} from 'antd';
import { useForm, Controller } from 'react-hook-form';


export default function NewLayerModal({layer, isModalOpen, setIsModalOpen, addLayer, changeLayer}){
    const {control, handleSubmit, reset, setValue} = useForm({defaultValues: {layerName: layer?.data.layerName || '', fontColor: '#000000', fillColor: '#0084ff'}});

    const handleOk = (data) => {
        layer ? changeLayer(data, layer) : addLayer(data);
        reset();
        setIsModalOpen(false);
    };  
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(()=>{
        if(layer){
            // setValue([{layerName: '123'}, {fontColor: '#111111'}, {fillColor: '#777777'}]);
            const {fontColor, fillColor} = layer?.data;
            reset({layerName: layer.name, fontColor, fillColor});
        }
    }, [layer])


    return (
        <>
               <Modal centered={true} title="Nova camada" open={isModalOpen} onCancel={handleCancel} okButtonProps={{hidden:true}} cancelButtonProps={{hidden: true}}  width={300}>
                    <form className='flex flex-col gap-1' onSubmit={handleSubmit(handleOk)}>

                        <div>
                            <h3 className='font-bold'>Nome</h3>
                            <Controller name='layerName' control={control} render={({field})=>{
                                return <Input field={field} value={field.value} onChange={(value)=>field.onChange(value)} placeholder="Título da camada" size='small' className='w-[200px]'/>
                            }}/>          
                        </div>

                        {/* <ColorPicker /> */}
                    
                        <div>
                            <h3 className='font-bold'>Cores</h3>
                            <div className='flex gap-2 mb-6'>
                                <Controller name='fontColor' control={control} render={({field})=>{
                                    return (
                                        <>
                                            <ColorPicker
                                                value={(field?.value?.metaColor?.originalInput || layer?.data.fontColor) || '#000000'}
                                                onChange={(v)=>{field.onChange(v);}}
                                      
                                                onChange={(v)=>{field.onChange(v)}}
                                                showText={()=>{return <><span>Fonte</span></>}}
                                                styles={{
                                                    popupOverlayInner: {
                                                        width: 288 + 40,
                                                    },
                                                }}
                                                presets={[
                                                {
                                                    label: 'Recommended',
                                                    colors: [
                                                    '#000000',
                                                    '#000000E0',
                                                    '#000000A6',
                                                    '#00000073',
                                                    '#00000040',
                                                    '#00000026',
                                                    '#0000001A',
                                                    '#00000012',
                                                    '#0000000A',
                                                    '#00000005',
                                                    '#F5222D',
                                                    '#FA8C16',
                                                    '#FADB14',
                                                    '#8BBB11',
                                                    '#52C41A',
                                                    '#13A8A8',
                                                    '#1677FF',
                                                    '#2F54EB',
                                                    '#722ED1',
                                                    '#EB2F96',
                                                    '#F5222D4D',
                                                    '#FA8C164D',
                                                    '#FADB144D',
                                                    '#8BBB114D',
                                                    '#52C41A4D',
                                                    '#13A8A84D',
                                                    '#1677FF4D',
                                                    '#2F54EB4D',
                                                    '#722ED14D',
                                                    '#EB2F964D',
                                                    ],
                                                },
                                                ]}
                                                panelRender={(_, { components: { Picker, Presets } }) => (
                                                <div
                                                    className="custom-panel"
                                                    style={{
                                                    display: 'flex',
                                                    width: 298,
                                                    }}
                                                >
                                                    <div
                                                    style={{
                                                        flex: 1,
                                                    }}
                                                    >
                                                    <Presets />
                                                    </div>
                                                    <Divider
                                                        type="vertical"
                                                        style={{
                                                            height: 'auto',
                                                        }}
                                                    />
                                                    <div
                                                        style={{
                                                            width: 200,
                                                        }}
                                                    >
                                                    <Picker />
                                                    </div>
                                                </div>
                                                )}
                                            />
                                        </>
                                    )
                                    
                                }}/>
                                <Controller name='fillColor' control={control} render={({field})=>{
                                    return (
                                        <>
                                            <ColorPicker
                                            
                                                value={(field?.value?.metaColor?.originalInput ||  layer?.data.fillColor) ||'#0084ff'}
                                                onChange={(v)=>{field.onChange(v);}}
                                                showText={()=>{return <><span>Fundo</span></>}}
                                                styles={{
                                                    popupOverlayInner: {
                                                        width: 288 + 40,
                                                    },
                                                }}
                                                presets={[
                                                {
                                                    label: 'Recommended',
                                                    colors: [
                                                    '#000000',
                                                    '#000000E0',
                                                    '#000000A6',
                                                    '#00000073',
                                                    '#00000040',
                                                    '#00000026',
                                                    '#0000001A',
                                                    '#00000012',
                                                    '#0000000A',
                                                    '#00000005',
                                                    '#F5222D',
                                                    '#FA8C16',
                                                    '#FADB14',
                                                    '#8BBB11',
                                                    '#52C41A',
                                                    '#13A8A8',
                                                    '#1677FF',
                                                    '#2F54EB',
                                                    '#722ED1',
                                                    '#EB2F96',
                                                    '#F5222D4D',
                                                    '#FA8C164D',
                                                    '#FADB144D',
                                                    '#8BBB114D',
                                                    '#52C41A4D',
                                                    '#13A8A84D',
                                                    '#1677FF4D',
                                                    '#2F54EB4D',
                                                    '#722ED14D',
                                                    '#EB2F964D',
                                                    ],
                                                },
                                                // {
                                                //     label: 'Recent',
                                                //     colors: [
                                                //     '#F5222D4D',
                                                //     '#FA8C164D',
                                                //     '#FADB144D',
                                                //     '#8BBB114D',
                                                //     '#52C41A4D',
                                                //     '#13A8A84D',
                                                //     ],
                                                // },
                                                ]}
                                                panelRender={(_, { components: { Picker, Presets } }) => (
                                                <div
                                                    className="custom-panel"
                                                    style={{
                                                    display: 'flex',
                                                    width: 298,
                                                    }}
                                                >
                                                    <div
                                                    style={{
                                                        flex: 1,
                                                    }}
                                                    >
                                                    <Presets />
                                                    </div>
                                                    <Divider
                                                        type="vertical"
                                                        style={{
                                                            height: 'auto',
                                                        }}
                                                    />
                                                    <div
                                                        style={{
                                                            width: 200,
                                                        }}
                                                    >
                                                    <Picker />
                                                    </div>
                                                </div>
                                                )}
                                            />
                                        </>
                                    )
                                    
                                }}/>
                    
                            </div>
                        </div>

                        <div className='absolute right-4 bottom-2 flex gap-2'>
                                <Button htmlType='submit' className='bg-blue-500 text-white hover:bg-white hover:text-blue-500'>{layer ? 'Salvar' : 'Confirmar'}</Button>
                        </div> 
                      
                    </form>
                </Modal>  
        </>
    )
}