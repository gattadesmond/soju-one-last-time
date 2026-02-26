export default function AboutPage() {
  return (
    <section className="pb-20">
      <div className="relative flex items-center space-x-2 animate">
        <div className="font-heading text-muted-foreground mb-0 text-lg font-semibold">
          # About me
        </div>
      </div>
      <div className="pt-3 pb-3 pl-3 animate">
        <p>Hi, I&apos;m Việt Hùng 👋.</p>
        <p>
          I design & code things on the web, and have great interest in
          updating new technologies.
        </p>
        <p>
          My best work is to create experiences that look and function
          beautifully across anything that can access the web.
        </p>
      </div>

      <div className="relative mt-4 flex items-center space-x-2 animate">
        <div className="font-heading text-muted-foreground mb-0 text-lg font-semibold">
          # Work Experience
        </div>
      </div>
      <div className="pt-3 pb-3 pl-3 animate">
        <div className="grid grid-cols-1 gap-y-3">
          <div className="relative mt-2 flex space-x-2">
            <div className="pt-1.5">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
            </div>
            <div className="pl-1">
              <div className="text-sm text-muted-foreground">Dec 2018 - Present</div>
              <div className="py-1 font-semibold text-foreground">
                Senior Front-end designer
                <span className="ml-4 font-normal text-muted-foreground">
                  @ M-Service Company
                </span>
              </div>
              <div className="grid grid-cols-1 gap-y-2 text-muted-foreground">
                <div>
                  - Developed and designed Momo.vn website frontend using
                  HTML/CSS/JS(ES6), React, Next JS, SCSS, and Bootstrap 4
                  (previous).
                </div>
                <div>
                  - Built a Design System for transitioning visual design into
                  maintainable HTML & CSS and make consistency to products.
                </div>
                <div>
                  - Optimized UI load times and performance by up to 95% Google
                  PageSpeed
                </div>
                <div>
                  - Created responsive HTML email templates that improved email
                  CTR rates, readability and brand identity
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-2 flex space-x-2">
            <div className="pt-1.5">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
            </div>
            <div className="pl-1">
              <div className="text-sm text-muted-foreground">Dec 2017 - Dec 2018</div>
              <div className=" py-1 font-semibold text-foreground">
                Senior Front-end Developer
                <span className="ml-4 font-normal text-muted-foreground">
                  @ Foody Corporation Company
                </span>
              </div>
              <div className="grid grid-cols-1 gap-y-2 text-muted-foreground">
                <div>- Supported Foody and Now website desktop and mobile sites</div>
                <div>
                  - Communicated with back-end developers for any front-end
                  problematic issues.
                </div>
                <div>
                  - Building reusable components with principles of
                  component-driven architecture and front-end libraries for
                  future use
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-2 flex space-x-2">
            <div className="pt-1.5">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
            </div>
            <div className="pl-1">
              <div className="text-sm text-muted-foreground">Sep 2015 - Dec 2017</div>
              <div className="py-1 font-semibold text-foreground">
                Front-end Developer
                <span className="ml-4 font-normal text-muted-foreground">
                  @ Vien Thong A Company
                </span>
              </div>
              <div className="grid grid-cols-1 gap-y-2 text-muted-foreground">
                <div>
                  - Designed and created web templates, user interfaces and
                  user experience for the main website VTA.
                </div>
                <div>- Managed frontend ops using NPM, Bower, Grunt, Gulp.</div>
              </div>
            </div>
          </div>

          <div className="relative mt-2 flex space-x-2">
            <div className="pt-1.5">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
            </div>
            <div className="pl-1">
              <div className="text-sm text-muted-foreground">Feb 2014 - Sep 2015</div>
              <div className="py-1 font-semibold text-foreground">
                Front-end Developer
                <span className="ml-4 font-normal text-muted-foreground">
                  @ Platform 5 Company
                </span>
              </div>
              <div className="grid grid-cols-1 gap-y-2 text-muted-foreground">
                <div>- Experience with compiled CSS (SASS/Compass)</div>
                <div>- Bringing mock-ups to life using HTML, CSS, JavaScript.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-4 flex items-center space-x-2 animate">
        <div className="font-heading text-muted-foreground mb-0 text-lg font-semibold">
          # Skills
        </div>
      </div>
      <div className="pt-3 pb-3 pl-3 animate">
        <ol className="mt-0 space-y-3 list-decimal list-inside">
          <li>🔍 Attention to detail</li>
          <li>🍎 Innovative problem-solving</li>
          <li>🐼 React, Vue, Gulp, Webpack</li>
          <li>🌱 HTML, CSS, SCSS, JavaScript</li>
          <li>🕹 UI/UX</li>
          <li>🎾 Adobe Photoshop, Figma, Illustrator</li>
        </ol>
      </div>
    </section>
  );
}
