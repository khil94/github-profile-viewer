import ThemeProvider from "../components/themeProvider";
import Contents from "../layouts/contents";
import Footer from "../layouts/footer";
import Header from "../layouts/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ThemeProvider />
      <Header itemList={[{ name: "bookmark", src: "/bookmark" }]} />
      <Contents>{children}</Contents>
      <Footer />
    </div>
  );
}
