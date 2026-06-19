export function StackToolIcon({ id }) {
  if (id === 'framer') {
    return (
      <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M2 14L8 2L14 14H10L8 10L6 14H2Z" fill="#0099FF" />
      </svg>
    )
  }

  if (id === 'figma') {
    return (
      <svg width="16" height="24" viewBox="0 0 14 20" fill="none" aria-hidden="true">
        <path d="M7 20C10.866 20 14 16.866 14 13C14 11.343 13.343 10 12 10H7V20Z" fill="#0ACF83" />
        <path d="M0 13C0 16.866 3.134 20 7 20V10H2C0.657 10 0 11.343 0 13Z" fill="#A259FF" />
        <path d="M0 7C0 3.134 3.134 0 7 0C10.866 0 14 3.134 14 7C14 10.866 10.866 14 7 14H0V7Z" fill="#F24E1E" />
        <path d="M0 7H7C8.657 7 10 5.657 10 4C10 2.343 8.657 1 7 1C5.343 1 4 2.343 4 4V7H0Z" fill="#FF7262" />
        <path d="M0 7V10H4C5.657 10 7 8.657 7 7C7 5.343 5.657 4 4 4H0V7Z" fill="#1ABCFE" />
      </svg>
    )
  }

  if (id === 'notion') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4.459 3.488C6.22 2.62 8.06 2 10 2h4.2c1.94 0 3.78.62 5.54 1.488.36.18.64.52.64.92v14.184c0 .62-.5 1.12-1.12 1.12-.22 0-.44-.06-.62-.18-1.64-.98-3.36-1.58-5.14-1.58H9.88c-1.78 0-3.5.6-5.14 1.58-.18.12-.4.18-.62.18-.62 0-1.12-.5-1.12-1.12V4.408c0-.4.28-.74.64-.92Z"
          fill="#fff"
          stroke="#0F0F0F"
          strokeWidth="1.2"
        />
        <path
          d="M8.2 7.4h7.6M8.2 10.8h7.6M8.2 14.2h5.2"
          stroke="#0F0F0F"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M16.4 4.2c1.2.5 1.8 1.2 1.8 2.4v10.8c0 1.2-.6 1.9-1.8 2.4"
          stroke="#0F0F0F"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (id === 'jira') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M11.53 2.25 2.25 11.53a1.77 1.77 0 0 0 0 2.5l9.28 9.28a1.77 1.77 0 0 0 2.5 0l9.28-9.28a1.77 1.77 0 0 0 0-2.5L14.03 2.25a1.77 1.77 0 0 0-2.5 0Z"
          fill="#2684FF"
        />
        <path
          d="M11.53 6.75 6.75 11.53l4.78 4.78 4.78-4.78-4.78-4.78Z"
          fill="#0052CC"
        />
      </svg>
    )
  }

  if (id === 'uizard') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" fill="#7C3AED" />
        <path
          d="M8.5 16.5 12 8l3.5 8.5"
          stroke="#fff"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9.8 13.5h4.4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="17" cy="7" r="1.2" fill="#FDE68A" />
      </svg>
    )
  }

  if (id === 'slack') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5.5 14.25a1.75 1.75 0 1 0 0-3.5H7.5V9.25a1.75 1.75 0 1 0 3.5 0V10.75h1.25a1.75 1.75 0 1 0 0 3.5H11v1.25a1.75 1.75 0 1 0-3.5 0V14.25H5.5Z"
          fill="#E01E5A"
        />
        <path
          d="M9.25 5.5a1.75 1.75 0 1 0 3.5 0V7.5h1.25a1.75 1.75 0 1 0 0 3.5H10.75v1.25a1.75 1.75 0 1 0-3.5 0V9.25H9.25V5.5Z"
          fill="#36C5F0"
        />
        <path
          d="M18.5 9.75a1.75 1.75 0 1 0 0 3.5H16.5v1.25a1.75 1.75 0 1 0-3.5 0V13.25H11.75a1.75 1.75 0 1 0 0-3.5h1.25V8.5a1.75 1.75 0 1 0 3.5 0V9.75h1.5Z"
          fill="#2EB67D"
        />
        <path
          d="M14.75 18.5a1.75 1.75 0 1 0-3.5 0V16.5H10a1.75 1.75 0 1 0 0-3.5h1.25v-1.25a1.75 1.75 0 1 0 3.5 0V13h1.25a1.75 1.75 0 1 0 0 3.5h-1.25v1.25Z"
          fill="#ECB22E"
        />
      </svg>
    )
  }

  if (id === 'chatgpt') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3.5c1.9 0 3.5.8 4.4 2.1.8-.3 1.7-.4 2.6-.1 1.5.5 2.6 1.8 2.8 3.4.9.4 1.6 1.1 2 2 .6 1.3.4 2.9-.5 4-.3.4-.7.7-1.1 1 .1.9-.1 1.8-.6 2.6-.9 1.4-2.6 2.1-4.2 1.8-.8.7-1.9 1.1-3 1.1-1.9 0-3.5-.8-4.4-2.1-.8.3-1.7.4-2.6.1-1.5-.5-2.6-1.8-2.8-3.4-.9-.4-1.6-1.1-2-2-.6-1.3-.4-2.9.5-4 .3-.4.7-.7 1.1-1-.1-.9.1-1.8.6-2.6.9-1.4 2.6-2.1 4.2-1.8.8-.7 1.9-1.1 3-1.1Z"
          fill="#10A37F"
        />
        <path
          d="M12 8.2c1.4 0 2.4.7 2.9 1.7.5-.2 1-.3 1.5-.1.9.3 1.5 1.1 1.6 2 .5.2.9.6 1.1 1.1.3.8.2 1.7-.3 2.4-.2.2-.4.4-.7.5 0 .5-.1 1-.4 1.4-.5.8-1.5 1.2-2.5 1-.5.4-1.1.6-1.8.6-1.4 0-2.4-.7-2.9-1.7-.5.2-1 .3-1.5.1-.9-.3-1.5-1.1-1.6-2-.5-.2-.9-.6-1.1-1.1-.3-.8-.2-1.7.3-2.4.2-.2.4-.4.7-.5 0-.5.1-1 .4-1.4.5-.8 1.5-1.2 2.5-1 .5-.4 1.1-.6 1.8-.6Z"
          fill="#fff"
        />
      </svg>
    )
  }

  if (id === 'shots') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="3.5" fill="#111827" />
        <circle cx="9.2" cy="11" r="2.1" fill="#fff" />
        <path
          d="M3 15.2 7.8 10.4l3.2 3.1 4.1-3.8L21 14.8V17c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-1.8Z"
          fill="#6366F1"
        />
      </svg>
    )
  }

  return null
}
