import { Button, Spin } from 'antd';
import {Map, View} from 'ol';
import { useForm, Controller } from 'react-hook-form';
import { useContext, useState } from 'react';
import {fromExtent} from 'ol/geom/Polygon'
import { MapaContext } from '../../contexts/MapaContext';
import {WKT} from 'ol/format';
import RadioInput from './RadioInput';
import {jsPDF} from 'jspdf'

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
];
const dpiValueSet = [
    {
        type: 'dpi',
        name: 300
    },
    {
        type: 'dpi',
        name: 600
    },
    {
        type: 'dpi',
        name: 900
    },
];

const sizeDefaultValue = 'A3'
const dpiDefaultValue = 600

const dims = {
    A2: [594,420],
    A3: [420,297],
    A4: [297,210],
}



export default function ExportForm({ handleCancel }){
    const [isLoading, setIsLoading] = useState(false);
    const {handleSubmit, control} = useForm({defaultValues:{paperSize: sizeDefaultValue, dpiValue: dpiDefaultValue}});
    const {map, stateLayer, countryLayer} = useContext(MapaContext)

    const sendForm = (data)=>{
        const dim = dims[data.paperSize];
        const width = Math.round((dim[0] * data.dpiValue) / 25.4);
        const height = Math.round((dim[1] * data.dpiValue) / 25.4);
        const size = map.getSize();
        const viewResolution = map.getView().getResolution();

        const pdf = new jsPDF('landscape', 'mm', dim);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        map.getLayers().forEach(layer=>{
            layer.disposed = true
        });

        // setIsLoading(true);
        // map.once('rendercomplete', function () {
        //     const mapCanvas = document.createElement('canvas');
        //     const size = map.getSize();
        //     mapCanvas.width = size[0];
        //     mapCanvas.height = size[1];
        //     const mapContext = mapCanvas.getContext('2d');
        //     Array.prototype.forEach.call(
        //     map.getViewport().querySelectorAll('.ol-layer canvas, canvas.ol-layer'),
        //     function (canvas) {
        //         if (canvas.width > 0) {
        //         const opacity =
        //             canvas.parentNode.style.opacity || canvas.style.opacity;
        //         mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
        //         let matrix;
        //         const transform = canvas.style.transform;
        //         if (transform) {
        //             // Get the transform parameters from the style's transform matrix
        //             matrix = transform
        //             .match(/^matrix\(([^\(]*)\)$/)[1]
        //             .split(',')
        //             .map(Number);
        //         } else {
        //             matrix = [
        //             parseFloat(canvas.style.width) / canvas.width,
        //             0,
        //             0,
        //             parseFloat(canvas.style.height) / canvas.height,
        //             0,
        //             0,
        //             ];
        //         }
        //         // Apply the transform to the export map context
        //         CanvasRenderingContext2D.prototype.setTransform.apply(
        //             mapContext,
        //             matrix
        //         );
        //         const backgroundColor = canvas.parentNode.style.backgroundColor;
        //         if (backgroundColor) {
        //             mapContext.fillStyle = backgroundColor;
        //             mapContext.fillRect(0, 0, canvas.width, canvas.height);
        //         }
        //         mapContext.drawImage(canvas, 0, 0);
        //         }
        //     }
        //     );
        //     mapContext.globalAlpha = 1;
        //     mapContext.setTransform(1, 0, 0, 1, 0, 0);
        //     const link = document.getElementById('image-download');
        //     link.href = mapCanvas.toDataURL();
        //     link.click();
        // });
        // map.renderSync();
        // setIsLoading(false);
        // map.once('rendercomplete', function () {
        //     setIsLoading(true);
        //     const mapCanvas = document.createElement('canvas');
        //     mapCanvas.width = width;
        //     mapCanvas.height = height;
        //     const mapContext = mapCanvas.getContext('2d');
        //     Array.prototype.forEach.call(
        //         document.querySelectorAll('.ol-layer canvas'),
        //         function (canvas) {
        //             if (canvas.width > 0) {
        //                 // const opacity = canvas.parentNode.style.opacity;
        //                 // mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
        //                 const transform = canvas.style.transform;
        //                 // Get the transform parameters from the style's transform matrix
        //                 const matrix = transform
        //                 .match(/^matrix\(([^\(]*)\)$/)[1]
        //                 .split(',')
        //                 .map(Number);
        //                 // Apply the transform to the export map context
        //                 CanvasRenderingContext2D.prototype.setTransform.apply(
        //                 mapContext,
        //                 matrix
        //                 );
        //                 mapContext.drawImage(canvas, 0, 0);
        //             }
        //         }
        //     );
        //     mapContext.globalAlpha = 1;
        //     mapContext.setTransform(1, 0, 0, 1, 0, 0);
        //     // const pdf = new jsPDF('landscape', undefined, format);
        //     const pdf = new jsPDF('landscape', undefined, dim);
        //     pdf.addImage(
        //         mapCanvas.toDataURL('image/jpeg'),
        //         'JPEG',
        //         0,
        //         0,
        //         dim[0],
        //         dim[1]
        //     );
        //     pdf.save('map.pdf');
        //     // Reset original map size
        //     map.setSize(size);
        //     map.getView().setResolution(viewResolution);
        //     setIsLoading(false)
            
        // });

        console.log(3)

        const exportMap = new Map({
            target: 'export-map', // Make sure you have a div with id "export-map" in your HTML
            layers: [stateLayer, countryLayer],
            view: new View({
            extent: [-75, -35, -32, 6],
            center: [-56, -14],
            zoom: 6,
            maxZoom: 12,
            minZoom: 4
            })
        });

        exportMap.once('rendercomplete', function () {
            const mapCanvas = document.querySelector('#export-map canvas');
            const imageData = mapCanvas.toDataURL('image/jpeg');
            pdf.addImage(imageData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('map.pdf');
            exportMap.setTarget(null); // Remove the map after exporting
            const link = document.getElementById('image-download');
            link.href = mapCanvas.toDataURL();
            link.click();
        });

        exportMap.setSize([pdfWidth, pdfHeight]);
   
};


        // const printSize = [width, height];
        // map.setSize(printSize);
        // const scaling = Math.min(width / size[0], height / size[1]);
        // map.getView().setResolution(viewResolution / scaling);
        // console.log(dim, width, height, size, viewResolution);
        
    // }

    return(
        <form className='flex flex-col gap-2 justify-center ml-2' onSubmit={handleSubmit(sendForm)}>

                    <div>
                        <h3 className='font-semibold mt-2'>Tamanho da folha</h3>
                        <Controller name='paperSize' control={control} render={({field})=>{
                            return <RadioInput field={field} dataset={sizeDataSet} defaultValue={sizeDefaultValue} cardStyle={`hover:cursor-pointer w-16 h-16 border-[1px] rounded-sm relative flex flex-col justify-center items-center`}/>
                        }}/>
                    </div>

                    <div className='mb-12'>
                        <h3 className='font-semibold mt-2'>Resolução</h3>
                        <Controller name='dpiValue' control={control} render={({field})=>{
                            return <RadioInput field={field} dataset={dpiValueSet} defaultValue={dpiDefaultValue} cardStyle={`hover:cursor-pointer w-16 h-16 border-[1px] rounded-sm relative flex flex-col justify-center items-center`}/>
                        }}/>
                    </div>
                
                    <div className='absolute right-4 bottom-4 flex gap-2'>
                        <Button onClick={handleCancel}>Cancelar</Button>
                        <Button htmlType='submit' className='bg-blue-500 text-white hover:bg-white hover:text-blue-500'>Exportar</Button>
                        {isLoading && <Spin/>}
                         <a id="image-download" download="map.png"></a>
                    </div>

        </form>
    )
}

