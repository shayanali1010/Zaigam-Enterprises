// src/components/sections/Team.jsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { fadeInUp } from "@/components/utils/animations";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";

// import ceoImage from "../../../public/images/ceo_image.jpg";
import cooImage from "../../../public/images/coo_image.png";
import ceoImage1 from "../../../public/images/ceo_image1.jpg";
import partnerImage from "../../../public/images/partner_image.png";

const Team = () => {
  const [flippedCard, setFlippedCard] = useState(null);

  const teamMembers = [
    {
      id: "mujtaba",
      name: "Mujtaba Haider",
      position: "Chief Executive Officer (CEO)",
      image: ceoImage1,
      bio: "Mujtaba leads our company with a strong vision for innovation and a commitment to excellence in the construction industry.",
      email: "mujtabahyder575@gmail.com",
    },
    {
      id: "raza",
      name: "Raza Haider",
      position: "Chief Operating Officer (COO)",
      image: cooImage,
      bio: "Raza oversees our operations with a focus on efficiency, quality, and timely delivery of all our projects.",
      email: "contact@zaigam.com",
    },
    {
      id: "grand-partner",
      name: "Grand Partner",
      position: "Construction Partner",
      image: partnerImage,
      bio: "Our Grand Partner collaborates with Zaigam Enterprises to deliver large-scale construction projects with reliability, expertise, and unmatched quality standards.",
      email: "info@grandpartner.com",
    },
  ];

  const handleCardClick = (id) => {
    setFlippedCard(flippedCard === id ? null : id);
  };

  return (
    <section id="team" className="bg-white dark:bg-gray-800">
      <Container className="py-10">
        <SectionTitle
          title="Our Leadership"
          subtitle="Meet the leaders who drive our vision of excellence in construction."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="perspective-1000 h-96 cursor-pointer"
              onClick={() => handleCardClick(member.id)}
            >
              <div
                className={`card-3d relative w-full h-full preserve-3d ${
                  flippedCard === member.id ? "flipped" : ""
                }`}
              >
                {/* Front of card */}
                <div className="card-front absolute w-full h-full backface-hidden bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 flex flex-col items-center text-center">
                  <div className="w-40 h-40 mb-6 overflow-hidden rounded-full relative">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-2xl text-gray-900 dark:text-white font-bold mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 mb-4">
                    {member.position}
                  </p>
                  <div className="mt-auto">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Tap to learn more
                    </p>
                    <div className="flex justify-center space-x-3">
                      <span className="text-gray-600 dark:text-gray-400">
                        <FaLinkedin className="text-xl text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400" />
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        <FaXTwitter className="text-xl text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400" />
                      </span>
                      <a
                        href={`mailto:${member.email}`}
                        className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                      >
                        <FaEnvelope className="text-xl" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div className="card-back absolute w-full h-full backface-hidden bg-primary-600 text-white rounded-xl shadow-xl p-8 flex flex-col justify-center items-center text-center">
                  <h3 className="text-2xl font-bold mb-4">{member.name}</h3>
                  <p className="text-lg mb-6">{member.position}</p>
                  <p className="mb-6">{member.bio}</p>
                  <button
                    type="button"
                    onClick={() => setFlippedCard(null)}
                    className="px-4 py-2 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    Back to Profile
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Team;
