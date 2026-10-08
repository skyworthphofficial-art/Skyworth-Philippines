import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";
export const metadata: Metadata = { title: "Technology" };
export default function Page() { return <InfoPage eyebrow="DISCOVER OUR TECHNOLOGY" title="Technology that brings moments to life." description="Explore the ideas behind SKYWORTH viewing experiences. Detailed technology information will be added from approved official content." cards={[{title:"QD-Mini LED",body:"An introduction to SKYWORTH's premium display technology."},{title:"QLED+",body:"Explore vibrant color and the way you experience content."},{title:"Eye Care",body:"Learn about the product features designed for comfortable viewing."}]}/>; }
