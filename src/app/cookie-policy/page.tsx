"use client";

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-50 text-gray-800 px-6 py-20">
      <div className="max-w-4xl mx-auto space-y-14">
        {/* HEADER */}
        <header>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-2 text-gray-900">
            🍪 Cookie Policy
          </h1>
          <p className="text-sm text-gray-500">
            Effective Date: April 25, 2025
          </p>
          <p className="mt-4 text-base text-gray-700 leading-relaxed">
            This Cookie Policy explains how Evermount Capital ("we", "our", or
            "us") uses cookies and similar technologies to recognize you when
            you visit our platform.
          </p>
        </header>

        {/* POLICY LIST */}
        <section className="space-y-10 text-base leading-7 text-gray-700">
          <ol className="space-y-8 list-decimal pl-5">
            {[
              [
                "What Are Cookies",
                "Small data files placed on your device to track behavior, preferences, and session activity.",
              ],
              [
                "Why We Use Cookies",
                "To optimize site performance, personalize user experience, enhance security, and analyze traffic.",
              ],
              [
                "First-Party Cookies",
                "Set by Evermount directly for login sessions, saving theme preferences, and chart states.",
              ],
              [
                "Third-Party Cookies",
                "Used for analytics (Google), payments (Stripe), and social logins.",
              ],
              [
                "Session Cookies",
                "Temporary and deleted when the browser closes. Maintains login across pages.",
              ],
              [
                "Persistent Cookies",
                "Stored long-term for language, theme, and device preference.",
              ],
              [
                "Essential Cookies",
                "Required for basic functions — e.g., sign-in, portfolio access. Cannot be disabled.",
              ],
              [
                "Performance Cookies",
                "Analyze load time, server response, and overall UX.",
              ],
              [
                "Functional Cookies",
                "Enable theme, currency, language, and interface customizations.",
              ],
              [
                "Analytics Cookies",
                "Gather data to improve product performance and insights.",
              ],
              [
                "Advertising Cookies",
                "Currently not used. We will ask for consent if we introduce them.",
              ],
              [
                "Consent Banner",
                "Shown at first entry with opt-in/out options — compliant with GDPR/CCPA.",
              ],
              [
                "Cookie Settings",
                "You can adjust your preferences via the footer at any time.",
              ],
              [
                "Opt-Out Tools",
                "Tools like uBlock or browser settings can block analytics cookies.",
              ],
              [
                "Device Data",
                "We log IP, OS, browser version to help protect user accounts.",
              ],
              [
                "Security & Fraud",
                "Used to detect suspicious activity or abuse.",
              ],
              [
                "Cross-Device Tracking",
                "We do not track users across devices unless you opt in.",
              ],
              [
                "LocalStorage",
                "Used for storing dashboard filters, mode settings, and session tokens.",
              ],
              [
                "Browser Settings",
                "Most browsers let you block cookies from settings > privacy/security.",
              ],
              [
                "Auto-Expiration",
                "Session cookies expire after 2h of inactivity by default.",
              ],
              [
                "Geo-Specific Rules",
                "Enhanced modals for EU, California, Kenya, and other regions.",
              ],
              [
                "Data Sharing",
                "We do not sell cookie-collected data. Used solely for your experience.",
              ],
              [
                "Custom Cookie Classes",
                "Grouped by type: analytics, preferences, auth, device, etc.",
              ],
              [
                "Consent Logging",
                "All cookie consents are securely stored and timestamped.",
              ],
              [
                "Financial APIs",
                "Integrations like Okra, Plaid may drop session-based cookies.",
              ],
              [
                "Accessibility Cookies",
                "Store font size, contrast, and keyboard nav preferences.",
              ],
              [
                "Change Notification",
                "We update this policy on material changes — see the changelog.",
              ],
              [
                "Consent Lifespan",
                "Your opt-in is remembered for 6 months unless manually reset.",
              ],
              [
                "Children's Privacy",
                "We do not knowingly track children under 18 via cookies.",
              ],
              [
                "Contact",
                "Reach us at cookies@evermount.com with any questions.",
              ],
            ].map(([title, desc], idx) => (
              <li key={idx}>
                <p className="font-semibold text-gray-900 mb-1">{title}</p>
                <p className="text-gray-700">{desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* FOOTER */}
        <footer className="pt-10 border-t border-gray-200 text-sm text-gray-600">
          <p>
            For cookie-related concerns, please email{" "}
            <a
              href="mailto:cookies@evermount.com"
              className="text-[#00a76f] font-medium underline"
            >
              cookies@evermount.com
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
