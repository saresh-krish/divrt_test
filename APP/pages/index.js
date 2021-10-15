import styles from '../styles/Home.module.css'
export default function Home() {
  return (
    <div>
      <h1 className={styles.title}>
        divrt.co
      </h1>
      <div className={styles.grid}>
        <a href="/meeting-rooms" className={styles.card}>
          <h2>Meeting Rooms</h2>
        </a>

        <a href="/book-meeting-room" className={styles.card}>
          <h2>Book Meeting Room</h2>
        </a>

        <a href="/available-rooms" className={styles.card} >
          <h2>View available meeting rooms</h2>
        </a>
      </div>

    </div>
  )
}
