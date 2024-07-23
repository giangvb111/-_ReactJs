import React from 'react'
import { columnSelector, shukkaListSelector } from '../../../../redux/selector';
import { useSelector } from 'react-redux';

export default function TableDataList() {
    const shukkaList = useSelector(shukkaListSelector);
    console.log("TableDataList", shukkaList);
    const columns = useSelector(columnSelector);
    return (
        <>
            <div className="flex justify-between pb-3">
                <div>
                    <button className="bg-white border border-sky-500 text-sky h-8 px-5 text-lg transition-colors duration-150 rounded focus:shadow-outline m-[auto] hover:bg-cyan-600/75">
                        請求書
                    </button>
                    <button className="bg-white border border-sky-500 text-sky h-8 px-5 text-lg transition-colors duration-150 rounded focus:shadow-outline m-[auto] mr-4 ml-4 hover:bg-cyan-600/75">
                        納品書
                    </button>
                    <button className="bg-white border border-sky-500 text-sky h-8 px-5 text-lg transition-colors duration-150 rounded focus:shadow-outline m-[auto] hover:bg-cyan-600/75">
                        出荷指示書
                    </button>
                </div>
                <div>
                    <button className="bg-white border border-sky-500 text-sky h-8 px-5 text-lg transition-colors duration-150 rounded-[5rem] focus:shadow-outline m-[auto] hover:bg-cyan-600/75">
                        一括で編集
                    </button>
                    <button className="bg-white border border-sky-500 text-sky h-8 px-5 text-lg transition-colors duration-150 rounded-[5rem] focus:shadow-outline m-[auto] mr-4 ml-4 hover:bg-cyan-600/75">
                        表示設定
                    </button>
                    <button className="bg-white border border-sky-500 text-sky h-8 px-5 text-lg transition-colors duration-150 rounded-full focus:shadow-outline m-[auto] hover:bg-cyan-600/75">
                        …
                    </button>
                </div>
            </div>
            <div className='overflow-x-scroll overflow-y-scroll max-h-96 max-w-full'>
                <table className="w-full bg-white border-collapse border border-gray-300 rounded-md shadow-md">
                    <thead className="bg-cyan-600 text-white sticky top-0 z-10 py-8">
                        <tr>
                            <th className="py-4 px-4 border border-gray-300 w-3"></th>
                            {columns.map((column) => (
                                <th key={column.settingDataId} className="py-4 px-4 border border-gray-300"
                                    style={{
                                        width: column.columnWidth,
                                        display: column.columnWidth === 0 ? 'none' : 'table-cell'
                                    }}>
                                    {column.columnDisplayName}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='overflow-scroll'>
                        {shukkaList.map((result, rowIndex) => (
                            <tr key={rowIndex} className="bg-gray-50 py-2">
                                <td className="text-center align-middle border border-gray-300">
                                    <input id={`checkbox-data-${rowIndex}`} type="checkbox" className="form-checkbox" />
                                </td>
                                {columns.map((column, columnIndex) => (
                                    <td className="py-2 px-4 border border-gray-300 text-center align-middle"
                                        key={`${rowIndex}-${columnIndex}`}
                                        style={{
                                            display: column.columnWidth === 0 ? 'none' : 'table-cell',
                                            width: column.columnWidth
                                        }}
                                    >
                                        {result[column.columnDisplayName]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
