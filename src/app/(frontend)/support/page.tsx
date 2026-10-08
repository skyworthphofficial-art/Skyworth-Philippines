import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";
export const metadata: Metadata = { title: "Customer Support" };
export default function Page() { return <InfoPage eyebrow="CUSTOMER SUPPORT" title="Support every step of the way." description="Find product assistance, downloads, and verified service information. Contact details will be published after approval." cards={[{title:"Product Manuals",body:"Browse official instruction manuals and product documents."},{title:"Service Centers",body:"Locate verified after-sales service partners across the Philippines."},{title:"Contact Support",body:"Find support contact channels and frequently asked questions."}]}/>; }
