import React from "react";

interface BrandIconProps {
  className?: string;
  size?: number;
}

export function GoogleIcon({ className = "w-6 h-6", size = 24 }: BrandIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function GoogleCalendarIcon({ className = "w-6 h-6", size = 24 }: BrandIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="17" rx="3" fill="#FFFFFF" stroke="#4285F4" strokeWidth="2" />
      <path d="M3 9h18" stroke="#4285F4" strokeWidth="2" />
      <path d="M8 2v4M16 2v4" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" />
      <rect x="7" y="12" width="3" height="3" rx="0.5" fill="#34A853" />
      <rect x="14" y="12" width="3" height="3" rx="0.5" fill="#FBBC05" />
      <rect x="7" y="16" width="3" height="3" rx="0.5" fill="#4285F4" />
      <rect x="14" y="16" width="3" height="3" rx="0.5" fill="#EA4335" />
    </svg>
  );
}

export function GoogleMeetIcon({ className = "w-6 h-6", size = 24 }: BrandIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="12" height="12" rx="2" fill="#00832D" />
      <path d="M15 10l5-3.5v11L15 14v-4z" fill="#00AC47" />
      <path d="M3 8a2 2 0 012-2h10v3H3V8z" fill="#EA4335" />
      <path d="M3 15h12v3H5a2 2 0 01-2-2v-1z" fill="#2684FC" />
      <path d="M12 9h3v6h-3V9z" fill="#FFBA00" />
    </svg>
  );
}

export function OutlookIcon({ className = "w-6 h-6", size = 24 }: BrandIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="12" height="16" rx="2" fill="#0078D4" />
      <path d="M10 4h10a2 2 0 012 2v12a2 2 0 01-2 2H10V4z" fill="#28A8EA" />
      <circle cx="8" cy="12" r="3.5" fill="#FFFFFF" />
      <circle cx="8" cy="12" r="2" fill="#0078D4" />
    </svg>
  );
}

export function ExchangeIcon({ className = "w-6 h-6", size = 24 }: BrandIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="16" rx="3" fill="#0072C6" />
      <path d="M7 8h10M7 12h7M7 16h10" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ZoomIcon({ className = "w-6 h-6", size = 24 }: BrandIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="4" fill="#2D8CFF" />
      <path d="M6 9.5a1.5 1.5 0 011.5-1.5h6a1.5 1.5 0 011.5 1.5v5a1.5 1.5 0 01-1.5 1.5h-6A1.5 1.5 0 016 14.5v-5z" fill="#FFFFFF" />
      <path d="M15 11l4-2.5v7l-4-2.5v-2z" fill="#FFFFFF" />
    </svg>
  );
}

export function StripeIcon({ className = "w-6 h-6", size = 24 }: BrandIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="4" fill="#635BFF" />
      <path
        d="M14.5 10.5c0-.8-.6-1.2-1.6-1.2-1.3 0-2.4.4-3.2.9V8c.9-.4 2.1-.7 3.3-.7 2.4 0 3.8 1.2 3.8 3.2 0 3.1-4.3 2.6-4.3 3.9 0 .9.8 1.2 1.8 1.2 1.4 0 2.7-.6 3.5-1.1v2.3c-1 .5-2.3.8-3.6.8-2.5 0-4-1.2-4-3.2 0-3.3 4.3-2.8 4.3-4.1z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function PayPalIcon({ className = "w-6 h-6", size = 24 }: BrandIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="4" fill="#003087" />
      <path
        d="M8.5 7h4.2c2.1 0 3.5 1.1 3.2 3.1-.3 2.1-2 3.4-4.1 3.4H10l-.8 4.5H7.2L8.5 7z"
        fill="#0079C1"
      />
      <path
        d="M10.2 9.5h3.8c1.8 0 3.1.9 2.8 2.7-.3 1.9-1.8 3-3.7 3H11.5l-.8 4.8H8.8L10.2 9.5z"
        fill="#00457C"
        opacity="0.85"
      />
    </svg>
  );
}

export function SalesforceIcon({ className = "w-6 h-6", size = 24 }: BrandIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="4" fill="#00A1E0" />
      <path
        d="M8.5 10a3 3 0 014.2-1.8 3.5 3.5 0 015.8 2.8 2.5 2.5 0 01-.5 5H6a2.5 2.5 0 01-.5-5 3 3 0 013-1z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function HubSpotIcon({ className = "w-6 h-6", size = 24 }: BrandIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="4" fill="#FF7A59" />
      <circle cx="15.5" cy="8.5" r="2" fill="#FFFFFF" />
      <circle cx="8.5" cy="15.5" r="2.5" fill="#FFFFFF" />
      <circle cx="15.5" cy="15.5" r="2" fill="#FFFFFF" />
      <path d="M15.5 10.5v3M10.5 15.5h3" stroke="#FFFFFF" strokeWidth="2" />
    </svg>
  );
}

export function MailchimpIcon({ className = "w-6 h-6", size = 24 }: BrandIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="4" fill="#FFE01B" />
      <circle cx="12" cy="12" r="5" fill="#241C15" />
      <circle cx="10" cy="11" r="1" fill="#FFE01B" />
      <circle cx="14" cy="11" r="1" fill="#FFE01B" />
      <path d="M10 14q2 1.5 4 0" stroke="#FFE01B" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function DynamicsIcon({ className = "w-6 h-6", size = 24 }: BrandIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="4" fill="#002050" />
      <path d="M6 7l5 5-5 5V7z" fill="#0078D4" />
      <path d="M11 7l7 5-7 5V7z" fill="#50E6FF" opacity="0.8" />
    </svg>
  );
}

export function ZohoIcon({ className = "w-6 h-6", size = 24 }: BrandIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="4" fill="#DE350B" />
      <text x="6" y="16" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
        Z
      </text>
      <circle cx="16" cy="12" r="3" fill="#FFAB00" />
    </svg>
  );
}

export function ActiveCampaignIcon({ className = "w-6 h-6", size = 24 }: BrandIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="4" fill="#004CFF" />
      <path d="M7 16l5-8 5 8h-3l-2-3.5L10 16H7z" fill="#FFFFFF" />
    </svg>
  );
}

export function PipedriveIcon({ className = "w-6 h-6", size = 24 }: BrandIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="4" fill="#1A1A1A" />
      <circle cx="10" cy="11" r="3.5" fill="#28A745" />
      <path d="M10 11v6" stroke="#28A745" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function FreshsalesIcon({ className = "w-6 h-6", size = 24 }: BrandIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="4" fill="#F4811F" />
      <path d="M8 8h8a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6a2 2 0 012-2z" fill="#FFFFFF" />
      <circle cx="12" cy="13" r="2" fill="#F4811F" />
    </svg>
  );
}

export function GongIcon({ className = "w-6 h-6", size = 24 }: BrandIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="4" fill="#8000FF" />
      <circle cx="12" cy="12" r="5" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="12" cy="12" r="2" fill="#FF1A8C" />
    </svg>
  );
}

export function LinkedInIcon({ className = "w-6 h-6", size = 24 }: BrandIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="4" fill="#0A66C2" />
      <circle cx="7.5" cy="8.5" r="1.5" fill="#FFFFFF" />
      <path d="M6 11h3v6H6v-6zM11 11h2.8v1h.1c.4-.8 1.4-1.2 2.4-1.2 2.3 0 3.2 1.5 3.2 3.6V17h-3v-3.5c0-.9 0-2-1.2-2-1.2 0-1.4 1-1.4 2V17h-2.9v-6z" fill="#FFFFFF" />
    </svg>
  );
}

export function TypeformIcon({ className = "w-6 h-6", size = 24 }: BrandIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="4" fill="#262627" />
      <path d="M8 9h8M12 9v7" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function JotFormIcon({ className = "w-6 h-6", size = 24 }: BrandIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="4" fill="#FF6100" />
      <path d="M7 8h10l-3 4 3 4H7l3-4-3-4z" fill="#FFFFFF" />
    </svg>
  );
}

export function PostalIcon({ className = "w-6 h-6", size = 24 }: BrandIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="4" fill="#22C55E" />
      <path d="M6 8l6 4 6-4v8a1 1 0 01-1 1H7a1 1 0 01-1-1V8z" fill="#FFFFFF" />
      <path d="M6 8h12l-6 4-6-4z" fill="#DCFCE7" />
    </svg>
  );
}

export function GmailIcon({ className = "w-6 h-6", size = 24 }: BrandIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="4" fill="#EA4335" />
      <path d="M5 8l7 5 7-5v9a1 1 0 01-1 1H6a1 1 0 01-1-1V8z" fill="#FFFFFF" />
      <path d="M5 8h14l-7 5-7-5z" fill="#EA4335" />
    </svg>
  );
}
