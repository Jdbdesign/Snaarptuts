import { Step1OpenCreate } from "@/scenes/snaarp-admin/Step1OpenCreate";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/snaarp-admin/step1-script";
import { Step2Details } from "@/scenes/snaarp-admin/Step2Details";
import { runStep2, STEP2_DURATION_MS } from "@/scenes/snaarp-admin/step2-script";
import { Step3JobRole } from "@/scenes/snaarp-admin/Step3JobRole";
import { runStep3, STEP3_DURATION_MS } from "@/scenes/snaarp-admin/step3-script";
import { Step4CreateUser } from "@/scenes/snaarp-admin/Step4CreateUser";
import { runStep4, STEP4_DURATION_MS } from "@/scenes/snaarp-admin/step4-script";
import { Step5BulkUsers } from "@/scenes/snaarp-admin/Step5BulkUsers";
import { runStep5, STEP5_DURATION_MS } from "@/scenes/snaarp-admin/step5-script";
import { Step6Filters } from "@/scenes/snaarp-admin/Step6Filters";
import { runStep6, STEP6_DURATION_MS } from "@/scenes/snaarp-admin/step6-script";
import { Step7AddProduct } from "@/scenes/snaarp-admin/Step7AddProduct";
import { runStep7, STEP7_DURATION_MS } from "@/scenes/snaarp-admin/step7-script";
import { Step8RemoveProduct } from "@/scenes/snaarp-admin/Step8RemoveProduct";
import { runStep8, STEP8_DURATION_MS } from "@/scenes/snaarp-admin/step8-script";
import { Step9Departments } from "@/scenes/snaarp-admin/Step9Departments";
import { runStep9, STEP9_DURATION_MS } from "@/scenes/snaarp-admin/step9-script";
import { Step10NewDepartment } from "@/scenes/snaarp-admin/Step10NewDepartment";
import { runStep10, STEP10_DURATION_MS } from "@/scenes/snaarp-admin/step10-script";
import { Step11AddMember } from "@/scenes/snaarp-admin/Step11AddMember";
import { runStep11, STEP11_DURATION_MS } from "@/scenes/snaarp-admin/step11-script";
import { Step12FilterDept } from "@/scenes/snaarp-admin/Step12FilterDept";
import { runStep12, STEP12_DURATION_MS } from "@/scenes/snaarp-admin/step12-script";
import { URL_USERS } from "@/scenes/snaarp-admin/admin-data";
import { URL_ORGANIZATION } from "@/scenes/snaarp-admin/steps-data";
import type { Tutorial } from "./types";

/**
 * Snaarp Admin: "Add users and give them products" in the Admin Panel (login.snaarp.com/admin/users).
 * Twelve steps, all built: steps 1-4 create a user (ref/admin/Snaarp_Admin_add_users.mp4), steps 5-12 are Bulk user, filters,
 * products from the Products dropdown and departments (ref/admin/v179.mp4, 1498x720, 2:59; both git-ignored).
 */
export const snaarpAdmin: Tutorial = {
  product: { id: "snaarp-admin", name: "Snaarp Admin", railLabel: "Sign in to Snaarp Admin", logo: "snaarp", aliases: ["sign in", "admin panel", "administration", "users", "user management", "bulk users", "departments", "organization", "products"] },
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
      id: "bulk-users",
      title: "Add many users with Bulk user",
      url: URL_USERS,
      scene: { Component: Step5BulkUsers, run: runStep5, durationMs: STEP5_DURATION_MS },
    },
    {
      id: "filters",
      title: "Find users with filters and search",
      url: URL_USERS,
      scene: { Component: Step6Filters, run: runStep6, durationMs: STEP6_DURATION_MS },
    },
    {
      id: "add-product",
      title: "Add a product to a user",
      url: URL_USERS,
      scene: { Component: Step7AddProduct, run: runStep7, durationMs: STEP7_DURATION_MS },
    },
    {
      id: "remove-product",
      title: "Remove a product from a user",
      url: URL_USERS,
      scene: { Component: Step8RemoveProduct, run: runStep8, durationMs: STEP8_DURATION_MS },
    },
    {
      id: "departments",
      title: "See your departments",
      url: URL_ORGANIZATION,
      scene: { Component: Step9Departments, run: runStep9, durationMs: STEP9_DURATION_MS },
    },
    {
      id: "new-department",
      title: "Create a new department",
      url: URL_ORGANIZATION,
      scene: { Component: Step10NewDepartment, run: runStep10, durationMs: STEP10_DURATION_MS },
    },
    {
      id: "add-member",
      title: "Add a member to the department",
      url: URL_ORGANIZATION,
      scene: { Component: Step11AddMember, run: runStep11, durationMs: STEP11_DURATION_MS },
    },
    {
      id: "filter-department",
      title: "Filter users by department",
      url: URL_USERS,
      scene: { Component: Step12FilterDept, run: runStep12, durationMs: STEP12_DURATION_MS },
    },
  ],
  completion: {
    text: "You know how to add people, give them products and organise them into departments.",
  },
};
