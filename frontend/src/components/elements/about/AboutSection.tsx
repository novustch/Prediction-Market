import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AboutSectionProps {
  selectedIndex: number;
}

const aboutAnswers = [
  {
    title: "What is Speculape?",
    content: [
      "Speculape is a decentralized prediction market platform where users can forecast outcomes on real-world events—such as sports, crypto, politics, and more—and earn rewards for accurate predictions. It leverages blockchain technology for transparency, security, and community-driven markets.",
      "Unlike traditional betting or centralized prediction sites, Speculape empowers its community to create, participate in, and resolve markets. This means anyone can propose a new event, and the wisdom of the crowd determines the odds and outcomes. Our platform is designed to be accessible, intuitive, and open to everyone, regardless of experience level.",
    ],
  },
  {
    title: "How do prediction markets work?",
    content: [
      "Prediction markets allow users to buy and sell shares in the outcome of future events. If your prediction is correct, you earn a payout. Prices reflect the collective wisdom of the market, and all trades are recorded on-chain for transparency and fairness.",
      "On Speculape, each market has a YES and NO side. As users buy shares, the price adjusts to reflect the perceived probability of each outcome. This dynamic pricing means the market odds are always up-to-date, and you can buy or sell your position at any time before the event resolves. All settlements are handled automatically by smart contracts.",
    ],
  },
  {
    title: "Is Speculape safe and secure?",
    content: [
      "Yes. Speculape uses blockchain and smart contracts to ensure all trades are transparent, tamper-proof, and automated. User funds are protected by decentralized protocols, and all market outcomes are resolved fairly and openly.",
      "We never take custody of your funds—everything is managed by secure, audited smart contracts. Our code is open source, and all transactions are visible on the blockchain. We also have robust dispute resolution and community governance to ensure markets are fair and trustworthy.",
    ],
  },
  {
    title: "How do I participate?",
    content: [
      "To participate, simply sign up, connect your wallet, and explore available markets. You can buy shares in outcomes you believe will happen, create your own markets, and track your performance—all from an intuitive dashboard.",
      "Getting started is easy: just connect a supported crypto wallet, deposit funds, and browse the list of active markets. You can filter by category, popularity, or closing time. If you have an idea for a new market, you can propose it and invite others to trade on it. Our help center and community forums are always available if you need assistance.",
    ],
  },
  {
    title: "What can I predict on Speculape?",
    content: [
      "You can predict on a wide range of topics, including sports results, cryptocurrency prices, political events, entertainment, and more. New markets are added regularly, and you can even propose your own event for the community to trade on.",
      "Our platform is constantly evolving, with trending and custom markets created by users like you. Whether you want to forecast the outcome of a major election, the next big crypto move, or the winner of a global sports event, Speculape has a market for you. We encourage creativity and diversity in market creation.",
    ],
  },
  {
    title: "How does Speculape make money?",
    content: [
      "Speculape charges a small fee on trades and market settlements. This fee helps maintain the platform, incentivize liquidity, and fund ongoing development. All fees are transparently displayed and kept as low as possible for users.",
      "We believe in transparency and fairness. Our fee structure is simple and competitive, with no hidden costs. A portion of the fees is reinvested into platform improvements, community rewards, and security audits to ensure the best possible experience for all users.",
    ],
  },
];

const AboutSection: React.FC<AboutSectionProps> = ({ selectedIndex }) => {
  const section = aboutAnswers[selectedIndex];
  const answerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (answerRef.current && window.innerWidth < 768) {
      answerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedIndex]);

  return (
    <div className="flex-1 py-4 md:py-6 flex flex-col justify-start items-start gap-8 md:gap-14 lg:max-h-[80vh] h-auto overflow-y-auto w-full">
      <div className="w-full flex flex-col justify-start items-start gap-2 md:gap-4">
        <div className="text-white text-2xl md:text-5xl font-bold font-['Rubik'] leading-tight md:leading-[48px]">
          {section.title}
        </div>
        <div className="w-full flex flex-col justify-start items-start gap-6 md:gap-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              ref={answerRef}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full max-w-5xl ml-0 bg-[#181a1b] rounded-2xl shadow-lg p-6 md:p-10 px-4 mt-2 md:mt-4"
            >
              {section.content.map((paragraph, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 * idx, ease: "easeOut" }}
                  className={`w-full bg-[#202325] rounded-xl p-4 md:p-6 mb-4 shadow text-[#838587] text-base md:text-xl font-normal font-['Rubik'] leading-7 ${idx === section.content.length - 1 ? 'mb-0' : ''}`}
                >
                  {paragraph}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export { AboutSection };
