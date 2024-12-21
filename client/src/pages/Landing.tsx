import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const landing = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen">
      {/* Hero Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('/landing.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
          Rate My Schools
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12">
          Discover and share experiences about educational institutions worldwide
        </p>
        <Button
          onClick={handleStart}
          className="h-12 px-8 text-base font-medium bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default landing;
