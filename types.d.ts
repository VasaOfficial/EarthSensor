declare module '*.glsl' {
  const value: string;
  export default value;
}

export type AqiData = {
  lat: number;
  long: number;
  aqi: number;
  info: { name: string; aqi: number; time: Date };
  radius: number;
};
