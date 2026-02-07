import ProfileCard from './ProfileCard.jsx'
import IMG from './assets/download.jpg'
import './Profile.css'
import CursorGlow from './CursorGlow.jsx'

function Profiles() {
    const profileImage = IMG
    const ProfileInformation = [
        {
            name : "Yash goyal",
            image : profileImage,
            description : "I am a second-year B.Tech Computer Science student with a strong passion for web development and data structures. I enjoy building clean, interactive, and user-focused web interfaces while paying close attention to design, performance, and scalability. Alongside frontend development, I actively work on strengthening my problem-solving skills through data structures and algorithms, as I believe strong fundamentals are the backbone of great software engineering. I am constantly exploring new technologies, refining my coding practices, and pushing myself to grow as a well-rounded developer.",
            Linkedin : "https://www.linkedin.com/in/yash-goyal108/",
            Github : "https://github.com/groxyash",
            Leetcode : "https://leetcode.com/u/groxMrParam/"
        },
        {
            name : "Rishik Uchadiya",
            image : profileImage,
            description : "I am a second-year B.Tech student deeply interested in machine learning, data-driven systems, and algorithmic problem solving. I enjoy understanding how data can be transformed into meaningful insights and intelligent solutions that impact real-world problems. My learning journey involves experimenting with machine learning concepts, improving my mathematical and logical foundations, and exploring how theory connects with practical implementation. I am motivated by curiosity and continuously strive to improve my technical depth and analytical thinking.",
            Linkedin : "https://www.linkedin.com/in/yash-goyal108/",
            Github : "https://github.com/groxyash",
            Leetcode : "https://leetcode.com/u/groxMrParam/"
        },
        {
            name : "Aman Kumar",
            image : profileImage,
            description : "I am a second-year B.Tech student with a keen interest in web development and competitive programming. I enjoy building fast, responsive, and visually appealing web applications while also challenging myself with algorithmic problems that sharpen my logical reasoning. Competitive programming has helped me develop a disciplined approach to problem solving, attention to edge cases, and efficient coding practices. I aim to combine strong problem-solving skills with modern web technologies to build impactful and reliable software solutions.",
            Linkedin : "https://www.linkedin.com/in/yash-goyal108/",
            Github : "https://github.com/groxyash",
            Leetcode : "https://leetcode.com/u/groxMrParam/"
        }
    ]
    return (
        <div className="profilesContainer">
            <CursorGlow />
            {ProfileInformation.map((profiles, index)=>(
                <section className="profileSection" key={profiles.name}>
                <ProfileCard
                    key = {index}
                    name = {profiles.name}                
                    image = {profiles.image}                
                    description = {profiles.description}                
                    Linkedin = {profiles.Linkedin}                
                    Github = {profiles.Github}                
                    Leetcode = {profiles.Leetcode}                
                />
                </section>
            ))}
        </div>
  )
}

export default Profiles
