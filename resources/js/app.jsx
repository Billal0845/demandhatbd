import { createInertiaApp, router } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import NProgress from "nprogress";
import "@fontsource/delius";
import "@fontsource/poppins/400.css"; // Regular text
import "@fontsource/poppins/500.css"; // Medium (optional)
import "@fontsource/poppins/700.css"; // Bold headings

router.on("start", () => NProgress.start());
router.on("finish", () => NProgress.done());

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
        createRoot(el).render(<App {...props} />);
    },
});
