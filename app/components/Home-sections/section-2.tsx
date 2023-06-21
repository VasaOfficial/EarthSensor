"use client"
import { useState, useRef, useEffect } from 'react';
import autoAnimate from '@formkit/auto-animate'

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem = ({ title, children }: AccordionItemProps) => {
  const [show, setShow] = useState(false);
  const parent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  const reveal = () => setShow(!show)

  return (
    <div className="border-b border-gray-300" ref={parent}>
      <button
        className="w-full h-20 flex justify-between items-center p-4 "
        onClick={reveal}
      >
        <h2 className="text-2xl md:text-3xl">{title}</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`h-6 w-6 transform ${show ? '-rotate-180' : 'rotate-0'}`}
        >
          <path
            fill="currentColor"
            d="M16.59 8.59003L12 13.17L7.41 8.59003L6 10L12 16L18 10L16.59 8.59003Z"
          />
        </svg>
      </button>
     { show && <div className="overflow-hidden transition-all duration-500 ease-out">
        <div className="p-4">{children}</div>
      </div> }
    </div>
  );
};

const Section2 = () => {
  return (
    <>
    <section className="flex flex-col items-center bg-neutral-200 relative w-full mx-auto text-lg pb-20 pt-20 overflow-hidden">
      <article className="max-w-[60rem] mx-[5vw] my-0 flex flex-col items-center gap-12 z-10">
        <div className="flex flex-col gap-4 items-center px-[5vw]">
          <h2 className="text-4xl md:text-5xl">Air pollution</h2>
          <h3 className="text-2xl md:text-3xl opacity-60">What is it?</h3>
        </div>
        <p id="intro1-text" className=" flex flex-col gap-4">
          <span>
            Air pollution can be created by both manmade and natural sources.
            Natural sources include windblown or kicked-up dust, dirt and sand,
            volcanic smoke, and burning materials. Manmade sources, meaning that
            pollution is created by the actions of human beings, tend to be the
            leading contributor to air pollution in cities and are inherently
            more able to be influenced by regulations.
          </span>
          <span>
            Those human sources primarily include various forms of combustion,
            such as from gas-powered transportation (planes, trains, and
            automobiles) and industrial businesses (power plants, refineries,
            and factories), biomass burning (the burning of plant matter or coal
            for heating, cooking, and energy), and agriculture.
          </span>
        </p>
        <div className="flex w-full md:flex-row justify-center md:items-start gap-12">
          <div className="w-full max-w-full bg-white rounded-lg shadow-lg">
            <AccordionItem title="Industries &amp; heating">
              <p className="text-green-700 font-semibold">
                The combustion of fossil fuels such as coal and oil in
                industrial processes in power plants, refineries, and factories
                release a variety of pollutants, the majority of which are
                identical to those emitted by traffic and mobility. 
                <br />
                <br />
                On top of this, chemical processes and volatile industry
                byproducts also cause VOC emissions. In Europe, around 60% of
                sulfur oxides come from energy production and distribution. In
                the US, stationary fuel combustion sources like electric
                utilities and industrial boilers are responsible for 73.2% of
                sulfur dioxide pollution.
            </p>
            </AccordionItem>
            <AccordionItem title="Transportation">
            <p className="text-green-700 font-semibold">
                Petrol and diesel engines of cars, ships, trains and other
                vehicles emit pollutants such as carbon monoxide (CO), nitrogen
                oxides (NOx), particulate matter (PM), sulfur dioxide (SO2), and
                volatile organic compounds (VOCs).
                <br />
                <br />
                Friction from tires and brake wear also create primary – i.e.
                direct – particulate matter emissions. In addition, the nitrogen
                dioxide (NO2) and VOCs released by road vehicles also undergo
                photochemical reactions to form ozone (O3).
                <br/>
                <br />
                In Europe, more than 40% of NOx and almost 40% of primary PM2.5
                emissions are linked to road transport. In the United States,
                35.8% of CO and 32.8% of NOx stem from road transport.
            </p>
            </AccordionItem>
            <AccordionItem title="Agriculture">
            <p className="text-green-700 font-semibold">
                A wide range of nitrogen compounds (NO, NO2, N2), including
                ammonia (NH3), can be attributed to fertilizer production, farm
                machinery, and livestock waste management in agriculture. In
                addition, methane (CH4) is released by the digestive processes
                of livestock.
                <br />
                <br />
                In Europe, agricultural activities cause approximately 90% of
                ammonia emissions and 80% of methane emissions. In the US,
                livestock and manure management are responsible for 46% of
                methane emissions. transport.
            </p>
            </AccordionItem>
            <AccordionItem title="Burning of Fossil Fuels">
            <p className="text-green-700 font-semibold">
                Sulfur dioxide emitted from the combustion of fossil fuels like
                coal, petroleum for energy in power plants, and other factory
                combustibles is one the major cause of air pollution. Billions
                of vehicles run on roads are powered by gasoline and diesel
                engines that burn petroleum for releasing energy. Petroleum is
                made up of hydrocarbons, and engines don’t burn them cleanly.
                <br />
                <br />
                As a result, pollutants such as PM, nitric oxide and NO2
                (together referred to as NOx), carbon monoxide, organic
                compounds, and lead emit from vehicles including trucks, jeeps,
                cars, trains, airplanes, causing a high level of pollution.
                These modes of transportation form part of our daily basic
                needs, so we rely on them heavily. But, their overuse is killing
                our environment as dangerous gases are polluting the atmosphere.
                <br />
                <br />
                Carbon Monoxide caused by improper or incomplete combustion and
                generally emitted from vehicles is another major pollutant along
                with Nitrogen Oxides, that is produced from both natural and
                man-made processes. As per the World Health Organization (WHO),
                exposure to outdoor air pollution contributes to as much as 0.6
                to 1.4 percent of the burden of disease and 4.2 million deaths
                every year.
            </p>
            </AccordionItem>
          </div>
        </div>
      </article>
    </section>
    </>
  );
};

export default Section2;
