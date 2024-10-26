import React from 'react'

function About() {
  return (
    <div className="bg-[#F7F7F7] mt-6" id="about">
    <div className="px-8 py-12 text-center bg-[#F7F7F7] mt-6 rounded-lg shadow-xl p-20">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-gray-800 text-3xl font-bold mb-8">
                About Us
            </h2>
            <p className="text-gray-800 text-base mb-4">
            Streamline the process of scheduling, managing, and tracking patient appointments. Reduce wait times and improve patient satisfaction with efficient booking and reminders
            </p>
            <p className="text-gray-600 text-base">
                Curabitur tristique tempus est, sed fermentum urna
                auctor vel. Integer rhoncus, elit et luctus
                interdum, quam odio ultricies ligula, at porttitor
                metus justo a est.
            </p>
        </div>
    </div>
</div>
  )
}

export default About
