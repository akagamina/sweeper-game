"use client";

import { Provider } from "react-redux";

export function Providers({
  children,
  store,
}: {
  children: React.ReactNode;
  store: any;
}) {
  return <Provider store={store}>{children}</Provider>;
}
