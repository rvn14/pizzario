


export default function Layout({ children }: Readonly<{ children: React.ReactNode;}>) {
  return (
    
    <main className="antialiased flex flex-col items-center ">
        {children}
    </main>
    
  );
}