"use client";

export const scrollToSpatialSection = (id: string) => {
  if (typeof window === 'undefined') return;
  const cleanId = id.replace(/^#/, '');
  const event = new CustomEvent('navigateToSpatialSection', {
    detail: { id: cleanId },
  });
  window.dispatchEvent(event);
};
