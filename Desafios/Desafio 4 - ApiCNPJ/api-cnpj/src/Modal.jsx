import { useEffect, useState } from "react"
import useFetch from "./hooks/useFetch"
import { Tree } from 'antd';

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: (
              <span
                style={{
                  color: '#1890ff',
                }}
              >
                sss
              </span>
            ),
            key: '0-0-1-0',
          },
        ],
      },
    ],
  },
];

export default function Modal({cnpj}){
    const [data, loading, error] = useFetch(cnpj)
    const [list, setList] = useState([]);

    useEffect(()=>{
        for(let key in data){
            setList((preventValue)=>{
                return [...preventValue, [key, data[key]]]
            })
            console.log(1);
        }
    }, [data])

    console.log(list);

    return(
        <>
            <section className="bg-red-200 flex absolute justify-center items-center w-11/12 h-3/4 max-w-[600px]">
                {loading ? 
                <div className="w-12 h-12 rounded-full border-4 border-white border-t-black animate-spin 
                "/> 
                :
                <div className="w-full p-4">
                    {
                    //    <details> 
                    //     <summary>{'abilities'}</summary>
                    //     <div id="Content-info"> 
                    //             <p> {JSON.stringify(data.abilities)} </p> 
                    //     </div>
                    //    </details>
                    <ul>
                        {list.map((item, k)=>{
                            return (
                                <li className="text-start" key={k}>
                                    <Detail data={item}/>
                                </li>)
                        })}
                    </ul>
                    }
                    {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur doloribus non quidem eos nisi asperiores laudantium iure praesentium magnam suscipit dolores cum provident quia accusamus, consectetur, nihil itaque veniam officiis?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus saepe, aperiam a harum, enim eum quae repellat, doloremque delectus corrupti excepturi dignissimos? Ex tempore consequuntur at? Praesentium est eum eveniet!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam repudiandae nobis nulla soluta ab ad placeat impedit iste aut distinctio, culpa porro nemo iusto magnam sint et? Quas, autem libero. */}
                </div>
                }
            </section>
        </>
    )
}

function Detail({data}){
    
 
    return(
        <>
           <details> 
                <summary>{data[0]}</summary>
                <div id="Content-info"> 
                <p> {JSON.stringify(data[1])} </p> 
                </div>
            </details>
        </>
    )
}