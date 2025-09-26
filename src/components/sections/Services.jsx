// src/components/sections/Services.jsx
"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';
import Button from '@/components/common/Button';
import ServiceModal from '@/components/common/ServiceModal';
import { fadeInUp } from '@/components/utils/animations';
import { FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';
import steelImage from '../../../public/images/steel_image.jpg';
import waterproofingImage from '../../../public/images/waterproofing_image.jpg';
import roadImage from '../../../public/images/road_image.jpg';
import sewerageImage from '../../../public/images/sewerage_image.jpg';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = [
    {
      id: 'steel',
      title: 'Steel Work',
      description: 'Expert steel fabrication and installation for structural frameworks.',
      image: steelImage,
    },
    {
      id: 'waterproofing',
      title: 'Waterproofing',
      description: 'Advanced waterproofing solutions to protect structures from water damage.',
      image: waterproofingImage,
    },
    {
      id: 'road',
      title: 'Road Construction',
      description: 'High-quality road construction services for safe and durable transportation.',
      image: roadImage,
    },
    {
      id: 'sewerage',
      title: 'Sewerage Systems',
      description: 'Comprehensive sewerage system design and installation services.',
      image: sewerageImage,
    },
  ];

  const openServiceModal = (serviceId) => {
    setSelectedService(serviceId);
    setIsModalOpen(true);
  };

  const closeServiceModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900">
      <Container>
        <SectionTitle 
          title="Our Services" 
          subtitle="We offer a comprehensive range of construction services tailored to meet the diverse needs of our clients."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer group"
              onClick={() => openServiceModal(service.id)}
            >
              <div className="h-48 relative overflow-hidden">
                <Image
                  fill 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
                <div className="mt-4 flex items-center text-primary-600 dark:text-primary-400 font-medium">
                  <span>Learn more</span>
                  <FaArrowRight className="fas fa-arrow-right ml-1"/>
                </div>
              </div>
            </motion.div>
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
        <ServiceModal 
          serviceId={selectedService} 
          onClose={closeServiceModal} 
        />
      )}
    </section>
  );
};

export default Services;