"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { SanityTeamMember } from "@/sanity/lib/types";

interface TeamGridProps {
  members?: SanityTeamMember[];
  title?: string;
}

function MemberCard({
  member,
  index,
}: {
  member: SanityTeamMember;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.07,
      }}
      className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100"
    >
      {member.photo?.asset.url ? (
        <div className="relative h-64 w-full overflow-hidden bg-[#E6F7F6]">
          <Image
            src={member.photo.asset.url}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center bg-linear-to-br from-[#007F79] to-[#005F5A] text-5xl font-bold text-white/30">
          {member.name?.[0] ?? "?"}
        </div>
      )}

      <div className="p-5">
        <h3 className="font-semibold text-gray-900">{member.name}</h3>
        <p className="mt-0.5 text-sm text-[#007F79]">
          {member.role}
          {member.credentials && (
            <span className="text-gray-400">, {member.credentials}</span>
          )}
        </p>
        {member.specialties && member.specialties.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {member.specialties.slice(0, 3).map((s) => (
              <span
                key={s}
                className="rounded-full bg-[#E6F7F6] px-2.5 py-0.5 text-xs font-medium text-[#007F79]"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function TeamGrid({
  members = [],
  title = "Meet Our Clinical Team",
}: TeamGridProps) {
  const [fetched, setFetched] = useState<SanityTeamMember[]>([]);

  // Always fetch live data from Sanity. The `members` prop (Plasmic's saved
  // defaultValue) is used only as a placeholder while the fetch is in flight.
  useEffect(() => {
    fetch("/api/team-members")
      .then((r) => r.json())
      .then((data) => setFetched(data))
      .catch(() => {});
  }, []);

  const visible = fetched.length > 0 ? fetched : members;

  return (
    <section className="w-full py-20">
      <div className="mx-auto max-w-6xl px-6">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-3xl font-bold text-white"
          >
            {title}
          </motion.h2>
        )}
        {visible.length === 0 ? (
          <p className="py-20 text-center text-gray-400">
            No team members yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((m, i) => (
              <MemberCard key={m._id ?? m.name ?? i} member={m} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
