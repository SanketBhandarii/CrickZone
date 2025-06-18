import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { Context } from "./store/Context";
import Header from "./components/navbar/Header";

const Wrapper = () => {
  const { timeToShowHeader } = useContext(Context);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.1),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      {timeToShowHeader && <Header />}
      
      <main className={`flex justify-center items-center px-4 ${timeToShowHeader ? 'pt-24 min-h-screen' : 'min-h-screen'}`}>
        <Outlet />
      </main>
      
      <Toaster 
        theme="dark" 
        position="top-center"
        toastOptions={{
          style: {
            background: '#18181b',
            border: '1px solid #27272a',
            color: '#fff',
          },
        }}
      />
    </div>
  );
};

export default Wrapper;