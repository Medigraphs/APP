import { MdMailOutline } from "react-icons/md";
import styles from './styles.module.css'

export default () => {
    return (
        <div className="relative">
            <MdMailOutline size='1.4rem' className={styles.mailIcon}></MdMailOutline>
            <input
                type="text"
                placeholder="E-mail"
                className={styles.mailInput}
            />
        </div>
    )
}