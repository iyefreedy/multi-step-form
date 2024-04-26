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
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none">
                    <div
                        className="fixed inset-0 transition-opacity"
                        aria-hidden="true"
                    >
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>

                    <div className="relative z-50 mx-auto w-96 rounded bg-white shadow-lg">
                        <div className="flex items-center justify-between rounded-t border-b border-gray-300 bg-gray-200 px-4 py-3">
                            <h2 className="text-lg font-semibold">Confirm</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-600 focus:outline-none"
                            >
                                <svg
                                    className="h-5 w-5"
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

                        <div className="flex items-center justify-end rounded-b border-t border-gray-300 bg-gray-200 px-4 py-3">
                            <button
                                onClick={handleDelete}
                                className={`mr-2 rounded bg-red-500 px-4 py-2 text-white focus:outline-none ${isDeleting ? "cursor-not-allowed opacity-50" : ""}`}
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                            <button
                                onClick={onClose}
                                className="rounded bg-gray-400 px-4 py-2 text-white focus:outline-none"
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
