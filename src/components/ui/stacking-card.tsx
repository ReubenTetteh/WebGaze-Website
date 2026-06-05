'use client';
// stacking-card.tsx — adapted for WebGaze:
//  • imports framer-motion (not the `motion` package) to avoid a duplicate bundle
//  • the background grid/graph-paper overlay was removed (brand rule: no grid lines)
//  • the intro hero + "ui-layout" footer are optional, so it can sit under a shared header
import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll, MotionValue } from 'framer-motion';
import { useRef, forwardRef } from 'react';

export interface ProjectData {
  title: string;
  description: string;
  /** Card image. */
  link: string;
  color: string;
  /** Optional "See more" destination (e.g. a project page). */
  href?: string;
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  url: string;
  color: string;
  href?: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export const Card = ({
  i,
  title,
  description,
  url,
  color,
  href,
  progress,
  range,
  targetScale,
}: CardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className='h-screen flex items-center justify-center sticky top-0'
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={`flex flex-col relative -top-[25%] h-[450px] w-[70%] rounded-md p-10 origin-top text-white`}
      >
        <h2 className='text-2xl text-center font-semibold'>{title}</h2>
        <div className={`flex h-full mt-5 gap-10`}>
          <div className={`w-[40%] relative top-[10%]`}>
            <p className='text-sm'>{description}</p>
            <span className='flex items-center gap-2 pt-2'>
              <a
                href={href ?? '#'}
                className='underline cursor-pointer'
              >
                See more
              </a>
              <svg
                width='22'
                height='12'
                viewBox='0 0 22 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z'
                  fill='currentColor'
                />
              </svg>
            </span>
          </div>

          <div
            className={`relative w-[60%] h-full rounded-lg overflow-hidden `}
          >
            <motion.div
              className={`w-full h-full`}
              style={{ scale: imageScale }}
            >
              <img
                src={url}
                alt={title}
                className='absolute inset-0 w-full h-full object-cover'
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface StackingCardsProps {
  projects: ProjectData[];
  /** Show the built-in slate intro hero. Off when a shared header sits above. */
  showIntro?: boolean;
  /** Show the built-in wordmark footer. */
  showFooter?: boolean;
  /** Intro heading (when showIntro). */
  introTitle?: React.ReactNode;
  /** Footer wordmark (when showFooter). */
  footerWordmark?: string;
  /** Wrap in Lenis smooth scroll. Disable when an ancestor already owns scroll. */
  lenis?: boolean;
}

const StackingCards = forwardRef<HTMLElement, StackingCardsProps>(
  (
    {
      projects,
      showIntro = false,
      showFooter = false,
      introTitle,
      footerWordmark = 'webgaze',
      lenis = true,
    },
    ref,
  ) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
      target: container,
      offset: ['start start', 'end end'],
    });

    const content = (
      <main className='bg-black' ref={container}>
        {showIntro && (
          <section className='text-white h-[70vh] w-full bg-slate-950 grid place-content-center'>
            <h1 className='2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]'>
              {introTitle ?? (
                <>
                  Stacking cards. <br /> Scroll down 👇
                </>
              )}
            </h1>
          </section>
        )}

        <section className='text-white w-full bg-slate-950'>
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                url={project.link}
                title={project.title}
                color={project.color}
                href={project.href}
                description={project.description}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </section>

        {showFooter && (
          <footer className='group bg-slate-950'>
            <h1 className='text-[16vw] translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-gray-400 to-gray-800 bg-clip-text text-transparent transition-all ease-linear'>
              {footerWordmark}
            </h1>
            <div className='bg-black h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full'></div>
          </footer>
        )}
      </main>
    );

    return lenis ? <ReactLenis root>{content}</ReactLenis> : content;
  },
);

StackingCards.displayName = 'StackingCards';

export default StackingCards;
