import { CHATBOT_CONFIG } from '../config';

/**
 * Theme interface for the chatbot
 */
export interface ChatbotTheme {
    colors: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
        lightText: string;
        error: string;
    };
    animation: {
        duration: number;
        easing: string;
    };
}

/**
 * Get the default theme from the config
 */
export function getDefaultTheme(): ChatbotTheme {
    return {
        colors: CHATBOT_CONFIG.ui.colors,
        animation: CHATBOT_CONFIG.ui.animation,
    };
}

/**
 * Create CSS variables from the theme
 */
export function createThemeVariables(theme: ChatbotTheme = getDefaultTheme()): Record<string, string> {
    return {
        '--chatbot-color-primary': theme.colors.primary,
        '--chatbot-color-secondary': theme.colors.secondary,
        '--chatbot-color-background': theme.colors.background,
        '--chatbot-color-text': theme.colors.text,
        '--chatbot-color-light-text': theme.colors.lightText,
        '--chatbot-color-error': theme.colors.error,
        '--chatbot-animation-duration': `${theme.animation.duration}ms`,
        '--chatbot-animation-easing': theme.animation.easing,
    };
}

/**
 * Apply theme variables to an element
 */
export function applyTheme(element: HTMLElement, theme: ChatbotTheme = getDefaultTheme()): void {
    const variables = createThemeVariables(theme);

    Object.entries(variables).forEach(([key, value]) => {
        element.style.setProperty(key, value);
    });
}

/**
 * Get CSS for the theme
 */
export function getThemeCSS(theme: ChatbotTheme = getDefaultTheme()): string {
    return `
    .chatbot-widget {
      --chatbot-color-primary: ${theme.colors.primary};
      --chatbot-color-secondary: ${theme.colors.secondary};
      --chatbot-color-background: ${theme.colors.background};
      --chatbot-color-text: ${theme.colors.text};
      --chatbot-color-light-text: ${theme.colors.lightText};
      --chatbot-color-error: ${theme.colors.error};
      --chatbot-animation-duration: ${theme.animation.duration}ms;
      --chatbot-animation-easing: ${theme.animation.easing};
    }
  `;
}

/**
 * Check if the user prefers dark mode
 */
export function prefersDarkMode(): boolean {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Get a theme based on the user's color scheme preference
 */
export function getThemeByColorScheme(): ChatbotTheme {
    const defaultTheme = getDefaultTheme();

    if (prefersDarkMode()) {
        // Dark mode theme
        return {
            ...defaultTheme,
            colors: {
                ...defaultTheme.colors,
                background: '#1f2937',
                text: '#f3f4f6',
                lightText: '#d1d5db',
            },
        };
    }

    // Light mode theme (default)
    return defaultTheme;
} 