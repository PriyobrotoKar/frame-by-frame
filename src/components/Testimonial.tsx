import Image from "next/image";
import SectionTitle from "./SectionTitle";

type Testimonial = {
  name: string;
  image: string;
  testimonial: string;
};

const testimonials: Testimonial[] = [
  {
    name: "John Doe",
    image: "/instructor1.jpg",
    testimonial:
      "I am so grateful for the opportunity to learn from the best. I am now a professional animator.",
  },
  {
    name: "Jane Smith",
    image: "/instructor1.jpg",
    testimonial:
      "I am so grateful for the opportunity to learn from the best. I am now a professional animator.",
  },
  {
    name: "Alice Johnson",
    image: "/instructor1.jpg",
    testimonial:
      "I am so grateful for the opportunity to learn from the best. I am now a professional animator.",
  },
  {
    name: "Bob Brown",
    image: "/instructor1.jpg",
    testimonial:
      "I am so grateful for the opportunity to learn from the best. I am now a professional animator.",
  },
  {
    name: "Charlie Davis",
    image: "/instructor1.jpg",
    testimonial:
      "I am so grateful for the opportunity to learn from the best. I am now a professional animator.",
  },
  {
    name: "Diana Evans",
    image: "/instructor1.jpg",
    testimonial:
      "I am so grateful for the opportunity to learn from the best. I am now a professional animator.",
  },
  {
    name: "Frank Green",
    image: "/instructor1.jpg",
    testimonial:
      "I am so grateful for the opportunity to learn from the best. I am now a professional animator.",
  },
];
export default function Testimonial() {
  return (
    <section className="max-w-screen-md  mx-auto  space-y-28 overflow-hidden">
      <SectionTitle
        title="Students Who Chose Greatness"
        subtitle="DEFYING LIMITS"
      />
      <div className="relative space-y-4">
        <div className="absolute z-10 left-0  bottom-0 h-full w-40 bg-gradient-to-r from-background  " />
        <div className="absolute z-10 right-0  bottom-0 h-full w-40 bg-gradient-to-l from-background  " />

        <TestimonailMarquee testimonials={testimonials} duration={50} />
        <TestimonailMarquee testimonials={testimonials} duration={35} />
      </div>
    </section>
  );
}

function TestimonailMarquee({
  testimonials,
  duration = 5,
}: {
  testimonials: Testimonial[];
  duration?: number;
}) {
  return (
    <div
      style={{ ["--duration" as string]: `${duration}s` }}
      className="flex w-max  animate-marque will-change-transform"
    >
      {[...testimonials, ...testimonials].map((testimonial, i) => {
        return (
          <div key={i} className="pl-4 w-[24rem] shrink-0 flex-grow ">
            <TestimonialCard testimonial={testimonial} />
          </div>
        );
      })}
    </div>
  );
}

function TestimonialCard({
  testimonial: { testimonial, image, name },
}: {
  testimonial: Testimonial;
}) {
  return (
    <div className="bg-secondary  rounded-lg space-y-2 p-6">
      <div className="flex gap-2 items-center">
        <div className="rounded-full overflow-hidden w-fit size-9">
          <Image src={image} alt="pfp" width={36} height={36} />
        </div>
        <div className="text-xs">{name}</div>
      </div>
      <p className="text-xs">{testimonial}</p>
    </div>
  );
}
