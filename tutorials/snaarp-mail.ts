import type { Tutorial } from "./types";

/**
 * Snaarp Mail. The modules are listed so they show in the rail; none has a scene yet, so each
 * shows as "Coming soon". Give a step a `scene` (see snaarp-360.ts) when it is built.
 */
export const snaarpMail: Tutorial = {
  product: { id: "snaarp-mail", name: "Snaarp Mail", logo: "mail" },
  steps: [
    { id: "compose-email", title: "Compose email", url: "mail.snaarp.com/inbox" },
    { id: "ai-composer", title: "Use AI composer", url: "mail.snaarp.com/inbox" },
    { id: "attach-file", title: "Attach file or folder", url: "mail.snaarp.com/inbox" },
    { id: "preference-view", title: "Set user preference view", url: "mail.snaarp.com/inbox" },
    { id: "all-products", title: "View all snaarp products", url: "mail.snaarp.com/inbox" },
    { id: "inbox-type", title: "Inbox type", url: "mail.snaarp.com/inbox" },
    { id: "undo-send", title: "Undo Send", url: "mail.snaarp.com/inbox" },
    { id: "add-account", title: "Add new account", url: "mail.snaarp.com/inbox" },
    { id: "switch-account", title: "Switch account", url: "mail.snaarp.com/inbox" },
    { id: "add-esignature", title: "Add e-signature", url: "mail.snaarp.com/inbox" },
  ],
};
