import React from 'react';
import { useIsDesktop } from '../hooks/useIsDesktop';
import { WeddingAnnouncementDesktop } from './announcement/WeddingAnnouncementDesktop';
import { WeddingAnnouncementMobile } from './announcement/WeddingAnnouncementMobile';

export const WeddingAnnouncementSection: React.FC = () => {
  const isDesktop = useIsDesktop();

  return isDesktop ? (
    <WeddingAnnouncementDesktop key="desktop" />
  ) : (
    <WeddingAnnouncementMobile key="mobile" />
  );
};
