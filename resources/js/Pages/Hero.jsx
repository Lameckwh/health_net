import { Link } from '@inertiajs/react'
import React from 'react'

function Hero() {
  return (
    <div className="bg-gradient-to-b from-blue-900 via-blue-800 to-blue-500 px-6 sm:py-20 py-10 font-[sans-serif] lg:mt-12">
    <div className="max-w-screen-xl mx-auto text-center text-white">
        <h1 className="text-5xl max-sm:text-3xl font-extrabold leading-tight mb-6">
            Your Health 24/7
        </h1>
        <p className="text-lg mb-12">
            Access your medical records, track your health and stay
            informed with HealthNet
        </p>
        <button
            type="button"
            className="bg-blue-600 text-white text-lg tracking-wide px-8 py-2.5 rounded-full transition duration-300 ease-in-out shadow-lg hover:shadow-xl"
        >
            Get Started
        </button>

    </div>
</div>
  )
}

export default Hero
