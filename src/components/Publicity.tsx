import PublicityImage from "../assets/publi.webp";

export const Publicity = () => {
  return (
    <div className="bg-green-100 flex-1 overflow-hidden">
      <img className="w-full h-full" src={PublicityImage} alt="publicity" />
    </div>
  );
};
