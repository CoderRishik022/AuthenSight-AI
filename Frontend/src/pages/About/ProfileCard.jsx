import React from 'react'
import GithubImage from '../../assets/Github.png'
import LinkedinImage from '../../assets/Linkedin.png'
import LeetcodeImage from '../../assets/Leetcode.png'
import './ProfileCard.css'

function ProfileCard({name, image, description, Linkedin, Github, Leetcode}) {
  return (
    <div className="profileBanner">
    <div className="profileText">
        <h1 className="profileName">{name}</h1>
        <p className="profileDescription">{description}</p>

        <div className="SocialLinks">
        <a href={Linkedin} target="_blank" rel="noopener noreferrer">
            <img src={LinkedinImage} alt="LinkedIn" className="socialIcon" />
        </a>
        <a href={Github} target="_blank" rel="noopener noreferrer">
            <img src={GithubImage} alt="GitHub" className="socialIcon" />
        </a>
        <a href={Leetcode} target="_blank" rel="noopener noreferrer">
            <img src={LeetcodeImage} alt="LeetCode" className="socialIcon" />
        </a>
        </div>
    </div>

    <div className="profilePhoto">
        <img src={image} alt={name} />
    </div>
    </div>

  )
}

export default ProfileCard
