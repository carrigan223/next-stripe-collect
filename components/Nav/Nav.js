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
        <Link href="/cart">
          <a>
            <FaShoppingCart /> $ {subtotal.toFixed(2)}
          </a>
        </Link>
      </p>
    </nav>
  );
};

export default Nav;
