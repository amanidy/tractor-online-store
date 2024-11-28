"use client";

import React, { useState, useEffect } from 'react';
import Button from "./Button";

const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-green-100 px-4">
            <div className={`text-center transform transition-all duration-1000 
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    Welcome to <span className="text-green-600">Tractor Seller Board</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
                    Your one-stop platform for buying and selling tractors. 
                    Explore our wide range of tractors and find the perfect match for your needs!
                </p>
                <div className="space-x-4">
                    <Button className="px-8 py-6 text-lg">
                        View Tractors
                    </Button>
                    <Button variant="outline" className="px-8 py-6 text-lg">
                        List Your Tractor
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Hero;