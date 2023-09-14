import React, { useState } from 'react'
import { addTask } from '../utils/api/addTask';
import { addComment, updateTask } from '../utils/api/updateTask';

export default function Modal({ setShowModal, data, user }) {
    const [taskData, setTaskData] = useState({ title: data ? data.title : "", description: data ? data.description : "", dueDate: data ? data.dueDate : "", assignedTo: data ? data.assignedTo : "", status: data ? data.status : "todo" });
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false)

    const taskHandler = async (e) => {
        e.preventDefault();
        if (taskData.assignedTo === "") {
            window.alert("Please assign task");
            return;
        }
        try {
            setLoading(true);
            if (data) {
                await updateTask(taskData, data.id);
                setShowModal(false);
            } else {
                await addTask(taskData);
                setShowModal(false);
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    const onChangeHandler = (e) => {
        setTaskData({ ...taskData, [e.target.name]: e.target.value });
    }

    const addCommentHandler = async (e) => {
        e.preventDefault();
        if (!comment) return;
        await addComment(comment, data.id);
        setComment("");
    }

    return (
        <>
            <div className="fixed z-10 overflow-y-auto top-0 w-full left-0 overflow-y-auto" id="modal">
                <div className="flex items-center justify-center min-height-100vh pt-2 px-4 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-gray-900 opacity-75" />
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                    <form onSubmit={taskHandler} className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        <div className="bg-white px-4 pt-5 sm:p-6 sm:pb-4">
                            <label className="font-medium text-gray-800">Title</label>
                            <input onChange={onChangeHandler} value={taskData.title} type="text" name='title' className="w-full outline-none rounded bg-gray-200 p-2 mt-2 mb-3" />
                            <label className="font-medium text-gray-800">Description</label>
                            <textarea onChange={onChangeHandler} value={taskData.description} name='description' type="text" className="w-full outline-none rounded bg-gray-200 p-2 mt-2 mb-3" rows={2} ></textarea>
                            <select value={taskData.assignedTo} onChange={onChangeHandler} name='assignedTo' className="my-2 bg-gray-200 text-gray-800 appearance-none border-none inline-block py-3 pl-1 pr-1 rounded leading-tight">
                                <option value="" className="pt-6">Not Assigned</option>
                                {user && Object.keys(user).map((ele) => {
                                    return <option value={ele} className="pt-6">{ele}</option>
                                })
                                }
                            </select>
                            <div className='flex justify-between w-full'>
                                <div className='flex flex-col'>
                                    <label className="font-medium text-gray-800">Due Date</label>
                                    <input onChange={onChangeHandler} required value={taskData.dueDate} name='dueDate' type='date' className='outline-none rounded bg-gray-200 p-2 mt-2' />
                                </div>
                                <div className='flex flex-col'>
                                    <label className="font-medium text-gray-800">Status</label>
                                    <select value={taskData.status} onChange={onChangeHandler} name='status' className="bg-gray-200 text-gray-800 appearance-none border-none inline-block py-3 pl-2  rounded leading-tight w-24">
                                        <option value={"todo"} className="pt-6">To-Do</option>
                                        <option value={"doing"} className="pt-6">Doing</option>
                                        <option value={"done"} className="pt-6">Done</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {data &&
                            <div className='flex flex-col px-4 pb-4'>
                                <div>
                                    <input onChange={(e) => setComment(e.target.value)} value={comment} type="text" name='comment' className="w-full outline-none rounded bg-gray-200 p-2 mt-2 mb-3" placeholder='Add Comment' />
                                    <button onClick={addCommentHandler} className='py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2'>Add comment</button>
                                </div>
                                {data && data.comment &&
                                    <>
                                        <div className='overflow-y-auto h-32'>
                                            <h1 className='my-2'>Comments</h1>
                                            {
                                                data.comment.map((ele, index) => {
                                                    return <p className='bg-gray-200 rounded-md p-1 my-0.5' key={index}>{ele}</p>;
                                                })
                                            }
                                        </div>
                                    </>
                                }
                            </div>
                        }
                        <div className="px-4 py-3 text-right">
                            <button type="button" className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2" onClick={() => setShowModal(false)}>Cancel</button>
                            {!data ? <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2">{!loading ? "Create" : "Creating"}</button> :
                                <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2">{!loading ? "Update" : "Updating"}</button>}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
