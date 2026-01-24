import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import JoinNewsLetter from "../components/common/JoinNewsLetter";
import { AnimatePresence } from "motion/react";
import WhatsAppChatIcon from "../components/common/WhatsAppChatIcon";
import TopBar from "../components/common/TopBar";
import GoogleTranslate from "../components/common/GoogleTranslate";
function MainLayout() {
    // When This Public Route Mount Then Render JoinNewsLetter Component

    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            <GoogleTranslate />
            <Header />

            <main className="flex-1 overflow-x-hidden  place-content-center  overflow-y-auto ">
                <Outlet />
            </main>

            <Footer />
            <AnimatePresence>
                <JoinNewsLetter />
            </AnimatePresence>
            <WhatsAppChatIcon
                phoneNumber={919918022212}
                message={
                    "Hello Team Himalaya Carpets, I hope you're doing well. I would like to get in touch regarding your services."
                }
            />
        </div>
    );
}

export default MainLayout;
