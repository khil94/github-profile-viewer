import { LoaderIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <LoaderIcon className=" animate-spin" />
    </div>
  );
}
