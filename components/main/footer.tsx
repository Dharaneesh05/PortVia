import Link from "next/link";

export const Footer = () => {
  const footerLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about-me" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];


  return (
    <footer className="w-full backdrop-blur-md bg-[#03001417] bg-transparent
     text-white relative pt-48 pb-6 mt-[-100px] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        {/* Separator Line */}
        <div className="w-full h-px bg-white/10 mb-6" />
        
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-16">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-400 hover:text-white text-lg font-semibold uppercase tracking-wider transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
