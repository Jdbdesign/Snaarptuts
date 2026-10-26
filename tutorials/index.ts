import { snaarp360 } from "./snaarp-360";
import { snaarpAdmin } from "./snaarp-admin";
import { snaarpDoc } from "./snaarp-doc";
import { snaarpMail } from "./snaarp-mail";
import type { Tutorial } from "./types";

/** Add a product by importing its config here. The player shell never changes. */
export const tutorials: Tutorial[] = [snaarp360, snaarpMail, snaarpDoc, snaarpAdmin];

export const getTutorial = (id: string) => tutorials.find((t) => t.product.id === id);
