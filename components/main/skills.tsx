"use client";

import { motion } from "framer-motion";
import { SkillDataProvider } from "@/components/sub/skill-data-provider";
import { SkillText } from "@/components/sub/skill-text";

// Organized skill categories without duplicates - with color glow
const FRONTEND_SKILLS = [
  { skill_name: "HTML", image: "html.png", width: 56, height: 56, color: "227,76,38" }, // HTML orange
  { skill_name: "Tailwind CSS", image: "tailwind.png", width: 56, height: 56, color: "56,189,248" }, // Tailwind blue
  { skill_name: "JavaScript", image: "js.png", width: 56, height: 56, color: "247,223,30" }, // JS yellow
  { skill_name: "TypeScript", image: "ts.png", width: 56, height: 56, color: "49,120,198" }, // TS blue
  { skill_name: "React", image: "react.png", width: 56, height: 56, color: "97,218,251" }, // React cyan
  { skill_name: "Next.js", image: "next.png", width: 56, height: 56, color: "255,255,255" }, // Next white
  
];

const BACKEND_SKILLS = [
  { skill_name: "Node.js", image: "node.png", width: 56, height: 56, color: "102,159,99" }, // Node green
  { skill_name: "Express.js", image: "express.png", width: 56, height: 56, color: "255,255,255" }, // Express white
  { skill_name: "MongoDB", image: "mongodb.png", width: 56, height: 56, color: "67,153,52" }, // Mongo green
  { skill_name: "Firebase", image: "firebase.png", width: 56, height: 56, color: "255,202,40" }, // Firebase yellow
  { skill_name: "MySQL", image: "mysql.png", width: 56, height: 56, color: "0,117,143" }, // MySQL blue
];

const TOOLS_SKILLS = [
  { skill_name: "Git", image: "git.png", width: 56, height: 56, color: "240,80,50" }, // Git orange-red
  { skill_name: "Docker", image: "docker.png", width: 56, height: 56, color: "33,150,243" }, // Docker blue
  { skill_name: "Power BI", image: "powerbi.png", width: 56, height: 56, color: "242,196,50" }, // Power BI yellow
];

const EXPLORING_SKILLS = [
  { skill_name: "Framer Motion", image: "framer.png", width: 56, height: 56, color: "168,85,247" }, // Framer purple
  { skill_name: "Go", image: "go.png", width: 56, height: 56, color: "0,173,216" }, // Go cyan
];

export const Skills = () => {
  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-visible py-20 px-6 pb-32"
    >
      <SkillText />

      <div className="w-full max-w-6xl mx-auto space-y-8 overflow-visible pb-20">
        {/* Frontend Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-6 md:mb-8 overflow-visible"
        >
          <h3 className="text-2xl font-bold text-white/80 tracking-wide text-center mb-6">Frontend</h3>
          <div className="relative flex justify-center overflow-visible">
            {/* Orbit background */}
            <div className="absolute w-[320px] h-[320px] rounded-full border border-purple-500/10 animate-spin-slow" />
            <div className="flex flex-row justify-center flex-wrap gap-6 items-center z-10 overflow-visible">
              {FRONTEND_SKILLS.map((skill, i) => (
                <SkillDataProvider
                  key={skill.skill_name}
                  src={skill.image}
                  name={skill.skill_name}
                  width={skill.width}
                  height={skill.height}
                  index={i}
                  color={skill.color}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Backend Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-6 md:mb-8 overflow-visible"
        >
          <h3 className="text-2xl font-bold text-white/80 tracking-wide text-center mb-6">Backend</h3>
          <div className="relative flex justify-center overflow-visible">
            <div className="absolute w-[280px] h-[280px] rounded-full border border-cyan-500/10 animate-spin-slow" />
            <div className="flex flex-row justify-center flex-wrap gap-6 items-center z-10 overflow-visible">
              {BACKEND_SKILLS.map((skill, i) => (
                <SkillDataProvider
                  key={skill.skill_name}
                  src={skill.image}
                  name={skill.skill_name}
                  width={skill.width}
                  height={skill.height}
                  index={i}
                  color={skill.color}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tools & Ecosystem Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-6 md:mb-8 overflow-visible"
        >
          <h3 className="text-2xl font-bold text-white/80 tracking-wide text-center mb-6">Tools & Ecosystem</h3>
          <div className="relative flex justify-center overflow-visible">
            <div className="absolute w-[320px] h-[320px] rounded-full border border-pink-500/10 animate-spin-slow" />
            <div className="flex flex-row justify-center flex-wrap gap-6 items-center z-10 overflow-visible">
              {TOOLS_SKILLS.map((skill, i) => (
                <SkillDataProvider
                  key={skill.skill_name}
                  src={skill.image}
                  name={skill.skill_name}
                  width={skill.width}
                  height={skill.height}
                  index={i}
                  color={skill.color}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Currently Exploring Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-6 md:mb-8 overflow-visible"
        >
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 tracking-wide text-center mb-6">
            Currently Exploring
          </h3>
          <div className="relative flex justify-center overflow-visible">
            <div className="absolute w-[240px] h-[240px] rounded-full border border-purple-500/20 animate-spin-slow" />
            <div className="flex flex-row justify-center flex-wrap gap-6 items-center z-10 overflow-visible">
              {EXPLORING_SKILLS.map((skill, i) => (
                <SkillDataProvider
                  key={skill.skill_name}
                  src={skill.image}
                  name={skill.skill_name}
                  width={skill.width}
                  height={skill.height}
                  index={i}
                  color={skill.color}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
