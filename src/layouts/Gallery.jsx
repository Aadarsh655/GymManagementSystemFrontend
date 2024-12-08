import React from 'react';
import bicepsImg from '../assets/biceps.jpg';
import cardioImg from '../assets/cardio.jpg';
import deadliftImg from '../assets/deadlift.jpg';
import personaltrainingImg from '../assets/personaltraining.jpg';
import pushupsImg from '../assets/pushups.jpg';
import cycleImg from '../assets/Crossfit.jpg';

const FitnessGallery = () => {
  const images = [
    {
      src: pushupsImg,
      alt: "Kettlebell workout in plank position",
      title: "Core Strength"
    },
    {
      src: cardioImg,
      alt: "Cardio training on treadmill",
      title: "Cardio Fitness"
    },
    {
      src: bicepsImg,
      alt: "Dumbbell strength training",
      title: "Hypertrophy Training"
    },
    {
      src: deadliftImg,
      alt: "Deadlift exercise with barbell",
      title: "Power Lifting"
    },
    {
      src: personaltrainingImg,
      alt: "Personal training session",
      title: "Personal Training"
    },
    {
        src: cycleImg,
        alt: "Personal training session",
        title: "Cross Fit"
      }
  ];

  return (
    <section className="w-full py-20 bg-zinc-900 ">
      <div className="container px-4 md:px-6">
        <div className="mb-16 flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-primary font-medium text-2xl ">
            TRANSFORM YOUR BODY
          </h2>
          <p className="max-w-[700px]text-4xl md:text-5xl font-bold text-white">
            COMPREHENSIVE FITNESS PROGRAMS
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {images.map((image, index) => (
            <div key={index}
              className="relative group overflow-hidden rounded-lg">
              <img src={image.src} alt={image.alt} 
              className="object-cover w-full aspect-[4/3] transition-transform duration-300 group-hover:scale-110"/>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FitnessGallery;