const FileContainer = ({
  children,
  dropping,
}: {
  children: React.ReactNode;
  dropping: boolean;
}) => {
  return (
    <div
      className={`h-[300px] flex justify-center items-center cursor-pointer ${
        dropping && "bg-slate-500 opacity-60"
      } border-slate-300 rounded-2xl border-2 border-opacity-40 border-dashed flex-col gap-5`}
    >
      {children}
    </div>
  );
};
export default FileContainer;
