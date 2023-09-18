import { Button, Select, Table ,theme,Slider, Switch, InputNumber, Checkbox, Drawer as DrawerAntd, Input, message } from 'antd';
import { MenuOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import React, { useEffect, useRef, useContext, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';


export default function DragTable({layers, setLayers, handleDelete}){
    const columns = [
        {
            key: 'sort',
            width: 30
        },
        {
            title: 'Name',
            dataIndex: 'name',
            width: 300
        },
        { 
            render: (text, record)=>{return <EditOutlined className='hover:text-yellow-500'/>}
        },
        { 
            render: (text, record)=>{return <DeleteOutlined className='hover:text-red-400' onClick={()=>{handleDelete(text)}}/>}
        },
        { 
            render: (text, record)=>{return <Checkbox defaultChecked={true} onClick={()=>{console.log(text); text.status = !text.status; text.properties.setVisible(text.status)}}/>}
        },
    ];


    
    function onDragEnd({ active, over }){
      if (active.id !== over?.id) {
        setLayers((previous) => {
          const activeIndex = previous.findIndex((i) => i.key === active.id);
          const overIndex = previous.findIndex((i) => i.key === over?.id);
          return arrayMove(previous, activeIndex, overIndex);
        });
      }
      // const list = [];

      // console.log(layers.slice(3));

      // const orderData = dataSource.sort((a,b)=> b - a)
      // dataSource.map((ds,key)=>{
      //   const stateLayerIndexValue = 3
      //   ds.properties.setZIndex(key + stateLayerIndexValue);
      // })
    
    };


    return(
      
            <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                <SortableContext
                items={layers.map((i) => i.key)}
                strategy={verticalListSortingStrategy}
                >
                <Table
                    components={{
                    body: {
                         row: Row,
                    },
                    }}
                    size='small'
                    rowKey="key"
                    columns={columns}
                    dataSource={layers.slice(3).reverse()}
                    pagination={false}
                    showHeader={false}           
                />
                </SortableContext>
            </DndContext>   
     
    )
}





const Row = ({ children, ...props }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: props['data-row-key'],
    });
    const style = {
        ...props.style,
        transform: CSS.Transform.toString(
        transform && {
            ...transform,
            scaleY: 1,
        },
        ),
        transition,
        ...(isDragging
        ? {
            position: 'relative',
            zIndex: 9999,
            }
        : {}),
    };


    return (
        <tr {...props} ref={setNodeRef} style={style} {...attributes}>
        {React.Children.map(children, (child) => {
            if (child.key === 'sort') {
            return React.cloneElement(child, {
                children: (
                <MenuOutlined
                    ref={setActivatorNodeRef}
                    style={{
                    touchAction: 'none',
                    cursor: 'move',
                    }}
                    {...listeners}
                />
                ),
            });
            }
            return child;
        })}
        </tr>
    );
};