"use client";
import { use, useEffect, useRef, useState } from "react";
import Image from "next/image";

import { inView, TL } from "@/lib/anima-scroll";

import Rows from "@/components/utils/rows";

export default function Home() {
  const container = useRef(null);

  const [isInView, setIsInView] = useState(false);
  const [entered, setEntered] = useState(0 as number);
  const [exited, setExited] = useState(0 as number);
  const [fullMotion, setFullMotion] = useState(0 as number);

  const tl = new TL({ ref: container });

  window.addEventListener("scroll", () => {
    const containerInView = inView({ ref: container });
    if (containerInView !== isInView) {
      setIsInView(containerInView);
    }

    if (containerInView) {
      setEntered(tl.entering());
      setExited(tl.exiting());
      setFullMotion(tl.fullMotion());
    }
  });

  const containerClass = () => {
    let base =
      "border-2 border-black rounded-2xl shadow-xl w-full relative overflow-hidden relative my-12 h-[600px] ";

    return base;
  };

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
        className={containerClass()}
        style={{
          transform: `translateY(-${fullMotion / 4}%)`,
          height: `${600 - fullMotion * 0.2}px`,
        }}
      >
        <Image
          src="/image.jpg"
          alt="hero"
          width={1974}
          height={1316}
          className="object-cover relative z-10"
          style={{
            transform: `translateY(-${fullMotion / 10}%) `,
          }}
        />

        {/* <Rows /> */}
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
          Entered: <span id="data">{entered ? entered : "0"}%</span>
        </p>
        <p>
          Exited: <span id="data">{exited ? exited : "0"}%</span>
        </p>
        <p>
          Full Motion: <span id="data">{fullMotion ? fullMotion : "0"}%</span>
        </p>
      </div>
    </main>
  );
}
