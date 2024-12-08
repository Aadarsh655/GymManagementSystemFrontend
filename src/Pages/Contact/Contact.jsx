import React from 'react';
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import Address from '../../layouts/Address';
import gymImg from '../../assets/gym.jpg';
const ContactPage = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img src= {gymImg} alt="Gym background"
          className="w-full h-full object-cover brightness-50"/>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="mb-6 text-5xl font-bold tracking-wider">
            CONTACT US
          </h1>
          <nav className="flex items-center space-x-2 text-sm">
            <a href="/" className="hover:text-primary">Home</a>
            <span>›</span>
            <span className="text-primary">Contact us</span>
          </nav>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="py-12 px-12">
        <div className="max-w-7xl mx-auto md:gap-x-[250px] lg:flex justify-center">
          <div className="space-y-5 py-12 inline-block">
            <h1 className="text-4xl font-bold">GET IN TOUCH</h1>
            <div className="gap-12">
              <Address />
            </div>
          </div>
          <div className='space-y-7 m-5 h-fit lg:w-[40%]'>
            <Input placeholder="Name" />
            <Input placeholder='E-mail' />
            <Input placeholder='Comment' className='h-[100px]'/>
            <Button label='SUBMIT' className='w-full'/>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className='px-5 bg-zinc-900'>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0422493466945!2d85.28054367546767!3d27.715981776177564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198c04f528e9%3A0x6840c3491fb4257a!2sHercules%20Gym%20and%20Fitness%20Center!5e0!3m2!1sen!2snp!4v1732968354624!5m2!1sen!2snp" 
          className='w-full lg:h-[70vh] h-[45vh]'
          style={{border:0}}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;


