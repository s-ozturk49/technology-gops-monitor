import { useState } from "react";
import { AppLayout, type SayfaTipi } from "./layouts/AppLayout";
import { TaleplerPage } from "./pages/TaleplerPage";
import { ZafiyetlerPage } from "./pages/ZafiyetlerPage";
import { ProblemlerPage } from "./pages/ProblemlerPage";

export default function App() {
  const isim = "Selim";
  const [aktifSayfa, setAktifSayfa] = useState<SayfaTipi>("btth");

  return (
    <AppLayout 
      userName={isim} 
      aktifSayfa={aktifSayfa} 
      onSelectPage={setAktifSayfa}
    >
      {aktifSayfa === "btth" && <TaleplerPage userName={isim} />}
      {aktifSayfa === "bgvl" && <ZafiyetlerPage />}
      {aktifSayfa === "pr" && <ProblemlerPage />}
    </AppLayout>
  );
}