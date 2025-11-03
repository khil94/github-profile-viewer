interface props {
  children: React.ReactNode;
}

export default function Contents({ children }: props) {
  return (
    <div className="w-full pt-20 min-h-svh flex justify-center items-start p-[5%]">
      <div className="max-w-4xl w-full">{children}</div>
    </div>
  );
}
