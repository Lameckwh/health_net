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
            Generate detailed medical reports, lab
                        results, and diagnostic information with
                        just a few clicks, providing healthcare
                        professionals with the insights they need
                        for accurate diagnoses
            </p>
        </div>
    </div>
</div>
  )
}

export default About
