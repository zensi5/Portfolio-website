"use client";

import { useEffect, useRef } from "react";

/**
 * Physics toy for the footer (after moisez.com): discs drop in, pile on the giant name,
 * scatter when the pointer pushes through them, and can be grabbed and thrown (touch too).
 * Matter.js is loaded only when the footer comes near, and nothing runs for reduced motion.
 */

type Kind = "signal" | "night" | "outline";

/** Mix of the three disc styles, in drop order. */
const BALLS: Kind[] = [
  "signal", "night", "outline", "signal", "night", "signal", "outline", "night",
  "signal", "night", "outline", "signal", "night", "signal", "outline",
];

const tone: Record<Kind, { disc: string; ring: string; spark: string }> = {
  signal: { disc: "bg-signal", ring: "border-night", spark: "#1b1a1f" },
  night: { disc: "bg-night", ring: "border-signal", spark: "#ff4d00" },
  outline: { disc: "bg-white border-2 border-night", ring: "border-transparent", spark: "#1b1a1f" },
};

/** Eight rounded rays, alternating long and short, around the cursor's square. */
function Spark({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 100" className="relative size-[74%]" aria-hidden="true">
      <g stroke={color} strokeLinecap="round">
        {Array.from({ length: 8 }, (_, i) => (
          <line
            key={i}
            x1="50"
            y1={i % 2 ? 20 : 9}
            x2="50"
            y2="42"
            strokeWidth={i % 2 ? 11 : 13}
            transform={`rotate(${i * 45 + 8} 50 50)`}
          />
        ))}
      </g>
      <rect x="40" y="40" width="20" height="20" rx="2" fill={color} transform="rotate(8 50 50)" />
    </svg>
  );
}

function Disc({ kind }: { kind: Kind }) {
  const t = tone[kind];
  return (
    <span className={`relative grid size-full place-items-center rounded-full ${t.disc}`}>
      <span className={`absolute inset-[6%] rounded-full border-[1.5px] ${t.ring}`} />
      <Spark color={t.spark} />
    </span>
  );
}

export function FooterBalls() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = layer.current!;
    const footer = root.closest("footer")!;
    let destroy: (() => void) | null = null;
    let cancelled = false;

    const start = async () => {
      const Matter = await import("matter-js");
      if (cancelled) return;
      const { Engine, Runner, Bodies, Body, Composite, Constraint, Events } = Matter;

      const W = root.clientWidth;
      const H = root.clientHeight;
      const mobile = window.innerWidth < 768;
      const size = W / (mobile ? 6.2 : 14);
      const R = size / 2;
      const thick = 400;

      const engine = Engine.create();
      engine.gravity.y = 1.1;
      const world = engine.world;

      // Walls, plus invisible blocks over the text so discs land on it and never cover links.
      // On phones the play is free above the name: no lid and nothing on the links, just a floor
      // across the card at the top of the name. Anything thrown upward arcs out of view and drops back.
      const rootRect = root.getBoundingClientRect();
      const solidEls = [...footer.querySelectorAll<HTMLElement>("[data-ball-solid]")];
      const solid = mobile
        ? (() => {
            const top = Math.min(
              ...solidEls.filter((el) => el.dataset.ballSolid === "word").map((el) => el.getBoundingClientRect().top),
            );
            const y = top - rootRect.top;
            return [Bodies.rectangle(W / 2, y + thick / 2, W + thick * 2, thick, { isStatic: true })];
          })()
        : solidEls.map((el) => {
            const r = el.getBoundingClientRect();
            return Bodies.rectangle(r.left - rootRect.left + r.width / 2, r.top - rootRect.top + r.height / 2, r.width, r.height, {
              isStatic: true,
            });
          });
      Composite.add(world, [
        ...(mobile ? [] : [Bodies.rectangle(W / 2, -thick / 2, W + thick * 2, thick, { isStatic: true })]),
        Bodies.rectangle(W / 2, H + thick / 2, W + thick * 2, thick, { isStatic: true }),
        // Tall side walls so a disc thrown high above the open top still comes back down inside
        Bodies.rectangle(-thick / 2, -H * 4, thick, H * 10, { isStatic: true }),
        Bodies.rectangle(W + thick / 2, -H * 4, thick, H * 10, { isStatic: true }),
        ...solid,
      ]);

      // Discs
      const all = [...root.querySelectorAll<HTMLElement>("[data-ball]")];
      const els = mobile ? all.slice(0, 10) : all;
      const bodies: Matter.Body[] = [];
      els.forEach((el, i) => {
        el.style.width = el.style.height = `${size}px`;
        el.style.fontSize = `${size * 0.26}px`;
        setTimeout(() => {
          if (cancelled) return;
          const body = Bodies.circle(R + Math.random() * (W - size), R + 2, R, {
            restitution: 0.65,
            frictionAir: 0.002,
            friction: 0.05,
            collisionFilter: { category: 8 },
          });
          Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.2);
          bodies[i] = body;
          Composite.add(world, body);
          el.style.visibility = "visible";
        }, 100 * i);
      });

      // Invisible pusher that chases the mouse and shoves discs out of the way
      const pusher = Bodies.circle(-1000, -1000, R * 0.7, {
        density: 0.02,
        frictionAir: 0,
        friction: 0,
        restitution: 0,
        collisionFilter: { category: 2, mask: 8 },
      });
      Body.setInertia(pusher, Infinity);
      Composite.add(world, pusher);

      const mouse = { x: 0, y: 0, in: false };
      let parked = true;
      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        const r = root.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
        mouse.in = mouse.x >= 0 && mouse.y >= 0 && mouse.x <= r.width && mouse.y <= r.height;
      };
      document.addEventListener("pointermove", onMove, { passive: true });

      // Grab and throw (mouse and touch)
      let drag: Matter.Constraint | null = null;
      const local = (e: PointerEvent) => {
        const r = root.getBoundingClientRect();
        return { x: e.clientX - r.left, y: e.clientY - r.top };
      };
      const downs = els.map((el, i) => {
        const down = (e: PointerEvent) => {
          const body = bodies[i];
          if (!body) return;
          e.preventDefault();
          el.setPointerCapture(e.pointerId);
          drag = Constraint.create({ pointA: local(e), bodyB: body, pointB: { x: 0, y: 0 }, stiffness: 0.2, damping: 0.1 });
          Composite.add(world, drag);
          el.dataset.dragging = "";
        };
        const move = (e: PointerEvent) => {
          if (drag && el.hasPointerCapture(e.pointerId)) drag.pointA = local(e);
        };
        const up = (e: PointerEvent) => {
          if (!drag) return;
          Composite.remove(world, drag);
          drag = null;
          delete el.dataset.dragging;
          if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
        };
        el.addEventListener("pointerdown", down);
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerup", up);
        el.addEventListener("pointercancel", up);
        return () => {
          el.removeEventListener("pointerdown", down);
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerup", up);
          el.removeEventListener("pointercancel", up);
        };
      });

      Events.on(engine, "beforeUpdate", () => {
        if (!mouse.in || drag) {
          if (!parked) {
            Body.setPosition(pusher, { x: -1000, y: -1000 });
            Body.setVelocity(pusher, { x: 0, y: 0 });
            parked = true;
          }
          return;
        }
        if (parked) {
          Body.setPosition(pusher, mouse);
          parked = false;
        }
        // Velocity toward the pointer, capped, with gravity cancelled so it floats
        let vx = (mouse.x - pusher.position.x) * 0.5;
        let vy = (mouse.y - pusher.position.y) * 0.5;
        const max = R * 0.5;
        const len = Math.hypot(vx, vy);
        if (len > max) {
          vx = (vx / len) * max;
          vy = (vy / len) * max;
        }
        Body.setVelocity(pusher, { x: vx, y: vy });
        Body.applyForce(pusher, pusher.position, { x: 0, y: -engine.gravity.y * engine.gravity.scale * pusher.mass });
      });

      Events.on(engine, "afterUpdate", () => {
        bodies.forEach((b, i) => {
          if (!b) return;
          els[i].style.transform = `translate3d(${b.position.x - R}px, ${b.position.y - R}px, 0) rotate(${b.angle}rad)`;
        });
      });

      // Only simulate while the footer is on screen
      const runner = Runner.create();
      let running = false;
      const setRunning = (on: boolean) => {
        if (on === running) return;
        running = on;
        if (on) Runner.run(runner, engine);
        else Runner.stop(runner);
      };
      const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting));
      io.observe(root);
      setRunning(true);

      destroy = () => {
        setRunning(false);
        io.disconnect();
        document.removeEventListener("pointermove", onMove);
        downs.forEach((fn) => fn());
        Events.off(engine, "beforeUpdate");
        Events.off(engine, "afterUpdate");
        Composite.clear(world, false);
        Engine.clear(engine);
        all.forEach((el) => {
          el.style.visibility = "hidden";
          el.style.transform = "";
        });
      };
    };

    // Start once the footer has settled into view, rebuild on width changes
    let started = false;
    const near = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= 0.5 && !started) {
          started = true;
          setTimeout(start, 400);
        }
      },
      { threshold: [0, 0.5] },
    );
    near.observe(root);

    let lastW = window.innerWidth;
    let t = 0;
    const onResize = () => {
      if (window.innerWidth === lastW) return;
      lastW = window.innerWidth;
      clearTimeout(t);
      t = window.setTimeout(() => {
        destroy?.();
        destroy = null;
        if (started) start();
      }, 300);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      near.disconnect();
      window.removeEventListener("resize", onResize);
      clearTimeout(t);
      destroy?.();
    };
  }, []);

  return (
    <div ref={layer} aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {BALLS.map((kind, i) => (
        <div
          key={i}
          data-ball=""
          data-cursor="Drag"
          className="pointer-events-auto absolute top-0 left-0 cursor-grab touch-none select-none will-change-transform data-[dragging]:cursor-grabbing"
          style={{ visibility: "hidden" }}
        >
          <Disc kind={kind} />
        </div>
      ))}
    </div>
  );
}
