import Image from "next/image";
import { LinkListSection, type LinkItem } from "@/components/link-list-section";

const listReading: LinkItem[] = [
        {
            link: "https://dmitripavlutin.com/",
            name: "https://dmitripavlutin.com/",
            isFeature: true,
        },
        {
            link: "https://defensivecss.dev/",
            name: "https://defensivecss.dev/",
            isFeature: true,
        },
        {
            link: "https://css-tricks.com/",
            name: "https://css-tricks.com/",
            isFeature: true,
        },
        {
            link: "https://www.joshwcomeau.com/",
            name: "https://www.joshwcomeau.com/",
            isFeature: true,
        },
        {
            link: "https://tympanus.net/codrops/",
            name: "https://tympanus.net/codrops/",
            isFeature: true,
        },
        {
            link: "https://web.dev/blog/",
            name: "https://web.dev/blog/",
            isFeature: true,
        },
        {
            link: "https://www.smashingmagazine.com/",
            name: "https://www.smashingmagazine.com/",
            isFeature: true,
        },
        {
            link: "https://ishadeed.com/",
            name: "https://ishadeed.com/",
            isFeature: true,
        },
        {
            link: "https://moderncss.dev/",
            name: "https://moderncss.dev/",
            isFeature: true,
        },

        {
            link: "https://www.taniarascia.com/blog",
            name: "https://www.taniarascia.com/blog",
            isFeature: false,
        },
        {
            link: "https://goodui.org/leaks/",
            name: "https://goodui.org/leaks/",
            isFeature: false,
        },

        {
            link: "https://growth.design/",
            name: "https://growth.design/",
            isFeature: false,
        },
        {
            link: "https://davidwalsh.name/",
            name: "https://davidwalsh.name/",
            isFeature: false,
        },
];

const listLearnFigma: LinkItem[] = [
        {
            link: "https://min-max-calculator.9elements.com/",
            name: "Min-Max-Value Interpolation",
            isFeature: true,
        },
        {
            link: "https://www.designsystemsforfigma.com/",
            name: "Design Systems for Figma",
            isFeature: true,
        },
];

const listTools: LinkItem[] = [
        {
            link: "https://min-max-calculator.9elements.com/",
            name: "Min-Max-Value Interpolation",
            isFeature: true,
        },
        {
            link: "https://www.designsystemsforfigma.com/",
            name: "Design Systems for Figma",
            isFeature: true,
        },
];

export default function Page() {
    return (
        <section className=" pb-20">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance  ">
                Soju
            </h1>

            <div className="text-muted-foreground mt-5">
                I design & code things on the web. This website is my digital garden, where I store the things I have been learning and love.
            </div>

            <div className="relative  -mx-5 md:-mx-8">
                <Image src="/bg-soju-1.png" alt="Profile" width={800} height={533} />
            </div>


            <div className="grid grid-cols-1 gap-8">
                <div>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Pomodoro
                    </h3>

                    <ol className="list grid list-inside list-decimal grid-cols-1 gap-y-2 mt-3 ">
                        {" "}
                        <li>
                            🐼 <strong className="font-semibold"> 1 pomodoro</strong> for read book
                        </li>{" "}
                        <li>
                            🚶 <strong className="font-semibold"> 1 pomodoros</strong> for long walk
                            &nbsp;
                        </li>
                    </ol>
                </div>


                <LinkListSection title="Good websites to learn" items={listReading} />
                <LinkListSection title="Learn Figma" items={listLearnFigma} />
                <LinkListSection title="Best tools" items={listTools} />
            </div>




        </section>

    );
}