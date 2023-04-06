import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = (props) => {
  const router = useRouter();

  return (
    <nav className="w-full border-gray-200 bg-blue-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            JobPortal
          </span>
        </Link>
        <div className=" w-full md:block md:w-auto" id="navbar-solid-bg">
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li>
              <Link
                href="/"
                className={`block py-2 pl-3 pr-4  rounded md:bg-transparent ${
                  router.pathname === "/" ? "md:text-blue-700" : ""
                } md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent`}
                aria-current="page"
              >
                New job
              </Link>
            </li>
            <li>
              <Link
                href="/jobs"
                className={`block py-2 pl-3 pr-4  rounded md:bg-transparent ${
                  router.pathname === "/jobs" ? "md:text-blue-700" : ""
                } md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent`}
              >
                All Jobs
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
