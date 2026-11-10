"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ME_URLS } from "./me-data";
import {
  SalesforceIcon,
  HubSpotIcon,
  MailchimpIcon,
  DynamicsIcon,
  ZohoIcon,
  ActiveCampaignIcon,
  PipedriveIcon,
  FreshsalesIcon,
  GongIcon,
  LinkedInIcon,
  TypeformIcon,
  JotFormIcon,
  PostalIcon,
  GmailIcon,
  OutlookIcon,
} from "./me-brand-marks";

interface Props {
  tl: Timeline;
}

export function MeAppsCrmView({ tl }: Props) {
  const loading = useTimelineVar<boolean>(tl, "meAppsCrmLoading", false);

  if (loading) {
    return (
      <div
        data-tl="me-crm-loading-container"
        className="h-full flex flex-col items-center justify-center p-8"
      >
        <div className="w-9 h-9 border-3 border-gray-200 border-t-[#7014D9] rounded-full animate-spin" />
        <p className="text-xs text-gray-500 mt-3 font-medium">Loading integrations...</p>
      </div>
    );
  }

  const crmPlatforms = [
    {
      id: "salesforce",
      name: "Salesforce",
      desc: "Sync booking data and contacts with Salesforce CRM",
      icon: <SalesforceIcon size={26} />,
      tlCard: "me-crm-card-salesforce",
      tlConnect: "me-crm-connect-salesforce",
    },
    {
      id: "hubspot",
      name: "HubSpot",
      desc: "Sync contacts, meetings, and activity logs to HubSpot CRM",
      icon: <HubSpotIcon size={26} />,
      tlCard: "me-crm-card-hubspot",
      tlConnect: "me-crm-connect-hubspot",
    },
    {
      id: "mailchimp",
      name: "Mailchimp",
      desc: "Add invitees to Mailchimp audiences and tag based on bookings",
      icon: <MailchimpIcon size={26} />,
      tlCard: "me-crm-card-mailchimp",
      tlConnect: "me-crm-connect-mailchimp",
    },
    {
      id: "dynamics",
      name: "Dynamics 365",
      desc: "Sync booking data with Microsoft Dynamics 365 CRM",
      icon: <DynamicsIcon size={26} />,
      tlCard: "me-crm-card-dynamics",
      tlConnect: "me-crm-connect-dynamics",
    },
    {
      id: "zoho",
      name: "Zoho CRM",
      desc: "Sync booking records and leads with Zoho CRM",
      icon: <ZohoIcon size={26} />,
      tlCard: "me-crm-card-zoho",
      tlConnect: "me-crm-connect-zoho",
    },
    {
      id: "activecampaign",
      name: "ActiveCampaign",
      desc: "Create contacts and trigger marketing automations on booking",
      icon: <ActiveCampaignIcon size={26} />,
      tlCard: "me-crm-card-activecampaign",
      tlConnect: "me-crm-connect-activecampaign",
    },
    {
      id: "pipedrive",
      name: "Pipedrive",
      desc: "Create deals and update contact activity in Pipedrive",
      icon: <PipedriveIcon size={26} />,
      tlCard: "me-crm-card-pipedrive",
      tlConnect: "me-crm-connect-pipedrive",
    },
    {
      id: "freshsales",
      name: "Freshsales",
      desc: "Automatically record bookings as activities in Freshsales",
      icon: <FreshsalesIcon size={26} />,
      tlCard: "me-crm-card-freshsales",
      tlConnect: "me-crm-connect-freshsales",
    },
  ];

  const enrichment = [
    {
      id: "gong",
      name: "Gong",
      desc: "Sync scheduled calls and recording metadata with Gong",
      icon: <GongIcon size={26} />,
      tlCard: "me-crm-card-gong",
      tlConnect: "me-crm-connect-gong",
    },
    {
      id: "linkedin",
      name: "LinkedIn Sales Navigator",
      desc: "View invitee profiles and insights directly within Snaarp Me",
      icon: <LinkedInIcon size={26} />,
      tlCard: "me-crm-card-linkedin",
      tlConnect: "me-crm-connect-linkedin",
    },
  ];

  const forms = [
    {
      id: "typeform",
      name: "Typeform",
      desc: "Redirect invitees to Typeform or embed forms in scheduling flow",
      icon: <TypeformIcon size={26} />,
      tlCard: "me-crm-card-typeform",
      tlConnect: "me-crm-connect-typeform",
    },
    {
      id: "jotform",
      name: "JotForm",
      desc: "Attach JotForm surveys and intake questionnaires to bookings",
      icon: <JotFormIcon size={26} />,
      tlCard: "me-crm-card-jotform",
      tlConnect: "me-crm-connect-jotform",
    },
  ];

  const emailDelivery = [
    {
      id: "postal",
      name: "Postal",
      desc: "Connect your self-hosted or managed Postal mail server for delivery",
      icon: <PostalIcon size={26} />,
      tlCard: "me-crm-card-postal",
      tlConnect: "me-crm-connect-postal",
    },
  ];

  const workflowEmails = [
    {
      id: "gmail",
      name: "Gmail",
      desc: "Send workflow reminder and confirmation emails via your Google account",
      icon: <GmailIcon size={26} />,
      tlCard: "me-crm-card-gmail",
      tlConnect: "me-crm-connect-gmail",
    },
    {
      id: "outlook-mail",
      name: "Outlook",
      desc: "Send automated workflow messages via your Microsoft 365 or Outlook account",
      icon: <OutlookIcon size={26} />,
      tlCard: "me-crm-card-outlook-mail",
      tlConnect: "me-crm-connect-outlook-mail",
    },
  ];

  const renderCardList = (
    items: {
      id: string;
      name: string;
      desc: string;
      icon: React.ReactNode;
      tlCard: string;
      tlConnect: string;
    }[]
  ) => (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          data-tl={item.tlCard}
          className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5 flex-1 min-w-0 pr-3">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
              {item.icon}
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-sm text-gray-900 truncate">{item.name}</h3>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="bg-gray-100 text-gray-500 text-[11px] px-2.5 py-0.5 rounded-full font-medium">
              Not Connected
            </span>
            <button
              type="button"
              data-tl={item.tlConnect}
              className="bg-[#7014D9] hover:bg-[#5B0FB3] text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              Connect
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div
      data-tl="me-crm-integrations-container"
      data-scroller
      className="h-full overflow-y-auto px-8 py-6 max-w-7xl mx-auto"
    >
      {/* Back Link */}
      <button
        type="button"
        data-tl="me-crm-back-link"
        onClick={() => {
          tl.setUrl(ME_URLS.integrations);
          tl.setVar("meView", "integrations");
        }}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 mb-4 transition-colors cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back to Integrations</span>
      </button>

      {/* Header */}
      <div className="flex flex-col gap-1 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Apps and CRM Integrations</h1>
        <p className="text-sm text-gray-500">
          Connect your CRM, email, and integration tools to automatically sync booking data and send workflow emails from your own accounts
        </p>
      </div>

      {/* 1. CRM Platforms */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-gray-900 mb-3">CRM Platforms</h2>
        {renderCardList(crmPlatforms)}
      </div>

      {/* 2. Enrichment & Intelligence */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-gray-900 mb-3">Enrichment & Intelligence</h2>
        {renderCardList(enrichment)}
      </div>

      {/* 3. Form Integrations */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-gray-900 mb-3">Form Integrations</h2>
        {renderCardList(forms)}
      </div>

      {/* 4. Email Delivery */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-gray-900 mb-3">Email Delivery</h2>
        {renderCardList(emailDelivery)}
      </div>

      {/* 5. Workflow Email Accounts */}
      <div className="mb-12">
        <div className="mb-3">
          <h2 className="text-base font-bold text-gray-900">Workflow Email Accounts</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Send workflow emails (confirmations, reminders, follow-ups) from your own email account
          </p>
        </div>
        {renderCardList(workflowEmails)}
      </div>
    </div>
  );
}
