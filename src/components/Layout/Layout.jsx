import Navigation from "../Navigation/Navigation";
import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <div>
      <Suspense fallback={<div>Please waite loading page...</div>}>
        <Navigation />
        {children}
      </Suspense>
    </div>
  );
}
