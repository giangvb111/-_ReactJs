import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { soukoListSelector } from '../../../../redux/selector';
import { API_BASE_URL } from '../../../../constants';
import axios from 'axios';

export default function TableCreate() {

    const [seihinList, setSeihinList] = useState([]);
    const [soukoList, setSoukoList] = useState([]);
    const [shukkaMesaiList, setShukkaMesaiList] = useState([
        {
            shukkaMesaiNo: '出荷明細',
            seihinId: '',
            seihinName: '',
            shukkaYoteiSuryo: '',
            shukkaJisseikiSuryo: '',
            soukoId: '',
            tanabanId: '',
            tanabanName: [],
            lotNo: '',
            tanka: '',
            kingaku: '',
            tekiyoMesai: ''
        }
    ]);

    // api get list seihin
    const fetchSeihin = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/seihin/get-list`);
            setSeihinList(response.data);
        } catch (error) {
            console.log('Error fetching seihin:', error);
        }
    };

    // api get list souko
    const fetchSouko = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/souko/get-list`);
            setSoukoList(response.data);
        } catch (error) {
            console.log('Error fetching souko:', error);
        }
    };
    useEffect(() => {
        fetchSeihin();
        fetchSouko();
    }, [])

    // get seihin name autofill when change seihincode
    const handleChangeSeihin = (index, event) => {
        const selectedSeihinId = event.target.value;
        const selectedSeihin = seihinList.find(item => item.seihinId == selectedSeihinId);
        console.log("selectedSeihin", selectedSeihin);
        handleShukkaMesaiChange(index, 'seihinName', selectedSeihin ? selectedSeihin.seihinName : '');
    };

    // get list tanaban when change souko
    const handleChangeSouko = async (index, event) => {
        const selectedSoukoId = event.target.value;
        if (selectedSoukoId === '') {
            handleShukkaMesaiChange(index, 'tanabanName', []);
            handleShukkaMesaiChange(index, 'tanabanId', '');
        } else {
            try {
                const response = await axios.get(`${API_BASE_URL}/tanaban/get-tanaban-by-souko-id?soukoId=${selectedSoukoId}`);
                handleShukkaMesaiChange(index, 'tanabanName', response.data);
            } catch (error) {
                console.log('Error fetching tanaban:', error);
            }
        }
    };

    const handleChangeSuryo = (index, event) => {
        const newSuryo = parseFloat(event.target.value) || '';
        if (shukkaMesaiList[index].tanka === '') {
            handleShukkaMesaiChange(index, 'kingaku', newSuryo * 1)
        } else {
            handleShukkaMesaiChange(index, 'kingaku', newSuryo * shukkaMesaiList[index].tanka)
        }
    }

    const handleChangeTanka = (index, event) => {
        const tanka = parseFloat(event.target.value) || '';
        handleShukkaMesaiChange(index, 'kingaku', shukkaMesaiList[index].shukkaYoteiSuryo * (tanka === '' ? 1 : tanka))
    }

    const handleShukkaMesaiChange = (index, name, value) => {
        const updatedList = [...shukkaMesaiList];
        updatedList[index][name] = value;

        setShukkaMesaiList(updatedList);
    };
    console.log("shukkaMesaiList =>>", shukkaMesaiList);

    return (
        <>
            <div className="overflow-x-scroll overflow-y-scroll max-h-96 max-w-max">
                <table className="bg-white border-collapse border border-gray-300 rounded-md shadow-md overflow-scroll">
                    <thead className="bg-cyan-600 text-white sticky top-0 z-10 py-8">
                        <tr>
                            <th className="py-2 border border-gray-300 w-10"> </th>
                            <th className="py-2 border border-gray-300 w-36">製品コード</th>
                            <th className="py-2 border border-gray-300 ">製品名</th>
                            <th className="py-2 border border-gray-300 w-36">出荷倉庫</th>
                            <th className="py-2 border border-gray-300 ">棚番</th>
                            <th className="py-2 border border-gray-300 ">数量</th>
                            <th className="py-2 border border-gray-300 w-36">ロットNo</th>
                            <th className="py-2 border border-gray-300 ">単価</th>
                            <th className="py-2 border border-gray-300">金額</th>
                            <th className="py-2 border border-gray-300 w-36">メモ欄</th>
                        </tr>
                    </thead>
                    <tbody className="overflow-y-auto">
                        {shukkaMesaiList.map((item, index) => (
                            <tr className="bg-gray-50" key={index}>
                                <td className="flex justify-center items-center text-center">
                                    <input type="checkbox" className="my-3" />
                                </td>
                                <td className="py-2 border border-gray-300">
                                    <select
                                        className="w-36 border border-slate-500 rounded "
                                        id=""
                                        name="seihinId"
                                        value={item.seihinId}
                                        onChange={(event) => {
                                            handleChangeSeihin(index, event);
                                            handleShukkaMesaiChange(index, event.target.name, event.target.value)
                                        }}
                                    >
                                        <option value="" />
                                        {seihinList.map(item => (
                                            <option key={item.seihinId} value={item.seihinId}>{item.seihinCode}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="py-2 border border-gray-300 w-34">
                                    <input
                                        type="text"
                                        disabled
                                        className="border-transparent text-center"
                                        name='seihinName'
                                        value={item.seihinName}
                                        onChange={(event) => {
                                            handleShukkaMesaiChange(index, event.target.name, event.target.value)
                                        }}
                                    />
                                </td>
                                <td className="py-2 border border-gray-300">
                                    <select
                                        className="w-36 border border-slate-500 rounded"
                                        id=""
                                        name='soukoId'
                                        value={item.soukoId}
                                        onChange={(event) => {
                                            handleChangeSouko(index, event);
                                            handleShukkaMesaiChange(index, event.target.name, event.target.value)
                                        }}
                                    >

                                        <option value="" />
                                        {soukoList.map(item => (
                                            <option key={item.soukoId} value={item.soukoId}>{item.soukoName}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="py-2 border border-gray-300">
                                    <select
                                        className="w-32 border border-slate-500 rounded"
                                        id=""
                                        name="tanabanId"
                                        value={item.tanabanId}
                                        onChange={(event) => {
                                            handleShukkaMesaiChange(index, event.target.name, event.target.value)
                                        }}
                                    >
                                        <option value="" />
                                        {item.tanabanName.map(tana => (
                                            <option key={tana.tanabanId} value={tana.tanabanId}>{tana.tanabanName}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="py-2 border border-gray-300">
                                    <input
                                        type="text"
                                        className="w-32 border border-slate-500 rounded text-center"
                                        name='shukkaYoteiSuryo'
                                        value={item.shukkaYoteiSuryo}
                                        onChange={(event) => {
                                            handleShukkaMesaiChange(index, event.target.name, event.target.value);
                                            handleChangeSuryo(index, event);
                                        }}
                                    />
                                </td>
                                <td className="py-2 border border-gray-300">
                                    <input
                                        type="text"
                                        className="w-36 border border-slate-500 rounded text-center "
                                        name='lotNo'
                                        value={item.lotNo}
                                        onChange={(event) => {
                                            handleShukkaMesaiChange(index, event.target.name, event.target.value)
                                        }}

                                    />
                                </td>
                                <td className="py-2 border border-gray-300">
                                    <input
                                        type="text"
                                        className="w-32 border border-slate-500 rounded text-center"
                                        name='tanka'
                                        value={item.tanka}
                                        onChange={(event) => {
                                            handleShukkaMesaiChange(index, event.target.name, event.target.value)
                                            handleChangeTanka(index, event)
                                        }}
                                    />
                                </td>
                                <td className="py-2 border border-gray-300">
                                    <input
                                        type="text"
                                        disabled
                                        className="border-transparent text-center"
                                        name='kingaku'
                                        value={item.kingaku}
                                        onChange={(event) => {
                                            handleShukkaMesaiChange(index, event.target.name, event.target.value)
                                        }}
                                    />
                                </td>
                                <td className="py-2 border border-gray-300">
                                    <input
                                        type="text"
                                        className="w-72 border border-slate-500 rounded"
                                        name='tekiyoMesai'
                                        value={item.tekiyoMesai}
                                        onChange={(event) => {
                                            handleShukkaMesaiChange(index, event.target.name, event.target.value)
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='w-full'>
                <div className="flex my-5">
                    <div>
                        <label htmlFor="" className="font-bold text-lg">
                            受注金額
                        </label>
                        <input
                            type="text"
                            className="w-36 border border-slate-500 rounded ml-3"
                            disabled=""
                        />
                    </div>
                    <div className="mx-10">
                        <label htmlFor="" className="font-bold text-lg">
                            消費税額
                        </label>
                        <input
                            type="text"
                            className="w-36 border border-slate-500 rounded ml-3"
                            disabled=""
                        />
                    </div>
                    <div>
                        <label htmlFor="" className="text-red-500 font-bold text-lg">
                            合計金額
                        </label>
                        <input
                            type="text"
                            className="w-36 border border-slate-500 rounded ml-3"
                            disabled=""
                        />
                    </div>
                </div>
                {/* button add */}
                <div className='w-full'>
                    <div className="flex justify-end w-10/12">
                        <div>
                            <button className="bg-cyan-600 text-white font-semibold h-8 px-8 text-lg transition-colors duration-150 rounded-lg focus:shadow-outline hover:bg-cyan-700">
                                登　録
                            </button>
                        </div>
                        <div>
                            <button className="ml-6 bg-white border border-sky-500 text-sky h-8 px-5 text-lg transition-colors duration-150 rounded focus:shadow-outline m-[auto] hover:bg-cyan-600/75">
                                下書きで登録
                            </button>
                        </div>
                    </div>
                    <div className='w-10/12'>
                        <div>
                            <label htmlFor="" className="font-bold text-lg">
                                コメントを残す
                            </label>
                        </div>
                        <textarea defaultValue={""} className='bg-white border border-slate-500 w-full rounded' />
                    </div>
                </div>
            </div>
        </>
    )
}
