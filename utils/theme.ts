/**
 * Define the theme colors for light and dark modes
 */
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  cardBackground: string;
  text: string;
  secondaryText: string;
  border: string;
  success: string;
  error: string;
  warning: string;
  tint: string;
}

const lightTheme: ThemeColors = {
  primary: '#1E88E5',    // Blue
  secondary: '#757575',  // Gray
  accent: '#FFD700',     // Gold
  background: '#F5F7FA',
  cardBackground: '#FFFFFF',
  text: '#212121',
  secondaryText: '#757575',
  border: '#E0E0E0',
  success: '#4CAF50',    // Green
  error: '#F44336',      // Red
  warning: '#FF9800',    // Orange
  tint: '#1E88E5',       // Primary color as tint
};

const darkTheme: ThemeColors = {
  primary: '#42A5F5',    // Lighter Blue
  secondary: '#9E9E9E',  // Gray
  accent: '#FFD700',     // Gold
  background: '#121212',
  cardBackground: '#1E1E1E',
  text: '#FFFFFF',
  secondaryText: '#AAAAAA',
  border: '#333333',
  success: '#66BB6A',    // Green
  error: '#EF5350',      // Red
  warning: '#FFA726',    // Orange
  tint: '#42A5F5',       // Primary color as tint
};

/**
 * Get theme colors based on color scheme
 */
export const getThemeColors = (scheme: string | null | undefined): ThemeColors => {
  return scheme === 'dark' ? darkTheme : lightTheme;
};