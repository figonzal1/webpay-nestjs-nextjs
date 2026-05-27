import Link from "next/link";
import { MdArrowBack, MdCheckCircle } from "react-icons/md";

export default function Success() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <MdCheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Payment successful</h1>
        <p className="text-slate-500 mb-8">
          Your payment was successfully processed by Transbank WebPay Plus.
        </p>

        <div className="bg-white border border-green-200 rounded-2xl px-6 py-4 mb-6 shadow-sm">
          <p className="text-sm text-green-700 font-medium">Transbank payment status</p>
          <p className="text-xs text-slate-400 mt-1">Transaction approved</p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#00A19B] hover:bg-[#008f89] text-white font-semibold py-2.5 px-6 rounded-lg transition-colors"
        >
          <MdArrowBack className="w-4 h-4" />
          Back to home
        </Link>
      </div>
    </main>
  );
}
