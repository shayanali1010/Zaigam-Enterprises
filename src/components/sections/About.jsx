// src/components/sections/About.jsx
"use client";
import { motion } from 'framer-motion';
import Container from '@/components/common/Container';
import { fadeInUp } from '@/components/utils/animations'; // Fixed import path
import Image from 'next/image';
import aboutImage from '../../../public/images/about_image.jpg'

const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <Container>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative"
            >
              <Image
                height='100%'
                width='100%'
                src={aboutImage} 
                alt="Construction" 
                className="rounded-xl shadow-xl w-full"
              />
              <div className="absolute inset-0 bg-primary-500/20 rounded-xl"></div>
            </motion.div>
          </div>
          <div className="md:w-1/2 md:pl-12">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About Zaigam Enterprises</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                At Zaigam Enterprises, we are committed to transforming visions into reality through exceptional construction services. Specializing in steel work, waterproofing, road construction, and sewerage systems, we pride ourselves on delivering high-quality solutions that meet the highest standards.
              </p>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-primary-600 dark:text-primary-400">Our Mission</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  To deliver high-quality, sustainable construction solutions that enhance infrastructure and build lasting communities.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary-600 dark:text-primary-400">Our Vision</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  To be the leading construction company, recognized for our innovation, excellence, and commitment to shaping a better tomorrow.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;