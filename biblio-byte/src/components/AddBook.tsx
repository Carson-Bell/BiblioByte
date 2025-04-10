"use client";
import Card from './Card'; 
import Button from './Button'; // Adjust the import path as necessary


export default function AddBook() {
  
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 py-3">
      <Card className={`w-full max-w-lg p-3 bg-white shadow-md rounded-md`}>
       <h1 className="text-4xl font-bold mb-6 text-center">Add Book</h1>
        <form>
         <label htmlFor="title">Title</label>
          <input className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
            name="title"
            type="text"
            placeholder="Enter textbook name"
          />
          <label htmlFor="author">Author</label>
          <input className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
            name="author"
            type="text"
            placeholder="Enter textbook author"
          />
          <label htmlFor="description">Description</label>
          <input className="p-2 border border-gray-300 rounded-md text-base focus:outline-none focus:border-blue-500"
            name="discription"
            type="text"
            placeholder="What's the book about?"
          />
          <Button type="submit">Add Book</Button>
        </form>
      </Card>
      </div>
    );
  }
  