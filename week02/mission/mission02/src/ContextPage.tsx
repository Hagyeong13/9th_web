import { ThemeProvider } from "./context/ThemeProvider";
import Navbar from "./components/Navbar";
import ThemeContent from "./components/ThemeContent";

export default function ContextPage() {

    return <>
        <ThemeProvider>
            <div className='flex flex-col items-center min-h-screen'>
                <Navbar />
                <main className='flex-1  w-full'>
                    <ThemeContent />
                </main>
            </div>
        </ThemeProvider>
    </>
}