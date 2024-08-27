import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import Connect from "../../api/connect";
import {UserProvider, useUser} from "../../context/UserContext";
import API from "../../api/api";

const Dashboard = () => {
    const [activeElement, setActiveElement] = useState('NewTask');

    const handleProfileClick = () => {
        //navigate("/profile");
    };

    return (
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
                    // onClick={() => navigate("/profile", {state: {user}})}
                >
                    تنظیمات پروفایل
                </div>
            </div>
            <div className={styles.content}>
                {/* {activeElement === 'NewTask' && <NewTask />} */}
                {/* {activeElement === 'History' && <History />} */}
            </div>
        </div>
    );
};

export default function DashboardWithProvider() {
    return (
        <UserProvider>
            <Dashboard />
        </UserProvider>
    );
}
