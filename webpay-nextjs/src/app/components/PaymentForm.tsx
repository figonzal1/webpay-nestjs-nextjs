"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdCreditCard, MdError } from "react-icons/md";
import { crearTransaccion } from "../actions";

export function PaymentForm() {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [tx, setTx] = useState<{ token: string; url: string } | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  // Auto-submit the hidden form once the token is available
  useEffect(() => {
    if (tx) formRef.current?.submit();
  }, [tx]);

  function handlePay() {
    const parsed = Number.parseInt(amount, 10);
    if (!parsed || parsed <= 0) {
      setError("Ingresa un monto válido mayor a 0.");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await crearTransaccion(parsed);
      if ("error" in result) {
        setError(result.error);
        return;
      }
      setTx(result);
    });
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Hidden form — rendered and auto-submitted once tx is ready */}
      {tx && (
        <form ref={formRef} method="post" action={tx.url} className="hidden">
          <input type="hidden" name="token_ws" value={tx.token} />
        </form>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="amount" className="text-sm font-medium text-slate-700">
          Monto a pagar (CLP)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium select-none">
            $
          </span>
          <input
            id="amount"
            type="number"
            min={1}
            placeholder="0"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError(null);
            }}
            disabled={isPending}
            className="w-full pl-7 pr-3 py-2.5 border border-slate-300 rounded-lg bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A19B] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition"
          />
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2.5">
          <MdError className="w-4 h-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      <button
        onClick={handlePay}
        disabled={isPending || !amount}
        className="flex items-center justify-center gap-2 bg-[#00A19B] hover:bg-[#008f89] text-white font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isPending ? (
          <>
            <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin" />
            Procesando…
          </>
        ) : (
          <>
            <MdCreditCard className="w-4 h-4" />
            Pagar con WebPay
          </>
        )}
      </button>
    </div>
  );
}
