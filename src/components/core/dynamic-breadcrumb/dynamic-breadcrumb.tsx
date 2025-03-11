import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../../components/ui/breadcrumb';
import { DYNAMIC_BREADCRUMB_TITLES } from 'constant/dynamic-breadcrumb-title';

type DynamicBreadcrumbSegment = {
  href: string;
  label: string;
};

type DynamicBreadcrumbProps = {
  breadcrumbIndex?: number;
};

const DynamicBreadcrumb: React.FC<DynamicBreadcrumbProps> = ({ breadcrumbIndex }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter((segment) => segment);

  const dynamicBreadcrumbs: DynamicBreadcrumbSegment[] = pathSegments.map((_, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
    return {
      href,
      label: pathSegments[index].replace(/-/g, ' ').toUpperCase(),
    };
  });

  const displayedCrumbs = breadcrumbIndex
    ? dynamicBreadcrumbs.slice(breadcrumbIndex - 1)
    : dynamicBreadcrumbs;

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {displayedCrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.href}>
            <BreadcrumbItem>
              {index === displayedCrumbs.length - 1 ? (
                <BreadcrumbPage className="text-muted-foreground">
                  {DYNAMIC_BREADCRUMB_TITLES[crumb.href] || crumb.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={crumb.href} className="hover:text-primary">
                    {DYNAMIC_BREADCRUMB_TITLES[crumb.href] || crumb.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < displayedCrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
