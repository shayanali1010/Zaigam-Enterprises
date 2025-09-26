// src/components/sections/ContactForm.jsx
"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Container from '@/components/common/Container';
import SectionTitle from '@/components/common/SectionTitle';
import Button from '@/components/common/Button';
import { fadeInUp } from '@/components/utils/animations';
import { contactSchema } from '@/components/utils/validation';

const ContactForm = () => {
  const [formMessage, setFormMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Server error:', data);
        throw new Error(data?.error || 'Failed to send message');
      }

      setFormMessage('Thank you for your message! We will get back to you soon.');
      setMessageType('success');
      resetForm();
    } catch (err) {
      console.error(err);
      setFormMessage('Something went wrong. Please try again later.');
      setMessageType('error');
    } finally {
      setSubmitting(false);
      setTimeout(() => {
        setFormMessage('');
        setMessageType('');
      }, 5000);
    }
  };

  const contactInfo = [
    {
      icon: <FaPhone className="text-primary-600 dark:text-primary-400" />,
      title: 'Phone',
      value: '0313-1117066',
      type: 'phone'
    },
    {
      icon: <FaEnvelope className="text-primary-600 dark:text-primary-400" />,
      title: 'Email',
      value: 'mujtabahyder575@gmail.com',
      type: 'email'
    },
    {
      icon: <FaMapMarkerAlt className="text-primary-600 dark:text-primary-400" />,
      title: 'Address',
      value: '123 Construction Lane, Building City, Pakistan',
      type: 'address'
    },
  ];

  const businessHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <Container>
        <SectionTitle 
          title="Contact Us" 
          subtitle="Have a project in mind? Get in touch with us today."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            
            {formMessage && (
              <div className={`mb-6 p-4 rounded-lg ${
                messageType === 'success' 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                  : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
              }`}>
                {formMessage}
              </div>
            )}

            <Formik
              initialValues={initialValues}
              validationSchema={contactSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
                    <Field 
                      type="text" 
                      id="name" 
                      name="name"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-gray-900 dark:bg-gray-700 dark:text-white"
                    />
                    <ErrorMessage name="name" component="p" className="mt-1 text-sm text-red-600 dark:text-red-400" />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <Field 
                      type="email" 
                      id="email" 
                      name="email"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-gray-900 dark:bg-gray-700 dark:text-white"
                    />
                    <ErrorMessage name="email" component="p" className="mt-1 text-sm text-red-600 dark:text-red-400" />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                    <Field 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-gray-900 dark:bg-gray-700 dark:text-white"
                    />
                    <ErrorMessage name="phone" component="p" className="mt-1 text-sm text-red-600 dark:text-red-400" />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">Message</label>
                    <Field 
                      as="textarea"
                      id="message" 
                      name="message"
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-gray-900 dark:bg-gray-700 dark:text-white"
                    />
                    <ErrorMessage name="message" component="p" className="mt-1 text-sm text-red-600 dark:text-red-400" />
                  </div>
                  
                  <Button 
                    type="submit" 
                    variant="primary" 
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </Form>
              )}
            </Formik>
          </motion.div>

          {/* Contact Information */}
          <div className="space-y-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                      {info.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-sm sm:text-base">{info.title}</h4>
                      <p className={`text-gray-700 dark:text-gray-300 text-xs sm:text-sm ${
                        info.type === 'phone' || info.type === 'email' ? 'truncate' : 'break-words'
                      }`}>
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-6">Business Hours</h3>
              
              <div className="space-y-3">
                {businessHours.map((hours, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-sm sm:text-base">{hours.day}</span>
                    <span className="font-medium text-sm sm:text-base">{hours.hours}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactForm;