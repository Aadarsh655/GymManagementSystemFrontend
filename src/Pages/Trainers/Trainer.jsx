import React from 'react';
import {trainerdata} from '../../mockdata/trainer';
import TrainerCard from '../../layouts/TrainerCard';
import trainerImg from "../../assets/trainers.jpg";

export default function Trainer() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src={trainerImg}
          alt="Gym background"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="mb-6 text-5xl font-bold tracking-wider">
            TRAINERS
          </h1>
          <nav className="flex items-center space-x-2 text-sm">
            <a href="/" className="hover:text-primary transition-colors duration-300">
              Home
            </a>
            <span>›</span>
            <span className="text-primary">Trainers</span>
          </nav>
        </div>
      </div>

      <div className="min-h-screen bg-black py-20 px-4">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">OUR TRAINERS</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            There are many variations of passages of lorem Ipsum available, but the majority
            have suffered alteration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {trainerdata.map((trainer, index) => (
            <TrainerCard key={index} trainer={trainer} />
          ))}
        </div>
      </div>
    </div>
  );
}

