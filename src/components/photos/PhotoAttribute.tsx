interface PhotoAttributeProps {
  attributeName: string;
  attributeValue: string;
}

function PhotoAttribute({
  attributeName,
  attributeValue,
}: PhotoAttributeProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between pr-4">
      <p className="inline-block mr-2 font-bold">{attributeName}</p>
      <p className="inline-block">{attributeValue}</p>
    </div>
  );
}

export { PhotoAttribute };
