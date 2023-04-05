import Image from "next/image"
import { Collapse, Text, Grid } from '@nextui-org/react';


export default function Section2() {
  return (
    <section className='flex flex-col items-center bg-neutral-200 relative w-full mx-auto text-lg pb-20 pt-20 overflow-hidden'>
      <article className='max-w-[60rem] mx-[5vw] my-0 flex flex-col items-center gap-12 z-10'>
        <div className='flex flex-col gap-4 items-center px-[5vw]'>
          <h2 className='text-4xl md:text-5xl'>Air pollution</h2>
          <h3 className='text-2xl md:text-3xl opacity-60'>What is it?</h3>
        </div>
        <p id='intro1-text' className=' flex flex-col gap-4'>
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
        <div className='flex flex-col md:flex-row justify-center items-center md:items-start gap-12'>
          <figure className='relative h-52 md:w-72 w-[90%] px-[5vw]'>
          </figure>
          <Grid.Container gap={2}>
      <Grid>
        <Collapse.Group splitted>
          <Collapse title="Option A">
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </Collapse>
          <Collapse title="Option B">
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </Collapse>
          <Collapse title="Option C">
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </Collapse>
        </Collapse.Group>
      </Grid>
    </Grid.Container>
        </div>
      </article>
   </section>
  )
}
