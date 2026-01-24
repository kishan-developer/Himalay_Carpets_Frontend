import React from "react";

function SubHeading({ text }) {
    return (
        <h2
            className={`text-center  tracking-tight text-sm font-normal md:text-lg capitalize leading-snug text-foreground`}
        >
            {text}
        </h2>
    );
}

export default SubHeading;
