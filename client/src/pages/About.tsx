import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
    {/* Hero Section with Background Image */}
    <div
      className="w-full text-center py-10"
      style={{
        backgroundImage: `url('/Tos.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "500px", // You can adjust this height as needed
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
    </div>

      <h1
        className="font-bold text-2xl md:text-xl sm:text-lg"
        style={{ fontFamily: 'Times New Roman, Arial, sans-serif' }}
      >
        About
      </h1>

      <p
        className="text-2xl md:text-xl sm:text-lg"
        style={{
          fontFamily: 'Times New Roman, Arial, sans-serif',
          width: '80%',
          maxWidth: '800px',
          margin: '20px auto',
          lineHeight: '1.6',
          wordWrap: 'break-word',
        }}
      >
        Rate My Schools is a platform designed to help students, parents, and educators make informed decisions by providing honest reviews and ratings for schools. Whether you're looking for insights on academics, campus life, extracurricular activities, or faculty, our app offers a space for real users to share their experiences. With a user-friendly interface, verified reviews, and personalized recommendations, Rate My Schools makes it easier than ever to find the right school for your needs. Join our community and contribute to a more transparent and informed education system!
      </p>
      <p
      className="text-2xl md:text-xl sm:text-lg"
      style={{
        fontFamily: 'Times New Roman, Arial, sans-serif',
        width: '80%',
        maxWidth: '800px',
        margin: '20px auto',
        lineHeight: '1.6',
        wordWrap: 'break-word',
      }}
    >
      For more information, contact us at{' '}
      <a
        href="mailto:ratemyschools@gmail.com"
        style={{ color: 'blue', textDecoration: 'underline' }}
      >
        ratemyschools@gmail.com
      </a>
    </p>
  </div>
  )
}

export default About