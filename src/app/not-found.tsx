import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section id="top" className="flex min-h-svh flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-sm tracking-[0.1em] text-grey-300 uppercase">Error 404</p>
      <h1 className="mt-4 text-[3rem] leading-none tracking-[-0.03em] md:text-[4.5rem]">This page wandered off</h1>
      <p className="mt-6 max-w-[26rem] text-lg text-grey-400">The link may be old or mistyped. Everything else is one click away.</p>
      <div className="mt-10">
        <Button href="/" variant="light">
          Back to the homepage
        </Button>
      </div>
    </section>
  );
}
