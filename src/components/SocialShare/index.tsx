import React, { useState } from "react";

interface SocialShareProps {
  title: string;
  description?: string;
}

/**
 * SocialShare — renders LinkedIn, Facebook, X/Twitter share buttons
 * and a "Copy link" button for the current page.
 */
export default function SocialShare({
  title,
  description = "",
}: SocialShareProps): JSX.Element {
  const [copied, setCopied] = useState(false);

  // Build the share URL dynamically from window.location
  const getUrl = () =>
    typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(getUrl()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const linkedInUrl = () =>
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      getUrl()
    )}`;

  const facebookUrl = () =>
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      getUrl()
    )}`;

  const twitterUrl = () =>
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(getUrl())}`;

  return (
    <div className="social-share-strip">
      <span className="social-share-strip__label">Share</span>

      <a
        href={linkedInUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="social-share-btn social-share-btn--linkedin"
        aria-label="Share on LinkedIn"
      >
        {/* LinkedIn icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.024-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.35V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        LinkedIn
      </a>

      <a
        href={facebookUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="social-share-btn social-share-btn--facebook"
        aria-label="Share on Facebook"
      >
        {/* Facebook icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        Facebook
      </a>

      <a
        href={twitterUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="social-share-btn social-share-btn--twitter"
        aria-label="Share on X / Twitter"
      >
        {/* X / Twitter icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        X / Twitter
      </a>

      <button
        onClick={handleCopy}
        className="social-share-btn social-share-btn--copy"
        aria-label="Copy link to clipboard"
      >
        {copied ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            Copy link
          </>
        )}
      </button>
    </div>
  );
}
