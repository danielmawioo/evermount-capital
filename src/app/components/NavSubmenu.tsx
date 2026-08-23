import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { NavSubItem } from "./navItems";

interface NavSubmenuProps {
  open: boolean;
  items: NavSubItem[];
}

export default function NavSubmenu({ open, items }: NavSubmenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-2"
        >
          {items.map((subItem, idx) => (
            <motion.div
              key={subItem.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                href={subItem.href}
                className="flex items-start space-x-3 p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group/item"
              >
                <subItem.icon className="w-5 h-5 text-[#00a76f] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white group-hover/item:text-[#00a76f] transition-colors">
                    {subItem.label}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {subItem.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
