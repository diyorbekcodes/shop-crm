import { Outlet } from "react-router-dom";

export default function Content() {
  return (
    <div className="min-h-[calc(100dvh-66px)] w-full min-w-0  overflow-x-hidden bg-[#F9FAFB] p-3 dark:bg-[#111827] sm:p-4 lg:p-6 scrollbar-hide">
      <Outlet />
    </div>
  );
}
