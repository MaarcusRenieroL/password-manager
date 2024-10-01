import Link from "next/link";
import { MenuIcon, Shield } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "~/components/ui/sheet"
import { Button } from "~/components/ui/button";

export const Navbar = () => {
	return (
		<>
			<header className="px-4 lg:px-6 h-14 hidden lg:flex items-center gap-5 border-b">
				<Link className="flex items-center justify-center" href="#">
					<Shield className="h-6 w-6 text-primary"/>
					<span className="ml-2 text-lg font-bold">SecurePass</span>
				</Link>
				<nav className="ml-auto flex sm:gap-6 gap-5">
					<Link className="text-sm font-medium hover:underline underline-offset-4" href="#home">
						Home
					</Link>
					<Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
						Features
					</Link>
				</nav>
				<div className="flex items-center gap-5">
					<Link href="/auth/sign-up">
						<Button variant="outline">Sign In</Button>
					</Link>
					<Link href="/auth/sign-up">
						<Button>Sign Up</Button>
					</Link>
				</div>
			</header>
			<header className="px-4 lg:px-6 h-14 flex lg:hidden items-center justify-between gap-5 border-b">
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="outline" size="icon">
							<MenuIcon className="h-4 w-4"/>
						</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>SecurePass</SheetTitle>
						</SheetHeader>
					
					</SheetContent>
				</Sheet>
				<Link className="flex items-center justify-center" href="#">
					<Shield className="h-6 w-6 text-primary"/>
					<span className="ml-2 text-lg font-bold">SecurePass1</span>
				</Link>
				<Link href="/auth/sign-up">
					<Button>Sign Up</Button>
				</Link>
			</header>
		</>
	)
}