import Head from "next/head";
import styles from "../../styles/Product.module.css";
import products from "../../products.json";
import { useCart } from "../../hooks/use-cart";

export default function Product({ product }) {
  const { id, title, description, image, price } = product; //destructuring our product object we are receiving
  const { addToCart } = useCart(); //enebaling the use of addToCart from our custom hook

  return (
    <div className={styles.container}>
      <Head>
        <title>{title} - Space Jelly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.productImage}>
          <img src={image} alt={title} />
        </div>

        <div>
          <h1>{title}</h1>

          <p className={styles.description}>{description}</p>

          <p className={styles.description}>${price.toFixed(2)}</p>

          <p>
            <button className={styles.button} onClick={() => addToCart({ id })}>
              Buy
            </button>
          </p>
        </div>
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
}

//we are taking in the params from getStaticPaths and we are then
//matching to the product id
export async function getStaticProps({ params }) {
  const product = products.find(({ id }) => id === params.productid);
  return {
    props: {
      product,
    },
  };
}
//setting up the params to feed into our getStaticprops
//to enable dynamic SSR and created individual product
//pages based upon a template
export async function getStaticPaths() {
  const paths = products.map((product) => {
    return {
      params: {
        productid: product.id,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
