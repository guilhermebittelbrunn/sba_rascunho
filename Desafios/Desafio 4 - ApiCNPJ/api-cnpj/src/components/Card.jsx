export default function Card({data}){
    return(
        <div id="card" className="w-full flex flex-col justify-between p-2 border-2 bg-slate-100 border-white border-b-gray-700 my-2 md:flex-row">
          <div id="card-header">
            <h3 className="uppercase font-semibold text-sm">{String(data[0]).replace(/_/g, ' ')}</h3>
          </div>
          <div id="card-body">
            <p className="text-sm text-right">{data[1] ? JSON.stringify(data[1]).replace(/"/g, '') : 'Sem registro'}</p>
          </div>
        </div>
    )
}