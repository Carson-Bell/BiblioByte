import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <p style={styles.message}>
          Oops! The page you are looking for does not exist.
        </p>
        <Link href="/">
          <button style={styles.button}>Go Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url("/images/background.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '20px 40px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    maxWidth: '500px',
    width: '90%',
  },
  heading: {
    fontSize: '3rem',
    color: '#343a40',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.5rem',
    color: '#6c757d',
    marginBottom: '2rem',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#0b4f4a',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};