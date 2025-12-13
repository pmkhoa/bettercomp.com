'use client';
import '@fancyapps/ui/dist/carousel/carousel.thumbs.css';
import '@fancyapps/ui/dist/carousel/carousel.autoplay.css';
import '@fancyapps/ui/dist/carousel/carousel.css';

import { Carousel } from '@fancyapps/ui';
import { Autoplay } from '@fancyapps/ui/dist/carousel/carousel.autoplay.esm.js';
import { Thumbs } from '@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js';
import type { OptionsType } from '@fancyapps/ui/types/Carousel/options';
import type { PropsWithChildren } from 'react';
import { useEffect, useRef } from 'react';

interface Props {
  options?: Partial<OptionsType>;
  slides?: any[];
  showPagiInfo?: boolean;
  onChangeComplete?: (page: number) => void;
}

const defaults: Partial<OptionsType> = {
  Dots: {
    minCount: 2,
  },
  Navigation: {
    nextTpl: `<svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="69" height="69" fill="#131720" stroke="#3A495E"/>
<path d="M21 33.1694H45.9339V36.3863H21V33.1694Z" fill="#FB8722"/>
<path d="M39.0188 45.5571L36.7656 43.304L45.2926 34.7786L36.7656 26.2531L39.0188 24L49.7958 34.7786L39.0188 45.5571Z" fill="#FB8722"/>
</svg>`,
    prevTpl: `<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
			<rect x="0.5" y="0.5" width="69" height="69" fill="#131720" stroke="#3A495E"/>
			<path d="M49 36.8306H24.0661V33.6137H49V36.8306Z" fill="#FB8722"/>
				<path d="M30.9812 24.4429L33.2344 26.696L24.7074 35.2214L33.2344 43.7469L30.9812 46L20.2042 35.2214L30.9812 24.4429Z" fill="#FB8722"/>
			</svg>`,
  },
  Autoplay: {
    // @ts-expect-error: expect error
    isEnabled: false,
    pauseOnHover: false,
    showProgressbar: false,
  },
  Thumbs: { type: 'classic' },
  transition: 'slide',
  infinite: true,
};

function CarouselWrapper(props: PropsWithChildren<Props>) {
  const containerRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const options = {
      ...defaults,
      ...(props.options || {}),
      on: {
        change: (instance: any) => {
          // Current page
          if (props.onChangeComplete) {
            props.onChangeComplete(instance.page);
          }
        },
        click: (instance: any) => {
          instance.updateMetrics();
          //instance.slideNext();
        },
      },
    };

    const instance = new Carousel(container, options, { Thumbs, Autoplay });
    const navContainer = navRef.current;

    if (navContainer) {
      const navOptions = {
        Dots: false,
        Navigation: false,
        infinite: false,
        gap: 20,
        slidesPerPage: 4,
        Sync: {
          target: instance,
        },
      };
      new Carousel(navContainer, navOptions);
    }
  });

  return (
    <div className="carousel-container">
      <div className="f-carousel" ref={containerRef}>
        {props.children}
      </div>

      {props.slides && (
        <div className={`text-white nav-wrapper nav-sync`} ref={navRef}>
          {props.slides.map((slide) => {
            const { slideTitle } = slide;
            return (
              <div className="f-carousel__slide f-carousel__thumb" key={slide._key} role="button">
                <div className="name">{slideTitle}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CarouselWrapper;
