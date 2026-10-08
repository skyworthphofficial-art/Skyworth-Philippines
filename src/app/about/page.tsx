import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";
export const metadata: Metadata = { title: "About Us" };
export default function Page() { return <InfoPage eyebrow="ABOUT SKYWORTH PHILIPPINES" title="Better experiences, connected to home." description="A home for our brand story, company updates and community initiatives." cards={[{title:"Our Story",body:"Company history and brand milestones will appear here."},{title:"Our Commitment",body:"Discover the values behind our products and customer experiences."},{title:"Community",body:"News about local partnerships and corporate social responsibility."}]}/>; }
