import Image from "next/image";

export default function Page() {
    return (
        <section className="">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance  ">
                Soju
            </h1>

            <div className="text-muted-foreground mt-5">
                I design & code things on the web. This website is my digital garden, where I store the things I have been learning and love.
            </div>

            <div className="relative  -mx-5 md:-mx-8">
                <Image src="/bg-soju-1.png" alt="Profile" width={800} height={533} />
            </div>


            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Pomodoro
            </h3>

            <ol className="list grid text-sm list-inside list-decimal grid-cols-1 gap-y-2 mt-3 ">
                {" "}
                <li>
                    🐼 <strong className="font-semibold"> 1 pomodoro</strong> for read book
                    (Search inside yourself)
                </li>{" "}
                <li>
                    🚶 <strong className="font-semibold"> 1 pomodoros</strong> for long walk
                    &nbsp;
                </li>
            </ol>





        </section>

    );
}