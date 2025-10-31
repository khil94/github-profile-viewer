import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface tabItem {
  name: string;
  content: ReactNode;
  icon: LucideIcon;
}

interface props {
  tabList: tabItem[];
}

export default function TabLayout({ tabList }: props) {
  return (
    <Tabs defaultValue={tabList[0].name}>
      <TabsList>
        {tabList.map((v, idx) => {
          return (
            <TabsTrigger key={v.name + idx} value={v.name}>
              <v.icon />
              {v.name}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {tabList.map((v, idx) => {
        return (
          <TabsContent className="mt-8" key={v.name + idx} value={v.name}>
            {v.content}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
