import React from "react";
import gymVideo from "../../assets/gymvideo.mp4";
import Button from "../../components/UI/Button"
import ChooseUs from "../../layouts/ChooseUs"
import FitnessGallery from "../../layouts/Gallery";
import Address from "../../layouts/Address";
const Home = () => {
  return (
    <>
    <div className="main-banner  relative h-screen w-full overflow-hidden" id="top">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        id="bg-video"
      >
        <source src={gymVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-[rgba(20,24,29,0.8)] bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white">
          <h6 className="text-lg font-medium uppercase tracking-wide mb-2">
            Work Harder, Get Stronger
          </h6>
          <h2 className="text-4xl mt-8 mb-8 md:text-6xl font-bold">
            BUILD YOUR DREAM <span className="text-primary">PHYSIQUE</span>
          </h2>
          <div className="mt-6">
            <Button className="bg-primary text-white px-6 py-3 uppercase text-lg hover:bg-red-600 transition" label = 'Book Appointment'/>
          </div>
        </div>
      </div>
    </div>
    <ChooseUs />
    <FitnessGallery />
    {/* <Address className=" bg-neutral-950 text-white md:flex justify-center gap-40 px-8 py-8"/> */}
    
    </>
  );
};
export default Home;

