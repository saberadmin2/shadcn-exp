// pages/page.js
"use client";
import Button from "@/components/ui/button";  // Import button without curly braces
import ContentFetcher from "@/components/ui/ContentFetcher";  // Import the content fetcher

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
      <ContentFetcher />  {/* Use the content fetcher component */}
    </div>
  );
}
