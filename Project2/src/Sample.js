export default function Sample(props) {
  const { description = "Sample" } = props;
  return <div>{`Description: ${description}`}</div>;
}
