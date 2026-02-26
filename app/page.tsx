import Image from "next/image";

export default function Page() {
    return (
        <section className="container pt-28">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance  ">
                Soju
            </h1>

            <div className="text-muted-foreground mt-5">
                I design & code things on the web. This website is my digital garden, where I store the things I have been learning and love.
            </div>

            <div className="relative -md-5 md:-mx-8">
                <Image src="/bg-soju-1.png" alt="Profile" width={800} height={533} />

            </div>



            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Pomodoro
            </h3>

            <div>fewf</div>
            <div>fewf</div>
            <div>fewf</div>

            <div>fewf</div>
            <div>fewf</div>
            <div>fewf</div>
            <div>fewf</div>
            <div>fewf</div>
        </section>

    );
}