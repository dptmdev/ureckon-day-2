import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LiaDesktopSolid, LiaSpiderSolid, LiaBugSolid, LiaCogSolid, LiaSignOutAltSolid } from "react-icons/lia";

const AppSidebar = () => {
    const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);

    const navigate = useNavigate();

    const toggleSettingsMenu = () => {
        setIsSettingsExpanded(!isSettingsExpanded);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("token_expire_on");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div className="border-right" id="sidebar-wrapper">
            <div className="sidebar-menu">

                <div className="sidebar-menu-item">
                    <LiaDesktopSolid />
                    <Link to="/dashboard">Dashboard</Link>
                </div>

                <div className="sidebar-menu-item">
                    <LiaSpiderSolid />
                    <Link to="/incidents">Incidents</Link>
                </div>

                <div className="sidebar-menu-item">
                    <LiaBugSolid />
                    <Link to="/vulnerabilities">Vulnerabilities</Link>
                </div>

                <div className="sidebar-menu-item" onClick={toggleSettingsMenu}>
                    <LiaCogSolid />
                    <a href="#">
                        Settings
                    </a>
                </div>

                {isSettingsExpanded && (
                    <div className="sidebar-sub-menu expand">
                        <div className="sidebar-menu-item">
                            <Link to="/settings/organisations">Organisations</Link>
                        </div>
                        <div className="sidebar-menu-item">
                            <Link to="/settings/departments">Departments</Link>
                        </div>
                        <div className="sidebar-menu-item">
                            <Link to="/settings/districts">Districts</Link>
                        </div>
                        <div className="sidebar-menu-item">
                            <Link to="settings/users">Users</Link>
                        </div>
                    </div>
                )}

                <div className="sidebar-menu-item">
                    <LiaSignOutAltSolid />
                    <a href="#" onClick={logout}>Logout</a>
                </div>

            </div>
        </div>
    );
};

export default AppSidebar;