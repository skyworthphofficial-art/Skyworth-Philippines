import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";
export const metadata: Metadata = { title: "News" };
export default function Page() { return <InfoPage eyebrow="LATEST NEWS" title="Stories worth sharing." description="News, product launches, campaigns and community initiatives from SKYWORTH Philippines." cards={[{title:"Product News",body:"Official product releases and announcements."},{title:"Brand Stories",body:"Partnerships, events and brand moments."},{title:"Community Updates",body:"Corporate social responsibility and local community projects."}]}/>; }
