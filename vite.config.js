import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    // server: {
    //     host: "192.168.1.26", // ✅ your local IP or use true to bind to all
    //     port: 5555, // ✅ custom port
    // },
    plugins: [react(

    ), tailwindcss()],
});
