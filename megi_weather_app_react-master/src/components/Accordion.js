import { useState } from "react";
import "../assets/styles/customstyles/forecast.scss";

function Accordion(props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="accordion-component">
      <div className="accordion w-[10rem]">
        <div className="mx-auto my-2 md:my-4">
          <button
            className="px-[1.5rem] py-[0.5rem] text-sm md:text-base text-white font-medium border-[1px] border-solid border-white rounded-xl"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <span>{props.title}&nbsp;&nbsp;</span>
            <span>{open ? "-" : "+"}</span>
          </button>
        </div>
        {open && (
          <div
            id="accordion-content"
            className="text-white text-sm md:text-base"
          >
            <p>Feels like:&nbsp;{props.feelsLike}</p>
            <hr />
            <p>Sunrise:&nbsp;{props.humidity}</p>
            <hr />
            <p>Sunset:&nbsp;{props.humidity}</p>
            <hr />
            <p>Wind speed:&nbsp;{props.windSpeed}</p>
            <hr />
            <p>Humidity:&nbsp;{props.humidity}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Accordion;
