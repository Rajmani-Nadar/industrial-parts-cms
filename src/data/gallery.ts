export type GalleryCategory =
  | "Manufacturing"
  | "Products"
  | "Warehouse"
  | "Quality Testing"
  | "Installation"
  | "Packaging"
  | "Dispatch";

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  location: string;
  image: string;
  width: number;
  height: number;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: "g1", title: "Assembly floor", category: "Manufacturing", location: "Pune Plant", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80", width: 900, height: 1200 },
  { id: "g2", title: "Brake component line", category: "Products", location: "Quality Bay", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80", width: 900, height: 700 },
  { id: "g3", title: "Warehouse racking", category: "Warehouse", location: "Distribution Center", image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80", width: 900, height: 1200 },
  { id: "g4", title: "Torque bench validation", category: "Quality Testing", location: "Testing Lab", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80", width: 900, height: 700 },
  { id: "g5", title: "Field installation", category: "Installation", location: "Power Plant", image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80", width: 900, height: 1200 },
  { id: "g6", title: "Packed spares", category: "Packaging", location: "Shipping Desk", image: "https://images.unsplash.com/photo-1565610222536-ef125c59da53?auto=format&fit=crop&w=1200&q=80", width: 900, height: 700 },
  { id: "g7", title: "Dispatch checklist", category: "Dispatch", location: "Outbound Hub", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80", width: 900, height: 1200 },
  { id: "g8", title: "Production cell", category: "Manufacturing", location: "Assembly Line", image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1200&q=80", width: 900, height: 700 },
  { id: "g9", title: "Control panel assembly", category: "Products", location: "Electronics Unit", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80", width: 900, height: 1200 },
  { id: "g10", title: "Inventory storage", category: "Warehouse", location: "Stock Yard", image: "https://images.unsplash.com/photo-1586528116314-9f9a74abfcf1?auto=format&fit=crop&w=1200&q=80", width: 900, height: 700 },
  { id: "g11", title: "Load test bench", category: "Quality Testing", location: "Validation Area", image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80", width: 900, height: 1200 },
  { id: "g12", title: "On-site commissioning", category: "Installation", location: "Industrial Site", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80", width: 900, height: 700 },
  { id: "g13", title: "Packing station", category: "Packaging", location: "Packing Area", image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80", width: 900, height: 1200 },
  { id: "g14", title: "Truck dispatch", category: "Dispatch", location: "Logistics Bay", image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1200&q=80", width: 900, height: 700 },
  { id: "g15", title: "Precision machining", category: "Manufacturing", location: "Machine Shop", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80", width: 900, height: 1200 },
  { id: "g16", title: "Industrial product range", category: "Products", location: "Display Lab", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80", width: 900, height: 700 },
  { id: "g17", title: "Safety inspection", category: "Quality Testing", location: "Inspection Bay", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80", width: 900, height: 1200 },
  { id: "g18", title: "Electrical installation", category: "Installation", location: "Control Room", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80", width: 900, height: 700 },
  { id: "g19", title: "Shipment verification", category: "Dispatch", location: "Dispatch Zone", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80", width: 900, height: 1200 },
  { id: "g20", title: "Final packing", category: "Packaging", location: "Export Desk", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80", width: 900, height: 700 },
  { id: "g21", title: "CNC cell", category: "Manufacturing", location: "Fabrication Hall", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80", width: 900, height: 1200 },
  { id: "g22", title: "Engine component testing", category: "Products", location: "Performance Lab", image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80", width: 900, height: 700 },
  { id: "g23", title: "Bulk storage racking", category: "Warehouse", location: "Stores", image: "https://images.unsplash.com/photo-1586528114690-188244ef50e5?auto=format&fit=crop&w=1200&q=80", width: 900, height: 1200 },
  { id: "g24", title: "Maintenance validation", category: "Quality Testing", location: "Service Hangar", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80", width: 900, height: 700 },
  { id: "g25", title: "Generator commissioning", category: "Installation", location: "Remote Site", image: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80", width: 900, height: 1200 },
  { id: "g26", title: "Packaging line", category: "Packaging", location: "Export Floor", image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=1200&q=80", width: 900, height: 700 },
  { id: "g27", title: "Outbound dispatch", category: "Dispatch", location: "Logistics Center", image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80", width: 900, height: 1200 },
  { id: "g28", title: "Assembly QA station", category: "Quality Testing", location: "Final Inspection", image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80", width: 900, height: 700 },
  { id: "g29", title: "Factory floor overview", category: "Manufacturing", location: "Main Plant", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80", width: 900, height: 1200 },
  { id: "g30", title: "Ready for dispatch", category: "Dispatch", location: "Cold Chain Bay", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80", width: 900, height: 700 },
];

export const GALLERY_FILTERS = [
  "Manufacturing",
  "Products",
  "Warehouse",
  "Quality Testing",
  "Installation",
  "Packaging",
  "Dispatch",
] as const;
