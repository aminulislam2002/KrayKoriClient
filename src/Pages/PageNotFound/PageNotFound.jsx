import image from "../../assets/PageNotFound/page_not_found.png";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-teal-500 via-gray-300 to-white">
      <div className="text-center">
        <img
          src={image} // Replace with your image URL
          alt="404 Illustration"
          className="mx-auto mb-8 w-64"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h1>
        <p className="text-gray-600 mb-8">The page you are looking for might be in another universe.</p>
        <a href="/" className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300">
          Go Home
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;
