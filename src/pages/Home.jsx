import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import FeaturedInfo from '../components/FeaturedInfo';
import WidgetSm from '../components/WidgetSm';
import WidgetLg from '../components/WidgetLg';
import { Link } from "react-router-dom";

const Home = () => {
    const [isSettingOpen, setIsSettingopen] = useState(false);
    const ToggleSetting = () => {

        if (isSettingOpen === true) {
            setIsSettingopen(false)
        }
        else {
            setIsSettingopen(true);
        }
    }

    return (
        <>
            <div className="container-scroller">
                {/* partial:partials/_navbar.html */}
                <Navbar />
                {/* partial */}
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    {/* partial */}
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className="col-md-12 grid-margin">
                                    <FeaturedInfo />
                                </div>
                            </div>
                            <div className="row">
                                <WidgetSm />
                                <WidgetLg />
                            </div> </div>
                        <Footer />

                    </div>
                    {/* main-panel ends */}
                </div>
                {/* page-body-wrapper ends */}
            </div>


        </>
    )
}

export default Home
