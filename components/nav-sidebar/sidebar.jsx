"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Sidebar = ({ active }) => {
  // const firstCapital = (word) => {
  //   var x = word.split("");
  //   x[0] = x[0].toUpperCase();
  //   return x.join("");
  // };
  const { data: session } = useSession();
  const images = [
    { name: "home", capital: "Home", path: "/" },
    { name: "explore", capital: "Explore", path: "/explore" },
    { name: "notifications", capital: "Notifications", path: "/" },
    { name: "messages", capital: "Messages", path: "/" },
    { name: "profile", capital: "Profile", path: "/profile" },
    { name: "more", capital: "More", path: "/" },
  ];
  return (
    <div className="layout__left-sidebar">
      {!session?.user.id ? (
        ""
      ) : (
        <div className="sidebar-menu">
          <Image
            src="/assets/images/twitter.svg"
            className="brand"
            height={58}
            width={58}
            alt="Twitter Logo"
          />
          {images.map((data) => (
            <div
              className={`${
                data.name === active ? "sidebar-menu__item--active" : ""
              }`}
              key={data?.name}
            >
              <Link href={data.path} key={data?.name}>
                <div className="sidebar-menu__item">
                  <Image
                    src={`/assets/images/${data.name}.svg`}
                    className="sidebar-menu__item-icon"
                    height={26}
                    width={26}
                    alt={data.name}
                  />
                  <div
                    className={`${
                      data.name === active ? "sidebar-menu__item--active" : ""
                    }`}
                  >
                    {data.capital}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
