"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

type Variant = "primary" | "secondary" | "ghost";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  fullWidth?: boolean;
}

interface LinkProps extends BaseProps {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
}

interface ButtonProps extends BaseProps {
  href?: never;
  external?: never;
  onClick?: () => void;
  type?: "button" | "submit";
}

type MagneticButtonProps = LinkProps | ButtonProps;

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md px-7 py-3.5 text-sm font-medium tracking-tight transition-colors duration-300 ease-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-ink hover:shadow-[0_0_40px_-6px_rgba(255,222,56,0.55)]",
  secondary:
    "border border-line bg-white/[0.02] text-primary hover:border-white/20 hover:bg-white/[0.05]",
  ghost: "text-secondary hover:text-primary",
};

export default function MagneticButton(props: MagneticButtonProps) {
  const { children, variant = "primary", className = "", fullWidth } = props;
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const onMove = (e: MouseEvent) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  };

  const ripple = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const circle = document.createElement("span");
    const d = Math.max(el.clientWidth, el.clientHeight);
    const rect = el.getBoundingClientRect();
    circle.style.cssText = `position:absolute;width:${d}px;height:${d}px;left:${
      e.clientX - rect.left - d / 2
    }px;top:${e.clientY - rect.top - d / 2}px;border-radius:9999px;background:currentColor;opacity:0.18;transform:scale(0);pointer-events:none;transition:transform .6s ease,opacity .6s ease;`;
    el.appendChild(circle);
    requestAnimationFrame(() => {
      circle.style.transform = "scale(1)";
      circle.style.opacity = "0";
    });
    setTimeout(() => circle.remove(), 650);
  };

  const cls = `${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`;
  const style = { willChange: "transform", transition: "transform .35s cubic-bezier(0.16,1,0.3,1)" };

  if ("href" in props && props.href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={props.href}
        className={cls}
        style={style}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={ripple}
        {...(props.external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={props.type ?? "button"}
      className={cls}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={(e) => {
        ripple(e);
        props.onClick?.();
      }}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );
}
