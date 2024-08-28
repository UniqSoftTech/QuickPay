import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PaymentRequest from '../components/PaymentRequest';
import PaymentHistory from '../components/PaymentHistory';
import { getPaymentRequest } from '../lib/paymentRequests';

export default function Home() {
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchPaymentRequest = async () => {
      const request = await getPaymentRequest();
      setPaymentRequest(request);
    };
    fetchPaymentRequest();
  }, []);

  const handleAccept = () => {
    setTransactions([
      ...transactions,
      {
        amount: paymentRequest.amount,
        recipient: paymentRequest.from,
        date: new Date().toLocaleDateString(),
      },
    ]);
    setPaymentRequest(null);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Relay - Home</title>
        <meta name="description" content="Relay payment app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Relay</h1>
        {paymentRequest && (
          <PaymentRequest request={paymentRequest} onAccept={handleAccept} />
        )}
        <PaymentHistory transactions={transactions} />
      </main>
      <Footer />
    </div>
  );
}
