import Image from 'next/image'
import React from 'react'

const ProfileImage = ({ profileImage, is_retweet, onClick }) => {
    return (
        <Image
            className="tweet__author-logo cursor-pointer"
            src={profileImage}
            onClick={onClick}
            width={49}
            height={49}
            style={is_retweet ? { width: "29px", height: "29px" } : { width: "49px", height: "49px" }}
            alt="Profile"
        />
    )
}

export default ProfileImage