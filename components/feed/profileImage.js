import Image from 'next/image'
import React from 'react'

const ProfileImage = ({ profileImage }) => {
    return (
        <Image
            className="tweet__author-logo"
            src={profileImage}
            width={49}
            height={49}
            alt="Profile"
        />
    )
}

export default ProfileImage