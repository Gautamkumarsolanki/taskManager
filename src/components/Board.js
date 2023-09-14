import React, { useState } from 'react'
import CardItem from './CardItem';
import Modal from './Modal';
import { getAuth } from 'firebase/auth';
const auth = getAuth();

export default function Board({ allTask, user }) {
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState("all");
    console.log(user[auth.currentUser.email]);
    return (
        <>
            <div className="px-10 my-6">
                <h1 className="text-2xl font-bold">Task Board</h1>
                <div className='flex justify-between my-6'>
                    {user[auth.currentUser.email] === "admin" ?
                        <button onClick={() => setShowModal(true)} className='flex'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add Task
                        </button> : <></>
                    }
                    <select value={filter} onChange={(e) => setFilter(e.target.value)} className="text-gray-800 appearance-none border-none inline-block py-2 pl-3 pr-8 rounded leading-tight w-60">
                        <option value={"all"} className="pt-6">All</option>
                        <option value={"todo"} className="pt-6">To-Do</option>
                        <option value={"doing"} className="pt-6">Doing</option>
                        <option value={"done"} className="pt-6">Done</option>

                    </select>

                </div>
                <hr />
                <div className='flex flex-wrap gap-8'>

                    {allTask && allTask.length > 0 &&
                        allTask.map((ele, index) => {
                            return (filter === "all" || ele.status === filter) ? <CardItem user={user} key={index} data={ele} /> : <></>;
                        })
                    }
                </div>
            </div>
            {showModal &&
                <Modal user={user} setShowModal={setShowModal} data={null} />
            }
        </>
    )
}
