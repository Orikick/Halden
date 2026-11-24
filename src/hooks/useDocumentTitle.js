import { useEffect } from 'react';

const SITE_NAME = 'Halden';

// Sets the tab title so each route is announced and bookmarkable by name.
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Everyday things, well chosen`;
  }, [title]);
}
