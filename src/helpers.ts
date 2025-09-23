export function isGoogleVideoRequest(input: string | URL): boolean {
  const url = input.toString();

  const urlPart = url.split('?')[0];
  const queryPart = url.split('?')[1] || '';

  if (urlPart.endsWith('/videoplayback')) {
    const params = new URLSearchParams(queryPart);
    if (params.get('source') === 'youtube' || params.has('sabr') || params.has('lsig') || params.has('expire')) {
      return true;
    }
  } else if (urlPart.includes('/videoplayback/')) { // For live content, post-live, etc.
    const pathParts = urlPart.split('/');    return [ 'videoplayback', 'sabr', 'lsig', 'expire' ].some((part) => pathParts.includes(part));
  } else if (urlPart.includes('/initplayback')) {
    const params = new URLSearchParams(queryPart);
    return params.has('id') || params.has('oeis') || params.has('oavd') || params.has('expire');
  }

  return false;
}

export function getPalette() {
  let dark = false;

  try {
    dark = typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch { dark = false; }

  if (dark) {
    return {
      headerBg: '#1e3a8a',
      headerFg: '#f1f5f9',
      payload: '#60a5fa',
      section: '#34d399',
      part: '#10b981',
      mediaGroupBg: '#78350f',
      mediaGroupBadgeBg: '#f59e0b',
      mediaGroupBadgeFg: '#1f2937',
      mediaPart: '#fbbf24',
      subtle: '#64748b',
      error: '#f87171'
    };
  }

  return {
    headerBg: '#e0f2fe',
    headerFg: '#0f172a',
    payload: '#075985',
    section: '#047857',
    part: '#036666',
    mediaGroupBg: '#fff7ed',
    mediaGroupBadgeBg: '#fbbf24',
    mediaGroupBadgeFg: '#3f2d0c',
    mediaPart: '#c2410c',
    subtle: '#475569',
    error: '#b91c1c'
  };
}

export function logSeparator(colors:  ReturnType<typeof getPalette>, label: string): void {
  const line = '─'.repeat(34);
  if (label) {
    console.log(`%c${line} ${label} ${line}`, `color:${colors.subtle};font-weight:400;font-size:11px;`);
  } else {
    console.log(`%c${line}`, `color:${colors.subtle};font-weight:400;font-size:11px;`);
  }
}

export function formatSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = [ 'Bytes', 'kB', 'MB' ];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}