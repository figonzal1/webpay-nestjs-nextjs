"use client";
import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const [tx, setTx] = useState({
    token: "",
    url: "",
  });
  const [price, setPrice] = useState(0);

  const createTx = () => {
    const runPost = async () => {
      const result = await axios.post("http://localhost:3000/webpay", {
        amount: price,
      });

      setTx(result.data);
    };

    runPost();
  };

  return (
    <main className="min-h-screen">
      <div className="flex flex-col items-center justify-start p-24">
        <h1 className="font-bold text-2xl text-center">Webpay - Next + Nestjs</h1>

        <h2 className="font-semibold text-xl text-center pb-10">Basic Test</h2>

        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex flex-col gap-1 max-w-xs w-full">
            <label className="text-sm font-medium">Precio</label>
            <input
              type="number"
              placeholder="0.00"
              className="border border-gray-300 rounded-lg px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(event) => setPrice(Number.parseInt(event.target.value))}
            />
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-700 rounded-lg py-3 px-5 font-bold text-white transition-colors cursor-pointer"
            onClick={() => createTx()}
          >
            Iniciar Tx
          </button>

          {tx.token && tx.url && (
            <div
              dangerouslySetInnerHTML={{
                __html: `
                <form method="post" action="${tx.url}">
                  <input type="hidden" name="token_ws" value="${tx.token}" />
                  <button style="background-color: #F97316; border-radius: 0.5rem; padding: 0.75rem 1.25rem;" type="submit">
                    Pagar
                  </button>
                </form>
              `,
              }}
            />
          )}
        </div>
      </div>
    </main>
  );
}
