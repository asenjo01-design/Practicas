interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  nombre: string;
  email: string;
  total: string;
}

export default function SuccessModal({ isOpen, onClose, nombre, email, total }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform animate-fade-in">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-center">
          <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white">¡Compra Exitosa!</h2>
        </div>

        <div className="p-8 text-center">
          <p className="text-gray-700 mb-2">
            Gracias por tu compra, <strong className="text-purple-600">{nombre}</strong>
          </p>
          <p className="text-gray-600 text-sm mb-4">
            Hemos enviado la confirmación a:
          </p>
          <p className="text-purple-600 font-semibold mb-6">{email}</p>

          <div className="bg-purple-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Total pagado:</p>
            <p className="text-2xl font-bold text-purple-600">{total}</p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
