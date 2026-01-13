import HomeContent from "./HomeContent";
import AppLoaderGate from "../components/AppLoaderGate";

export default function HomePage() {
  return (
    <AppLoaderGate durationMs={900} cooldownMs={7000}>
      <HomeContent />
    </AppLoaderGate>
  );
}
