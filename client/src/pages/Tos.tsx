const Tos = () => {
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
        Terms of Services
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
        By accessing and using our website, you agree to comply with and be bound by these Terms of Service. We reserve the right to modify or update these terms at any time without prior notice. All content and materials provided on the website are for informational purposes only, and we do not guarantee the accuracy, completeness, or reliability of the information. You are responsible for your use of the site and agree to use it in compliance with applicable laws. For further inquiries, please contact us directly.
      </p>
    </div>
  )
}

export default Tos
