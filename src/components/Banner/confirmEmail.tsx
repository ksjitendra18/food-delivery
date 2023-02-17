import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useState } from "react";

const ConfirmEmail = () => {
  // TODO: CHECK FOR PROFILE COMPLETION
  const emailVerificationStatus = useUser().user?.email_verified;
  emailVerificationStatus
    ? sessionStorage.setItem("emailConfirmBanner", "true")
    : null;

  const getBannerStatusFromSession = () => {
    const userOption = sessionStorage.getItem("emailConfirmBanner");

    if (userOption) {
      return userOption === "false" ? false : true;
    }
  };

  const [closeConfirmEmail, setCloseConfirmEmail] = useState(
    getBannerStatusFromSession() || false
  );
  const handleClose = () => {
    setCloseConfirmEmail(true);
    sessionStorage.setItem("emailConfirmBanner", "true");
  };
  return (
    <section
      aria-label="Confirm Email Banner"
      className={`${
        closeConfirmEmail ? "hidden" : "flex"
      } bg-white  md:h-[40px] text-black px-5 py-2 md:px-11  items-center justify-between`}
    >
      <p className="text-sm font-bold">
        Your account is not confirmed. Please
        <span className="ml-1 underline text-primary  cursor-pointer">
          confirm your email{" "}
        </span>{" "}
        and
        <span className="ml-1 underline text-primary  cursor-pointer">
          complete your profile.
        </span>
      </p>

      <div className="flex gap-5 items-center">
        {/* <p className=" font-bold cursor-pointer">Complete profile</p> */}

        <div
          className="cross mb-2 cursor-pointer"
          onClick={() => handleClose()}
        >
          <span className="h-[4px] block w-[20px] translate-y-2 rotate-45 my-[4.5px] bg-black"></span>
          <span className="h-[4px] block w-[20px] translate-y-[-1px] rotate-[-45deg] mt-[6px] md:mt-[2.5px] bg-black"></span>
        </div>
      </div>
    </section>
  );
};

export default ConfirmEmail;
