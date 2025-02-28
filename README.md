
# ShadCN UI and Astro 

This project uses the [ShadCN UI](https://ui.shadcn.com) component library, which is an unusual choice for an Astro project. ShadCN UI is built with Radix UI and Tailwind CSS.

While Astro doesn't officially support Tailwind CSS, this project integrates it to take advantage of the pre-built ShadCN UI components. This allows for rapid UI development while still leveraging Astro's performance optimizations.

Some key things to note about using ShadCN UI with Astro:
- Tailwind CSS is configured in `tailwind.config.js` 
- The ShadCN UI components are imported and used in Astro components
- Some custom Tailwind CSS styles may be needed to augment the ShadCN UI components
- Be mindful of Tailwind class usage to avoid unnecessary CSS bloat in production
