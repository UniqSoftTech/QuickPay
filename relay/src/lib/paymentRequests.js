export async function getPaymentRequest() {
    const res = await fetch('/api/payment-request');
    const data = await res.json();
    return data;
  }
  