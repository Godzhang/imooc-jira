import { useEffect, useRef } from "react";

export const useDocumentTitle = (
  title: string,
  keeponUnmount: boolean = true
) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keeponUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keeponUnmount, oldTitle]);
};
