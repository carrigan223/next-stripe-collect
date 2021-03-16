import Head from "next/head";
import styles from "../styles/Home.module.css";
import { FaShoppingCart } from "react-icons/fa";

import products from "../products.json"; //JSON list of products
import { useCart } from "../hooks/use-cart"; //we are bringing in our state from react context

const Home = () => {
  //this is a custom hook for maintaining our cart state and functionallity
  //refrence use-cart.js for specifics
  const { subtotal, itemQuantity, addToCart, checkout } = useCart();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Downtown & Brooklyn <a href="https://nextjs.org">Next.js!</a>
          </h1>
        </div>

        <p className={styles.description}>
          <strong>Items:</strong>
          {itemQuantity}
          <br />
          <strong>Total: </strong>${subtotal.toFixed(2)}
          <br />
          <button
            className={`${styles.button} ${styles.cartButton}`}
            onClick={checkout}
          >
            <FaShoppingCart className={styles.cartIcon} />
            Check Out
          </button>{" "}
        </p>

        <ul className={styles.grid}>
          {products.map((product) => {
            const { title, price, image, description, id } = product;
            return (
              <li key={id} className={styles.card}>
                <div>
                  <img src={image} alt={description} />
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <p>${price.toFixed(2)}</p>
                  <p>
                    <button
                      className={styles.button}
                      onClick={() => {
                        addToCart({
                          id,
                        });
                      }}
                    >
                      Add To Cart
                    </button>
                  </p>
                </div>
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
