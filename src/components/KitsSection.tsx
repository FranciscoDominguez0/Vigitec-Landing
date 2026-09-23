import KitCard from "./KitCard";

export default function KitsSection() {
  const kits = [
    {
      titulo: "Kit 1",
      potencia: "4.96 kWp",
      ahorro: "Ahorro hasta $140.00 / mes (627 kWh)",
      precio: "4,607.28",
      paneles: 8,
      microinversores: 2,
      imagenSrc: "/assets/img/hero/kit_1.jpeg",
      kitQuery: "Kit-4.96kWp",
      reverse: false
    },
    {
      titulo: "Kit 2",
      potencia: "7.44 kWp",
      ahorro: "Ahorro hasta $220.00 / mes (941 kWh)",
      precio: "6,100.09",
      paneles: 12,
      microinversores: 3,
      imagenSrc: "/assets/img/hero/kit_2.jpeg",
      kitQuery: "Kit-7.44kWp",
      reverse: true
    },
    {
      titulo: "Kit 3",
      potencia: "9.92 kWp",
      ahorro: "Ahorro hasta $300.00 / mes (1255 kWh)",
      precio: "7,684.59",
      paneles: 16,
      microinversores: 4,
      imagenSrc: "/assets/img/hero/kit_3.jpeg",
      kitQuery: "Kit-9.92kWp",
      reverse: false
    },
    {
      titulo: "Kit 4",
      potencia: "12.40 kWp",
      ahorro: "Ahorro hasta $400.00 / mes (1569 kWh)",
      precio: "9,745.60",
      paneles: 20,
      microinversores: 5,
      imagenSrc: "/assets/img/hero/kit_4.jpeg",
      kitQuery: "Kit-12.40kWp",
      reverse: true
    },
    {
      titulo: "Kit 5",
      potencia: "14.88 kWp",
      ahorro: "Ahorro hasta $490.00 / mes (1882 kWh)",
      precio: "11,174.65",
      paneles: 24,
      microinversores: 6,
      imagenSrc: "/assets/img/hero/kit_5.jpeg",
      kitQuery: "Kit-14.88kWp",
      reverse: false
    }
  ];

  return (
    <section id="kits" className="pt-32 pb-24 bg-[#111111]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-20">

          <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6 tracking-tight uppercase drop-shadow-md">
            Energía Limpia, <span className="text-accent">Ahorro Inteligente</span>
          </h1>
          <div className="w-16 h-1 bg-gray-800 mx-auto rounded-full relative overflow-hidden mb-6">
            <div className="absolute top-0 left-0 w-8 h-full bg-accent"></div>
          </div>
          <p className="text-gray-300 text-lg lg:text-xl font-light mt-6 max-w-2xl mx-auto leading-relaxed">
            Nuestra división especializada en energía limpia. Sistemas de paneles solares diseñados a la medida para tu hogar o negocio.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {kits.map((kit, idx) => (
            <KitCard key={idx} {...kit} priority={idx < 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
