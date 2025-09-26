// src/components/common/ServiceModal.jsx
import { useEffect } from 'react';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import Button from '@/components/common/Button';
import steelImage from '../../../public/images/steel_image.jpg';
import waterproofingImage from '../../../public/images/waterproofing_image.jpg';
import roadImage from '../../../public/images/road_image.jpg';
import sewerageImage from '../../../public/images/sewerage_image.jpg';
import Image from 'next/image';

const ServiceModal = ({ serviceId, onClose }) => {
  const serviceData = {
    steel: {
      title: 'Steel Work',
      image: steelImage,
      description: 'At Zaigam Enterprises, we specialize in high-quality steel work that forms the backbone of robust construction projects. Our expert team handles everything from design and fabrication to installation, ensuring precision and durability at every step.',
      features: [
        'Custom steel fabrication to exact specifications',
        'Structural steel frameworks for buildings and infrastructure',
        'Reinforcement steel for concrete structures',
        'Architectural metalwork and decorative elements',
        'Quality assurance and compliance with international standards'
      ],
      process: [
        'Initial consultation and design planning',
        'Detailed engineering and fabrication drawings',
        'Precision cutting and fabrication in our facility',
        'On-site installation by certified technicians',
        'Final inspection and quality assurance'
      ]
    },
    waterproofing: {
      title: 'Waterproofing',
      image: waterproofingImage,
      description: 'Our comprehensive waterproofing services protect your structures from water infiltration, preventing damage and extending the lifespan of your buildings. We use the latest technologies and materials to ensure complete protection.',
      features: [
        'Basement and foundation waterproofing',
        'Roof waterproofing and membrane installation',
        'Bathroom and wet area waterproofing',
        'Exterior wall waterproofing',
        'Water tank and reservoir waterproofing'
      ],
      process: [
        'Site inspection and moisture assessment',
        'Customized waterproofing solution design',
        'Surface preparation and repair',
        'Application of waterproofing systems',
        'Quality testing and final inspection'
      ]
    },
    road: {
      title: 'Road Construction',
      image: roadImage,
      description: 'We deliver superior road construction projects that stand the test of time. From highways to local roads, our team ensures every project meets the highest standards of quality, safety, and durability.',
      features: [
        'New road construction and expansion projects',
        'Road rehabilitation and resurfacing',
        'Asphalt and concrete paving solutions',
        'Drainage systems and roadside structures',
        'Traffic management and safety systems'
      ],
      process: [
        'Survey and route planning',
        'Earthwork and subgrade preparation',
        'Base course installation',
        'Paving and surface finishing',
        'Line marking and signage installation'
      ]
    },
    sewerage: {
      title: 'Sewerage Systems',
      image: sewerageImage,
      description: 'Our sewerage system services provide efficient and sustainable waste management solutions. From design to installation, we ensure systems that are reliable, durable, and environmentally responsible.',
      features: [
        'Sewer line design and installation',
        'Wastewater treatment plant construction',
        'Stormwater drainage systems',
        'Pumping stations and lift stations',
        'Sewer inspection and maintenance'
      ],
      process: [
        'Site assessment and system design',
        'Excavation and trenching',
        'Pipe installation and connection',
        'Testing and inspection',
        'Backfilling and site restoration'
      ]
    }
  };

  const service = serviceData[serviceId];

  useEffect(() => {
    // Close modal when Escape key is pressed
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="modal-backdrop absolute inset-0" onClick={onClose}></div>
      
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-1 p-2 rounded-full bg-orange-500 hover:bg-gray-200 text-white hover:text-red-600 dark:text-gray-300 z-10"
        >
          <FaTimes />
        </button>

        <div className="p-8">
          <div className="relative h-64 md:h-80 mb-8">
            <Image
              fill 
              src={service.image} 
              alt={service.title} 
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <h2 className="text-2xl md:text-4xl font-bold text-white">{service.title}</h2>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-lg mb-6">{service.description}</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Key Features</h3>
            <ul className="space-y-2 mb-6">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <FaCheckCircle  className="text-primary-500 mr-2 mt-1" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Our Process</h3>
            <ol className="space-y-3">
              {service.process.map((step, index) => (
                <li key={index} className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-bold mr-3">
                    {index + 1}
                  </div>
                  <div>{step}</div>
                </li>
              ))}
            </ol>
          </div>
          
          <div className="mt-8 text-center">
            <Button 
              onClick={onClose}
              href="#contact" 
              variant="primary"
            >
              Inquire About This Service
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;