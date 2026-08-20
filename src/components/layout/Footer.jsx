import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../common/Container";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Movies", to: "/movies" },
  { label: "Watchlist", to: "/watchlist" },
  { label: "About", to: "/about" },
];

function Footer() {
  return (
    <footer className="mt-16 border-t border-[#e6dcc8] bg-[#f8f4ec]">
      <Container>
        <div className="flex h-16 items-center justify-end">
          <nav className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-semibold text-[#2f3136] transition-colors hover:text-[#9b6417]"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://github.com/saikiran-ravuri"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#2f3136] transition-colors hover:text-[#9b6417]"
            >
              GitHub
              <ArrowUpRight size={14} />
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;


