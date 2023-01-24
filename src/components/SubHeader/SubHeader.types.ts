import { HTMLAttributes, ReactNode } from 'react';

export interface SubHeaderProps extends HTMLAttributes<HTMLDivElement> {
  searchBar?: boolean;
  divider?: boolean;
  profileImg?: string;
  children?: ReactNode;
}
