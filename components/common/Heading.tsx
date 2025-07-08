interface HeadingProps {
  title: string;
  center?: boolean;
  lg?: boolean;
  md?: boolean;
}

const Heading = ({ title, center, lg, md }: HeadingProps) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      {lg && <h1 className='text-4xl font-bold'>{title}</h1>}
      {md && <h2 className='text-3xl font-bold'>{title}</h2>}
      {!lg && !md && <h3 className='text-2xl font-bold'>{title}</h3>}
    </div>
  );
};

export default Heading;
