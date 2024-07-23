import React from 'react'
import Navbar from '../../navbar/Navbar'
import Sidebar from '../../navbar/Sidebar'
import { useNavigate } from 'react-router-dom'

export default function ShukkaSuccess() {

    const navigate = useNavigate()

    const handleButtonNavigate = () => {
        navigate("/shukka-entry")
    }
    return (
        <>
            {/* Navbar */}
            <Navbar />
            <div className="flex">
                {/* Sidebar */}
                <Sidebar />
                <div className="flex-1 p-16">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-xl font-medium">
                        <div className="mb-4 text-center">
                            <button className="bg-cyan-600/50 text-white h-8 px-5 text-lg transition-colors duration-150 rounded-[5rem] focus:shadow-outline m-[auto]">
                                出荷予定
                            </button>
                            を登録しました。
                        </div>
                        <div className="mb-4 text-center">
                            管理番号{" "}
                            <a href="#" className="text-blue-500">
                                10059
                            </a>{" "}
                            2023年3月度 定期納品
                        </div>
                        <div className="space-y-2 text-center">
                            <button className="bg-gray-200 mr-3 px-4 py-2 rounded-lg hover:bg-cyan-600/75">
                                請求書
                            </button>
                            <button className="bg-gray-200 mr-3 px-4 py-2 rounded-lg hover:bg-cyan-600/75">
                                納品書
                            </button>
                            <button className="bg-gray-200 mr-3 px-4 py-2 rounded-lg hover:bg-cyan-600/75">
                                出荷指示書
                            </button>
                            <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-600/75"
                                onClick={handleButtonNavigate}
                            >
                                続けて出荷登録
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
