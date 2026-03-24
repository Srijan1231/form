import type { PostureIssue } from '../types';

const tipsByIssue: Record<string, string> = {
  'Forward Head Posture': 'Chin back 2cm — your head is drifting forward',
  'Rounded Shoulders': 'Open your chest — shoulders are rounding inward',
  'Tight Hip Flexors': 'Tuck your pelvis — your lower back is arching too much',
};

const defaultTip = 'Great alignment today — maintain this position';

export function getMicroTip(issues: PostureIssue[]): string {
  if (issues.length === 0) return defaultTip;
  const primaryIssue = issues[0];
  return tipsByIssue[primaryIssue.name] || defaultTip;
}
