import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
     useEffect(() => {
          const dataButton = document.getElementById('dataButton');
          const submenu = document.getElementById('submenu');
          const dataItem = document.getElementById('dataItem');

          dataButton.addEventListener('click', () => {
               submenu.classList.toggle('invisible');
               submenu.classList.toggle('h-0');
               submenu.classList.toggle('overflow-hidden');
               document.querySelector('div#sub-div').classList.toggle('mt-56');
               // dataItem.classList.toggle('bg-white');
               // dataItem.classList.toggle('text-blue-500');
               submenu.querySelectorAll('li').forEach((li) => {
                    li.classList.toggle('text-black');
               });
          });
     }, [])

     return (
          <>
               <div className="text-white w-80 h-screen p-6 pt-10 mt0 text-2xl flex flex-col items-center bg-cyan-600 leading-[4rem] font-black">
                    <nav className="text-white py-4 relative">
                         <ul>
                              <li className="mb-4 hover:text-cyan-300">
                                   <NavLink to="/">ホーム</NavLink>
                              </li>
                              <li className="mb-4">
                                   <NavLink to="/">在庫確認</NavLink>
                              </li>
                              <li className="mb-4">
                                   <NavLink to="/">データ登録</NavLink>
                              </li>
                              <li id="dataItem" className="mb-4 relative">
                                   <button id="dataButton" className="w-full text-left">
                                        データ
                                   </button>
                                   <ul
                                        id="submenu"
                                        className="absolute text-left left-1/2 -translate-x-1/2 item-center mt-4 w-80 bg-white text-blue-500 invisible h-0 overflow-hidden transition-all duration-300 z-10"
                                   >
                                        <li className="pl-20 hover:bg-gray-100">
                                             <NavLink to="/shukka-ichiran">出荷</NavLink>
                                        </li>
                                        <li className="pl-20 hover:bg-gray-100">
                                             <NavLink to="/shukka-entry">仕入</NavLink>
                                        </li>
                                        <li className="pl-20 hover:bg-gray-100">
                                             <NavLink to="/shukka-success">その他調整</NavLink>
                                        </li>
                                   </ul>
                              </li>
                         </ul>
                         <div className="transition-all duration-300" id="sub-div">
                              <ul>
                                   <li className="mb-4">
                                        <NavLink to="/">スケジュール表</NavLink>
                                   </li>
                                   <li className="mb-4">
                                        <NavLink to="/">解析</NavLink>
                                   </li>
                                   <li className="mb-4">
                                        <NavLink to="/">設定</NavLink>
                                   </li>
                                   <li>詳細設定</li>
                              </ul>
                         </div>
                    </nav>
               </div>
          </>
     )
}
