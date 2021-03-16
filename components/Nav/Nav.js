import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../hooks/use-cart";
import styles from "./Nav.module.css";

const Nav = () => {
  const { subtotal } = useCart();
  return (
    <nav className={styles.nav}>
      <p className={styles.navTitle}>Crowes Cards</p>
      <p className={styles.navCart}>
        <button>
          <FaShoppingCart /> $ {subtotal.toFixed(2)}
        </button>
      </p>
    </nav>
  );
};

export default Nav;
