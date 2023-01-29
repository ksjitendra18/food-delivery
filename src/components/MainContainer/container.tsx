// just a div with padding and margin

import React from "react";

interface ContainerProps {
  as: "div" | "section";
  children: React.ReactNode;
  className?: string;
}
const Container = ({
  as,
  children,
  className: additionalClasses,
}: ContainerProps) => {
  if (as === "section") {
    return (
      <section className={`p-6 md:p-9 md:px-11 ${additionalClasses}`}>
        {children}
      </section>
    );
  } else {
    return <div className=" p-6 md:p-9 md:px-11">{children}</div>;
  }
};

export default Container;
