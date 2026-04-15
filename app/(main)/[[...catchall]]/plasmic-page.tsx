"use client";

import { PlasmicComponent, PlasmicRootProvider } from "@plasmicapp/loader-nextjs";
import type { ComponentRenderData } from "@plasmicapp/loader-nextjs";
import { PLASMIC } from "@/plasmic-init";

interface PlasmicPageProps {
  plasmicData: ComponentRenderData;
  plasmicPath: string;
}

export function PlasmicPage({ plasmicData, plasmicPath }: PlasmicPageProps) {
  return (
    <PlasmicRootProvider loader={PLASMIC} prefetchedData={plasmicData}>
      <PlasmicComponent component={plasmicPath} />
    </PlasmicRootProvider>
  );
}
