import React from 'react';

function NotFoundPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-red-600 font-bold text-[64px]">
          404 Page Not Found
        </h1>
        <p className="font-bold text-[40px]">
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;
