/**
 * ARTWORK — change these three entries to swap the whole site's illustrations.
 *
 * Put the files in `public/art/` and update `src`, the pixel `width`/`height`
 * of the file (used for aspect ratios), which way the character natively
 * faces, and `scale` (relative height; the bride is set a little shorter). Components flip the cutouts automatically so the couple always face
 * each other, whatever the source orientation.
 *
 * After changing the couple or background, regenerate the WhatsApp preview:
 *   python3 scripts/make-og.py
 */
export type Facing = "left" | "right";
export type Cutout = {
  src: string;
  width: number;
  height: number;
  facing: Facing;
  alt: string;
  /** Relative height when the couple stand together (1 = full). Use <1 to make one shorter. */
  scale: number;
};
export type Backdrop = { src: string; width: number; height: number; alt: string };

export const art = {
  groom: {
    src: "/art/groom1.png",
    width: 214,
    height: 749,
    facing: "right",
    alt: "Illustrated groom",
    scale: 1,
  } satisfies Cutout as Cutout,
  bride: {
    src: "/art/bride1.png",
    width: 558,
    height: 747,
    facing: "left",
    alt: "Illustrated bride",
    scale: 0.92,
  } satisfies Cutout as Cutout,
  background: {
    src: "/art/bg1.png",
    width: 743,
    height: 1080,
    alt: "Floral wedding arch backdrop",
  } satisfies Backdrop as Backdrop,
};

/** CSS aspect-ratio string, e.g. "214 / 749". */
export const ratio = (a: { width: number; height: number }) => `${a.width} / ${a.height}`;

/** Horizontal scale so the cutout faces the given direction (1 = as drawn, -1 = mirrored). */
export const faceScale = (a: Cutout, dir: Facing) => (a.facing === dir ? 1 : -1);

/** Tailwind class to make the cutout face the given direction. */
export const faceClass = (a: Cutout, dir: Facing) => (a.facing === dir ? "" : "-scale-x-100");
