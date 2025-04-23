"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import React,{ useEffect } from "react";


const HeroSection = () => {

    const imageRef=useRef(null);

    useEffect(() => {
        const imageElement=imageRef.current;

        const handleScroll=()=>{
            const scrollPosition=window.scrollY;
            const scrollThreshold=100; 

            if(scrollPosition > scrollThreshold) {
                imageElement.classList.add("scrolled")
            }else{
                imageElement.classList.remove("scrolled")

            }

        }

     // Adjust this value as needed
     window.addEventListener("scroll", handleScroll);
     return () => 
        window.removeEventListener("scroll", handleScroll);
     

     
    },[])
    return (
        <section className='w-full pt-36 md:pt-48 pb:10'>
            <div className="space-y-6 text-center">
                <div className="space-y-6 mx-auto">
                    <h1 className="gradient-title text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl">
                        Your AI-Powered Sarthi for
                        <br />
                        Career Growth
                    </h1>
                    <p className="mx-auto max-w-[600px] text-muted-foreground/80 text-lg md:text-xl lg:text-2xl xl:text-3xl"> 
                        Unlock your potential with personalized career insights, resume building, and interview preparation.
                    </p>
                </div>

                <div className="flex  justify-center space-x-4">
                    <Link href={'/dashboard'}>
                        <Button size="lg" className="px-8" variant="default">
                            Get Started
                        </Button>
                    </Link>
                    <Link href={'https://www.youtube.com/watch?v=2X8v0g1j4xE'} target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="px-8" variant="outline">
                            Watch Demo
                        </Button>
                    </Link>
                </div>

                <div className="hero-image-wrapper mt-5 md:mt-0">
                    <div ref={imageRef} className="hero-image">
                        <Image src={"/hero.jpg"} alt="hero" width={1280} height={720} className="rounded-lg shadow-2xl border mx-auto"
                            priority />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection;