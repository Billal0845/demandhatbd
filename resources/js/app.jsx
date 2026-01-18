import { createInertiaApp, router } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import NProgress from "nprogress";
import ReactPixel from "react-facebook-pixel"; // <--- 1. Import the library here

import "@fontsource/delius";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";

// --- Event Listeners ---

// Existing NProgress listeners
router.on("start", () => NProgress.start());
router.on("finish", () => NProgress.done());

// <--- 2. Add this listener for SPA Navigation
// This triggers a 'PageView' event every time the user clicks a link to a new page
router.on("navigate", () => {
    ReactPixel.pageView();
});

createInertiaApp({
    progress: {
        showSpinner: false,
        color: "#29d",
        includeCSS: true,
        delay: 0,
    },
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },

    setup({ el, App, props }) {
        // <--- 3. Initialize the Pixel
        // This runs once when the website first loads
        const options = {
            autoConfig: true,
            debug: false,
        };

        // We use an environment variable so you don't hardcode the ID in the code
        // If the ID exists in your .env file, it initializes
        const pixelId = import.meta.env.VITE_FACEBOOK_PIXEL_ID;

        if (pixelId) {
            ReactPixel.init(pixelId, null, options);
            ReactPixel.pageView(); // Tracks the very first page load
        }

        createRoot(el).render(<App {...props} />);
    },
});
