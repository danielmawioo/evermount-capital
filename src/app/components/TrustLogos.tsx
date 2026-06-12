"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
  { src: "/logos/bitcoin.jpeg", alt: "Bitcoin", width: 100 },
  { src: "/logos/visa.png", alt: "Visa", width: 100 },
  { src: "/logos/Mastercard.svg", alt: "MasterCard", width: 100 },
  { src: "/logos/paypal.png", alt: "PayPal", width: 100 },
  { src: "/logos/coinbase.png", alt: "Coinbase", width: 120 },
  { src: "/logos/usdc.png", alt: "USDC", width: 100 },
  { src: "/logos/stripe.png", alt: "Stripe", width: 120 },
  { src: "/logos/applepay.png", alt: "Apple Pay", width: 100 },
];

export default function PaymentPartners() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-6 text-center">
      <p className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wide mb-8">
        We Support Seamless Transactions Via:
      </p>

      <div className="overflow-hidden relative w-full">
        <motion.div
          className="flex gap-16 w-max"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} className="flex-shrink-0">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={40}
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
