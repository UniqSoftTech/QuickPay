import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';

export default function Profile() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Relay - Profile</title>
        <meta name="description" content="User profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>User Profile</h1>
        <p>Name: John Doe</p>
        <p>Email: john@example.com</p>
        <p>Balance: $1000</p>
      </main>
      <Footer />
    </div>
  );
}
