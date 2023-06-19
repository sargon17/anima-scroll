"use client";
import { useRef, useState } from "react";
import Image from "next/image";

import { inView, scrolledTL } from "@/lib/anima-scroll";

import Rows from "@/components/utils/rows";

export default function Home() {
  const container = useRef(null);

  const [isInView, setIsInView] = useState(false);
  const [scrolled, setScrolled] = useState("");

  window.addEventListener("scroll", () => {
    const containerInView = inView({ ref: container });
    if (containerInView !== isInView) {
      setIsInView(containerInView);
    }

    if (containerInView) {
      const scrolled = scrolledTL({ ref: container });
      setScrolled(scrolled);
    }
  });

  // test git

  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="flex flex-col justify-center items-center mb-16">
        <h1 className="text-4xl font-bold">Anima Scroll</h1>
        <h2 className="text-xl text-center">
          - A simple and lightweight library to animate elements on scroll with Intersection Observer API
        </h2>
      </div>
      <div className=" border-2 border-black rounded-2xl shadow-xl w-full relative overflow-hidden relative mb-4">
        <Image
          src="/image.jpg"
          alt="hero"
          width={1974}
          height={1316}
          className="object-cover "
        />
      </div>
      <div
        ref={container}
        className=" border-2 border-black rounded-2xl shadow-xl w-full relative overflow-hidden relative mb-4"
      >
        <Image
          src="/image.jpg"
          alt="hero"
          width={1974}
          height={1316}
          className="object-cover "
        />

        <Rows />
      </div>
      <div className=" border-2 border-black rounded-2xl shadow-xl w-full relative overflow-hidden relative mb-4">
        <Image
          src="/image.jpg"
          alt="hero"
          width={1974}
          height={1316}
          className="object-cover "
        />
      </div>
      {/* Data Screen */}
      <div className="fixed top-4 right-4 px-6 py-4 bg-white  rounded-xl w-48 z-50  border shadow-2xl">
        <p>
          is in view: <span id="data">{isInView ? "true" : "false"}</span>
        </p>
        <p>
          scrolled: <span id="data">{scrolled ? scrolled : "0"}%</span>
        </p>
      </div>
    </main>
  );
}
