import { COUNTS, URL_USERS } from "./admin-data";

/* Snaarp Admin, step 4 - Set a temporary password and create the user. Recording: ref/admin/Snaarp_Admin_add_users.mp4 (about 1:55-2:08). */

export const URL = URL_USERS;

export const CAPTIONS = {
  password: "Type a temporary password",
  rules: "Each rule turns green when it is met",
  share: "Share it with the user so they can sign in and change it",
  create: "Click Create user",
  created: "The new user is in the Users Directory",
  count: `Active Users goes from ${COUNTS.before} to ${COUNTS.after}`,
};
