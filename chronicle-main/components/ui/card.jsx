export default function Card(props) {
  return (
    <figure
      className={`text-center rounded-md ${
        props.strongColour
          ? 'bg-indigo-200 shadow-xl'
          : props.isAmber
          ? 'bg-fuchsia-500/60 shadow-xl'
          : 'bg-sky-50 shadow-lg'
      } mx-4 my-1 py-2 `}
    >
      {props.children}
    </figure>
  );
}
