import { Table, Card, Text } from "@nextui-org/react"

interface Row {
  key: string;
  rank: number;
  country: string;
  aqi: number;
}

function Top10Chart() {
  const columns = [
    {
      key: "rank",
      label: "Rank",
    },
    {
      key: "country",
      label: "Country",
    },
    {
      key: "aqi",
      label: "AQI",
    },
  ];
  const rows: Row[] = [
    {
      key: "1",
      rank: 1,
      country: "Chad",
      aqi: 89.7,
    },
    {
      key: "2",
      rank: 2,
      country: "Iraq",
      aqi: 80.1,
    },
    {
      key: "3",
      rank: 3,
      country: "Pakistan",
      aqi: 70.9,
    },
    {
      key: "4",
      rank: 4,
      country: "Bahrain",
      aqi: 66.6,
    },
    {
      key: "5",
      rank: 5,
      country: "Bangladesh",
      aqi: 65.8,
    },
    {
      key: "6",
      rank: 6,
      country: "Burkina Faso",
      aqi: 63,
    },
    {
      key: "7",
      rank: 7,
      country: "Kuwait",
      aqi: 55.8,
    },
    {
      key: "8",
      rank: 8,
      country: "India",
      aqi: 53.3,
    },
    {
      key: "9",
      rank: 9,
      country: "Egypt",
      aqi: 46.5,
    },
    {
      key: "10",
      rank: 10,
      country: "Tajikistan",
      aqi: 46,
    },
  ];
  return (
    <Table bordered lined headerLined
      aria-label="Example table with dynamic content"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column key={column.key}>{column.label}</Table.Column>
        )}
      </Table.Header>
      <Table.Body items={rows}>
        {(item: Row) => (
          <Table.Row key={item.key}>
            {columns.map((column) => (
              <Table.Cell key={column.key}>
                {item[column.key as keyof Row]}
              </Table.Cell>
            ))}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  )
}


export default function Section4() {
  return (
    <section className='z-10 py-28 px-[5vw] flex flex-col items-center justify-center bg-neutral-200 relative mx-auto text-lg w-full'>
        <article className='z-10 md:min-h-[40rem] flex flex-row items-center gap-24 md:gap-0 md:flex-row w-full max-w-[60rem]'>
          <div className='w-full md:w-3/5 h-[40rem] overflow-hidden md:self-start'>
            <div className='flex gap-2 items-center opacity-80'>
              <h3>
                Worst{' '}
                <abbr className='decoration-black/30 underline-offset-4' title='Air Quality Index'>
                  AQI
                </abbr>{' '}
                average 2022
              </h3>
              <cite className='text-xs'>
                <a
                  href='https://www.iqair.com/world-most-polluted-countries'
                  target='_blank'
                  rel='noreferrer'>
                  (source IQAIR)
                </a>
              </cite>
            </div>
            <Top10Chart />
          </div>
          <Card className="max-w-[25rem]">
            <Card.Header>
              <Text b>Card Title</Text>
            </Card.Header>
            <Card.Body className="py-10">
            <Text>
              The{' '}
              <abbr className='decoration-black/30 underline-offset-4' title='World Health Organization'>
                WHO
              </abbr>{' '}
                target for air pollution is 0-10 µg/m³. IQ Air, which measures
                pollution in 109 countries around the globe, considers
                measurements above 35.5 to be unhealthy for sensitive groups,
                levels between 55.5 and 150.4 to be unhealthy for all, and
                anything higher is either very unhealthy (150.5-250.4) or
                hazardous (250.5 or higher).
            </Text>
            </Card.Body>
          </Card>
        </article>
      </section>
  )
}
