import React from "react";
import { TiWarning } from "react-icons/ti";

export const Alert = ({ msg }: { msg: string }) => {
  return (
    <div className="bg-red-500 py-2 px-5 mb-3 flex gap-3 items-center w-3/5 justify-between rounded-lg">
      <TiWarning className="text-white text-4xl" />
      <p className="text-white text-4xl">{msg}</p>
      <TiWarning className="text-white text-4xl" />
    </div>
  );
};
