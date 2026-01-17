import { Link } from "react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = ({ slides }) => {
  return (
    <section className="relative">
      <Carousel
        opts={{
          loop: true,
          align: "start",
        }}
        className="mx-auto w-full max-w-7xl overflow-hidden xl:mt-5 xl:rounded-lg"
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-105 sm:h-120 md:h-140 lg:h-160">
                {/* Background image */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Content */}
                <div className="relative z-10 flex h-full items-center justify-center">
                  <div className="mx-auto max-w-xl px-4 text-center">
                    <h1 className="mb-4 text-3xl leading-tight font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
                      {slide.title}
                    </h1>

                    <p className="mx-auto mb-6 max-w-md text-base text-white/80 sm:text-lg md:text-xl">
                      {slide.subtitle}
                    </p>

                    <div className="flex justify-center">
                      <Button asChild size="lg" className="gap-2">
                        <Link to={slide.link}>
                          {slide.cta}
                          <ArrowRight size={18} />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Controls */}
        <CarouselPrevious className="left-4 hidden md:flex" />
        <CarouselNext className="right-4 hidden md:flex" />
      </Carousel>
    </section>
  );
};

export default HeroSection;
