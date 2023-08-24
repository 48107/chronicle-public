import Button from '../../components/ui/btn';

export default function EditionNumsBtn(props) {
  return (
    <>
      {props.editions.map((edition) => {
        return <Button key={edition.editionNumber} onClick={props.onClick} number={edition.editionNumber}>Edition {edition.editionNumber}</Button>;
      })}
    </>
  );
}
