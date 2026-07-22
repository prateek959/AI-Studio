const Topbar = ({title,subtitle}) => {
  return (
    <div className="mb-10">

      <h1 className="text-5xl font-black">
        {title}
      </h1>

      <p className="text-slate-400 mt-3 text-lg">
        {subtitle}
      </p>

    </div>
  );
};

export default Topbar;