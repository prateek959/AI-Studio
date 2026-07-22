const ResultCard = ({
  title,
  content
}) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-7 backdrop-blur-xl">

      <h3 className="text-2xl font-black mb-5">
        {title}
      </h3>

      <p className="text-slate-300 leading-relaxed whitespace-pre-line">
        {content}
      </p>

    </div>
  );
};

export default ResultCard;