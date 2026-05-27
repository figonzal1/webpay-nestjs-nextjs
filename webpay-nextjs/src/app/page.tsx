import { MdLock } from "react-icons/md";
import { PaymentForm } from "./components/PaymentForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#00A19B] mb-4 shadow-lg">
            <MdLock className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">WebPay Plus</h1>
          <p className="text-slate-500 text-sm mt-1">Demo integration · Next.js + NestJS</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6">
            <PaymentForm />
          </div>

          <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-1.5">
            <MdLock className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-400">Secure transaction via Transbank</span>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          Demo template · Do not use in production
        </p>
      </div>
    </main>
  );
}
