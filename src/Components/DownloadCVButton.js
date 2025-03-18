import { FaDownload } from "react-icons/fa";

export default function DownloadCVButton() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Susie_Hu_CV.pdf"; // Ensure this file exists in the "public" folder
    link.download = "Susie_Hu_CV.pdf"; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex justify-center items-center"> 
        <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-5 py-2 bg-gray-700 text-white/95 text-sm font-semibold rounded-full shadow-md border border-gray-300 transition-transform transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
            <FaDownload className="text-md" />
            Download CV
        </button>

    </div>
  );
}
