import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../hooks/use-cart";
import styles from "./Nav.module.css";
import Link from "next/link";

const Nav = () => {
  const { subtotal } = useCart();
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a className={styles.navTitle}>Crowes Cards</a>
      </Link>
      <p className={styles.navCart}>
        <button>
          <FaShoppingCart /> $ {subtotal.toFixed(2)}
        </button>
      </p>
    </nav>
  );
};

export default Nav;
