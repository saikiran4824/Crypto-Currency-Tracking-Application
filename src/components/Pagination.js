import React, { useContext, useRef } from 'react';
import { CryptoContext } from './../context/CryptoContext';

const PerPage = () => {
  const { setPerPage } = useContext(CryptoContext);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let val = inputRef.current.value;
    if (val !== 0) {
      setPerPage(val);
      inputRef.current.value = val;
    }
  };

  return (
    <form
      className="relative flex items-center font-nunito
          mr-12
          "
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="perpage"
        className="relative flex justify-center items-center
          mr-2 font-bold
          "
      >
        per page:{' '}
      </label>
      <input
        type="number"
        name="perpage"
        min={1}
        max={250}
        ref={inputRef}
        placeholder="12"
        className="w-16 rounded bg-gray-200 placeholder:text-gray-100
     pl-2 required outline-0 border border-transparent 
     focus:border-cyan leading-4
     "
      />
      <button type="submit" className="ml-1 cursor-pointer">
      <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#2ecc71"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="cursor-pointer"
>
  <path d="M4 12l6 6L20 6" /> {/* Checkmark */}
  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="#2ecc71" strokeWidth="2" fill="none" /> {/* Button border */}
</svg>
      </button>
    </form>
  );
};

const Pagination = () => {
  let { page, setPage, totalPages, perPage, cryptoData } =
    useContext(CryptoContext);

  const TotalNumber = Math.ceil(totalPages / perPage);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const next = () => {
    if (page === TotalNumber) {
      return null;
    } else {
      setPage(page + 1);
      scrollToTop(); // Scroll to top on page change
    }
  };

  const prev = () => {
    if (page === 1) {
      return null;
    } else {
      setPage(page - 1);
      scrollToTop(); // Scroll to top on page change
    }
  };

  const multiStepNext = () => {
    if (page + 3 >= TotalNumber) {
      setPage(TotalNumber - 1);
    } else {
      setPage(page + 3);
    }
    scrollToTop(); // Scroll to top on page change
  };

  const multiStepPrev = () => {
    if (page - 3 <= 1) {
      setPage(TotalNumber + 1);
    } else {
      setPage(page - 2);
    }
    scrollToTop(); // Scroll to top on page change
  };

  // Ensure the data updates when the page changes
  if (cryptoData && cryptoData.length >= perPage) {
    return (
      
      <div className="flex flex-wrap items-center justify-end m-4">
        <PerPage />
        <ul className="flex items-center justify-between text-sm p-2">
          <li className="flex items-center">
            <button className="outline-0 hover:text-cyan w-10 ml-4" onClick={prev}>
            <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#2ecc71"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="cursor-pointer"
>
  <path d="M15 18l-6-6 6-6" />
  <path d="M9 12h12" />
</svg>

            </button>
          </li>

          {page + 1 === TotalNumber || page === TotalNumber ? (
            <li>
              {' '}
              <button
                onClick={multiStepPrev}
                className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center text-lg    "
              >
                ...
              </button>
            </li>
          ) : null}

          {page - 1 !== 0 ? (
            <li>
              <button
                onClick={prev}
                className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
              >
                {' '}
                {page - 1}{' '}
              </button>
            </li>
          ) : null}
          <li>
            <button
              disabled
              className="ouline-0  rounded-full w-8 h-8 flex items-center justify-center bg-cyan text-gray-300 mx-1.5"
            >
              {page}
            </button>
          </li>

          {page + 1 !== TotalNumber && page !== TotalNumber ? (
            <li>
              <button
                onClick={next}
                className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
              >
                {page + 1}
              </button>
            </li>
          ) : null}

          {page + 1 !== TotalNumber && page !== TotalNumber ? (
            <li>
              {' '}
              <button
                onClick={multiStepNext}
                className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center text-lg    "
              >
                ...
              </button>
            </li>
          ) : null}

          {page !== TotalNumber ? (
            <li>
              <button
                onClick={() => setPage(TotalNumber)}
                className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
              >
                {TotalNumber}
              </button>
            </li>
          ) : null}
          <li>
            <button className="outline-0 hover:text-cyan w-10" onClick={next}>
            <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#2ecc71"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="cursor-pointer"
>
  <path d="M15 18l6-6-6-6" />  {/* Right-facing arrow */}
  <path d="M7 12h10" /> {/* Horizontal line at the center */}
</svg>

            </button>
          </li>
        </ul>
        </div>
    );
  } else {
    return null;
  }
};

export default Pagination;
