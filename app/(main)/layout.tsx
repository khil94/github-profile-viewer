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
    <html lang="ko">
      <body className={`antialiased`}>
        <ThemeProvider />
        <Header
          itemList={[
            { name: "test-home", src: "/" },
            { name: "test-home", src: "/" },
            { name: "test-home", src: "/" },
          ]}
        />
        <Contents>{children}</Contents>
        <Footer />
      </body>
    </html>
  );
}
