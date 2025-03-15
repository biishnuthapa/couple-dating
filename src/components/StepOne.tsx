import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import AnimatedTransition from "./AnimatedTransition";

interface StepOneProps {
  onYes: () => void;
  onNo: () => void;
  isInvitationView?: boolean;
  inviterName?: string;
}

const StepOne: React.FC<StepOneProps> = ({
  onYes,
  onNo,
  isInvitationView = false,
  inviterName = "",
}) => {
  const [response, setResponse] = useState<"yes" | "no" | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleYes = () => {
    setResponse("yes");
    setIsTransitioning(true);
    setTimeout(onYes, 3000);
  };

  const handleNo = () => {
    setResponse("no");
    setIsTransitioning(true);
    setTimeout(onNo, 5000);
  };

  return (
    <div className="step-container relative flex flex-col items-center">
      <h1 className="step-title animate-slide-up">
        {isInvitationView
          ? `${inviterName} invited you on a date!`
          : "Wanna Go on a Date with Me?"}
      </h1>
      <p
        className="step-subtitle animate-slide-up"
        style={{ animationDelay: "10ms" }}
      >
        (Choose wisely)
      </p>

      {/* GIF Container with Absolute Positioning */}
      <div className="relative w-[350px] h-[250px] mt-4">
        {/* Initial GIF */}
        <AnimatedTransition
          show={response === null}
          animateIn="animate-scale-in"
          animateOut="animate-fade-out"
          className="absolute inset-0"
        >
          <img
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHpwOXowcjk3bXBscnQxZXg3bjhzMmN2ZXhwNjhwZHpnMmhhczRuYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TH0H4MSuizIoFwX2G5/giphy.gif"
            alt="Waiting for response"
            className="w-full h-full object-cover"
          />
        </AnimatedTransition>

        {/* "Yes" GIF */}
        <AnimatedTransition
          show={response === "yes"}
          animateIn="animate-scale-in"
          className="absolute inset-0"
        >
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXZ6ZDUzbXgzMjhiOXRuMGIxeXI2ZmJhN2E5aTRkaGNndjFsMGlubiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MeIucAjPKoA120R7sN/giphy.gif"
            alt="Happy dancing"
            className="w-full h-full object-cover"
          />
        </AnimatedTransition>

        {/* "No" GIF */}
        <AnimatedTransition
          show={response === "no"}
          animateIn="animate-scale-in"
          className="absolute inset-0"
        >
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGk1azdkOHZ6ajY5ZHF1MnR1MjY5bGNud2kydncxdHN0ZTZsdjN5MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JER2en0ZRiGUE/giphy.gif"
            alt="Sad reaction"
            className="w-full h-full object-cover"
          />
        </AnimatedTransition>
      </div>

      {/* Text Messages */}
      <AnimatedTransition
        show={response === "yes"}
        animateIn="animate-slide-up"
        className="text-center mt-4 text-2xl font-bold text-green-600"
      >
        Congratulations! 🎉
      </AnimatedTransition>

      <AnimatedTransition
        show={response === "no"}
        animateIn="animate-slide-up"
        className="text-center mt-4 text-2xl font-bold text-red-600"
      >
        Maybe next time! 😢
      </AnimatedTransition>

      {/* Buttons */}
      <AnimatedTransition
        show={!isTransitioning}
        animateOut="animate-fade-out"
        className="flex gap-4 mt-4 w-full max-w-xs justify-center"
      >
        <Button
          onClick={handleYes}
          className="btn-primary flex items-center gap-2 min-w-32"
          disabled={response !== null}
        >
          <Check className="w-5 h-5" /> YES!
        </Button>
        <Button
          onClick={handleNo}
          className="btn-no flex items-center gap-2 min-w-32"
          disabled={response !== null}
        >
          <X className="w-5 h-5" /> NO
        </Button>
      </AnimatedTransition>
    </div>
  );
};

export default StepOne;
