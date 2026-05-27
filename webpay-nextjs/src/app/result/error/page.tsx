import Link from "next/link";
import { MdArrowBack, MdCancel } from "react-icons/md";

export default function PaymentError() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <MdCancel className="w-10 h-10 text-red-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Pago fallido</h1>
        <p className="text-slate-500 mb-8">
          Tu pago no pudo ser procesado. Puedes intentarlo nuevamente.
        </p>

        <div className="bg-white border border-red-200 rounded-2xl px-6 py-4 mb-6 shadow-sm">
          <p className="text-sm text-red-700 font-medium">Estado del pago Transbank</p>
          <p className="text-xs text-slate-400 mt-1">La transacción fue rechazada o cancelada</p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors"
        >
          <MdArrowBack className="w-4 h-4" />
          Intentar de nuevo
        </Link>
      </div>
    </main>
  );
}
