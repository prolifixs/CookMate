import { ReactNode } from 'react';

export interface BaseLayoutProps {
  children: ReactNode;
}

export interface MainLayoutProps extends BaseLayoutProps {
  sidebar?: ReactNode;
  footer?: ReactNode;
}