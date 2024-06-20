import { about } from "../utils/constants";
import { styles } from "../utils/styles";

export default function About() {
    return (
        <div className={`${styles.container} ${styles.paddingX} mt-5 pb-5`}>
            {about.map((item) => (
                <div className={``}>
                    <h4 className={`${styles.heading4}text-white`}>{item.title}</h4>
                    <p className="text-lightWhite">{item.text}</p>
                </div>
            ))}
        </div>
    )
}
