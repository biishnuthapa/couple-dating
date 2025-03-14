import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import MovieSelection from "./MovieSelection";
import AnimatedTransition from "./AnimatedTransition";

interface Movie {
  id: string;
  title: string;
}

interface StepFourProps {
  onNext: (movie: Movie) => void;
}

const StepFour: React.FC<StepFourProps> = ({ onNext }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleContinue = () => {
    if (selectedMovie) {
      onNext(selectedMovie);
    }
  };

  return (
    <div className="step-container">
      <h1 className="step-title animate-slide-up">Movie Time!</h1>
      <p
        className="step-subtitle animate-slide-up"
        style={{ animationDelay: "100ms" }}
      >
        What do you wanna watch?
      </p>

      {/* Always show the GIF by setting `show={true}` */}
      <AnimatedTransition
        show={true} // GIF will always be visible
        animateIn="animate-scale-in"
        className="gif-container"
      >
        <img
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXF0bDVtYmI2dWpnMjA2Y3hkbTh5dnFwaXA2Z282MGNyZ2Zxb28ydSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YP1uLfKcLamzayesbD/giphy.gif"
          alt="Movie time"
          className="w-full h-full object-cover"
        />
      </AnimatedTransition>

      <div
        className="w-full animate-slide-up"
        style={{ animationDelay: "200ms" }}
      >
        <MovieSelection
          onSelect={setSelectedMovie}
          selectedMovie={selectedMovie}
        />
      </div>

      <div
        className="w-full flex justify-center mt-8 animate-slide-up"
        style={{ animationDelay: "300ms" }}
      >
        <Button
          onClick={handleContinue}
          className="btn-primary flex items-center gap-2"
          disabled={!selectedMovie}
        >
          Continue <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default StepFour;