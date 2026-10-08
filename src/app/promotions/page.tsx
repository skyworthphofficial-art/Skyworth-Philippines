import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";
export const metadata: Metadata = { title: "Promotions" };
export default function Page() { return <InfoPage eyebrow="PROMOTIONS" title="More reasons to celebrate at home." description="Explore current SKYWORTH Philippines campaigns and announcements once approved content is available." cards={[{title:"Current Campaigns",body:"Featured campaigns and their official mechanics will be managed through the CMS."},{title:"Retail Promotions",body:"Learn about available promotions from participating partners."},{title:"Past Campaigns",body:"A record of earlier promotional activities and highlights."}]}/>; }
