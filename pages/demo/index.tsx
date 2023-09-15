import { Inter } from "next/font/google";
import styles from "./demo.module.scss";
import { Demo } from "@/components/page-view";

const inter = Inter({ subsets: ["latin"] });

export default function DemoPage() {
  return <Demo />;
}
