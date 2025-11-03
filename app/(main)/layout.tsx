import ThemeProvider from "../components/themeProvider";
import Contents from "../layouts/contents";
import Header from "../layouts/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ThemeProvider />
      <Header />
      <Contents>{children}</Contents>
    </div>
  );
}
