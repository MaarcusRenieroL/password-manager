import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <h1 className="text-2xl font-bold">Home Page</h1>
      <Button>Click me</Button>
    </div>
  );
}
