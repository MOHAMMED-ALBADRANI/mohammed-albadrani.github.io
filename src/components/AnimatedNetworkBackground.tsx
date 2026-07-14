"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function AnimatedNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number>(0);
  const { resolvedTheme } = useTheme();
  const themeRef = useRef(resolvedTheme);

  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  const nodeCount = isMobile ? 25 : 50;
  const connectionDistance = isMobile ? 120 : 180;

  const initNodes = useCallback(
    (width: number, height: number) => {
      const nodes: Node[] = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
        });
      }
      nodesRef.current = nodes;
    },
    [nodeCount]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (nodesRef.current.length === 0) {
        initNodes(canvas.width, canvas.height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    if (prefersReducedMotion) {
      // Draw static frame
      const isDark = themeRef.current === "dark";
      const nodeColor = isDark
        ? "rgba(56, 189, 248, 0.2)"
        : "rgba(100, 116, 139, 0.2)";
      const lineColor = isDark
        ? "rgba(56, 189, 248, 0.05)"
        : "rgba(100, 116, 139, 0.05)";

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nodes = nodesRef.current;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.5;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
      });

      return () => window.removeEventListener("resize", resize);
    }

    const animate = () => {
      if (!ctx || !canvas) return;

      const isDark = themeRef.current === "dark";
      const nodeColor = isDark
        ? "rgba(56, 189, 248, 0.25)"
        : "rgba(100, 116, 139, 0.25)";
      const lineColor = isDark
        ? "rgba(56, 189, 248, 0.06)"
        : "rgba(100, 116, 139, 0.06)";

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nodes = nodesRef.current;

      // Update positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            const opacity = 1 - dist / connectionDistance;
            ctx.beginPath();
            ctx.strokeStyle = isDark
              ? `rgba(56, 189, 248, ${0.06 * opacity})`
              : `rgba(100, 116, 139, ${0.06 * opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [prefersReducedMotion, initNodes, connectionDistance]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
