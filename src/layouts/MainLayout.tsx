import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      {/* Header */}
      <header>Navbar</header>

      {/* Page Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer>Footer</footer>
    </>
  );
};

export default MainLayout;
