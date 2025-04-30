"use client";
import React, { useState, useRef, useEffect } from "react";
import { DATA } from "@/data/resume";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import BlurFade from "@/components/magicui/blur-fade";
import Markdown from "react-markdown";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import TypingText from "@/components/magicui/TypingText";
import { db, collection, addDoc } from "../../firebase";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MagicCard } from "@/components/magicui/magic-card";
import { ShineBorder } from "@/components/magicui/shine-border";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import ReCAPTCHA from "react-google-recaptcha";
import { AnimatedList } from "@/components/magicui/animated-list";
import { ExpandableCard } from "@/components/magicui/expandableCard";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { useTheme } from "next-themes";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// import { BackgroundBeams } from "@/components/ui/background-beams";
// import SplineViewer from "@/components/magicui/SplineViewer";
const BLUR_FADE_DELAY = 0.04;

const Page = () => {
  const [show, setShow] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? DATA.projects : DATA.projects.slice(0, 4);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = 400; // Adjust as needed
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const recaptchaRef = useRef<HTMLElement | null>(null);
  const [captchaToken, setCaptchaToken] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("Please complete the captcha!");
      return;
    }

    console.log("Form data:", formData);

    try {
      // Log the attempt to add data to Firestore
      console.log("Adding data to Firestore...");
      const docRef = await addDoc(collection(db, "contactMessages"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: new Date(),
      });

      console.log("Document written with ID: ", docRef.id);

      // Clear form after submission
      setFormData({ name: "", email: "", message: "" });
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error writing document: ", error);
      alert(`Something went wrong: ${(error as Error).message}`);
    }
  };

  const integrations = [
    { src: "/react-icon.png", alt: "React" },
    { src: "/nextjs-icon.png", alt: "NextJs" },
    { src: "/Typescript-icon.png", alt: "Typescript" },
    { src: "/nodejs.png", alt: "Typescript" },
    { src: "/python.png", alt: "Python" },
    { src: "/Go-Logo.png", alt: "Golang" },
    { src: "/postgre-icon.png", alt: "Postgre Sql" },
    { src: "/docker.png", alt: "Docker" },
    { src: "/kubernet.png", alt: "Kubernete" },
    { src: "/java.png", alt: "Java" },
    { src: "/C++.png", alt: "C++" },
  ];

  const skillsData = integrations.map((item, index) => ({
    id: index + 1,
    name: DATA.skills[index],
    designation: "",
    image: item.src,
  }));

  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { resolvedTheme } = useTheme(); // detects the actual applied theme (light/dark)

  function handleShow() {
    setShow(!show);
  }
  useEffect(() => {
    console.log("Icon Refs:", iconRefs.current);
  }, []); // This logs the refs when they are updated

  return (
    <main className="min-h-screen w-full flex flex-col p-6 ">
      <div
        className="absolute max-md:hidden inset-0 -z-10 overflow-hidden"
        style={{
          left: "10%", // push it slightly right within container limits
        }}
      >
        {/* <BackgroundBeams /> */}
        {/* <div className="max-sm:hidden"><SplineViewer /></div> */}
        <DotLottieReact
          src="https://lottie.host/aea67d5e-1f8c-4eb3-9c1e-7eb05bc6b908/flwEKaCzTc.lottie"
          loop
          autoplay
        />
      </div>
      <section
        id="intro"
        className="w-full flex items-center lg:mt-4 lg:mb-24 justify-between px-6"
      >
        <div className="flex flex-col-reverse justify-between sm:flex-row items-center w-full">
          {/* Text Content */}
          <div className="lg:w-6/12 w-full flex flex-col text-center sm:text-left px-4 sm:px-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-wide leading-tight dark:text-white bg-gradient-to-r from-[#8a2387] via-[#e94057] to-[#f27121] text-transparent bg-clip-text break-words">
              Hi, I&apos;m Nayan 👋
              <br className="" />
              <TypingText
                texts={["Web Developer", "UI/UX Designer"]}
                typingSpeed={90}
                deletingSpeed={50}
                pauseTime={100}
                className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-gradient dark:text-white bg-gradient-to-r from-[#8a2387] via-[#e94057] to-[#f27121] text-transparent bg-clip-text inline-block max-w-full break-words will-change-transform"
              />
            </h1>

            <p className="mt-4 lg:mr-24 text-start text-base sm:text-lg max-sm:text-center">
              {DATA.description}
            </p>

            <div className="flex mt-4 sm:mt-8 gap-6 max-sm:flex-col justify-center sm:justify-start w-full sm:w-auto">
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="max-sm:w-full sm:min-w-[160px] px-4 sm:px-8 py-3 text-white text-sm sm:text-lg font-semibold rounded-full bg-gradient-to-r from-[#6a11cb] to-[#2575fc] shadow-lg hover:opacity-90 transition text-center"
              >
                Contact Me
              </button>
              <a
                href="/Resume-1.pdf"
                download="My_CV.pdf"
                className="max-sm:w-full sm:min-w-[160px]"
              >
                <button className="max-sm:w-full px-4 sm:px-8 py-3 text-white text-sm sm:text-lg font-semibold rounded-full bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] shadow-lg hover:opacity-90 transition text-center">
                  Download CV
                </button>
              </a>
            </div>

            {/* Stats */}
            <div className="mt-4 sm:mt-16 flex sm:justify-between max-sm:justify-center max-sm:text-xs max-sm:w-full max-sm:gap-8 sm:flex-nowrap lg:w-3/4 text-base sm:text-lg whitespace-nowrap gap-x-6">
              <div className="text-center sm:text-left">
                <h2 className="sm:text-3xl font-bold">15yrs+</h2>
                <p>Experience</p>
              </div>
              <div className="text-center sm:text-left">
                <h2 className="sm:text-3xl font-bold">35+</h2>
                <p>Projects</p>
              </div>
              <div className="text-center sm:text-left">
                <h2 className="sm:text-3xl font-bold">20+</h2>
                <p>Hackathon Wins</p>
              </div>
            </div>
          </div>

          <div className="relative w-[200px] h-[200px]  sm:w-[400px] sm:h-[400px] flex justify-center items-center lg:ml-40">
            <CardContainer>
              <CardBody className="w-72 h-72">
                <CardItem
                  translateZ={100}
                  className="rounded-full mt-10 sm:-mt-14 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] justify-self-center overflow-hidden border-[6px] border-white transition-all duration-300 shadow-xl glow-avatar"
                >
                  <Avatar>
                    <AvatarImage
                      src={DATA.avatarUrl}
                      alt="Avatar"
                      className="w-50 h-50 object-cover transition-opacity duration-500 hover:opacity-0"
                    />
                    <AvatarImage
                      src="/Anime.png"
                      alt="Avatar Hover"
                      className="w-50 h-50 object-cover absolute top-0 left-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                    />
                  </Avatar>
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
        </div>
      </section>
      <section id="about" className="mt-24 pb-12 w-12/12 justify-items-center">
        <div className="justify-items-center mb-10 text-center">
          <div className="mb-9">
            <RainbowButton onClick={handleShow}>About</RainbowButton>
          </div>
          <h2 className="text-3xl mb-4 font-bold tracking-tighter sm:text-5xl">
            About Me
          </h2>
          <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"></p>
        </div>
        <BlurFade
          delay={BLUR_FADE_DELAY * 4}
          className="w-11/12 justify-normal"
        >
          <Markdown className="prose max-w-full text-pretty font-sans text-lg text-muted-foreground max-sm:text-center dark:prose-invert">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>
      <section
        id="education"
        className="w-full mt-20 flex flex-col items-center px-4 sm:px-6"
      >
        <div className="justify-items-center mb-10 text-center">
          <div className="mb-9">
            <RainbowButton onClick={handleShow}>Education</RainbowButton>
          </div>
          <h2 className="text-3xl mb-4 font-bold tracking-tighter sm:text-5xl">
            A Journey of Learning{" "}
          </h2>
          <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Education has shaped my problem-solving mindset and technical
            skills, fueling my curiosity and passion for impactful solutions.
          </p>
        </div>

        {show && (
          <AnimatedList delay={1000} className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mx-auto">
              {DATA.education.map((education, id) => (
                <div
                  key={id}
                  className="relative w-full flex flex-col justify-between items-start gap-2 sm:gap-4 p-4 rounded-lg shadow-md border border-gray-700"
                >
                  {/* Top Row: Logo + School/Degree */}
                  <div className="flex items-center justify-between w-full">
                    {/* Logo and Text */}
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200 dark:bg-white flex items-center justify-center shrink-0">
                        <img
                          src={education.logoUrl}
                          alt={education.school}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="text-left">
                        <h3 className="text-sm sm:text-xl font-semibold">
                          {education.school}
                        </h3>
                        <p className="text-xs sm:text-sm">{education.degree}</p>
                      </div>
                    </div>

                    {/* Date (moved inline) */}
                    <p className="absolute top-2 right-2 text-xs sm:text-sm tabular-nums text-muted-foreground whitespace-nowrap">
                      {`${education.start} - ${education.end}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedList>
        )}
      </section>
      <section
        id="skills"
        className="flex flex-col items-center mt-16 px-4 sm:px-6 lg:px-8"
      >
        {DATA.skills.length > 0 ? (
          <div>
            {/* Section Header */}
            <div className="text-center">
              <div className="mt-14 pointer-events-none">
                <RainbowButton>Skills</RainbowButton>
              </div>
              <h2 className="text-3xl mt-4 font-bold tracking-tighter sm:text-4xl md:text-5xl">
                A Versatile Skill Set
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Constantly evolving, my skills span across technologies and
                tools that empower me to build, innovate, and solve complex
                challenges. I believe in continuous learning and adapting to
                stay ahead in the ever-changing tech landscape.
              </p>
            </div>

            {/* Description & Tooltip */}
            <div className="relative flex flex-col items-center justify-center w-full space-y-6 md:space-y-0 md:flex-row md:h-[200px]">
              {/* Ensure AnimatedTooltip doesn't break on mobile */}
              <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-6xl">
                <AnimatedTooltip items={skillsData} />
              </div>
            </div>
          </div>
        ) : null}
      </section>
      <section id="work" className="mt-20">
        {DATA.work.length > 0 ? (
          <div className="justify-items-center">
            <div className="justify-items-center text-center">
              <div className="mb-9 pointer-events-none">
                <RainbowButton>Work Experience</RainbowButton>
              </div>
              <h2 className="text-3xl mb-4 font-bold tracking-tighter sm:text-5xl">
                Turning Ideas into Impact
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Throughout my career, I’ve worked on innovative projects that
                solve real-world problems. Every role has been an opportunity to
                learn, adapt, and contribute to something meaningful—whether
                building scalable solutions, optimizing processes, or driving
                business growth.
              </p>
            </div>
            <div className="mt-10">
              <ExpandableCard cards={DATA.work.map((item) => ({ ...item }))} />
            </div>
          </div>
        ) : null}
      </section>
      <section id="project" className="mt-20">
        {DATA.projects.length > 0 ? (
          <div className="mt-28 justify-items-center">
            <div className="justify-items-center text-center">
              <div className="mb-9 pointer-events-none">
                <RainbowButton>Projects</RainbowButton>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter mb-4 sm:text-5xl">
                Bringing Ideas to Life
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                My projects showcase creativity, problem-solving, and a drive to
                build impactful solutions, constantly refining skills and
                pushing boundaries.
              </p>
            </div>
            <div className="grid mt-9 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 items-stretch">
              {displayedProjects.map((project, index) => {
                return (
                  <CardContainer
                    key={index}
                    className="w-full h-full inter-var"
                  >
                    <CardBody className="flex flex-col h-full bg-gray-50 relative group/card dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] rounded-xl p-6 border">
                      <CardItem
                        as="h2"
                        translateZ="50"
                        className="text-2xl font-bold text-neutral-600 dark:text-white"
                      >
                        {project.title}
                      </CardItem>
                      <CardItem
                        as="p"
                        translateZ="60"
                        className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                      >
                        {project.dates}
                      </CardItem>
                      <CardItem
                        as="span"
                        translateZ="60"
                        className="text-neutral-500 text-sm mt-2 text-justify dark:text-neutral-300 flex-1"
                      >
                        <Markdown>{project.description}</Markdown>
                      </CardItem>
                      <CardItem
                        translateZ="60"
                        className="text-neutral-100 text-sm mt-2 dark:text-neutral-200 flex flex-wrap gap-1"
                      >
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 mx-1 my-1 text-[10px]  bg-slate-800 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </CardItem>
                      {project.video && (
                        <CardItem
                          translateZ="100"
                          className="w-full mt-4 overflow-hidden"
                        >
                          <video
                            src={project.video}
                            controls
                            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                          />
                        </CardItem>
                      )}
                    </CardBody>
                  </CardContainer>
                );
              })}
            </div>
            {DATA.projects.length > 4 && (
              <div className="mt-2 flex justify-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="px-2 py-1 text-white bg-black dark:bg-white dark:text-black rounded-lg font-semibold transition"
                >
                  {showAll ? "Hide" : "View More"}
                </button>
              </div>
            )}
          </div>
        ) : null}
      </section>
      <section id="hackathons" className="mt-20">
        {DATA.hackathons.length > 0 ? (
          <div className="mt-20">
            <div className="justify-items-center text-center">
              <div className="mb-9 pointer-events-none">
                <RainbowButton>Hackathons</RainbowButton>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                I like building things
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                During my time in university, I attended{" "}
                {DATA.hackathons.length}+ hackathons. People from around the
                country would come together and build incredible things in 2-3
                days. It was eye-opening to see the endless possibilities
                brought to life by a group of motivated and passionate
                individuals.
              </p>
            </div>
            <div>
              <InfiniteMovingCards
                items={[...DATA.hackathons]}
                direction="left"
                speed="slow"
                pauseOnHover={true}
              />
            </div>
          </div>
        ) : null}
      </section>
      <section id="certificates" className="mt-20">
        {DATA.certifications.length > 0 ? (
          <div className="mt-20 justify-items-center">
            <div className="justify-items-center text-center">
              <div className="mb-9 pointer-events-none">
                <RainbowButton>Certificates</RainbowButton>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                I love learning new technologies
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                During university, I completed over {DATA.certifications.length}{" "}
                courses, gaining hands-on experience with emerging technologies
                and expanding my perspective on innovation in tech.
              </p>
            </div>
            <div className="relative w-full px-4">
              {/* Arrow Buttons */}
              <button
                onClick={() => scroll("left")}
                className="absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-black transition"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 hover:bg-black transition"
              >
                <ChevronRight size={24} />
              </button>

              {/* Scrollable container */}
              <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-6 scroll-smooth scrollbar-hide py-6 px-8"
              >
                {DATA.certifications.map((card, idx) => (
                  <MagicCard
                    key={`${card.title}-${idx}`}
                    className="flex-shrink-0 w-full max-w-[400px] rounded-2xl border-2 border-black bg-slate-100 p-6 dark:border-zinc-700 dark:bg-[linear-gradient(180deg,#27272a,#18181b)]"
                    gradientSize={180}
                    gradientColor="#262626"
                    gradientOpacity={0.7}
                    gradientFrom="#9E7AFF"
                    gradientTo="#FE8BBB"
                  >
                    <div className="relative w-full h-[250px] sm:h-[280px] md:h-[300px] overflow-hidden rounded-2xl group">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-all duration-300 group-hover:brightness-100"
                        style={{ backgroundImage: `url(${card.imageUrl})` }}
                      />
                      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 opacity-100 group-hover:opacity-100">
                        <h3 className="text-white text-lg sm:text-xl font-extrabold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          {card.title}
                        </h3>
                        <p className="text-white text-xs sm:text-sm mt-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          issued by {card.issuer}
                        </p>
                        <p className="text-white text-xs sm:text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          {card.date}
                        </p>
                      </div>
                    </div>
                  </MagicCard>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </section>
      <section id="contact" className="mt-20">
        <div className="mt-20">
          <div className="justify-items-center">
            <div className="mb-9 pointer-events-none">
              <RainbowButton> Contact </RainbowButton>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Get in Touch
            </h2>
            <p className="mx-auto w-3/4 text-muted-foreground md:text-xl/relaxed text-center lg:text-base/relaxed xl:text-xl/relaxed">
              Want to chat? Just shoot me a dm{" "}
              <Link
                href={DATA.contact.social.X.url}
                className="text-blue-500 hover:underline"
              >
                with a direct question on twitter
              </Link>{" "}
              and I&apos;ll respond whenever I can. I will ignore all
              soliciting.
            </p>
          </div>
          <div className="relative mt-10 max-w-lg mx-auto p-6 bg-customGray dark:bg-black rounded-xl border border-slate-300 dark:border-gray-700 shadow-lg">
            <ShineBorder
              borderWidth={1}
              duration={10}
              shineColor={["#f23777", "#6f3cf5", "#f09c47"]}
            />

            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
              Contact Me
            </h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-black dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-3 border rounded-lg  bg-gray-100 dark:bg-transparent dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-3 border rounded-lg  bg-gray-100 dark:bg-transparent dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-gray-300">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full mt-1 p-3 border rounded-lg bg-gray-100 dark:bg-transparent dark:text-white"
                ></textarea>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4 rounded">
                <div className="scale-[0.85] md:scale-100 origin-top">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LdQ1QwrAAAAAECqMtX0qJDxYzvJ7xgfwJIzSFGy"
                    theme={resolvedTheme}
                    onChange={(token: string | null) =>
                      setCaptchaToken(token || "")
                    }
                  />
                </div>
              </div>
              <div className=" justify-self-center">
                <button
                  type="submit"
                  className="p-3 dark:text-black font-bold dark:bg-white bg-black text-white rounded-lg transition"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
