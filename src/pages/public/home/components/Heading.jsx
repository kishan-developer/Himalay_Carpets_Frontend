import React from "react";

function Heading({ text }) {
    return (
        <h1
            className={`text-center  font-medium text-xl leading-none md:text-[2rem] capitalize  `}
        >
            {text}
        </h1>
    );
}

export default Heading;
