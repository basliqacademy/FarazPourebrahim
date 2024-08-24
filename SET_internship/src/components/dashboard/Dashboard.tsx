import React, { useState, useEffect } from 'react';
// import NewTask from './NewTask';
// import History from './History';
// import Profile from './Profile';
import styles from './Dashboard.module.css';
// import { TimerProvider } from './TimerContext';
import { useNavigate } from 'react-router-dom';
import Connect from "../../api/connect";
import {BASE_URL} from "../../api/endpoints";


const Dashboard = () => {
    const [activeElement, setActiveElement] = useState('NewTask');
    const navigate = useNavigate();

    useEffect(() => {

            Connect.configure(BASE_URL);
            async function handleConnection() {
                const token = localStorage.getItem('authentication-token');
                const data = await Connect.get('api/v1/authenticated/me',{headers: {
                        'Authorization': `Bearer ${token}`,
                    },});
                console.log(data);
            }

            handleConnection();

        }
        ,[]
    )



    const handleProfileClick = () => {
        //navigate("/profile");
    };

    return (
        // <TimerProvider>
            <div className={styles.dashboard}>
                <div className={styles.header}>
                    <div onClick={handleProfileClick} className={styles['profileContainer']}>
                        <img
                            src="https://cdn.easyfrontend.com/pictures/icons/user.png"
                            alt="Profile"
                            className={styles.profileImage}
                        />
                        <span className={styles.welcome}>{'نام کاربر'}</span>
                    </div>
                    <span className={styles.title}>داشبورد</span>
                    {/*<img src="./logo.png" alt="Logo" className={styles.logo} />*/}
                </div>
                <div className={styles.sidebar}>
                    <div>
                        <div
                            className={`${styles.sidebarItem} ${activeElement === 'NewTask' ? styles.active : ''}`}
                            onClick={() => setActiveElement('NewTask')}
                        >
                            تسک جدید
                        </div>
                        <div
                            className={`${styles.sidebarItem} ${activeElement === 'History' ? styles.active : ''}`}
                            onClick={() => setActiveElement('History')}
                        >
                            تاریخچه تسک ها
                        </div>
                    </div>
                    <div
                        className={`${styles.sidebarItem} ${activeElement === 'Profile' ? styles.active : ''}`}
                        //onClick={() => navigate("/profile", {state : {user}})}
                    >
                        تنظیمات پروفایل
                    </div>
                </div>
                <div className={styles.content}>
                    {/*{activeElement === 'NewTask' && <NewTask />}*/}
                    {/*{activeElement === 'History' && <History />}*/}
                </div>
            </div>
        // </TimerProvider>
    );
};

export default Dashboard;
