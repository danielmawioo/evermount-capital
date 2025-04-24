import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0e0e1a] text-gray-400 pt-16 pb-6 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Grid Sections */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-sm mb-12">
          <div>
            <h4 className="text-white font-semibold mb-4">Markets</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#">Evermount CFDs</Link>
              </li>
              <li>
                <Link href="#">Future Markets</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Education</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#">Investor Tour</Link>
              </li>
              <li>
                <Link href="#">AI Trading Guide</Link>
              </li>
              <li>
                <Link href="#">Growth Dashboard</Link>
              </li>
              <li>
                <Link href="#">Insights Blog</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Important Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#">FAQs</Link>
              </li>
              <li>
                <Link href="#">Partnerships</Link>
              </li>
              <li>
                <Link href="#">Investor Events</Link>
              </li>
              <li>
                <Link href="#">Risk Disclosure</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Privacy & Policy</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#">Terms of Service</Link>
              </li>
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Cookie Policy</Link>
              </li>
              <li>
                <Link href="#">AML Statement</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#">Email</Link>
              </li>
              <li>
                <Link href="#">Live Chat</Link>
              </li>
              <li>
                <Link href="#">Messenger</Link>
              </li>
              <li>
                <Link href="#">Connect</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Community</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#">Local Communities</Link>
              </li>
              <li>
                <Link href="#">Join Discord</Link>
              </li>
              <li>
                <Link href="#">Join X</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mb-6">
          <Link href="#">
            <img src="/icons/facebook.svg" alt="Facebook" className="h-5 w-5" />
          </Link>
          <Link href="#">
            <img src="/icons/x.svg" alt="Twitter/X" className="h-5 w-5" />
          </Link>
          <Link href="#">
            <img
              src="/icons/instagram.svg"
              alt="Instagram"
              className="h-5 w-5"
            />
          </Link>
          <Link href="#">
            <img src="/icons/linkedin.svg" alt="LinkedIn" className="h-5 w-5" />
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-500 border-t border-gray-800 pt-4">
          © {new Date().getFullYear()} Evermount Capital. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
