"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

interface FAQItem {
  _id: string;
  question: string;
  // Sanity delivers PortableTextBlock[]; Plasmic Studio canvas passes a plain string
  answer: PortableTextBlock[] | string;
  category: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
  title?: string;
}

function FAQItemRow({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="pr-4 text-base font-medium text-gray-900">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-xl font-light text-[#007F79]"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="prose prose-sm max-w-none pb-5 text-gray-600">
              {typeof item.answer === 'string'
                ? <p>{item.answer}</p>
                : <PortableText value={item.answer} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQAccordion({
  faqs = [],
  title = "Frequently Asked Questions",
}: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="mx-auto max-w-3xl px-6 py-20 w-screen">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center text-3xl font-bold text-gray-900"
      >
        {title}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-2xl border border-gray-200 bg-white px-6 shadow-sm"
      >
        {faqs.map((item) => (
          <FAQItemRow
            key={item._id}
            item={item}
            isOpen={openId === item._id}
            onToggle={() => setOpenId(openId === item._id ? null : item._id)}
          />
        ))}
      </motion.div>
    </section>
  );
}
