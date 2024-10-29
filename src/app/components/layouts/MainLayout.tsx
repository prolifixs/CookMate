import { ReactNode } from 'react';
import { layoutStyles } from '../../constants/styles';

type MainLayoutProps = {
  children: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
};

export function MainLayout({ children, sidebar, footer }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {sidebar && <div className={layoutStyles.sidebar}>{sidebar}</div>}

      {/* Main content */}
      <div className={layoutStyles.mainContent}>
        {children}
        
        {/* Footer */}
        {footer && <footer className={layoutStyles.footer}>{footer}</footer>}
      </div>
    </div>
  );
}