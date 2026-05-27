"use server";

type TxSuccess = { token: string; url: string };
type TxError = { error: string };

export async function createTransaction(amount: number): Promise<TxSuccess | TxError> {
  if (!Number.isFinite(amount) || amount <= 0) {
    return { error: "Invalid amount." };
  }

  const apiUrl = process.env.API_URL ?? "http://localhost:3000";

  try {
    const res = await fetch(`${apiUrl}/webpay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
      cache: "no-store",
    });

    if (!res.ok) {
      return { error: `Backend error (${res.status}).` };
    }

    return (await res.json()) as TxSuccess;
  } catch {
    return { error: "Could not connect to the backend. Make sure NestJS is running." };
  }
}