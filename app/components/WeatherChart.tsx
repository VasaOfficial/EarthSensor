import { useState, useEffect } from 'react'
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { addDays, format } from 'date-fns'
import { type DailyWeather } from 'types'

type WeatherChartProps = {
  weatherData: DailyWeather[]
}

export default function WeatherChart({ weatherData }: WeatherChartProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [chartKey, setChartKey] = useState(0) // for rerendering

  useEffect(() => {
    if (!weatherData) return
    weatherData.forEach((e, i) => {
      const day = addDays(new Date(), i).toISOString()
      e.day = new Date(day).getTime()
    })
    setIsLoaded(true)
    setChartKey((prevKey) => prevKey + 1)
  }, [weatherData])

  return (
    isLoaded && (
      <div className="flex flex-col gap-4 items-center w-full md:h-auto h-64  bg-white rounded-lg p-3 md:p-6 overflow-hidden">
        <p>Weekly temperature forecast</p>
        <div className="w-full h-full ">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={100}
              data={weatherData}
              margin={{ top: 15, right: 20, bottom: 0, left: 0 }}
            >
              <Area
                dot={true}
                type="natural"
                dataKey="temp.max"
                unit="°C"
                fill="#FBBA7450"
                stroke="#FBBA74"
              />
              <Area
                dot={true}
                type="natural"
                dataKey="temp.min"
                unit="°C"
                fill="#7E8FCC50"
                stroke="#7E8FCC"
              />
              <CartesianGrid stroke="#9C9C9C" strokeDasharray="2 2" horizontal={false} />
              {weatherData[0]?.day && (
                <XAxis
                  dataKey="day"
                  height={22}
                  tickFormatter={(e: Date) => format(new Date(e), 'EE dd')}
                />
              )}
              <YAxis unit="°" width={30} />
              <Tooltip
                cursor={{ stroke: '#4C4C4C' }}
                contentStyle={{
                  borderRadius: '.5rem',
                  textAlign: 'center',
                  border: '2px solid #ccc',
                }}
                labelStyle={{
                  color: 'black',
                }}
                labelFormatter={(e: Date) => format(new Date(e), 'dd MMMM yyyy')}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  )
}
