import { snaarp360 } from "./snaarp-360";
import { snaarpAdmin } from "./snaarp-admin";
import { snaarpDoc } from "./snaarp-doc";
import { snaarpMail } from "./snaarp-mail";
import { snaarpSheets } from "./snaarp-sheets";
import { snaarpSlides } from "./snaarp-slides";
import type { Tutorial } from "./types";

/** Add a product by importing its config here. The array order is the order shown in the rail dropdown. The player shell never changes. */
export const tutorials: Tutorial[] = [snaarp360, snaarpAdmin, snaarpMail, snaarpDoc, snaarpSlides, snaarpSheets];

export const getTutorial = (id: string) => tutorials.find((t) => t.product.id === id);
