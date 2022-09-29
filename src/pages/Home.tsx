import { Publicity, Sidebar } from "../components";

export const Home = () => {
  return (
    <div className="flex justify-between h-screen ">
      <Sidebar />
      <Publicity />
    </div>
  );
};
