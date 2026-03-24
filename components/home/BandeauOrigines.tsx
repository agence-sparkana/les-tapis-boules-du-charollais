"use client";

export default function BandeauOrigines() {
  const text =
    "Cardée · Feutrée · Assemblée à la main · Rigny-sur-Arroux · Bourgogne · 71160 · Laine 100% naturelle · Pièce unique · ";

  return (
    <section
      className="py-4 sm:py-5 overflow-hidden"
      style={{ background: "#D9CCBB" }}
    >
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: "marquee 20s linear infinite",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.animationPlayState = "running";
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="text-sm sm:text-base font-display tracking-wide"
            style={{ color: "#3D2010" }}
          >
            {text}
          </span>
        ))}
      </div>
    </section>
  );
}
