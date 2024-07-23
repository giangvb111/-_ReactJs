import React from 'react'
import Navbar from '../../navbar/Navbar'
import Sidebar from '../../navbar/Sidebar'
import Header from './Header'
import TableDataList from './TableDataList'
import { useSelector } from 'react-redux'
import { shukkaListSelector } from '../../../../redux/selector'
import DataNotFound from './DataNotFound'

export default function ShukkaIchiran() {

    const shukkaList = useSelector(shukkaListSelector)

    console.log("shukkaList =>..", shukkaList);

    return (
        <>
            {/* Navbar */}
            <Navbar />
            <div className="flex">
                {/* Sidebar */}
                <Sidebar />
                <div className="flex-1 p-6">
                    <h1 className="text-3xl font-black">出荷一覧</h1>
                    <div className="flex justify-between my-5">
                        <div>
                            <span className="text-xl font-semibold">状況 : </span>
                            <span>
                                <button className="text-xl h-8 px-5 bg-transparent focus:bg-cyan-600 hover:bg-cyan-600/50 transition-colors duration-150 rounded-[5rem]">
                                    予定
                                </button>
                            </span>
                            <span>
                                <button className="text-xl h-8 px-5 bg-transparent focus:bg-cyan-600 hover:bg-cyan-600/50 transition-colors duration-150 rounded-[5rem]">
                                    出荷済
                                </button>
                            </span>
                            <span>
                                <button className="text-xl h-8 px-5 bg-transparent focus:bg-cyan-600 hover:bg-cyan-600/50 transition-colors duration-150 rounded-[5rem]">
                                    出荷済以外
                                </button>
                            </span>
                            <span>
                                <button className="text-xl h-8 px-5 bg-transparent focus:bg-cyan-600 hover:bg-cyan-600/50 transition-colors duration-150 rounded-[5rem]">
                                    下書き
                                </button>
                            </span>
                            <span>
                                <button className="text-xl h-8 px-5 bg-transparent focus:bg-cyan-600 hover:bg-cyan-600/50 transition-colors duration-150 rounded-[5rem]">
                                    すべて
                                </button>
                            </span>
                        </div>
                        <div>
                            <button className="bg-white border border-sky-500 text-sky h-8 px-5 text-lg transition-colors duration-150 rounded focus:shadow-outline m-[auto] mr-4 ml-4">
                                検索オプション
                            </button>
                        </div>
                    </div>
                    {/* Header */}
                    <Header />
                    <div className="mx-auto">

                        {/* Table List */}
                        {shukkaList.length > 0 ? <TableDataList /> : <DataNotFound />}

                    </div>
                </div>
            </div>
        </>
    )
}


