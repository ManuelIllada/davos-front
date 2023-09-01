import React from "react";

const ReConfirmationModal = ({ open, onCancel, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onCancel}
      ></div>
      <div className="relative bg-white rounded-lg shadow-lg p-6">
        <p className="text-lg font-semibold mb-4">
          ¿Estás seguro que deseas eliminar los datos?
        </p>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="text-gray-600 hover:text-gray-800 mr-4"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="text-red-500 hover:text-red-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReConfirmationModal;
