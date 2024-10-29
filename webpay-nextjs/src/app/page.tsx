"use client";
import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
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
          <Input
            type="number"
            placeholder="0.00"
            label="Precio"
            className="max-w-xs"
            onChange={(event) => setPrice(Number.parseInt(event.target.value))}
          />

          <Button
            className="bg-blue-600 rounded-lg py-3 px-5 font-bold text-white"
            onClick={() => createTx()}
          >
            Iniciar Tx
          </Button>

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
