import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


const Pagination= ({prop}:{prop:{ currentPage:number,totalPages:number,onPageChange:(page:number)=>void}}) => {
  const goToPage = (page: number) => {
    if (page >= 1 && page <= prop.totalPages) {
      prop.onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2 p-4">
      <button
         aria-label='left'
        onClick={() => goToPage(prop.currentPage - 1)}
        disabled={prop.currentPage === 1}
        className="p-2 rounded-full border bg-gray-200  border-black/13 hover:bg-gray-100 disabled:opacity-40"
      >
        <ChevronLeft className="w-5 h-5  text-slate-900" />
      </button>

      {Array.from({ length: prop.totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            prop.currentPage === page
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        aria-label='right'
        onClick={() => goToPage(prop.currentPage + 1)}
        disabled={prop.currentPage === prop.totalPages}
        className="p-2 rounded-full border border-black/13 bg-gray-200 hover:bg-gray-100 disabled:opacity-40"
      >
        <ChevronRight className="w-5 h-5 text-slate-900" />
      </button>
    </div>
  );
};

export default Pagination;
