import styles from '../styles/Home.module.css';

export default function PaymentRequest({ request, onAccept }) {
  return (
    <div className={styles.paymentRequest}>
      <h3>New Payment Request</h3>
      <p>Amount: ${request.amount}</p>
      <p>From: {request.from}</p>
      <button onClick={onAccept}>Accept</button>
    </div>
  );
}
