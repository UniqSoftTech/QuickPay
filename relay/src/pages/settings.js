import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';

export default function Settings() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Relay - Settings</title>
        <meta name="description" content="User settings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Settings</h1>
        <form>
          <label>
            Notification Preferences:
            <select>
              <option value="all">All Notifications</option>
              <option value="important">Important Only</option>
              <option value="none">None</option>
            </select>
          </label>
          <button type="submit">Save Settings</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
