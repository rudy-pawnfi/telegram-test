import React, { createContext, useContext, useState } from 'react';

// 创建 Alert Context
const AlertContext = createContext();

// 创建一个 Alert Provider 组件
export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({
        message: '',
        type: 'info',
        visible: false,
    });

    // 触发提示框
    const showAlert = (message, type = 'info') => {
        setAlert({ message, type, visible: true });
        // 自动关闭提示框
        setTimeout(() => setAlert({ ...alert, visible: false }), 3000); // 3秒后自动隐藏
    };

    // 隐藏提示框
    const hideAlert = () => setAlert({ ...alert, visible: false });

    return (
        <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
            {children}
            <Alert message={alert.message} type={alert.type} visible={alert.visible} />
        </AlertContext.Provider>
    );
};

// 自定义 Hook 方便使用
export const useAlert = () => useContext(AlertContext);

// Alert 组件
const Alert = ({ message, type, visible }) => {
    if (!visible) return null;

    const getAlertStyle = (type) => {
        switch (type) {
            case 'success':
                return styles.success;
            case 'error':
                return styles.error;
            case 'warning':
                return styles.warning;
            case 'info':
                return styles.info;
            default:
                return {};
        }
    };

    return (
        <div className="flex justify_center fs_3" style={{ ...styles.alertBox, ...getAlertStyle(type) }}>
            {message}
        </div>
    );
};

// 样式定义
const styles = {
    alertBox: {
        position: 'fixed',
        top: '12px',
        left: '0px',
        right: '0px',
        padding: '8px',
        borderRadius: '4px',
        fontWeight: 'bold',
        zIndex: 1000,
        color: '#fff',
    },
    success: {
        backgroundColor: '#28a745',
    },
    error: {
        backgroundColor: '#dc3545',
    },
    warning: {
        backgroundColor: '#ffc107',
        color: '#212529',
    },
    info: {
        backgroundColor: '#17a2b8',
    },
};
