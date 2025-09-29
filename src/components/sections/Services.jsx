// src/components/sections/Services.jsx
"use client";
import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import Button from "@/components/common/Button";
import ServiceModal from "@/components/common/ServiceModal";
import { fadeInUp } from "@/components/utils/animations";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";

import waterproofingImage from "../../../public/images/waterproofing_image.jpg";
import roadImage from "../../../public/images/road_image.jpg";
import sewerageImage from "../../../public/images/sewerage_image.jpg";
import houseImage from "../../../public/images/house_image.jpg";
import pavorImage from "../../../public/images/pavor_image.jpg";
import constructionImage from "../../../public/images/allConstruction_image.jpg";
// import steelImage from "../../../public/images/steel_image.jpg";
// import shuttringImage from "../../../public/images/shuttring_image.jpg";

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = useMemo(
    () => [
      // {
      //   id: "steel",
      //   title: "Steel Work",
      //   description:
      //     "Expert steel fabrication and installation for structural frameworks.",
      //   image: steelImage,
      // },
      {
        id: "allConstruction",
        title: "All Construction Work",
        description:
          "Expert in building and  banglow all construction work",
        image: constructionImage,
      },
      {
        id: "waterproofing",
        title: "Waterproofing",
        description:
          "Advanced waterproofing solutions to protect structures from water damage.",
        image: waterproofingImage,
      },
      {
        id: "road",
        title: "Road Construction",
        description:
          "High-quality road construction services for safe and durable transportation.",
        image: roadImage,
      },
      {
        id: "sewerage",
        title: "Sewerage Systems",
        description:
          "Comprehensive sewerage system design and installation services.",
        image: sewerageImage,
      },
      {
        id: "construction",
        title: "Construction Work",
        description:
          "Complete residential construction services from design to finishing.",
        image: houseImage,
      },
      // {
      //   id: "shuttering",
      //   title: "Shuttering Work",
      //   description:
      //     "Precision shuttering solutions for concrete structures of all sizes.",
      //   image: shuttringImage,
      // },
      {
        id: "paving",
        title: "Paving Services",
        description:
          "Durable and aesthetically pleasing paving solutions for all surfaces.",
        image: pavorImage,
      },
    ],
    []
  );

  const openServiceModal = useCallback((serviceId) => {
    setSelectedService(serviceId);
    setIsModalOpen(true);
  }, []);

  const closeServiceModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedService(null);
  }, []);

  return (
    <section id="services" className="bg-gray-50 dark:bg-gray-900 py-20">
      <Container>
        <SectionTitle
          title="Our Services"
          subtitle="We offer a comprehensive range of construction services tailored to meet the diverse needs of our clients."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.button
              key={service.id}
              type="button"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              onClick={() => openServiceModal(service.id)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl group h-full flex flex-col text-left focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <div className="h-48 relative overflow-hidden flex-shrink-0">
                <div className="relative w-full h-full overflow-hidden group">
                  <Image
                    fill
                    src={service.image}
                    alt={service.title}
                    placeholder="blur"
                    priority={index < 2}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold  text-white">
                    {service.title}
                  </h3>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
                  {service.description}
                </p>
                <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium mt-auto">
                  <span>Learn more</span>
                  <FaArrowRight className="ml-1" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-16 text-center"
        >
          <Button href="#contact" variant="primary">
            Discuss Your Project
          </Button>
        </motion.div>
      </Container>

      {isModalOpen && (
        <ServiceModal serviceId={selectedService} onClose={closeServiceModal} />
      )}
    </section>
  );
};

export default Services;
