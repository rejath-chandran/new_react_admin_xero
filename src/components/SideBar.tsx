import React, { useState } from "react";
import {
  FiBarChart,
  FiChevronDown,
  FiChevronsRight,
  FiDollarSign,
  FiHome,
  FiMonitor,
  FiShoppingCart,
  FiTag,
  FiUsers,
  FiTarget,
  FiUser,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { Dashboard } from "./MainContent";
import { Link, useNavigate, useLocation, useMatch } from "react-router-dom";
export const Example = () => {
  return (
    <div className="flex bg-indigo-50">
      <Sidebar />
      <ExampleContent />
    </div>
  );
};

export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Services");

  //   const navigate = useNavigate();
  const location = useLocation();
  const match = useMatch(location.pathname);
  const isActive = match !== null;

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-1">
        <Option
          Icon={FiHome}
          title="Services"
          notifs={""} // Add this line
          selected={selected}
          setSelected={setSelected}
          open={open}
          //   isActive={isActive}
        />
        <Option
          Icon={FiUser}
          title="Staff"
          selected={selected}
          setSelected={setSelected}
          open={open}
          notifs={""}
          //   isActive={isActive}
        />
        <Option
          notifs={""} // Add this line
          Icon={FiMonitor}
          title="Attacks"
          selected={selected}
          setSelected={setSelected}
          open={open}
          //   isActive={isActive}
        />
        <Option
          notifs={""} // Add this line
          Icon={FiTarget}
          title="Projects"
          selected={selected}
          setSelected={setSelected}
          open={open}
          //   isActive={isActive}
        />
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

import { NavLink } from "react-router-dom";

const Option = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  notifs = "",
}: {
  Icon: React.ComponentType;
  title: string;
  selected: string;
  setSelected: (title: string) => void;
  open: boolean;
  notifs: number | string;
}) => {
  return (
    <NavLink
      to={`/admin/${title.toLowerCase()}`}
      className={({ isActive }) => `
        ${isActive ? "bg-primary text-white" : "text-slate-500 hover:bg-slate-100"}
        relative flex h-10 w-full items-center rounded-md transition-colors
      `}
    >
      {({ isActive }) => (
        <motion.button
          layout
          onClick={() => {
            setSelected(title);
          }}
          className="w-full h-full flex items-center"
        >
          <motion.div
            layout
            className="grid h-full w-10 place-content-center text-lg"
          >
            <Icon />
          </motion.div>
          {open && (
            <motion.span
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
              className="text-xs font-medium"
            >
              {title}
            </motion.span>
          )}

          {notifs && open && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              style={{ y: "-50%" }}
              transition={{ delay: 0.5 }}
              className="absolute right-2 top-1/2 size-4 rounded bg-primary text-xs text-white"
            >
              {notifs}
            </motion.span>
          )}
        </motion.button>
      )}
    </NavLink>
  );
};

const TitleSection = ({ open }: { open: boolean }) => {
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold">XEROLOK</span>
              <span className="block text-xs text-slate-500">Super Admin</span>
            </motion.div>
          )}
        </div>
        {/* {open && <FiChevronDown className="mr-2" />} */}
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md bg-transparent"
    >
      <img src="/Xerolok.svg" alt="" className="w-full h-full rounded-md" />
    </motion.div>
  );
};

const ToggleClose = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((prevOpen) => !prevOpen)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

const ExampleContent = () => (
  <div className="h-[100vh] w-full overflow-hidden scrollbar-hide">
    <Dashboard />
  </div>
);
