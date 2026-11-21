import { profile } from "@/data/profile";
import { LoopVideo } from "../motion/LoopVideo";
import { Button } from "../ui/Button";

/** Closing call to action, laid out like the Webflow original: blurred colour plate beside a white card. */
export function Cta() {
  return (
    <section aria-labelledby="cta-heading" className="px-4 py-24 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-[90rem] gap-4 md:grid-cols-[1fr_1.75fr] md:gap-6">
        {/* The video overscans its frame so the blur never shows a dark edge */}
        <div className="relative aspect-[2.39] overflow-clip rounded-[2rem] md:aspect-square md:rounded-[3rem]">
          <LoopVideo
            className="absolute top-1/2 left-1/2 h-[130%] w-[130%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover blur-[20px]"
            poster="/media/cta-poster.webp"
            sources={[
              { src: "/media/cta.webm", type: "video/webm" },
              { src: "/media/cta.mp4", type: "video/mp4" },
            ]}
          />
        </div>
        <div className="flex flex-col items-start justify-between gap-12 rounded-[2rem] bg-white p-8 md:rounded-[3rem] md:p-16">
          <div>
            <h2 id="cta-heading" className="sr-only">
              Let&apos;s work together
            </h2>
            <p className="max-w-[44rem] text-lg leading-[1.45] font-semibold text-grey-400 md:text-xl">{profile.cta}</p>
          </div>
          <Button href="/contact" variant="light">
            Let&apos;s Connect
          </Button>
        </div>
      </div>
    </section>
  );
}
