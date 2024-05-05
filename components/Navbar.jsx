// import Link from "next/link";

// import MaxWidthWrapper from "./MaxWidthWrapper";
// import { buttonVariants } from "./ui/button";
// import TextShine from "@/components/TextShine";
// import { useState } from "react";
// import styles from "./Navbar.module.css";

// const Navbar = () => {
//     const [Menu,setMenu]= useState("Explore");
//   return (
//     <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
//       <MaxWidthWrapper>

//         <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
//           <Link href='/' className='flex z-40 font-semibold items-center justify-center gap-x-2 rounded-md'>
//             <div className='h-5 w-5 bg-black'></div>
//             <span>INFLUENZAR</span>
//           </Link>

//           <div className="hidden items-center space-x-4 sm:flex">
//             <Link
//               href="/explore"
//               className={buttonVariants({
//                 variant: "ghost",
//                 size: "sm",
//               })}
//               onClick={()=>{setMenu("How It Works")}}
//             >
//               Explore {Menu==='Explore'?<hr/>:<></>}
//             </Link>
//             <Link
             
//               href="./creator/profilesetup"
//               className={buttonVariants({
//                 variant: "ghost",
//                 size: "sm",
//               })}
//               onClick={()=>{setMenu("profile")}}
//             >
//               profile {Menu==='How It Works'?<hr/>:<></>}
//             </Link>
//             <Link
//               href="/#howitworks"
//               className={buttonVariants({
//                 variant: "ghost",
//                 size: "sm",
//               })}
//               onClick={()=>{setMenu("How It Works")}}
//             >
//               How It Works {Menu==='How It Works'?<hr/>:<></>}
//             </Link>
//             <Link
//               href="/login"
//               className={buttonVariants({
//                 variant: "ghost",
//                 size: "sm",
//               })}
//               onClick={()=>{setMenu("How It Works")}}
//             >
//               Login {Menu==='Login'?<hr/>:<></>}
//             </Link>
//             <Link
//               href="/brand/signup"
//               className={buttonVariants({
//                 variant: "ghost",
//                 size: "sm",
//               })}
             
//             >
//               <TextShine text={"Join as Brand"} />
//             </Link>

//             <Link
//               href="/creator/signup"
//               className={buttonVariants({
//                 variant: "ghost",
//                 size: "sm",
//               })}
           
//             >
//               <TextShine text={"Join as Creator"} />
//             </Link>
//           </div>
//         </div>
//       </MaxWidthWrapper>
//     </nav>
//   );
// };

// export default Navbar;

import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import TextShine from "@/components/TextShine";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const router = useRouter();
  const [menu, setMenu] = useState("Explore");

  const handleLogout = () => {
    // Clear the JWT token from local storage or perform any other necessary logout actions
    console.log("ffffffffff",localStorage.getItem("token")); 
    localStorage.removeItem("user"); // Assuming you stored the token as 'token' in local storage
    console.log(localStorage.getItem("token")); 

    // Redirect the user to the login page
    router.push("/login");
  };

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link
            href="/"
            className="flex z-40 font-semibold items-center justify-center gap-x-2 rounded-md"
          >
            <div className="h-5 w-5 bg-black"></div>
            <span>INFLUENZAR</span>
          </Link>

          <div className="hidden items-center space-x-4 sm:flex">
            <Link
              href="/explore"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
              onClick={() => setMenu("Explore")}
            >
              Explore {menu === "Explore" ? <hr /> : <></>}
            </Link>
            <Link
              href="/creator/profilesetup"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
              onClick={() => setMenu("Profile")}
            >
              Profile {menu === "Profile" ? <hr /> : <></>}
            </Link>
            <Link
              href="/#howitworks"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
              onClick={() => setMenu("How It Works")}
            >
              How It Works {menu === "How It Works" ? <hr /> : <></>}
            </Link>
            <Link
              href="/login"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
              onClick={()=>{setMenu("How It Works")}}
            >
              Login {menu==='Login'?<hr/>:<></>}
            </Link>
            <Link
              href="/brand/signup"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
             
            >
              <TextShine text={"Join as Brand"} />
            </Link>

            <Link
              href="/creator/signup"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
           
            >
              <TextShine text={"Join as Creator"} />
            </Link>
            <button
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;

