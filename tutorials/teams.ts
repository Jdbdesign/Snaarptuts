import { Step1 } from "@/scenes/teams/step1/Step1";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/teams/step1/script";
import { Step2 } from "@/scenes/teams/step2/Step2";
import { runStep2, STEP2_DURATION_MS } from "@/scenes/teams/step2/script";
import { Step3 } from "@/scenes/teams/step3/Step3";
import { runStep3, STEP3_DURATION_MS } from "@/scenes/teams/step3/script";
import { Step4 } from "@/scenes/teams/step4/Step4";
import { runStep4, STEP4_DURATION_MS } from "@/scenes/teams/step4/script";
import { Step5 } from "@/scenes/teams/step5/Step5";
import { runStep5, STEP5_DURATION_MS } from "@/scenes/teams/step5/script";
import { Step6 } from "@/scenes/teams/step6/Step6";
import { runStep6, STEP6_DURATION_MS } from "@/scenes/teams/step6/script";
import { Step7 } from "@/scenes/teams/step7/Step7";
import { runStep7, STEP7_DURATION_MS } from "@/scenes/teams/step7/script";
import { Step8 } from "@/scenes/teams/step8/Step8";
import { runStep8, STEP8_DURATION_MS } from "@/scenes/teams/step8/script";
import { Step9 } from "@/scenes/teams/step9/Step9";
import { runStep9, STEP9_DURATION_MS } from "@/scenes/teams/step9/script";
import { Step10 } from "@/scenes/teams/step10/Step10";
import { runStep10, STEP10_DURATION_MS } from "@/scenes/teams/step10/script";
import { Step11 } from "@/scenes/teams/step11/Step11";
import { runStep11, STEP11_DURATION_MS } from "@/scenes/teams/step11/script";
import { Step12 } from "@/scenes/teams/step12/Step12";
import { runStep12, STEP12_DURATION_MS } from "@/scenes/teams/step12/script";
import { Step13 } from "@/scenes/teams/step13/Step13";
import { runStep13, STEP13_DURATION_MS } from "@/scenes/teams/step13/script";
import { Step14 } from "@/scenes/teams/step14/Step14";
import { runStep14, STEP14_DURATION_MS } from "@/scenes/teams/step14/script";
import { Step15 } from "@/scenes/teams/step15/Step15";
import { runStep15, STEP15_DURATION_MS } from "@/scenes/teams/step15/script";
import { Step16 } from "@/scenes/teams/step16/Step16";
import { runStep16, STEP16_DURATION_MS } from "@/scenes/teams/step16/script";
import { Step17 } from "@/scenes/teams/step17/Step17";
import { runStep17, STEP17_DURATION_MS } from "@/scenes/teams/step17/script";
import { Step18 } from "@/scenes/teams/step18/Step18";
import { runStep18, STEP18_DURATION_MS } from "@/scenes/teams/step18/script";
import { Step19 } from "@/scenes/teams/step19/Step19";
import { runStep19, STEP19_DURATION_MS } from "@/scenes/teams/step19/script";
import { Step20 } from "@/scenes/teams/step20/Step20";
import { runStep20, STEP20_DURATION_MS } from "@/scenes/teams/step20/script";
import { Step21 } from "@/scenes/teams/step21/Step21";
import { runStep21, STEP21_DURATION_MS } from "@/scenes/teams/step21/script";
import { Step22 } from "@/scenes/teams/step22/Step22";
import { runStep22, STEP22_DURATION_MS } from "@/scenes/teams/step22/script";

import { TEAMS_URLS } from "@/components/teams/teams-data";
import type { Tutorial } from "./types";

export const teams: Tutorial = {
  product: {
    id: "teams",
    name: "Snaarp Teams",
    logo: "teams",
    aliases: ["snaarp-teams", "team", "meet"],
  },
  steps: [
    {
      id: "teams-meet-teams",
      title: "Meet Snaarp Teams",
      url: TEAMS_URLS.chat,
      scene: {
        Component: Step1,
        run: runStep1,
        durationMs: STEP1_DURATION_MS,
      },
    },
    {
      id: "teams-filter-chats",
      title: "Filter your chats",
      url: TEAMS_URLS.chat,
      scene: {
        Component: Step2,
        run: runStep2,
        durationMs: STEP2_DURATION_MS,
      },
    },
    {
      id: "teams-chat-menu",
      title: "Use a chat's menu",
      url: TEAMS_URLS.chat,
      scene: {
        Component: Step3,
        run: runStep3,
        durationMs: STEP3_DURATION_MS,
      },
    },
    {
      id: "teams-start-meet-chat-list",
      title: "Start a meeting from the chat list",
      url: TEAMS_URLS.chat,
      scene: {
        Component: Step4,
        run: runStep4,
        durationMs: STEP4_DURATION_MS,
      },
    },
    {
      id: "teams-call-contact",
      title: "Call a contact",
      url: TEAMS_URLS.chat,
      scene: {
        Component: Step5,
        run: runStep5,
        durationMs: STEP5_DURATION_MS,
      },
    },
    {
      id: "teams-files-photos",
      title: "See shared files and photos",
      url: TEAMS_URLS.chat,
      scene: {
        Component: Step6,
        run: runStep6,
        durationMs: STEP6_DURATION_MS,
      },
    },
    {
      id: "teams-start-group-chat",
      title: "Start a group chat",
      url: TEAMS_URLS.chat,
      scene: {
        Component: Step7,
        run: runStep7,
        durationMs: STEP7_DURATION_MS,
      },
    },
    {
      id: "teams-explore-group-chat",
      title: "Explore a group chat",
      url: TEAMS_URLS.chat,
      scene: {
        Component: Step8,
        run: runStep8,
        durationMs: STEP8_DURATION_MS,
      },
    },
    {
      id: "teams-rename-pin-group",
      title: "Rename and pin a group",
      url: TEAMS_URLS.chat,
      scene: {
        Component: Step9,
        run: runStep9,
        durationMs: STEP9_DURATION_MS,
      },
    },
    {
      id: "teams-switch-theme",
      title: "Switch the theme",
      url: TEAMS_URLS.chat,
      scene: {
        Component: Step10,
        run: runStep10,
        durationMs: STEP10_DURATION_MS,
      },
    },
    {
      id: "teams-create-manage-meet-links",
      title: "Create and manage meeting links",
      url: TEAMS_URLS.meet,
      scene: {
        Component: Step11,
        run: runStep11,
        durationMs: STEP11_DURATION_MS,
      },
    },
    {
      id: "teams-scheduled-and-calls",
      title: "Check scheduled meetings and calls",
      url: TEAMS_URLS.meet,
      scene: {
        Component: Step12,
        run: runStep12,
        durationMs: STEP12_DURATION_MS,
      },
    },
    {
      id: "teams-join-with-id",
      title: "Join with a meeting ID",
      url: TEAMS_URLS.meet,
      scene: {
        Component: Step13,
        run: runStep13,
        durationMs: STEP13_DURATION_MS,
      },
    },
    {
      id: "teams-find-people",
      title: "Find people",
      url: TEAMS_URLS.people,
      scene: {
        Component: Step14,
        run: runStep14,
        durationMs: STEP14_DURATION_MS,
      },
    },
    {
      id: "teams-message-call-person",
      title: "Message or call someone",
      url: TEAMS_URLS.people,
      scene: {
        Component: Step15,
        run: runStep15,
        durationMs: STEP15_DURATION_MS,
      },
    },
    {
      id: "teams-connect-calendar",
      title: "Connect your calendar",
      url: TEAMS_URLS.calendar,
      scene: {
        Component: Step16,
        run: runStep16,
        durationMs: STEP16_DURATION_MS,
      },
    },
    {
      id: "teams-use-calendar",
      title: "Use your calendar",
      url: TEAMS_URLS.snaarpMe,
      scene: {
        Component: Step17,
        run: runStep17,
        durationMs: STEP17_DURATION_MS,
      },
    },
    {
      id: "teams-check-activity",
      title: "Check your activity",
      url: TEAMS_URLS.activity,
      scene: {
        Component: Step18,
        run: runStep18,
        durationMs: STEP18_DURATION_MS,
      },
    },
    {
      id: "teams-set-status",
      title: "Set your status",
      url: TEAMS_URLS.activity,
      scene: {
        Component: Step19,
        run: runStep19,
        durationMs: STEP19_DURATION_MS,
      },
    },
    {
      id: "teams-update-profile",
      title: "Update your profile",
      url: TEAMS_URLS.settings,
      scene: {
        Component: Step20,
        run: runStep20,
        durationMs: STEP20_DURATION_MS,
      },
    },
    {
      id: "teams-change-password",
      title: "Change your password",
      url: TEAMS_URLS.settings,
      scene: {
        Component: Step21,
        run: runStep21,
        durationMs: STEP21_DURATION_MS,
      },
    },
    {
      id: "teams-notifications-account",
      title: "Notifications and account options",
      url: TEAMS_URLS.settings,
      scene: {
        Component: Step22,
        run: runStep22,
        durationMs: STEP22_DURATION_MS,
      },
    },
  ],
  groups: [
    { title: "Overview", from: "teams-meet-teams" },
    { title: "Chats", from: "teams-filter-chats" },
    { title: "Group chats", from: "teams-start-group-chat" },
    { title: "Meet", from: "teams-create-manage-meet-links" },
    { title: "People", from: "teams-find-people" },
    { title: "Calendar", from: "teams-connect-calendar" },
    { title: "Activity", from: "teams-check-activity" },
    { title: "Account and settings", from: "teams-set-status" },
  ],
  completion: {
    title: "You're all set",
    text: "You can now message your teammates, manage group chats, launch video calls, and generate meeting links in Snaarp Teams.",
    replayLabel: "Replay",
    backLabel: "Back to Snaarp",
    backHref: "https://snaarp.com",
  },
};
