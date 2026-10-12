import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";
export const metadata: Metadata = { title: "Where to Buy" };
export default function Page() { return <InfoPage eyebrow="WHERE TO BUY" title="Find SKYWORTH near you." description="Our authorized dealer directory and searchable store locator will be connected to verified Philippine retail partner data." cards={[{title:"Authorized Dealers",body:"A directory of official dealers will appear here after data verification."},{title:"Store Locator",body:"Search by city, province, and retailer once the dealer database is ready."},{title:"Official Online Channels",body:"Verified marketplace links can help customers find SKYWORTH products."}]}/>; }
