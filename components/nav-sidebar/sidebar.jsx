import Image from "next/image";
import React from "react";

const Sidebar = () => {
  const firstCapital = (word) => {
    var x = word.split("");
    x[0] = x[0].toUpperCase();
    return x.join("");
  };

  const images = [
    "home",
    "explore",
    "notifications",
    "messages",
    "profile",
    "more",
  ];
  return (
    <div className="layout__left-sidebar">
      <div className="sidebar-menu">
        <Image
          src="/assets/images/twitter.svg"
          className="brand"
          height={58}
          width={58}
          alt="Twitter Logo"
        />
        <div className="sidebar-menu__item sidebar-menu__item--active"></div>
        {images.map((img) => (
          <div className="sidebar-menu__item">
            <Image
              src={`/assets/images/${img}.svg`}
              className="sidebar-menu__item-icon"
              height={26}
              width={26}
              alt={img}
            />
            {firstCapital(img)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
