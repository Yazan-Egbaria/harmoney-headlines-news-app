import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex h-20 w-full items-center px-16 shadow-md">
      {/* Center the Home link */}
      <div className="flex flex-grow justify-center">
        <ul className="flex gap-4">
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>

      {/* Right-align the Sign In button */}
      <div className="flex">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
