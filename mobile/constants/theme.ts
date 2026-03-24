export const COLORS = {
  background: '#0A0A0A',
  textPrimary: '#F4F1E8',
  textSecondary: '#585858',
  surface: '#141414',
  border: '#242424',
  red: '#C8302A',
  green: '#2DCC6F',
  amber: '#FFB400',
} as const;

export const FONTS = {
  heading: 'BebasNeue_400Regular',
  mono: 'DMMono_400Regular',
} as const;

export const SEVERITY_COLORS = {
  SEVERE: COLORS.red,
  MODERATE: COLORS.amber,
  MILD: COLORS.green,
} as const;
