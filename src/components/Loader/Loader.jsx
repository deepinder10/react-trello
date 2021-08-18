import { ReactComponent as Spinner } from "assets/images/spinner.svg";
import styles from './Loader.module.scss';

const Loader = () => {
	return (
		<div className={styles.loader}>
			<Spinner />
		</div>
	);
};

export default Loader;
