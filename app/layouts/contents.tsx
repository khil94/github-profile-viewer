interface props {
  children: React.ReactNode;
}

export default function Contents({ children }: props) {
  return (
    <div className="w-full flex justify-center items-center p-[5%]">
      <div className="max-w-4xl w-full">{children}</div>
    </div>
  );
}
