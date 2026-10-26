import { Step1OpenCreate } from "@/scenes/snaarp-admin/Step1OpenCreate";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/snaarp-admin/step1-script";
import { Step2Details } from "@/scenes/snaarp-admin/Step2Details";
import { runStep2, STEP2_DURATION_MS } from "@/scenes/snaarp-admin/step2-script";
import { Step3JobRole } from "@/scenes/snaarp-admin/Step3JobRole";
import { runStep3, STEP3_DURATION_MS } from "@/scenes/snaarp-admin/step3-script";
import { Step4CreateUser } from "@/scenes/snaarp-admin/Step4CreateUser";
import { runStep4, STEP4_DURATION_MS } from "@/scenes/snaarp-admin/step4-script";
import { Step5CheckAccess } from "@/scenes/snaarp-admin/Step5CheckAccess";
import { runStep5, STEP5_DURATION_MS } from "@/scenes/snaarp-admin/step5-script";
import { URL_USERS } from "@/scenes/snaarp-admin/admin-data";
import type { Tutorial } from "./types";

/**
 * Snaarp Admin: "Add users and give them products" in the Admin Panel (login.snaarp.com/admin/users).
 * Eight steps, all on the Users page. Recording: ref/admin/Snaarp_Admin_add_users.mp4 (1454x720, 3:13, git-ignored).
 * There was no earlier Admin tutorial in the repo, so these are steps 1-8.
 */
export const snaarpAdmin: Tutorial = {
  product: { id: "snaarp-admin", name: "Snaarp Admin", logo: "snaarp" },
  steps: [
    {
      id: "open-create-user",
      title: "Open the Create user form",
      url: URL_USERS,
      scene: { Component: Step1OpenCreate, run: runStep1, durationMs: STEP1_DURATION_MS },
    },
    {
      id: "enter-details",
      title: "Enter the user's details",
      url: URL_USERS,
      scene: { Component: Step2Details, run: runStep2, durationMs: STEP2_DURATION_MS },
    },
    {
      id: "job-and-role",
      title: "Add job details and role",
      url: URL_USERS,
      scene: { Component: Step3JobRole, run: runStep3, durationMs: STEP3_DURATION_MS },
    },
    {
      id: "password-create",
      title: "Set a temporary password and create the user",
      url: URL_USERS,
      scene: { Component: Step4CreateUser, run: runStep4, durationMs: STEP4_DURATION_MS },
    },
    {
      id: "check-access",
      title: "Check the user's access",
      url: URL_USERS,
      scene: { Component: Step5CheckAccess, run: runStep5, durationMs: STEP5_DURATION_MS },
    },
    { id: "open-manage-products", title: "Open Manage products", url: URL_USERS },
    { id: "add-product", title: "Add the user to another product", url: URL_USERS },
    { id: "confirm-access", title: "Confirm the new access", url: URL_USERS },
  ],
  completion: {
    text: "You know how to create a user and give them access to more Snaarp products.",
  },
};
