"use client";
import { useEffect, useCallback } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import Button from "@/components/common/Button";
import Image from "next/image";

// import steelImage from "../../../public/images/steel_image.jpg";
import constructionImage from "../../../public/images/allConstruction_image.jpg";
import waterproofingImage from "../../../public/images/waterproofing_image.jpg";
import roadImage from "../../../public/images/road_image.jpg";
import sewerageImage from "../../../public/images/sewerage_image.jpg";
import houseImage from "../../../public/images/house_image.jpg";
import pavorImage from "../../../public/images/pavor_image.jpg";
import shuttringImage from "../../../public/images/shuttring_image.jpg";

const serviceData = {
  // steel: {
  //   title: "Steel Work",
  //   image: steelImage,
  //   description:
  //     "At Zaigam Enterprises, we specialize in high-quality steel work that forms the backbone of robust construction projects. Our expert team handles everything from design and fabrication to installation, ensuring precision and durability at every step.",
  //   features: [
  //     "Custom steel fabrication to exact specifications",
  //     "Structural steel frameworks for buildings and infrastructure",
  //     "Reinforcement steel for concrete structures",
  //     "Architectural metalwork and decorative elements",
  //     "Quality assurance and compliance with international standards",
  //   ],
  //   process: [
  //     "Initial consultation and design planning",
  //     "Detailed engineering and fabrication drawings",
  //     "Precision cutting and fabrication in our facility",
  //     "On-site installation by certified technicians",
  //     "Final inspection and quality assurance",
  //   ],
  // },
  allConstruction: {
    title: "All Construction Work",
    image: constructionImage,
    description:
      "Zaigam Enterprises provides complete construction solutions, covering all aspects of building and infrastructure projects. From foundation to finishing, our experienced team ensures top-quality results for residential, commercial, and industrial projects.",
    features: [
      "Comprehensive building construction and finishing",
      "Plumbing, sanitary, and sewerage system installations",
      "Electrical wiring, fittings, and maintenance",
      "Masonry, carpentry, and concrete works",
      "Waterproofing, painting, and protective coatings",
      "Quality materials and skilled workforce",
    ],
    process: [
      "Initial consultation and project planning",
      "Detailed design and engineering documentation",
      "Execution of all construction trades (civil, plumbing, electrical, etc.)",
      "Regular site supervision and quality monitoring",
      "Final handover with inspection and client satisfaction",
    ],
  },
  waterproofing: {
    title: "Waterproofing",
    image: waterproofingImage,
    description:
      "Our comprehensive waterproofing services protect your structures from water infiltration, preventing damage and extending the lifespan of your buildings. We use the latest technologies and materials to ensure complete protection.",
    features: [
      "Basement and foundation waterproofing",
      "Roof waterproofing and membrane installation",
      "Bathroom and wet area waterproofing",
      "Exterior wall waterproofing",
      "Water tank and reservoir waterproofing",
    ],
    process: [
      "Site inspection and moisture assessment",
      "Customized waterproofing solution design",
      "Surface preparation and repair",
      "Application of waterproofing systems",
      "Quality testing and final inspection",
    ],
  },
  road: {
    title: "Road Construction",
    image: roadImage,
    description:
      "We deliver superior road construction projects that stand the test of time. From highways to local roads, our team ensures every project meets the highest standards of quality, safety, and durability.",
    features: [
      "New road construction and expansion projects",
      "Road rehabilitation and resurfacing",
      "Asphalt and concrete paving solutions",
      "Drainage systems and roadside structures",
      "Traffic management and safety systems",
    ],
    process: [
      "Survey and route planning",
      "Earthwork and subgrade preparation",
      "Base course installation",
      "Paving and surface finishing",
      "Line marking and signage installation",
    ],
  },
  sewerage: {
    title: "Sewerage Systems",
    image: sewerageImage,
    description:
      "Our sewerage system services provide efficient and sustainable waste management solutions. From design to installation, we ensure systems that are reliable, durable, and environmentally responsible.",
    features: [
      "Sewer line design and installation",
      "Wastewater treatment plant construction",
      "Stormwater drainage systems",
      "Pumping stations and lift stations",
      "Sewer inspection and maintenance",
    ],
    process: [
      "Site assessment and system design",
      "Excavation and trenching",
      "Pipe installation and connection",
      "Testing and inspection",
      "Backfilling and site restoration",
    ],
  },
  construction: {
    title: "Construction Work",
    image: houseImage,
    description:
      "We provide complete construction services, turning your dream home into reality. From architectural design to final finishing touches, our team ensures quality craftsmanship and attention to detail at every stage.",
    features: [
      "Custom architectural design and planning",
      "Foundation and structural construction",
      "Electrical, plumbing, and HVAC systems",
      "Interior and exterior finishing",
      "Landscaping and outdoor structures",
    ],
    process: [
      "Initial consultation and requirements gathering",
      "Architectural design and blueprints creation",
      "Permits acquisition and regulatory compliance",
      "Construction phase with regular progress updates",
      "Final inspection and handover",
    ],
  },
  shuttering: {
    title: "Shuttering Work",
    image: shuttringImage,
    description:
      "Our shuttering services provide high-quality formwork solutions for concrete structures. We specialize in creating precise molds that ensure structural integrity and smooth finishes for all types of concrete elements.",
    features: [
      "Custom formwork design for complex structures",
      "High-quality materials for durable shuttering",
      "Precision engineering for accurate dimensions",
      "Efficient assembly and disassembly processes",
      "Safety-focused installation techniques",
    ],
    process: [
      "Structural analysis and formwork design",
      "Material selection and preparation",
      "Formwork fabrication and assembly",
      "Installation and reinforcement placement",
      "Concrete pouring and formwork removal",
    ],
  },
  paving: {
    title: "Paving Services",
    image: pavorImage,
    description:
      "We offer professional paving services for driveways, walkways, patios, and commercial spaces. Our solutions combine durability with aesthetic appeal, enhancing both functionality and visual appeal of your property.",
    features: [
      "Custom design patterns and layouts",
      "Wide range of paving materials and colors",
      "Proper grading and drainage solutions",
      "Durable installation techniques",
      "Low-maintenance finishing options",
    ],
    process: [
      "Site evaluation and design consultation",
      "Material selection and project planning",
      "Ground preparation and base installation",
      "Paver placement and pattern creation",
      "Joint filling and final sealing",
    ],
  },
};

const ServiceModal = ({ serviceId, onClose }) => {
  const service = serviceData[serviceId];

  // ✅ useCallback to avoid unnecessary re-creations
  const handleEscape = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-1 p-2 rounded-full bg-orange-500 hover:bg-gray-200 text-white hover:text-red-600 dark:text-gray-300 z-10"
          aria-label="Close modal"
        >
          <FaTimes />
        </button>

        <div className="p-6 md:p-8">
          {/* Header Image */}
          <div className="relative h-56 md:h-72 mb-6 md:mb-8 rounded-xl overflow-hidden">
            <div className="relative w-full h-auto min-h-full">
              <Image
                fill
                src={service.image}
                alt={service.title}
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 
           (max-width: 1200px) 50vw, 
           33vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 md:p-6">
              <h2 className="text-2xl md:text-4xl font-bold text-white">
                {service.title}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-lg mb-6 text-gray-900 dark:text-white">
              {service.description}
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">
              Key Features
            </h3>
            <ul className="space-y-2 mb-6">
              {service.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start text-gray-900 dark:text-white"
                >
                  <FaCheckCircle className="text-primary-500 mr-2 mt-1 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">
              Our Process
            </h3>
            <ol className="space-y-3">
              {service.process.map((step, index) => (
                <li key={index} className="flex text-gray-900 dark:text-white">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-bold mr-3">
                    {index + 1}
                  </div>
                  <div>{step}</div>
                </li>
              ))}
            </ol>
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <Button onClick={onClose} href="#contact" variant="primary">
              Inquire About This Service
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
