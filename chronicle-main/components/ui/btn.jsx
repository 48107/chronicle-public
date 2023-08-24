import Link from 'next/link';

export default function Button(props) {
  return (
    <>
      <Link href={`misc/${props.number}`}>
        <button
          className={`border-blue-500 border rounded-lg px-8 py-1 text-blue-500 font-medium hover:bg-blue-500 hover:text-white my-1 mx-2`}
        >
          {props.children}
        </button>
      </Link>
    </>
  );
}
