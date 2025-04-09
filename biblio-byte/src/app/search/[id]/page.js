import Image from "next/image";
import Card from "@/components/Card";
import connectMongoDB from "../../../../config/mongodb.ts";
import BookPageHeader from "../../../components/BookPageHeader.js";

export default function Home() {
  connectMongoDB();
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <BookPageHeader />

      {/* Main Content */}
      <main className="flex-grow w-full flex flex-col mt-15 sm:flex-row items-center sm:items-start gap-8 bg-gray-100 p-8 sm:p-16 shadow-lg">
        {/* Image on the Left */}
        <div className="flex-shrink-0">
          <Image
            src="https://www.clker.com/cliparts/o/Y/Q/2/s/1/white-book-reading.svg" // Replace with the path to your image
            alt="Splash Image"
            width={400}
            height={300}
            className="rounded-lg"
          />
        </div>
        {/* Text on the Right */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-gray-800">
            Book Title
          </h1>
          <h3 className="text-xl font-semibold text-gray-800">
            <span className= "text-4xl font-bold">4.5</span>/5
          </h3>
          <a>
            <button className="px-4 py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-300 hover:text-black focus:outline-none">
              Add to List
            </button>
          </a>
          <p className="text-m text-gray-600">
            This is a description of the book. It provides an overview of the content, themes, and
            key points that the book covers. It can also include information about the author and
            the significance of the book in its genre or field.
          </p>
        </div>
      </main>

 {/* Review Section */}
  <section className="w-full bg-gray-250 p-4 sm:p-16 shadow-md">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">Reviews</h2>
    <Card className="bg-white p-4 shadow-md w-full">
      <div className="flex items-center gap-4">
        <h3 className="text-3xl font-semibold text-black">4.5</h3>
        <div>
          <h2 className="text-lg font-bold text-gray-800">Heading</h2>
          <p className="text-sm font-bold text-gray-700">  User</p>
          <div>
            <p className="text-sm text-gray-600">
              This is a review of the book. It provides insights into the content, style, and
              overall impression of the book. The review can also include comparisons to other
              works and recommendations for potential readers.
            </p>
          </div>
        </div>
        
      </div>
    </Card>

    <Card className="bg-white p-4 mt-4 shadow-md w-full">
      <div className="flex items-center gap-4">
        <h3 className="text-3xl font-semibold text-black">4.5</h3>
        <div>
          <h2 className="text-lg font-bold text-gray-800">Heading</h2>
          <p className="text-sm font-bold text-gray-700">  User</p>
          <div>
            <p className="text-sm text-gray-600">
              This is a review of the book. It provides insights into the content, style, and
              overall impression of the book. The review can also include comparisons to other
              works and recommendations for potential readers.
            </p>
          </div>
        </div>
        
      </div>
    </Card>
  </section>


  {/* Find Section */}
  <section className="w-full bg-gray-250 p-4 sm:p-16 shadow-md">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">Finds</h2>
    <Card className="bg-white p-4 shadow-md w-full">
    
        <div>
          <h2 className="text-lg font-bold text-gray-800">Heading</h2>
          <p className="text-sm font-bold text-gray-700">  User</p>
          <div>
            <p className="text-sm text-gray-600">
            Here where I found the book.
            </p>
          </div>
        </div>
    </Card>

    <Card className="bg-white p-4 mt-4 shadow-md w-full">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Heading</h2>
          <p className="text-sm font-bold text-gray-700">  User</p>
          <div>
            <p className="text-sm text-gray-600">
              Here where I found the book.
            </p>
          </div>
        </div>
    </Card>
  </section>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white py-4 flex items-center justify-center">
        <p className="text-sm">© 2025 BiblioByte. All rights reserved.</p>
      </footer>
    </div>
  );
}
