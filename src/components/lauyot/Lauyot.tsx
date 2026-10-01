import { useState } from "react";

import Main from "./Main";
import Sidebar from "./Sidebar";

export default function Lauyot() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-dvh w-full overflow-x-hidden">
      {mobileNavOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}
      <Sidebar
        mobileOpen={mobileNavOpen}
        onMobileClose={() => setMobileNavOpen(false)}
      />
      <Main onMenuClick={() => setMobileNavOpen((open) => !open)} />
    </div>
  );
}
