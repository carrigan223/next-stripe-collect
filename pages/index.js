import Head from "next/head";
import styles from "../styles/Home.module.css";

import products from "../products.json";

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Downtown & Brooklyn <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <ul className={styles.grid}>
          {products.map((product) => {
            const { title, price, image, description, id } = product;
            return (
              <li key={id} className={styles.card}>
                <a href="https://nextjs.org/docs">
                  <img src={image} alt={description} />
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <p>{price}</p>
                </a>
              </li>
            );
          })}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
};

export default Home;
