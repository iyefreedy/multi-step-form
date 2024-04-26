import { useState } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const Modal = ({ isOpen, onClose, onDelete }: ModalProps) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        setIsDeleting(true);

        setTimeout(() => {
            setIsDeleting(false);
            onDelete();
            onClose();
        }, 1000);
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
                    <div
                        className="fixed inset-0 transition-opacity"
                        aria-hidden="true"
                    >
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>

                    <div className="relative z-50 w-96 mx-auto bg-white rounded shadow-lg">
                        <div className="flex items-center justify-between px-4 py-3 bg-gray-200 border-b border-gray-300 rounded-t">
                            <h2 className="text-lg font-semibold">Confirm</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-600 focus:outline-none"
                            >
                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="p-4">
                            <p className="text-sm">
                                Are you sure want to delete this item?
                            </p>
                        </div>

                        <div className="flex items-center justify-end px-4 py-3 bg-gray-200 border-t border-gray-300 rounded-b">
                            <button
                                onClick={handleDelete}
                                className={`px-4 py-2 mr-2 bg-red-500 text-white rounded focus:outline-none ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-400 text-white rounded focus:outline-none"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
