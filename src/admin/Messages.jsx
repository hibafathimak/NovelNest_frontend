import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { deleteMessageAPI, getAllMessagesAPI } from '../services/allAPI';
import { toast } from 'react-toastify';

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    if (sessionStorage.getItem('token') && sessionStorage.getItem('role') === 'admin') {
      const reqHeader = {
        "Authorization": `Bearer ${sessionStorage.getItem('token')}`,
      };
      try {
        const response = await getAllMessagesAPI(reqHeader);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteMessageAPI(id);
      if (response.status === 200) {
        toast.success(response.data);
        fetchMessages();
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl ">
      <h2 className="h2 text-secondary font-semibold mb-6">Messages</h2>
      {messages.length === 0 ? (
        <p className=" text-gray-500">No messages available</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((message) => (
            <li key={message._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-start">
              <div className="message-content flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{message.name}</h3>
                <p className="text-gray-600">{message.email}</p>
                <p className="text-gray-700 mt-2">{message.message}</p>
              </div>
              <button
                onClick={() => handleDelete(message._id)}
                className="text-tertiary hover:text-red-800 transition duration-200"
                title="Delete Message"
              >
                <FaTrashAlt className="text-xl" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Messages;
