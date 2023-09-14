import React, { useState } from 'react'
import Modal from './Modal';
import { deleteTask } from '../utils/api/deleteTask';

export default function CardItem({ data, user}) {

    const [showModal, setShowModal] = useState(false);

    const deleteHandler=async ()=>{
        try {
            await deleteTask(data.id);
        } catch (error) {
            
        }
    }
    return (
        <>
            <div className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg bg-opacity-90 group hover:bg-opacity-100">
                <div className='w-full flex justify-between'>
                    <span onClick={() => setShowModal(true)} className="flex items-center h-6 px-3  cursor-pointer text-xs font-semibold text-pink-500 bg-pink-100 rounded-full">{data.status}</span>
                    <button onClick={deleteHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <h4 onClick={() => setShowModal(true)} className="mt-3  cursor-pointer text-sm font-medium w-full">{data.title}</h4>
                <div onClick={() => setShowModal(true)} className="flex  cursor-pointer items-center w-full mt-3 text-xs font-medium text-gray-400">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-1 leading-none">{data.dueDate}</span>
                    </div>
                    <div className="relative flex items-center ml-4">
                        <svg className="relative w-4 h-4 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-1 leading-none">{data.comment?.length}</span>
                    </div>
                    <img alt='' className="w-6 h-6 ml-auto rounded-full" src='https://randomuser.me/api/portraits/women/26.jpg' />
                </div>
            </div>
            {showModal && <Modal user={user} setShowModal={setShowModal} data={data} /> }
        </>
    )
}
