import { Outlet } from "react-router-dom";

export default function Content() {
  return (
    <div className="min-h-[calc(100dvh-66px)] w-full min-w-0 overflow-x-hidden bg-gradient-to-br from-[#F7FAF7] via-[#F0F6F1] to-[#EAF3EC] p-3 dark:from-[#101713] dark:via-[#111827] dark:to-[#152019] sm:p-4 lg:p-6 scrollbar-hide">
      <Outlet />
    </div>
  );
}
