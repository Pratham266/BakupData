/* eslint-disable react/prop-types */
import { useState } from "react";
import { Code, Layers, Rocket } from "lucide-react";

// Navigation Component
const Navbar = ({ setCurrentPage }) => (
  <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 shadow-lg">
    <div className="container mx-auto flex justify-between items-center px-4">
      <div className="text-2xl font-bold flex items-center">
        <img
          src="/api/placeholder/50/50"
          alt="RaoTech Logo"
          className="mr-3 rounded-full"
        />
        RaoTech
      </div>
      <ul className="flex space-x-6">
        <li>
          <button
            onClick={() => setCurrentPage("home")}
            className="hover:text-blue-200"
          >
            Home
          </button>
        </li>
        <li>
          <button
            onClick={() => setCurrentPage("services")}
            className="hover:text-blue-200"
          >
            Services
          </button>
        </li>
        <li>
          <button
            onClick={() => setCurrentPage("projects")}
            className="hover:text-blue-200"
          >
            Projects
          </button>
        </li>
        <li>
          <button
            onClick={() => setCurrentPage("contact")}
            className="hover:text-blue-200"
          >
            Contact
          </button>
        </li>
      </ul>
    </div>
  </nav>
);

// Home Page Component
const HomePage = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
    <div className="container mx-auto px-6 py-20 text-center">
      <h1 className="text-5xl font-bold text-blue-900 mb-6">
        Transform Your Digital Vision into Reality
      </h1>
      <p className="text-xl text-blue-800 mb-10 max-w-2xl mx-auto">
        RaoTech delivers cutting-edge web development and software solutions
        that drive business growth and innovation.
      </p>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition">
          <Code className="mx-auto text-blue-600 mb-4" size={50} />
          <h3 className="text-xl font-semibold mb-3">Web Development</h3>
          <p>Custom websites that blend aesthetics with functionality.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition">
          <Layers className="mx-auto text-green-600 mb-4" size={50} />
          <h3 className="text-xl font-semibold mb-3">Software Solutions</h3>
          <p>Scalable applications tailored to your business needs.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition">
          <Rocket className="mx-auto text-purple-600 mb-4" size={50} />
          <h3 className="text-xl font-semibold mb-3">Digital Strategy</h3>
          <p>Strategic consulting to drive technological innovation.</p>
        </div>
      </div>
    </div>
  </div>
);

// Services Page Component
const ServicesPage = () => (
  <div className="min-h-screen bg-gray-100 py-20">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">
        Our Services
      </h2>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h3 className="text-2xl font-semibold mb-4 text-blue-700">
            Web Development
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li>• Responsive Design</li>
            <li>• E-commerce Platforms</li>
            <li>• Custom CMS Solutions</li>
            <li>• Performance Optimization</li>
          </ul>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h3 className="text-2xl font-semibold mb-4 text-green-700">
            Software Solutions
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li>• Enterprise Applications</li>
            <li>• Cloud Integration</li>
            <li>• API Development</li>
            <li>• System Architecture</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// Projects Page Component
const ProjectsPage = () => (
  <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">
        Our Recent Projects
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((project) => (
          <div
            key={project}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={`/api/placeholder/400/300?text=Project+${project}`}
              alt={`Project ${project}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">
                Digital Transformation Project
              </h3>
              <p className="text-gray-600 mb-4">
                Innovative solution for modern business challenges.
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Contact Page Component
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We will contact you soon.");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-20">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-900">
          Contact RaoTech
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-3 border rounded h-32"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

// Main App Component
const RaoTechWebsite = () => {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="font-sans">
      <Navbar setCurrentPage={setCurrentPage} />
      {currentPage === "home" && <HomePage />}
      {currentPage === "services" && <ServicesPage />}
      {currentPage === "projects" && <ProjectsPage />}
      {currentPage === "contact" && <ContactPage />}
    </div>
  );
};

export default RaoTechWebsite;
