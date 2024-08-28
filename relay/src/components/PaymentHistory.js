import styles from '../styles/Home.module.css';

export default function PaymentHistory({ transactions }) {
  return (
    <div className={styles.paymentHistory}>
      <h3>Payment History</h3>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.amount} to {transaction.recipient} on {transaction.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
