import { Step1Pricing } from "@/scenes/snaarp-mail/Step1Pricing";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/snaarp-mail/step1-script";
import { Step2Signup } from "@/scenes/snaarp-mail/Step2Signup";
import { runStep2, STEP2_DURATION_MS } from "@/scenes/snaarp-mail/step2-script";
import { Step3Organization } from "@/scenes/snaarp-mail/Step3Organization";
import { runStep3, STEP3_DURATION_MS } from "@/scenes/snaarp-mail/step3-script";
import { Step4Domain } from "@/scenes/snaarp-mail/Step4Domain";
import { runStep4, STEP4_DURATION_MS } from "@/scenes/snaarp-mail/step4-script";
import { Step5Dns } from "@/scenes/snaarp-mail/Step5Dns";
import { runStep5, STEP5_DURATION_MS } from "@/scenes/snaarp-mail/step5-script";
import { Step6Cloudflare } from "@/scenes/snaarp-mail/Step6Cloudflare";
import { runStep6, STEP6_DURATION_MS } from "@/scenes/snaarp-mail/step6-script";
import { runStep7, STEP7_DURATION_MS } from "@/scenes/snaarp-mail/step7-script";
import { Step8Users } from "@/scenes/snaarp-mail/Step8Users";
import { runStep8, STEP8_DURATION_MS } from "@/scenes/snaarp-mail/step8-script";
import { Step9Finish } from "@/scenes/snaarp-mail/Step9Finish";
import { runStep9, STEP9_DURATION_MS } from "@/scenes/snaarp-mail/step9-script";
import { Step10BulkUpload } from "@/scenes/snaarp-mail/admin/Step10BulkUpload";
import { runStep10 as runAdmin10, STEP10_DURATION_MS as ADMIN10_DURATION_MS } from "@/scenes/snaarp-mail/admin/step10-script";
import { Step11BulkSignature } from "@/scenes/snaarp-mail/admin/Step11BulkSignature";
import { runStep11 as runAdmin11, STEP11_DURATION_MS as ADMIN11_DURATION_MS } from "@/scenes/snaarp-mail/admin/step11-script";
import { Step12AddAlias } from "@/scenes/snaarp-mail/admin/Step12AddAlias";
import { runStep12 as runAdmin12, STEP12_DURATION_MS as ADMIN12_DURATION_MS } from "@/scenes/snaarp-mail/admin/step12-script";
import { Step13BulkAliases } from "@/scenes/snaarp-mail/admin/Step13BulkAliases";
import { runStep13 as runAdmin13, STEP13_DURATION_MS as ADMIN13_DURATION_MS } from "@/scenes/snaarp-mail/admin/step13-script";
import { Step14ManageSignature } from "@/scenes/snaarp-mail/admin/Step14ManageSignature";
import { runStep14 as runAdmin14, STEP14_DURATION_MS as ADMIN14_DURATION_MS } from "@/scenes/snaarp-mail/admin/step14-script";
import { Step15CreateGroup } from "@/scenes/snaarp-mail/admin/Step15CreateGroup";
import { runStep15 as runAdmin15, STEP15_DURATION_MS as ADMIN15_DURATION_MS } from "@/scenes/snaarp-mail/admin/step15-script";
import { Step16GroupMembers } from "@/scenes/snaarp-mail/admin/Step16GroupMembers";
import { runStep16 as runAdmin16, STEP16_DURATION_MS as ADMIN16_DURATION_MS } from "@/scenes/snaarp-mail/admin/step16-script";
import { Step17Forwarding } from "@/scenes/snaarp-mail/admin/Step17Forwarding";
import { runStep17 as runAdmin17, STEP17_DURATION_MS as ADMIN17_DURATION_MS } from "@/scenes/snaarp-mail/admin/step17-script";
import { URL_ADMIN_GROUPS, URL_ADMIN_USERS } from "@/scenes/snaarp-mail/admin/data";
import type { Tutorial } from "./types";

/**
 * Snaarp Mail: "How to set up Snaarp Mail". Nine steps; steps 1-7 are built, the rest show as
 * "Coming soon". Recording: ref/mail/Snaarp_Mail_setup.mp4 (998x480, 3:05, git-ignored).
 * URL pills of steps 2-5 and 7-9 are placeholders because the address bar is not visible in the recording.
 */
export const snaarpMail: Tutorial = {
  product: { id: "snaarp-mail", name: "Snaarp Mail", logo: "mail", aliases: ["email", "e-mail", "inbox", "mailbox"] },
  steps: [
    {
      id: "choose-plan",
      title: "Choose your plan",
      url: "snaarp.com/pricing",
      scene: { Component: Step1Pricing, run: runStep1, durationMs: STEP1_DURATION_MS },
    },
    {
      id: "create-account",
      title: "Create your account",
      url: "login.snaarp.com/signup",
      scene: { Component: Step2Signup, run: runStep2, durationMs: STEP2_DURATION_MS },
    },
    {
      id: "organization",
      title: "Tell us about your organization",
      url: "login.snaarp.com/onboarding/organization",
      scene: { Component: Step3Organization, run: runStep3, durationMs: STEP3_DURATION_MS },
    },
    {
      id: "connect-domain",
      title: "Connect your domain",
      url: "login.snaarp.com/onboarding/domain",
      scene: { Component: Step4Domain, run: runStep4, durationMs: STEP4_DURATION_MS },
    },
    {
      id: "review-dns",
      title: "Review your DNS records",
      url: "login.snaarp.com/onboarding/dns",
      scene: { Component: Step5Dns, run: runStep5, durationMs: STEP5_DURATION_MS },
    },
    {
      id: "add-records",
      title: "Add the records in Cloudflare",
      url: "dash.cloudflare.com/acme-studio.com/dns/records",
      scene: { Component: Step6Cloudflare, run: runStep6, durationMs: STEP6_DURATION_MS },
    },
    {
      id: "confirm-records",
      title: "Confirm the records",
      url: "login.snaarp.com/onboarding/dns",
      // The same DNS Mapping page as step 5, played with the cards being marked as submitted.
      scene: { Component: Step5Dns, run: runStep7, durationMs: STEP7_DURATION_MS },
    },
    {
      id: "add-team",
      title: "Add your team",
      url: "login.snaarp.com/onboarding/users",
      scene: { Component: Step8Users, run: runStep8, durationMs: STEP8_DURATION_MS },
    },
    {
      id: "finish",
      title: "Finish setup",
      url: "login.snaarp.com/onboarding/complete",
      scene: { Component: Step9Finish, run: runStep9, durationMs: STEP9_DURATION_MS },
    },
    {
      id: "upload-users",
      title: "Upload users in bulk",
      url: URL_ADMIN_USERS,
      scene: { Component: Step10BulkUpload, run: runAdmin10, durationMs: ADMIN10_DURATION_MS },
    },
    {
      id: "bulk-signature",
      title: "Request a bulk signature",
      url: URL_ADMIN_USERS,
      scene: { Component: Step11BulkSignature, run: runAdmin11, durationMs: ADMIN11_DURATION_MS },
    },
    {
      id: "add-alias",
      title: "Add an alias to one user",
      url: URL_ADMIN_USERS,
      scene: { Component: Step12AddAlias, run: runAdmin12, durationMs: ADMIN12_DURATION_MS },
    },
    {
      id: "bulk-aliases",
      title: "Add aliases in bulk",
      url: URL_ADMIN_USERS,
      scene: { Component: Step13BulkAliases, run: runAdmin13, durationMs: ADMIN13_DURATION_MS },
    },
    {
      id: "manage-signature",
      title: "Manage a user's signature",
      url: URL_ADMIN_USERS,
      scene: { Component: Step14ManageSignature, run: runAdmin14, durationMs: ADMIN14_DURATION_MS },
    },
    {
      id: "create-group",
      title: "Create a group",
      url: URL_ADMIN_USERS,
      scene: { Component: Step15CreateGroup, run: runAdmin15, durationMs: ADMIN15_DURATION_MS },
    },
    {
      id: "group-members",
      title: "Add members and use the group email",
      url: URL_ADMIN_GROUPS,
      scene: { Component: Step16GroupMembers, run: runAdmin16, durationMs: ADMIN16_DURATION_MS },
    },
    {
      id: "email-forwarding",
      title: "Forward emails to other users",
      url: URL_ADMIN_USERS,
      scene: { Component: Step17Forwarding, run: runAdmin17, durationMs: ADMIN17_DURATION_MS },
    },
  ],
  completion: {
    title: "You're all set",
    text: "Snaarp Mail is set up, and you know how to manage users, aliases, signatures, groups and forwarding.",
  },
};
