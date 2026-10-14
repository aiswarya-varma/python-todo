import { useState } from 'react';

const Modal = ({
  title,
  placeholder,
  closeModal,
  submit
}: {
  title: string;
  placeholder: string;
  closeModal: () => void;
  submit: (task: string) => void;
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit(inputValue);
    setInputValue('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">
          {title}
          <button onClick={closeModal} className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
            Close
          </button>
        </h2>
        <input
          type="text"
          placeholder={placeholder}
          className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button 
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default Modal;