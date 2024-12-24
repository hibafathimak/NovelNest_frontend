import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaBook, FaTrophy, FaPaperPlane, FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaUsers } from 'react-icons/fa';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import { createMessageAPI } from '../services/allAPI';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && email && message) {
      const response = await createMessageAPI({ name, email, message });
      if (response.status === 200) {
        toast.success(response.data);
      }
    } else {
      toast.error('Please fill the form completely!!');
    }
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <>
      <div className="bg-white pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-16 max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-secondary">
              About NovelNest Store
            </h1>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-secondaryOne">
                <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
                  <FaBook className="mr-3 text-secondaryOne text-2xl" />
                  Our Story
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Founded in 2024, NovelNest Store has been a beacon for book lovers in our community. 
                  What started as a small, passionate bookshop has grown into a beloved destination for 
                  readers of all ages and interests. We believe in the power of storytelling and the 
                  transformative magic of books.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg  border-l-4 border-secondaryOne">
                <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
                  <FaTrophy className="mr-3 text-secondaryOne text-2xl" />
                  Our Mission
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  To connect readers with incredible stories, support local authors, 
                  and create a welcoming community space where imagination and knowledge 
                  can flourish. We carefully curate our collection to inspire, educate, 
                  and entertain book lovers of all backgrounds.
                </p>
              </div>
            </div>
          </section>
  
          <section className="max-w-6xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-secondary">
              Contact Us
            </h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Contact Information */}
                <div className="bg-secondaryOne p-10 text-white">
                  <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-4 text-2xl" />
                      <div>
                        <h4 className="font-medium">Address</h4>
                        <p>123 Book Lane, Reading District</p>
                        <p>Cityville, ST 12345</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaPhone className="mr-4 text-2xl" />
                      <div>
                        <h4 className="font-medium">Phone</h4>
                        <p>(555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaEnvelope className="mr-4 text-2xl" />
                      <div>
                        <h4 className="font-medium">Email</h4>
                        <p>info@NovelNest.com</p>
                      </div>
                    </div>
                  </div>
                </div>
  
                {/* Contact Form */}
                <div className="p-10">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-secondaryOne transition"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-secondaryOne transition"
                        placeholder="Your Email"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                      <textarea
                        id="message"
                        rows="5"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-secondaryOne transition"
                        placeholder="Your Message"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-3 bg-secondaryOne text-white py-3 rounded-lg transition transform hover:scale-105 focus:ring-2 focus:ring-secondaryOne"
                    >
                      <FaPaperPlane className="text-xl" />
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
  
          <section className="py-16 bg-primary text-secondary">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold mb-6">Join Our Reading Community</h2>
              <p className="max-w-2xl mx-auto text-gray-600 mb-10">
                Connect with us on social media, share your favorite reads, and become part of the NovelNest family.
              </p>
              <div className="flex justify-center space-x-8 mb-10">
                {[{ icon: <FaInstagram />, link: "#" }, { icon: <FaTwitter />, link: "#" }, { icon: <FaFacebook />, link: "#" }, { icon: <FaLinkedin />, link: "#" }].map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className="text-5xl hover:text-secondaryOne text-gray-600 transition-transform hover:scale-110"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="bg-secondaryOne p-6 rounded-xl text-center w-full md:w-1/3">
                  <FaUsers className="text-5xl mx-auto mb-4 text-white" />
                  <h3 className="text-2xl font-bold mb-2 text-gray-600">10,000+</h3>
                  <p className="text-gray-600">Community Members</p>
                </div>
                <div className="bg-secondaryOne p-6 rounded-xl text-center w-full md:w-1/3">
                  <FaBook className="text-5xl mx-auto mb-4 text-white" />
                  <h3 className="text-2xl font-bold mb-2 text-gray-600">5,000+</h3>
                  <p className="text-gray-600">Books in Collection</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />

    </>
  );
};

export default Contact;
