import { styles } from "../utils/styles";
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const location = useLocation()
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const isChat = location.pathname === '/chat'
    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login');
    };
    const handlechat = () => {
        isChat ? navigate("/") : navigate('/chat')
    }
    if (!user) {
        navigate('/login')
    }
    const adimnCheck = user?.email === "nursherzil@gmail.com"
    const handlePost = () => {
        navigate("/post")
    }
    const goHome = () => {
        navigate('/')
    }
    return (
        <>
            <div className={`${styles.container} ${styles.paddingX} ${styles.felxBetween} pb-[10px] `}>
                <p onClick={goHome} className={` text-white `}> <span className={`${styles.heading3} text-white logo text-gradient`}>Nismo</span> by <span><a className="text-gradient" href="https://t.me/nismo_xn">xusanov</a></span> </p>

                <div className={`text-white flex gap-2`}>
                    {adimnCheck ? <button className='text-white text-gradient logout' onClick={handlePost}>post</button> : null}
                    <button onClick={handlechat} className={`text-gradient logout`}>{isChat ? "Home" : "Chat"}</button>
                    <button className={`text-gradient logout`} onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </>

    )
}
export default Navbar