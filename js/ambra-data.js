window.AMBRA_DATA = {
  brand: "AMBRA CERAMIC",
  source: "https://ambraceramic.com/product",
  categories: [
    {
      id: "wall",
      number: "01",
      title: "WALLTILE",
      subtitle: "Interior Wall",
      icon: "view_agenda",
      description: "Interior wall tile series",
    },
    {
      id: "mosaic",
      number: "02",
      title: "MOSAIC TILE",
      subtitle: "Porcelain Mosaic",
      icon: "grid_view",
      description: "Porcelain mosaic series",
    },
    {
      id: "floor",
      number: "03",
      title: "FLOOR TILE",
      subtitle: "Floor Porcelain",
      icon: "crop_square",
      description: "Floor tile series",
    },
  ],
  series: [
    { id: "50x230", cat: "wall", size: "50 x 230", name: "SHEBRON", type: "INTERIOR WALL", slug: "50x230" },
    { id: "50x300", cat: "wall", size: "50 x 300", name: "SOLID", type: "INTERIOR WALL", slug: "50x300" },
    { id: "50x400", cat: "wall", size: "50 x 400", name: "SOLID", type: "INTERIOR WALL", slug: "50x400" },
    { id: "53x218", cat: "wall", size: "53 x 218", name: "TWO TONE", type: "INTERIOR WALL", slug: "53x218" },
    { id: "65x266", cat: "wall", size: "65 x 266", name: "BUMPY", type: "INTERIOR WALL", slug: "65x266" },
    { id: "69x240cv", cat: "wall", size: "69 x 240", name: "CONVEX", type: "INTERIOR WALL", slug: "69x240CV" },
    { id: "69x240", cat: "wall", size: "69 x 240", name: "BEVEL", type: "INTERIOR WALL", slug: "69x240" },
    { id: "100x300lh", cat: "wall", size: "100 x 300", name: "LONG HEXAGON", type: "INTERIOR WALL", slug: "100x300lh" },
    { id: "100x300b", cat: "wall", size: "100 x 300", name: "BEVEL", type: "INTERIOR WALL", slug: "100x300b" },
    { id: "100x300i", cat: "wall", size: "100 x 300", name: "INVERSE", type: "INTERIOR WALL", slug: "100x300i" },
    { id: "100x300p", cat: "wall", size: "100 x 300", name: "BUMPY", type: "INTERIOR WALL", slug: "100x300p" },
    { id: "160x200", cat: "wall", size: "160 x 200", name: "HEXAGON", type: "INTERIOR WALL", slug: "160x200" },

    { id: "325x145bb", cat: "mosaic", size: "32.5 x 145", name: "BAMBOO", type: "PORCELAIN MOSAIC", slug: "325x145bb" },
    { id: "325x145", cat: "mosaic", size: "32.5 x 145", name: "S/T/V", type: "PORCELAIN MOSAIC", slug: "325x145" },
    { id: "45x195", cat: "mosaic", size: "45 x 195", name: "S/T/V", type: "PORCELAIN MOSAIC", slug: "45x195" },
    { id: "296x300", cat: "mosaic", size: "296 x 300", name: "STRIPE", type: "PORCELAIN MOSAIC", slug: "78" },
    { id: "47x147", cat: "mosaic", size: "47 x 147", name: "INVERSE S/T", type: "PORCELAIN MOSAIC", slug: "47x147" },
    { id: "51x59", cat: "mosaic", size: "51 x 59", name: "HEXAGON", type: "PORCELAIN MOSAIC", slug: "51x59" },
    { id: "95x110", cat: "mosaic", size: "95 x 110", name: "HEXAGON", type: "PORCELAIN MOSAIC", slug: "95x110" },
    { id: "60x70", cat: "mosaic", size: "60 x 70", name: "WEAVE", type: "PORCELAIN MOSAIC", slug: "60x70" },
    { id: "148x148", cat: "mosaic", size: "148 x 148", name: "OCTAGON", type: "PORCELAIN MOSAIC FLOOR", slug: "148x148" },
    { id: "97x97embo", cat: "mosaic", size: "97 x 97", name: "EMBO", type: "PORCELAIN MOSAIC", slug: "77" },
    { id: "97x97mix", cat: "mosaic", size: "97 x 97", name: "MIX", type: "PORCELAIN MOSAIC", slug: "79" },
    { id: "swiss-cross", cat: "mosaic", size: "97 x 97", name: "SWISS CROSS", type: "PORCELAIN MOSAIC", slug: "jun-cross" },
    { id: "carrara", cat: "mosaic", size: "SERIES", name: "CARRARA", type: "PORCELAIN MOSAIC", slug: "jun-carrara" },

    { id: "600x600", cat: "floor", size: "600 x 600", name: "TERRAZZO", type: "PORCELAIN TILE", slug: "600x600" },
    { id: "300x300", cat: "floor", size: "300 x 300", name: "FULLBODY", type: "PORCELAIN FLOOR", slug: "300x300" },
    { id: "248x288", cat: "floor", size: "248 x 288", name: "HEXAGON", type: "CERAMIC FLOOR", slug: "248x288" },
    { id: "60x240", cat: "floor", size: "60 x 240", name: "WOOD", type: "PORCELAIN FLOOR", slug: "60x240" },
  ],
  categoryById(id) {
    return this.categories.find((c) => c.id === id) || null;
  },
  seriesById(id) {
    return this.series.find((s) => s.id === id) || null;
  },
  seriesFor(catId) {
    return this.series.filter((s) => s.cat === catId);
  },
  officialUrl(series) {
    return `https://ambraceramic.com/${series.slug}`;
  },
};
