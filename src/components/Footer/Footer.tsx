import { FC } from "react";

const Footer: FC = () => (
  <div>
    <div className="items-center justify-center hidden col-span-1 space-x-2 sm:flex">
      <button
        data-tooltip-target="default-navbar-example-full-screen-tooltip"
        className="flex items-center justify-center w-9 h-9 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-full-view hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <span className="sr-only">Toggle full view</span>
        <svg
          className="w-3.5 h-3.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14v4m-4 1h8M1 10h18M2 1h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"
          ></path>
        </svg>
      </button>

      <div
        id="default-navbar-example-full-screen-tooltip"
        role="tooltip"
        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        style={{
          position: "absolute",
          inset: " auto auto 0px 0px",
          margin: "0px",
          transform: "translate3d(540.5px, -368.5px, 0px)",
        }}
        data-popper-placement="top"
      >
        Toggle full screen
        <div
          className="tooltip-arrow"
          data-popper-arrow=""
          style={{
            position: "absolute",
            left: "0px",
            transform: " translate3d(67.5px, 0px, 0px)",
          }}
        ></div>
      </div>

      <button
        data-tooltip-target="default-navbar-example-tablet-tooltip"
        className="flex items-center justify-center w-9 h-9 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-tablet-view hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <span className="sr-only">Toggle tablet view</span>
        <svg
          className="w-3.5 h-3.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7.5 16.5h3M2 1h14a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"
          ></path>
        </svg>
      </button>

      <div
        id="default-navbar-example-tablet-tooltip"
        role="tooltip"
        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        style={{
          position: "absolute",
          inset: " auto auto 0px 0px",
          margin: "0px",
          transform: " translate3d(582.5px, -368.5px, 0px)",
        }}
        data-popper-placement="top"
      >
        Toggle tablet view
        <div
          className="tooltip-arrow"
          data-popper-arrow=""
          style={{
            position: "absolute",
            left: "0px",
            transform: "translate3d(69.5px, 0px, 0px)",
          }}
        ></div>
      </div>

      <button
        data-tooltip-target="default-navbar-example-mobile-tooltip"
        className="flex items-center justify-center w-9 h-9 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-mobile-view hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <span className="sr-only">Toggle mobile view</span>
        <svg
          className="w-3.5 h-3.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 14h12M1 4h12M6.5 16.5h1M2 1h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z"
          ></path>
        </svg>
      </button>

      <div
        id="default-navbar-example-mobile-tooltip"
        role="tooltip"
        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        style={{
          position: "absolute",
          inset: "auto auto 0px 0px",
          margin: "0px",
          transform: " translate3d(623.5px, -368.5px, 0px)",
        }}
        data-popper-placement="top"
      >
        Toggle mobile view
        <div
          className="tooltip-arrow"
          data-popper-arrow=""
          style={{
            position: "absolute",
            left: "0px",
            transform: "translate3d(72.5px, 0px, 0px)",
          }}
        ></div>
      </div>
    </div>
  </div>
);

export default Footer;
